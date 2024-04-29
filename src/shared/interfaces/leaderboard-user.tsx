export interface LeaderboardUser {
    id: number;
    name: string;
    wallet: string;
    boss_score: number;
    builder_score: number;
    nominations: number;
    rank: number;
    highlight: boolean;
}
