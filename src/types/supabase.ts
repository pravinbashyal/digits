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
          active_session_id: number | null
          created_at: string
          game_id: string
          id: number
          user_1_session: number | null
          user_2_session: number | null
        }
        Insert: {
          active_session_id?: number | null
          created_at?: string
          game_id?: string
          id?: number
          user_1_session?: number | null
          user_2_session?: number | null
        }
        Update: {
          active_session_id?: number | null
          created_at?: string
          game_id?: string
          id?: number
          user_1_session?: number | null
          user_2_session?: number | null
        }
      }
      history: {
        Row: {
          correct_digit_count: number
          correct_position_count: number
          created_at: string | null
          id: number
          number: string | null
          session_id: number
        }
        Insert: {
          correct_digit_count: number
          correct_position_count: number
          created_at?: string | null
          id?: number
          number?: string | null
          session_id: number
        }
        Update: {
          correct_digit_count?: number
          correct_position_count?: number
          created_at?: string | null
          id?: number
          number?: string | null
          session_id?: number
        }
      }
      user_session: {
        Row: {
          created_at: string | null
          id: number
          is_active: boolean
          the_number: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          the_number?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          is_active?: boolean
          the_number?: string
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
