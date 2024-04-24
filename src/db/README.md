### [CONSTRAINT] Unique nominations

```sql
ALTER TABLE app_nominations
ADD CONSTRAINT unique_nomination_entry UNIQUE (user_id_from, user_id_nominated);
```

### [FUNCTION] Insert new user

```sql
CREATE OR REPLACE FUNCTION insert_user(
  wallet_address varchar,
  referral_code varchar,
  boss_score int,
  boss_budget int
)
RETURNS setof app_user
AS $$
  declare
  user_id int;
begin
  INSERT into app_user
    (wallet_address, referral_code)
    values (wallet_address, referral_code)
    returning id
    into user_id;
  INSERT into app_user_stats
    (user_id, boss_score, boss_budget)
     values (user_id, boss_score, boss_budget);
RETURN query select * from app_user where id = user_id;
END $$ language plpgsql;
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
    lb.rank AS my_rank,
    aus.nominations AS total_nominations_received,
    aus.boss_budget AS my_boss_budget,
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

### [FUNCTION] Update nominations

```sql
CREATE OR REPLACE FUNCTION update_nominations()
RETURNS VOID AS $$
BEGIN
    INSERT INTO app_nominations (user_id_from, user_id_nominated, day_id)
    SELECT user_id_from, user_id_nominated, extract(epoch from created_at)::integer / 86400
    FROM daily_nominations_view;
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
        nomination_streak = (
            SELECT COUNT(DISTINCT an1.day_id)
            FROM app_nominations AS an1
            WHERE an1.user_id_from = aus.user_id
            AND an1.day_id >= (SELECT MAX(day_id) FROM app_nominations WHERE user_id_from = aus.user_id) - (aus.nomination_streak * 86400)
            AND an1.day_id <= (SELECT MAX(day_id) FROM app_nominations WHERE user_id_from = aus.user_id)
        ),
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
END;
$$ LANGUAGE plpgsql;
```

### [FUNCTION] Update boss score

```sql
CREATE OR REPLACE FUNCTION update_user_boss_score()
RETURNS VOID AS $$
BEGIN
    -- Update nominated users' boss_score (90% of boss_budget) and calculate bpe_nominations
    UPDATE app_user_stats AS aus
    SET
        boss_score = boss_score + (0.9 * nominated_budget),
        bpe_nominations = bpe_nominations + COALESCE((0.9 * nominated_budget), 0)
    FROM (
        SELECT user_id_nominated, SUM(boss_budget) AS nominated_budget
        FROM app_daily_nominations
        JOIN app_user_stats ON app_daily_nominations.user_id_nominated = app_user_stats.user_id
        GROUP BY user_id_nominated
    ) AS uin
    WHERE aus.user_id = uin.user_id_nominated;

    -- Update nominating users' boss_score (10% of boss_budget) and calculate bpe_regular_nominator
    UPDATE app_user_stats AS aus
    SET
        boss_score = boss_score + (0.1 * nominated_budget),
        bpe_regular_nominator = bpe_regular_nominator + COALESCE((0.1 * nominated_budget), 0)
    FROM (
        SELECT user_id_nominated, SUM(boss_budget) AS nominated_budget
        FROM app_daily_nominations
        JOIN app_user_stats ON app_daily_nominations.user_id_nominated = app_user_stats.user_id
        GROUP BY user_id_nominated
    ) AS uin, app_daily_nominations
    WHERE aus.user_id = app_daily_nominations.user_id_from;
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
    INSERT INTO app_leaderboard (user_id, rank)
    SELECT user_id, rank
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