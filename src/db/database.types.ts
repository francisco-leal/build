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
      api_keys: {
        Row: {
          access_level: string;
          active: boolean;
          app_name: string;
          created_at: string;
          id: number;
          key: string;
        };
        Insert: {
          access_level?: string;
          active?: boolean;
          app_name: string;
          created_at?: string;
          id?: number;
          key: string;
        };
        Update: {
          access_level?: string;
          active?: boolean;
          app_name?: string;
          created_at?: string;
          id?: number;
          key?: string;
        };
        Relationships: [];
      };
      boss_leaderboard: {
        Row: {
          boss_score: number;
          created_at: string;
          id: number;
          nominations_received: number;
          passport_builder_score: number;
          rank: number | null;
          user_id: string;
          username: string;
        };
        Insert: {
          boss_score?: number;
          created_at?: string;
          id?: number;
          nominations_received?: number;
          passport_builder_score?: number;
          rank?: number | null;
          user_id: string;
          username: string;
        };
        Update: {
          boss_score?: number;
          created_at?: string;
          id?: number;
          nominations_received?: number;
          passport_builder_score?: number;
          rank?: number | null;
          user_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "boss_leaderboard_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      boss_nominations: {
        Row: {
          boss_points_received: number;
          boss_points_sent: number;
          created_at: string;
          destination_wallet_id: string;
          id: number;
          origin_user_id: string;
          origin_wallet_id: string | null;
          valid: boolean;
        };
        Insert: {
          boss_points_received: number;
          boss_points_sent: number;
          created_at?: string;
          destination_wallet_id: string;
          id?: number;
          origin_user_id: string;
          origin_wallet_id?: string | null;
          valid?: boolean;
        };
        Update: {
          boss_points_received?: number;
          boss_points_sent?: number;
          created_at?: string;
          destination_wallet_id?: string;
          id?: number;
          origin_user_id?: string;
          origin_wallet_id?: string | null;
          valid?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "boss_nominations_destination_wallet_id_fkey";
            columns: ["destination_wallet_id"];
            isOneToOne: false;
            referencedRelation: "wallets";
            referencedColumns: ["wallet"];
          },
          {
            foreignKeyName: "boss_nominations_origin_user_id_fkey";
            columns: ["origin_user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      scheduled_updates: {
        Row: {
          finished_at: string | null;
          id: number;
          job_data: Json | null;
          job_type: string;
          started_at: string;
        };
        Insert: {
          finished_at?: string | null;
          id?: number;
          job_data?: Json | null;
          job_type: string;
          started_at?: string;
        };
        Update: {
          finished_at?: string | null;
          id?: number;
          job_data?: Json | null;
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
          budget_multiplier: number;
          coinvise_nft: boolean;
          created_at: string;
          eligible: boolean | null;
          farcaster_id: number | null;
          farcaster_power_user: boolean | null;
          id: string;
          last_budget_calculation: string | null;
          last_wallet: string | null;
          manifesto_nft_token_id: number | null;
          nominations_made: number | null;
          passport_builder_score: number;
          passport_id: number | null;
          username: string | null;
          valid_ens: boolean | null;
          valid_farcaster_id: boolean | null;
          valid_passport: boolean | null;
        };
        Insert: {
          boss_budget?: number;
          boss_nomination_streak?: number;
          boss_score?: number;
          budget_multiplier?: number;
          coinvise_nft?: boolean;
          created_at?: string;
          eligible?: boolean | null;
          farcaster_id?: number | null;
          farcaster_power_user?: boolean | null;
          id?: string;
          last_budget_calculation?: string | null;
          last_wallet?: string | null;
          manifesto_nft_token_id?: number | null;
          nominations_made?: number | null;
          passport_builder_score?: number;
          passport_id?: number | null;
          username?: string | null;
          valid_ens?: boolean | null;
          valid_farcaster_id?: boolean | null;
          valid_passport?: boolean | null;
        };
        Update: {
          boss_budget?: number;
          boss_nomination_streak?: number;
          boss_score?: number;
          budget_multiplier?: number;
          coinvise_nft?: boolean;
          created_at?: string;
          eligible?: boolean | null;
          farcaster_id?: number | null;
          farcaster_power_user?: boolean | null;
          id?: string;
          last_budget_calculation?: string | null;
          last_wallet?: string | null;
          manifesto_nft_token_id?: number | null;
          nominations_made?: number | null;
          passport_builder_score?: number;
          passport_id?: number | null;
          username?: string | null;
          valid_ens?: boolean | null;
          valid_farcaster_id?: boolean | null;
          valid_passport?: boolean | null;
        };
        Relationships: [];
      };
      wallets: {
        Row: {
          boss_token_balance: number;
          created_at: string;
          farcaster_id: number | null;
          image_url: string | null;
          passport_id: number | null;
          user_id: string | null;
          username: string | null;
          wallet: string;
        };
        Insert: {
          boss_token_balance?: number;
          created_at?: string;
          farcaster_id?: number | null;
          image_url?: string | null;
          passport_id?: number | null;
          user_id?: string | null;
          username?: string | null;
          wallet: string;
        };
        Update: {
          boss_token_balance?: number;
          created_at?: string;
          farcaster_id?: number | null;
          image_url?: string | null;
          passport_id?: number | null;
          user_id?: string | null;
          username?: string | null;
          wallet?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      calculate_boss_budget: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_boss_budget_temp: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      calculate_boss_budget_user: {
        Args: {
          user_to_update: string;
        };
        Returns: number;
      };
      calculate_stats_received: {
        Args: {
          wallets_to_update: string[];
          filter_date: string;
        };
        Returns: {
          nominations_received: number;
          build_points_received: number;
        }[];
      };
      calculate_stats_sent: {
        Args: {
          user_id: string;
          filter_date: string;
        };
        Returns: {
          nominations_made: number;
          build_points_sent: number;
        }[];
      };
      increment_nomination_streak: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      increment_nomination_streak_for_yesterday: {
        Args: {
          target_date: string;
        };
        Returns: undefined;
      };
      reset_nomination_streak: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_boss_budget_batch: {
        Args: {
          batch_size: number;
          offset_value: number;
        };
        Returns: undefined;
      };
      update_boss_daily_streak_for_user: {
        Args: {
          user_to_update: string;
        };
        Returns: undefined;
      };
      update_boss_score_for_user: {
        Args: {
          user_to_update: string;
        };
        Returns: undefined;
      };
      update_leaderboard: {
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
