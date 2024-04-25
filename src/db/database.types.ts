export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_daily_nominations: {
        Row: {
          created_at: string
          id: number
          user_id_from: number
          user_id_nominated: number
        }
        Insert: {
          created_at?: string
          id?: number
          user_id_from: number
          user_id_nominated: number
        }
        Update: {
          created_at?: string
          id?: number
          user_id_from?: number
          user_id_nominated?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_app_daily_nominations_user_id_from_fkey"
            columns: ["user_id_from"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_app_daily_nominations_user_id_nominated_fkey"
            columns: ["user_id_nominated"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      app_leaderboard: {
        Row: {
          day_id: number
          id: number
          rank: number
          user_id: number
        }
        Insert: {
          day_id: number
          id?: number
          rank: number
          user_id: number
        }
        Update: {
          day_id?: number
          id?: number
          rank?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_app_leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      app_nominations: {
        Row: {
          day_id: number
          id: number
          user_id_from: number
          user_id_nominated: number
        }
        Insert: {
          day_id: number
          id?: number
          user_id_from: number
          user_id_nominated: number
        }
        Update: {
          day_id?: number
          id?: number
          user_id_from?: number
          user_id_nominated?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_app_nominations_user_id_from_fkey"
            columns: ["user_id_from"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_app_nominations_user_id_nominated_fkey"
            columns: ["user_id_nominated"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      app_user: {
        Row: {
          created_at: string
          id: number
          max_nominations: number
          referral_code: string | null
          social_profiles: Json | null
          username: string | null
          wallet_address: string
        }
        Insert: {
          created_at?: string
          id?: number
          max_nominations?: number
          referral_code?: string | null
          social_profiles?: Json | null
          username?: string | null
          wallet_address: string
        }
        Update: {
          created_at?: string
          id?: number
          max_nominations?: number
          referral_code?: string | null
          social_profiles?: Json | null
          username?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      app_user_stats: {
        Row: {
          boss_budget: number
          boss_score: number
          boss_token_balance: number
          bpe_first_nominator: number
          bpe_nominations: number
          bpe_regular_nominator: number
          builder_score: number
          id: number
          nominated: number
          nomination_streak: number
          nominations: number
          nominations_unique: number
          user_id: number
        }
        Insert: {
          boss_budget: number
          boss_score?: number
          boss_token_balance?: number
          bpe_first_nominator?: number
          bpe_nominations?: number
          bpe_regular_nominator?: number
          builder_score?: number
          id?: number
          nominated?: number
          nomination_streak?: number
          nominations?: number
          nominations_unique?: number
          user_id: number
        }
        Update: {
          boss_budget?: number
          boss_score?: number
          boss_token_balance?: number
          bpe_first_nominator?: number
          bpe_nominations?: number
          bpe_regular_nominator?: number
          builder_score?: number
          id?: number
          nominated?: number
          nomination_streak?: number
          nominations?: number
          nominations_unique?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_app_user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      app_leaderboard_current: {
        Row: {
          day_id: number | null
          id: number | null
          rank: number | null
          user_id: number | null
        }
        Insert: {
          day_id?: number | null
          id?: number | null
          rank?: number | null
          user_id?: number | null
        }
        Update: {
          day_id?: number | null
          id?: number | null
          rank?: number | null
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_app_leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      app_leaderboard_v1: {
        Row: {
          builder_score: number | null
          social_profiles: Json | null
          username: string | null
          wallet_address: string | null
        }
        Relationships: []
      }
      daily_nominations_view: {
        Row: {
          created_at: string | null
          max_nominations: number | null
          nomination_rank: number | null
          user_id_from: number | null
          user_id_nominated: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_app_daily_nominations_user_id_from_fkey"
            columns: ["user_id_from"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_app_daily_nominations_user_id_nominated_fkey"
            columns: ["user_id_nominated"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_nomination_streak: {
        Row: {
          last_nomination_day: number | null
          streak: number | null
          user_id_from: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_app_nominations_user_id_from_fkey"
            columns: ["user_id_from"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_nominations: {
        Row: {
          nominated_user_boss_points: number | null
          nominated_user_id: number | null
          nominated_user_rank: number | null
          nominated_username: string | null
          nominated_wallet_address: string | null
          nomination_date: number | null
          nominator_user_id: number | null
          nominator_wallet_address: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_app_nominations_user_id_nominated_fkey"
            columns: ["nominated_user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_app_user_stats_user_id_fkey"
            columns: ["nominator_user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
      user_personal_stats: {
        Row: {
          boss_points: number | null
          boss_points_from_nominating: number | null
          boss_points_from_nominations: number | null
          my_boss_budget: number | null
          my_rank: number | null
          total_boss_points_earned: number | null
          total_nominations_received: number | null
          user_id: number | null
          wallet_address: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_app_user_stats_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "app_user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      insert_user: {
        Args: {
          wallet_address: string
          referral_code: string
          boss_score: number
          boss_budget: number
        }
        Returns: {
          created_at: string
          id: number
          max_nominations: number
          referral_code: string | null
          social_profiles: Json | null
          username: string | null
          wallet_address: string
        }[]
      }
      update_leaderboard: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_nominations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_boss_budget: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_boss_score: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

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
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

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
    : never
