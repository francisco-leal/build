## DATABASE STRUCTURE FOR NON-SUPABASE CREATED DETAILS

<details>
<summary><b>[UNIQUENESS CONSTRAINTS]</b></summary>

```SQL
CREATE UNIQUE INDEX idx_unique_user_wallet_nominations ON boss_nominations (origin_user_id, destination_wallet_id);
```

</details>

<details>
<summary><b>[INDEXES]</b></summary>

```SQL
CREATE INDEX idx_wallet_origin ON boss_nominations (destination_wallet_id);
CREATE INDEX idx_wallet_destination ON boss_nominations (origin_user_id);
CREATE INDEX idx_rank ON boss_leaderboard (rank);
```

</details>

<details>
<summary><b>[FUNCTION] Update leaderboard</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_leaderboard()
RETURNS VOID AS $$
BEGIN
    WITH user_scores AS (
        SELECT u.id as user_id,
               u.boss_score,
               u.passport_builder_score,
               u.username,
               COALESCE(COUNT(bn.id), 0) AS nominations_received
        FROM users u
        LEFT JOIN wallets w ON w.user_id = u.id
        LEFT JOIN boss_nominations bn ON w.wallet = bn.destination_wallet_id
        GROUP BY u.id
    )
    INSERT INTO boss_leaderboard (user_id, rank, boss_score, passport_builder_score, username, nominations_received)
    SELECT user_id, rank, boss_score, passport_builder_score, username, nominations_received
    FROM (
        SELECT
            user_id, boss_score, passport_builder_score, username, nominations_received,
            ROW_NUMBER() OVER (ORDER BY boss_score DESC) AS rank
        FROM user_scores
    ) AS subquery
    ON CONFLICT (user_id) DO UPDATE
    SET
        rank = excluded.rank,
        boss_score = excluded.boss_score,
        passport_builder_score = excluded.passport_builder_score,
        username = excluded.username,
        nominations_received = excluded.nominations_received;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Update user points</b></summary>

```sql
CREATE OR REPLACE FUNCTION update_boss_score_for_user(user_to_update uuid) RETURNS VOID AS $$
BEGIN
    -- Reset boss_score to zero
    UPDATE users
    SET boss_score = 0
    WHERE id = user_to_update;

    -- Update boss_score based on points_given
    UPDATE users
    SET boss_score = boss_score + (
        SELECT COALESCE(SUM(boss_points_received), 0)
        FROM boss_nominations
        WHERE boss_nominations.origin_user_id = user_to_update
    )
    WHERE id = user_to_update;

    -- Update boss_score based on points_earned
    UPDATE users
    SET boss_score = boss_score + (
        SELECT COALESCE(SUM(boss_points_sent), 0)
        FROM boss_nominations
        INNER JOIN wallets on boss_nominations.destination_wallet_id = wallets.wallet
        WHERE wallets.user_id = user_to_update
    )
    WHERE id = user_to_update;
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
    SET boss_nomination_streak = 0
    WHERE id NOT IN (
        SELECT DISTINCT origin_user_id
        FROM boss_nominations
        WHERE DATE(created_at) >= last_nomination_date
    );
END;
$$ LANGUAGE plpgsql;
```

</details>
<details>
<summary><b>[FUNCTION] Update daily streak for users</b></summary>

```sql
CREATE OR REPLACE FUNCTION increment_nomination_streak()
RETURNS VOID AS $$
BEGIN
    UPDATE users
    SET boss_nomination_streak = boss_nomination_streak + 1
    WHERE id IN (
        SELECT DISTINCT origin_user_id
        FROM boss_nominations
        WHERE boss_nominations.created_at::date = CURRENT_DATE
    );
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Calculate boss budget for all users -> not the live function</b></summary>

```sql
CREATE OR REPLACE FUNCTION calculate_boss_budget() RETURNS VOID AS $$
BEGIN
    -- Update boss_budget for all users based on existing data
    UPDATE users
    SET boss_budget =
        CASE
            WHEN passport_builder_score = 0 THEN
                CASE
                    WHEN farcaster_id IS null THEN
                        0
                    WHEN farcaster_id < 0 THEN
                        0
                    WHEN farcaster_id > 20000 THEN
                        500
                    ELSE
                        1000
                END
            ELSE
                (passport_builder_score * 20) *
                (CASE WHEN manifesto_nft_token_id > 0 THEN 1.2 ELSE 1 END)
        END;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Calculate boss budget for a single user</b></summary>

```sql
CREATE OR REPLACE FUNCTION calculate_boss_budget_user(user_to_update uuid) RETURNS VOID AS $$
BEGIN
    UPDATE users
    SET boss_budget =
        CASE
            WHEN passport_builder_score = 0 THEN
                CASE
                    WHEN farcaster_id > 20000 THEN
                        500
                    ELSE
                        1000
                END
            ELSE
                (passport_builder_score * 20) *
                (CASE WHEN manifesto_nft_token_id > 0 THEN 1.2 ELSE 1 END)
        END
    WHERE id = user_to_update;
END;
$$ LANGUAGE plpgsql;
```

</details>
