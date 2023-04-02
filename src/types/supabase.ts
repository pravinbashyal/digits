export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      game: {
        Row: {
          created_at: string
          game_id: string
          id: number
          user_1_session: number | null
          user_2_session: number | null
        }
        Insert: {
          created_at?: string
          game_id?: string
          id?: number
          user_1_session?: number | null
          user_2_session?: number | null
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: number
          user_1_session?: number | null
          user_2_session?: number | null
        }
      }
      user_session: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          user_id?: string
        }
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
