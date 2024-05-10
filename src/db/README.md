If executed on the Order on this file, this queries should all be successful and
create the necessary constraints, views and functions for the app.

## Content

- [Contraints](/constaints)
- [Views](/views)
- [Functions](/functions)

## Constraints

<details>
<summary><b>[CONSTRAINT] Unique nominations</b></summary>

```sql
ALTER TABLE app_nominations
ADD CONSTRAINT unique_nomination_entry UNIQUE (user_id_from, user_id_nominated);
```

</details>

<details>
<summary><b>[CONSTRAINT] Unique daily leaderboard</b></summary>

```sql
ALTER TABLE app_leaderboard
ADD CONSTRAINT unique_daily_leaderboard_entry UNIQUE (user_id, day_id);
```

</details>

## Views

<details>
<summary><b>[VIEW] App user and user stats</b></summary>

```sql
CREATE VIEW app_user_and_stats AS
SELECT aus.*, u.username, u.wallet_address, u.created_at, u.social_profiles, u.referral_code, u.max_nominations
FROM app_user u
JOIN app_user_stats aus ON u.id = aus.user_id
```

</details>

<details>
<summary><b>[VIEW] Daily nominations by user's limit</b></summary>

```sql
CREATE VIEW daily_nominations_view AS
SELECT *
FROM (
    SELECT
        adn.user_id_from,
        adn.user_id_nominated,
        adn.created_at,
        u.max_nominations,
        ROW_NUMBER() OVER (PARTITION BY adn.user_id_from ORDER BY adn.created_at) AS nomination_rank
    FROM app_daily_nominations adn
    JOIN app_user u ON adn.user_id_from = u.id
) AS subquery
WHERE nomination_rank <= max_nominations;
```

</details>

<details>
<summary><b>[VIEW] User's personal stats</b></summary>

```sql
CREATE VIEW user_personal_stats AS
SELECT
    aus.user_id,
    u.wallet_address,
    u.username,
    lb.rank AS rank,
    aus.nominations AS total_nominations_received,
    aus.boss_budget AS boss_budget,
    aus.bpe_nominations + aus.bpe_regular_nominator AS total_boss_points_earned,
    aus.bpe_nominations AS boss_points_from_nominations,
    aus.bpe_regular_nominator AS boss_points_from_nominating,
    aus.boss_score AS boss_points
FROM app_user_stats aus
LEFT JOIN app_leaderboard lb ON aus.user_id = lb.user_id
LEFT JOIN app_user u ON aus.user_id = u.id;
```

</details>

<details>
<summary><b>[VIEW] User's nominations</b></summary>

```sql
CREATE VIEW user_nominations AS
SELECT
    aus.user_id AS user_id,
    u.wallet_address AS wallet_address,
    an.user_id_nominated AS nominated_user_id,
    an.day_id AS nomination_date,
    u.username AS nominated_username,
    lb.rank AS nominated_user_rank,
    aus.boss_score AS nominated_user_boss_points
FROM app_user_stats aus
JOIN app_nominations an ON aus.user_id = an.user_id_from
JOIN app_user u ON an.user_id_nominated = u.id
JOIN app_user un ON aus.user_id = un.id
LEFT JOIN app_leaderboard lb ON u.id = lb.user_id;
```

</details>

<details>
<summary><b>[VIEW] User's nominations streak</b></summary>

```sql
CREATE OR REPLACE VIEW user_nomination_streak AS
SELECT
    user_id_from,
    MAX(day_id) AS last_nomination_day,
    COUNT(*) AS streak
FROM (
    SELECT DISTINCT ON (user_id_from, day_id)
        user_id_from,
        day_id,
        day_id - ROW_NUMBER() OVER (PARTITION BY user_id_from ORDER BY day_id) AS group_id
    FROM
        app_nominations
) AS subquery
GROUP BY
    user_id_from, group_id;
```

</details>

<details>
<summary><b>[VIEW] app leaderboard current</b></summary>

```sql
CREATE OR REPLACE VIEW app_leaderboard_current AS
SELECT
    un.id AS user_id,
    lb.rank AS rank,
    un.username AS username,
    un.wallet_address AS wallet_address,
    aus.builder_score AS builder_score,
    aus.boss_score AS boss_points,
    aus.nominations AS nominations
FROM app_leaderboard lb
JOIN app_user un ON lb.user_id = un.id
LEFT JOIN app_user_stats aus ON un.id = aus.user_id
WHERE lb.day_id = (SELECT MAX(day_id) FROM app_leaderboard);
```

</details>

<details>
<summary><b>[VIEW] app leaderboard v1</b></summary>

```sql
CREATE OR REPLACE VIEW app_leaderboard_v1 AS
SELECT u.wallet_address, u.social_profiles, u.username, us.builder_score
    FROM app_user u JOIN app_user_stats us ON u.id = us.user_id ORDER BY us.builder_score DESC
```

</details>

## Functions

<details>
<summary><b>[FUNCTION] Insert new user</b></summary>

```sql
CREATE OR REPLACE FUNCTION insert_user_v2(
  wallet_address varchar,
  referral_code varchar,
  boss_score int,
  boss_budget int,
  builder_score int,
  social_profiles jsonb,
  username varchar,
  manifesto_nft boolean
)
RETURNS setof app_user_and_stats
AS $$
  declare
  user_id_new int;
begin
  INSERT into app_user
    (wallet_address, referral_code, social_profiles, username, manifesto_nft)
    values (wallet_address, referral_code, social_profiles, username, manifesto_nft)
    returning id
    into user_id_new;
  INSERT into app_user_stats
    (user_id, boss_score, boss_budget, builder_score)
     values (user_id_new, boss_score, boss_budget, builder_score);
RETURN query select * from app_user_and_stats where user_id = user_id_new;
END $$ language plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update nominations</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_nominations()
RETURNS VOID AS $$
BEGIN
    INSERT INTO app_nominations (user_id_from, user_id_nominated, day_id)
    SELECT user_id_from, user_id_nominated, extract(epoch from created_at)::integer / 86400
    FROM daily_nominations_view
    -- avoid throwing when meeting the unique constraint
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update user stats</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS VOID AS $$
BEGIN
    UPDATE app_user_stats AS aus
    SET
        nominations = (
            SELECT COUNT(*)
            FROM app_nominations AS an2
            WHERE an2.user_id_from = aus.user_id
        ),
        nominated = (
            SELECT COUNT(*)
            FROM app_nominations AS an3
            WHERE an3.user_id_nominated = aus.user_id
        )
    -- to prevent pg-safeupdate error
    WHERE TRUE;

    -- Update users listed in user_nomination_streak with their streak, and set others' streak to zero
    UPDATE app_user_stats AS aus
    SET nomination_streak = COALESCE(streak, 0)
    FROM (
        SELECT
            user_id_from,
            streak
        FROM
            user_nomination_streak
        WHERE
            last_nomination_day = (extract(epoch from current_timestamp)::integer / 86400) - 1
    ) AS streak_data
    WHERE
        aus.user_id = streak_data.user_id_from;

    -- Set streak to zero for users not listed in user_nomination_streak
    UPDATE app_user_stats
    SET nomination_streak = 0
    WHERE
        user_id NOT IN (SELECT user_id_from FROM user_nomination_streak WHERE last_nomination_day = (extract(epoch from current_timestamp)::integer / 86400) - 1);
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update boss score</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_user_boss_score()
RETURNS VOID AS $$
BEGIN
    -- Update nominated users' boss_score (90% of boss_budget) and calculate bpe_nominations
    UPDATE app_user_stats AS nominated
    SET
        boss_score = nominated.boss_score + (0.9 * nominator.boss_budget),
        bpe_nominations = nominated.bpe_nominations + (0.9 * nominator.boss_budget)
    FROM app_nominations AS nomination
    JOIN app_user_stats AS nominator ON nomination.user_id_from = nominator.user_id
    WHERE nominated.user_id = nomination.user_id_nominated
    AND nomination.day_id = (extract(epoch from current_timestamp)::integer / 86400) - 1;

    -- Update nominating users' boss_score (10% of boss_budget) and calculate bpe_regular_nominator
    UPDATE app_user_stats AS nominator
    SET
        boss_score = nominator.boss_score + (0.1 * nominator.boss_budget),
        bpe_regular_nominator = nominator.bpe_regular_nominator + (0.1 * nominator.boss_budget)
    FROM app_nominations AS nomination
    JOIN app_user_stats AS nominator_data ON nomination.user_id_from = nominator_data.user_id
    WHERE nominator.user_id = nomination.user_id_from
    AND nomination.day_id = (extract(epoch from current_timestamp)::integer / 86400) - 1;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update boss_budget</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_user_boss_budget()
RETURNS VOID AS $$
BEGIN
    -- Update boss_budget to 500 if builder_score is zero and profileTokenId > 20000
    UPDATE app_user_stats AS aus
    SET
        boss_budget = 500 * CASE WHEN au.manifesto_nft THEN 1.2 ELSE 1 END
    FROM app_user au
    WHERE aus.builder_score = 0
    AND EXISTS (
        SELECT 1
        FROM jsonb_array_elements(au.social_profiles) sp
        WHERE au.id = aus.user_id
        AND sp->>'dapp' = 'farcaster'
        AND (sp->>'profileTokenId')::int > 20000
    );

    -- Update boss_budget to 1000 if builder_score is zero and profileTokenId <= 20000
    UPDATE app_user_stats AS aus
    SET
        boss_budget = 1000 * CASE WHEN au.manifesto_nft THEN 1.2 ELSE 1 END
    FROM app_user au
    WHERE aus.builder_score = 0
    AND EXISTS (
        SELECT 1
        FROM jsonb_array_elements(au.social_profiles) sp
        WHERE au.id = aus.user_id
        AND sp->>'dapp' = 'farcaster'
        AND (sp->>'profileTokenId')::int <= 20000
    );

    -- Update boss_budget using the existing formula for all other cases
    UPDATE app_user_stats AS aus
    SET
        boss_budget = (
            aus.builder_score * 20 +
            (aus.builder_score + aus.boss_token_balance) * 0.2 +
            aus.nomination_streak * 10 +
            aus.boss_token_balance * 0.01
        ) * CASE WHEN au.manifesto_nft THEN 1.2 ELSE 1 END
    FROM app_user au
    WHERE aus.builder_score <> 0;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update leaderboard</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS VOID AS $$
BEGIN
    WITH user_scores AS (SELECT user_id, boss_score AS score, builder_score FROM app_user_stats)
    INSERT INTO app_leaderboard (user_id, rank, day_id)
    SELECT user_id, rank, (extract(epoch from current_timestamp)::integer / 86400) - 1
    FROM (
        SELECT
            user_id,
            ROW_NUMBER() OVER (ORDER BY score, builder_score DESC) AS rank
        FROM user_scores
    ) AS subquery
    ON CONFLICT (user_id) DO UPDATE
    SET rank = excluded.rank;
END;
$$ LANGUAGE plpgsql;
```

</details>

## NEW DATABASE STRUCTURE

<details>
<summary><b>[UNIQUENESS CONSTRAINTS]</b></summary>

```SQL
CREATE UNIQUE INDEX idx_unique_wallets ON boss_nominations (wallet_origin, wallet_destination);
```

</details>

<details>
<summary><b>[INDEXES]</b></summary>

```SQL
CREATE INDEX idx_wallet_origin ON boss_nominations (wallet_origin);
CREATE INDEX idx_wallet_destination ON boss_nominations (wallet_destination);
CREATE INDEX idx_rank ON boss_leaderboard (rank);
CREATE INDEX idx_referral_code ON users (referral_code);
```

</details>

<details>
<summary><b>[FUNCTION] Update leaderboard</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS VOID AS $$
BEGIN
    WITH user_scores AS (
        SELECT u.wallet, u.boss_score, u.passport_builder_score, u.username,
               COALESCE(COUNT(bn.id), 0) AS boss_nominations_received
        FROM users u
        LEFT JOIN boss_nominations bn ON u.wallet = bn.wallet_destination
        GROUP BY u.wallet
    )
    INSERT INTO boss_leaderboard (wallet, rank, boss_score, passport_builder_score, username, boss_nominations_received)
    SELECT wallet, rank, boss_score, passport_builder_score, username, boss_nominations_received
    FROM (
        SELECT
            wallet, boss_score, passport_builder_score, username, boss_nominations_received,
            ROW_NUMBER() OVER (ORDER BY boss_score, passport_builder_score DESC) AS rank
        FROM user_scores
    ) AS subquery
    ON CONFLICT (wallet) DO UPDATE
    SET
        rank = excluded.rank,
        boss_score = excluded.boss_score,
        passport_builder_score = excluded.passport_builder_score,
        username = excluded.username,
        boss_nominations_received = excluded.boss_nominations_received;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update user points</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_boss_score(wallet_to_update varchar) RETURNS VOID AS $$
BEGIN
    -- Reset boss_score to zero
    UPDATE users
    SET boss_score = 0
    WHERE wallet = wallet_to_update;

    -- Update boss_score based on points_given
    UPDATE users
    SET boss_score = boss_score + (
        SELECT COALESCE(SUM(boss_points_earned), 0)
        FROM boss_nominations
        WHERE wallet_origin = wallet_to_update
    )
    WHERE wallet = wallet_to_update;

    -- Update boss_score based on points_earned
    UPDATE users
    SET boss_score = boss_score + (
        SELECT COALESCE(SUM(boss_points_given), 0)
        FROM boss_nominations
        WHERE wallet_destination = wallet_to_update
    )
    WHERE wallet = wallet_to_update;
END;
$$ LANGUAGE plpgsql;
```

</details>
<details>
<summary><b>[FUNCTION] Reset streaks</b></summary>

```sql
CREATE OR REPLACE FUNCTION reset_nomination_streak() RETURNS VOID AS $$
DECLARE
    last_nomination_date DATE;
BEGIN
    -- Calculate last nomination date (yesterday) at 00:00 GMT
    last_nomination_date := date_trunc('day', CURRENT_DATE - INTERVAL '1 day') AT TIME ZONE 'GMT';

    -- Update nomination_streak for users who didn't make a nomination yesterday
    UPDATE users
    SET nomination_streak = 0
    WHERE wallet NOT IN (
        SELECT DISTINCT origin_wallet
        FROM nominations
        WHERE DATE(created_at) >= last_nomination_date
    );
END;
$$ LANGUAGE plpgsql;
```

</details>
<details>
<summary><b>[FUNCTION] Calculate boss budget for all users</b></summary>

```sql
CREATE OR REPLACE FUNCTION calculate_boss_budget() RETURNS VOID AS $$
BEGIN
    -- Update boss_budget for all users based on existing data
    UPDATE users
    SET boss_budget =
        CASE
            WHEN builder_score = 0 THEN
                CASE
                    WHEN fid > 20000 THEN
                        500
                    ELSE
                        1000
                END
            ELSE
                (builder_score * 20 + boss_tokens * 0.001) *
                (CASE WHEN has_manifesto_nft THEN 1.2 ELSE 1 END)
        END;
END;
$$ LANGUAGE plpgsql;
```

</details>
