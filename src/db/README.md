### [CONSTRAINT] Unique nominations

```sql
ALTER TABLE app_nominations
ADD CONSTRAINT unique_nomination_entry UNIQUE (user_id_from, user_id_nominated);
```

### [CONSTRAINT] Unique daily leaderboard

```sql
ALTER TABLE app_leaderboard
ADD CONSTRAINT unique_daily_leaderboard_entry UNIQUE (user_id, day_id);
```

### [FUNCTION] Insert new user

```sql
CREATE OR REPLACE FUNCTION insert_user(
  wallet_address varchar,
  referral_code varchar,
  boss_score int,
  boss_budget int,
  builder_score int,
  social_profiles jsonb
)
RETURNS setof app_user_and_stats
AS $$
  declare
  user_id_new int;
begin
  INSERT into app_user
    (wallet_address, referral_code, social_profiles)
    values (wallet_address, referral_code, social_profiles)
    returning id
    into user_id_new;
  INSERT into app_user_stats
    (user_id, boss_score, boss_budget, builder_score)
     values (user_id_new, boss_score, boss_budget, builder_score);
RETURN query select * from app_user_and_stats where user_id = user_id_new;
END $$ language plpgsql;
```

### [VIEW] App user and user stats

```sql
CREATE VIEW app_user_and_stats AS
SELECT aus.*, u.username, u.wallet_address, u.created_at, u.social_profiles, u.referral_code, u.max_nominations
FROM app_user u
JOIN app_user_stats aus ON u.id = aus.user_id
```

### [VIEW] Daily nominations by user's limit

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

### [VIEW] User's personal stats

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

### [VIEW] User's nominations

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
JOIN app_user un ON an.user_id = u.id
LEFT JOIN app_leaderboard lb ON u.id = lb.user_id;
```

### [VIEW] User's nominations streak

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

### [VIEW] app leaderboard current

```sql
CREATE OR REPLACE VIEW app_leaderboard_current AS
SELECT
    un.id AS user_id,
    un.wallet_address AS wallet_address,
    un.username AS username,
    lb.day_id AS day_id,
    lb.rank AS user_rank,
    aus.boss_score AS user_boss_points
FROM app_leaderboard lb
JOIN app_user un ON lb.user_id = un.id
LEFT JOIN app_user_stats aus ON un.id = aus.user_id
WHERE lb.day_id = (SELECT MAX(day_id) FROM app_leaderboard);
```

### [VIEW] app leaderboard v1

```sql
CREATE OR REPLACE VIEW app_leaderboard_v1 AS
SELECT u.wallet_address, u.social_profiles, u.username, us.builder_score
    FROM app_user u JOIN app_user_stats us ON u.id = us.user_id ORDER BY us.builder_score DESC
```

### [FUNCTION] Update nominations

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

### [FUNCTION] Update user stats

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

### [FUNCTION] Update boss score

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

### [FUNCTION] Update boss_budget

```sql
CREATE OR REPLACE FUNCTION update_user_boss_budget()
RETURNS VOID AS $$
BEGIN
    UPDATE app_user_stats AS aus
    SET
        boss_budget = aus.builder_score * 20 + (aus.builder_score + aus.boss_token_balance) * 0.2 + aus.nomination_streak * 10 + aus.boss_token_balance * 0.01
    -- to prevent pg-safeupdate error
    WHERE TRUE;
END;
$$ LANGUAGE plpgsql;
```

### [FUNCTION] Update leaderboard

```sql
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS VOID AS $$
BEGIN
    WITH user_scores AS (SELECT user_id, nominated AS score FROM app_user_stats)
    INSERT INTO app_leaderboard (user_id, rank, day_id)
    SELECT user_id, rank, (extract(epoch from current_timestamp)::integer / 86400) - 1
    FROM (
        SELECT
            user_id,
            ROW_NUMBER() OVER (ORDER BY score DESC) AS rank
        FROM user_scores
    ) AS subquery
    ON CONFLICT (user_id) DO UPDATE
    SET rank = excluded.rank;
END;
$$ LANGUAGE plpgsql;
```
