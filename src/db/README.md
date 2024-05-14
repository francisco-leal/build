## DATABASE STRUCTURE FOR NON-SUPABASE CREATED DETAILS

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
            ROW_NUMBER() OVER (ORDER BY boss_score DESC) AS rank
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
    SET boss_nomination_streak = 0
    WHERE wallet NOT IN (
        SELECT DISTINCT wallet_origin
        FROM boss_nominations
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
            WHEN passport_builder_score = 0 THEN
                CASE
                    WHEN farcaster_id > 20000 THEN
                        500
                    ELSE
                        1000
                END
            ELSE
                (passport_builder_score * 20 + boss_token_balance * 0.001) *
                (CASE WHEN manifesto_nft_token_id > 0 THEN 1.2 ELSE 1 END)
        END;
END;
$$ LANGUAGE plpgsql;
```

</details>

<details>
<summary><b>[FUNCTION] Calculate boss budget for a single user</b></summary>

```sql
CREATE OR REPLACE FUNCTION calculate_boss_budget_for_user(id_to_update uuid) RETURNS VOID AS $$
BEGIN
    -- Update boss_budget for all users based on existing data
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
                (passport_builder_score * 20 + boss_token_balance * 0.001) *
                (CASE WHEN manifesto_nft_token_id > 0 THEN 1.2 ELSE 1 END)
        END
    WHERE id = id_to_update;
END;
$$ LANGUAGE plpgsql;
```

</details>
