export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          credits: number | null
          full_name: string | null
          id: string
          subscribed: boolean | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          credits?: number | null
          full_name?: string | null
          id: string
          subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          credits?: number | null
          full_name?: string | null
          id?: string
          subscribed?: boolean | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      texts: {
        Row: {
          city: string
          content: string | null
          county: string | null
          created_at: string
          house_number: string
          id: number
          lat: number
          lng: number
          name: string | null
          pois: Json | null
          postal_code: string
          state: string | null
          street: string
          user: string
          uuid: string
        }
        Insert: {
          city: string
          content?: string | null
          county?: string | null
          created_at?: string
          house_number: string
          id?: number
          lat: number
          lng: number
          name?: string | null
          pois?: Json | null
          postal_code: string
          state?: string | null
          street: string
          user: string
          uuid?: string
        }
        Update: {
          city?: string
          content?: string | null
          county?: string | null
          created_at?: string
          house_number?: string
          id?: number
          lat?: number
          lng?: number
          name?: string | null
          pois?: Json | null
          postal_code?: string
          state?: string | null
          street?: string
          user?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "texts_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
