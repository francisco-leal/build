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
        );
END;
$$ LANGUAGE plpgsql;
```

### [FUNCTION] Update leaderboard

```sql
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS VOID AS $$
BEGIN
    WITH user_scores AS (
        SELECT
            user_id,
            (SELECT COALESCE(SUM(nominations), 0) FROM app_user_stats WHERE user_id = aus.user_id) +
            (SELECT COALESCE(SUM(nominated), 0) FROM app_user_stats WHERE user_id = aus.user_id) AS score
        FROM (
            SELECT DISTINCT user_id FROM app_user_stats
        ) AS aus
    )
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
