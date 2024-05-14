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
        Relationships: [
          {
            foreignKeyName: "boss_leaderboard_wallet_fkey";
            columns: ["wallet"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["wallet"];
          },
        ];
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
        Relationships: [
          {
            foreignKeyName: "boss_nominations_wallet_destination_fkey";
            columns: ["wallet_destination"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["wallet"];
          },
          {
            foreignKeyName: "boss_nominations_wallet_origin_fkey";
            columns: ["wallet_origin"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["wallet"];
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
          boss_token_balance: number;
          created_at: string;
          farcaster_id: number | null;
          manifesto_nft: boolean;
          passport_builder_score: number;
          passport_id: number | null;
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
          farcaster_id?: number | null;
          manifesto_nft?: boolean;
          passport_builder_score?: number;
          passport_id?: number | null;
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
          farcaster_id?: number | null;
          manifesto_nft?: boolean;
          passport_builder_score?: number;
          passport_id?: number | null;
          referral_code?: string;
          username?: string | null;
          wallet?: string;
        };
        Relationships: [];
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
      calculate_boss_budget_for_user: {
        Args: {
          wallet_to_update: string;
        };
        Returns: undefined;
      };
      reset_nomination_streak: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_boss_balances: {
        Args: {
          wallet_balances: Json;
        };
        Returns: undefined;
      };
      update_boss_score: {
        Args: {
          wallet_to_update: string;
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
