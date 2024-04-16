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
          id: number
          rank: number
          user_id: number
        }
        Insert: {
          id?: number
          rank: number
          user_id: number
        }
        Update: {
          id?: number
          rank?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_app_leaderboard_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
          wallet_address: string
        }
        Insert: {
          created_at?: string
          id?: number
          max_nominations?: number
          referral_code?: string | null
          social_profiles?: Json | null
          wallet_address: string
        }
        Update: {
          created_at?: string
          id?: number
          max_nominations?: number
          referral_code?: string | null
          social_profiles?: Json | null
          wallet_address?: string
        }
        Relationships: []
      }
      app_user_stats: {
        Row: {
          boss_budget: number
          boss_score: number
          id: number
          nominated: number
          nomination_streak: number
          nominations: number
          nominations_unique: number
          user_id: number
        }
        Insert: {
          boss_budget: number
          boss_score: number
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
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
