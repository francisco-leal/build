export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      app_daily_nominations: {
        Row: {
          created_at: string;
          id: number;
          user_id_from: number;
          user_id_nominated: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          user_id_from: number;
          user_id_nominated: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          user_id_from?: number;
          user_id_nominated?: number;
        };
        Relationships: [
          {
            foreignKeyName: "app_daily_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_daily_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_daily_nominations_user_id_nominated_fkey";
            columns: ["user_id_nominated"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_daily_nominations_user_id_nominated_fkey";
            columns: ["user_id_nominated"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
        ];
      };
      app_leaderboard: {
        Row: {
          day_id: number;
          id: number;
          rank: number;
          user_id: number;
        };
        Insert: {
          day_id: number;
          id?: number;
          rank: number;
          user_id: number;
        };
        Update: {
          day_id?: number;
          id?: number;
          rank?: number;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "app_leaderboard_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_leaderboard_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
        ];
      };
      app_metadata_kv: {
        Row: {
          id: number;
          key: string;
          value: string;
        };
        Insert: {
          id?: number;
          key: string;
          value: string;
        };
        Update: {
          id?: number;
          key?: string;
          value?: string;
        };
        Relationships: [];
      };
      app_nominations: {
        Row: {
          day_id: number;
          id: number;
          user_id_from: number;
          user_id_nominated: number;
        };
        Insert: {
          day_id: number;
          id?: number;
          user_id_from: number;
          user_id_nominated: number;
        };
        Update: {
          day_id?: number;
          id?: number;
          user_id_from?: number;
          user_id_nominated?: number;
        };
        Relationships: [
          {
            foreignKeyName: "app_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_nominations_user_id_nominated_fkey";
            columns: ["user_id_nominated"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_nominations_user_id_nominated_fkey";
            columns: ["user_id_nominated"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
        ];
      };
      app_user: {
        Row: {
          created_at: string;
          id: number;
          manifesto_nft: boolean;
          max_nominations: number;
          referral_code: string | null;
          social_profiles: Json | null;
          username: string | null;
          wallet_address: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          manifesto_nft?: boolean;
          max_nominations?: number;
          referral_code?: string | null;
          social_profiles?: Json | null;
          username?: string | null;
          wallet_address?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          manifesto_nft?: boolean;
          max_nominations?: number;
          referral_code?: string | null;
          social_profiles?: Json | null;
          username?: string | null;
          wallet_address?: string | null;
        };
        Relationships: [];
      };
      app_user_stats: {
        Row: {
          boss_budget: number;
          boss_score: number;
          boss_token_balance: number;
          bpe_first_nominator: number;
          bpe_nominations: number;
          bpe_regular_nominator: number;
          builder_score: number;
          id: number;
          nominated: number;
          nomination_streak: number;
          nominations: number;
          nominations_unique: number;
          user_id: number | null;
        };
        Insert: {
          boss_budget?: number;
          boss_score?: number;
          boss_token_balance?: number;
          bpe_first_nominator?: number;
          bpe_nominations?: number;
          bpe_regular_nominator?: number;
          builder_score?: number;
          id?: number;
          nominated?: number;
          nomination_streak?: number;
          nominations?: number;
          nominations_unique?: number;
          user_id?: number | null;
        };
        Update: {
          boss_budget?: number;
          boss_score?: number;
          boss_token_balance?: number;
          bpe_first_nominator?: number;
          bpe_nominations?: number;
          bpe_regular_nominator?: number;
          builder_score?: number;
          id?: number;
          nominated?: number;
          nomination_streak?: number;
          nominations?: number;
          nominations_unique?: number;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
        ];
      };
      boss_leaderboard: {
        Row: {
          boss_nominations_received: number;
          boss_score: number;
          created_at: string;
          passport_builder_score: number;
          rank: number | null;
          username: string | null;
          wallet: string;
        };
        Insert: {
          boss_nominations_received: number;
          boss_score: number;
          created_at?: string;
          passport_builder_score: number;
          rank?: number | null;
          username?: string | null;
          wallet: string;
        };
        Update: {
          boss_nominations_received?: number;
          boss_score?: number;
          created_at?: string;
          passport_builder_score?: number;
          rank?: number | null;
          username?: string | null;
          wallet?: string;
        };
        Relationships: [];
      };
      boss_nominations: {
        Row: {
          boss_points_earned: number;
          boss_points_given: number;
          created_at: string;
          id: number;
          wallet_destination: string;
          wallet_origin: string;
        };
        Insert: {
          boss_points_earned: number;
          boss_points_given: number;
          created_at?: string;
          id?: number;
          wallet_destination: string;
          wallet_origin: string;
        };
        Update: {
          boss_points_earned?: number;
          boss_points_given?: number;
          created_at?: string;
          id?: number;
          wallet_destination?: string;
          wallet_origin?: string;
        };
        Relationships: [];
      };
      scheduled_updates: {
        Row: {
          finished_at: string | null;
          id: number;
          job_type: string;
          started_at: string;
        };
        Insert: {
          finished_at?: string | null;
          id?: number;
          job_type: string;
          started_at?: string;
        };
        Update: {
          finished_at?: string | null;
          id?: number;
          job_type?: string;
          started_at?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          boss_budget: number;
          boss_nomination_streak: number;
          boss_score: number;
          boss_token_balance: number;
          created_at: string;
          manifesto_nft: boolean;
          passport_builder_score: number;
          referral_code: string;
          username: string | null;
          wallet: string;
        };
        Insert: {
          boss_budget?: number;
          boss_nomination_streak?: number;
          boss_score?: number;
          boss_token_balance?: number;
          created_at?: string;
          manifesto_nft?: boolean;
          passport_builder_score?: number;
          referral_code: string;
          username?: string | null;
          wallet: string;
        };
        Update: {
          boss_budget?: number;
          boss_nomination_streak?: number;
          boss_score?: number;
          boss_token_balance?: number;
          created_at?: string;
          manifesto_nft?: boolean;
          passport_builder_score?: number;
          referral_code?: string;
          username?: string | null;
          wallet?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      app_leaderboard_current: {
        Row: {
          boss_points: number | null;
          builder_score: number | null;
          nominations: number | null;
          rank: number | null;
          user_id: number | null;
          username: string | null;
          wallet_address: string | null;
        };
        Relationships: [];
      };
      app_leaderboard_v1: {
        Row: {
          builder_score: number | null;
          social_profiles: Json | null;
          username: string | null;
          wallet_address: string | null;
        };
        Relationships: [];
      };
      app_user_and_stats: {
        Row: {
          boss_budget: number | null;
          boss_score: number | null;
          boss_token_balance: number | null;
          bpe_first_nominator: number | null;
          bpe_nominations: number | null;
          bpe_regular_nominator: number | null;
          builder_score: number | null;
          created_at: string | null;
          id: number | null;
          max_nominations: number | null;
          nominated: number | null;
          nomination_streak: number | null;
          nominations: number | null;
          nominations_unique: number | null;
          referral_code: string | null;
          social_profiles: Json | null;
          user_id: number | null;
          username: string | null;
          wallet_address: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
        ];
      };
      daily_nominations_view: {
        Row: {
          created_at: string | null;
          max_nominations: number | null;
          nomination_rank: number | null;
          user_id_from: number | null;
          user_id_nominated: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_daily_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_daily_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_daily_nominations_user_id_nominated_fkey";
            columns: ["user_id_nominated"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_daily_nominations_user_id_nominated_fkey";
            columns: ["user_id_nominated"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
        ];
      };
      user_nomination_streak: {
        Row: {
          last_nomination_day: number | null;
          streak: number | null;
          user_id_from: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_nominations_user_id_from_fkey";
            columns: ["user_id_from"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
        ];
      };
      user_nominations: {
        Row: {
          nominated_user_boss_points: number | null;
          nominated_user_id: number | null;
          nominated_user_rank: number | null;
          nominated_username: string | null;
          nomination_date: number | null;
          user_id: number | null;
          wallet_address: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_nominations_user_id_nominated_fkey";
            columns: ["nominated_user_id"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_nominations_user_id_nominated_fkey";
            columns: ["nominated_user_id"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
        ];
      };
      user_personal_stats: {
        Row: {
          boss_budget: number | null;
          boss_points: number | null;
          boss_points_from_nominating: number | null;
          boss_points_from_nominations: number | null;
          rank: number | null;
          total_boss_points_earned: number | null;
          total_nominations_received: number | null;
          user_id: number | null;
          username: string | null;
          wallet_address: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_user";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "app_user_stats_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "app_leaderboard_current";
            referencedColumns: ["user_id"];
          },
        ];
      };
    };
    Functions: {
      insert_user: {
        Args: {
          wallet_address: string;
          referral_code: string;
          boss_score: number;
          boss_budget: number;
          builder_score: number;
          social_profiles: Json;
          username: string;
        };
        Returns: {
          boss_budget: number | null;
          boss_score: number | null;
          boss_token_balance: number | null;
          bpe_first_nominator: number | null;
          bpe_nominations: number | null;
          bpe_regular_nominator: number | null;
          builder_score: number | null;
          created_at: string | null;
          id: number | null;
          max_nominations: number | null;
          nominated: number | null;
          nomination_streak: number | null;
          nominations: number | null;
          nominations_unique: number | null;
          referral_code: string | null;
          social_profiles: Json | null;
          user_id: number | null;
          username: string | null;
          wallet_address: string | null;
        }[];
      };
      insert_user_v2: {
        Args: {
          wallet_address: string;
          referral_code: string;
          boss_score: number;
          boss_budget: number;
          builder_score: number;
          social_profiles: Json;
          username: string;
          manifesto_nft: boolean;
        };
        Returns: {
          boss_budget: number | null;
          boss_score: number | null;
          boss_token_balance: number | null;
          bpe_first_nominator: number | null;
          bpe_nominations: number | null;
          bpe_regular_nominator: number | null;
          builder_score: number | null;
          created_at: string | null;
          id: number | null;
          max_nominations: number | null;
          nominated: number | null;
          nomination_streak: number | null;
          nominations: number | null;
          nominations_unique: number | null;
          referral_code: string | null;
          social_profiles: Json | null;
          user_id: number | null;
          username: string | null;
          wallet_address: string | null;
        }[];
      };
      update_boss_balances: {
        Args: {
          wallet_balances: Json;
        };
        Returns: undefined;
      };
      update_leaderboard: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_nominations: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_user_boss_budget: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_user_boss_score: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_user_stats: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
