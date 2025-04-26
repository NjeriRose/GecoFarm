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
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: Json
          profile_photo: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          email: string
          role: Json
          profile_photo?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: Json
          profile_photo?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          status: string
          assigned_to: string
          created_by: string
          due_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          status: string
          assigned_to: string
          created_by: string
          due_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          status?: string
          assigned_to?: string
          created_by?: string
          due_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          stock: number
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          stock: number
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          stock?: number
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      financial_transactions: {
        Row: {
          id: string
          amount: number
          type: string
          description: string
          category: string
          date: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          amount: number
          type: string
          description: string
          category: string
          date: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          amount?: number
          type?: string
          description?: string
          category?: string
          date?: string
          created_by?: string
          created_at?: string
          updated_at?: string
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
  }
} 