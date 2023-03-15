export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
      }
      Building: {
        Row: {
          area: string
          city: string
          createdAt: string
          id: string
          name: string
          type: Database["public"]["Enums"]["BuildingType"]
          updatedAt: string
        }
        Insert: {
          area: string
          city: string
          createdAt?: string
          id: string
          name: string
          type: Database["public"]["Enums"]["BuildingType"]
          updatedAt?: string
        }
        Update: {
          area?: string
          city?: string
          createdAt?: string
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["BuildingType"]
          updatedAt?: string
        }
      }
      Channel: {
        Row: {
          createdAt: string
          id: string
          message: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id: string
          message?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          message?: string | null
          updatedAt?: string
        }
      }
      Comment: {
        Row: {
          body: string
          createdAt: string
          id: string
          postId: string
          updatedAt: string
          userId: string
        }
        Insert: {
          body: string
          createdAt?: string
          id: string
          postId: string
          updatedAt?: string
          userId: string
        }
        Update: {
          body?: string
          createdAt?: string
          id?: string
          postId?: string
          updatedAt?: string
          userId?: string
        }
      }
      Like: {
        Row: {
          createdAt: string
          id: string
          postId: string
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id: string
          postId: string
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          postId?: string
          updatedAt?: string
          userId?: string
        }
      }
      Member: {
        Row: {
          channelId: string
          checkedAt: string | null
          createdAt: string
          id: string
          updatedAt: string
          userId: string
        }
        Insert: {
          channelId: string
          checkedAt?: string | null
          createdAt?: string
          id: string
          updatedAt?: string
          userId: string
        }
        Update: {
          channelId?: string
          checkedAt?: string | null
          createdAt?: string
          id?: string
          updatedAt?: string
          userId?: string
        }
      }
      Message: {
        Row: {
          body: string
          channelId: string
          createdAt: string
          id: string
          meta: Json
          updatedAt: string
          userId: string
        }
        Insert: {
          body: string
          channelId: string
          createdAt?: string
          id: string
          meta?: Json
          updatedAt?: string
          userId: string
        }
        Update: {
          body?: string
          channelId?: string
          createdAt?: string
          id?: string
          meta?: Json
          updatedAt?: string
          userId?: string
        }
      }
      Notification: {
        Row: {
          actor: string
          buildingId: string
          createdAt: string
          id: string
          readAt: string | null
          target: string
          type: string
          updatedAt: string
          userId: string
        }
        Insert: {
          actor: string
          buildingId: string
          createdAt?: string
          id: string
          readAt?: string | null
          target: string
          type: string
          updatedAt?: string
          userId: string
        }
        Update: {
          actor?: string
          buildingId?: string
          createdAt?: string
          id?: string
          readAt?: string | null
          target?: string
          type?: string
          updatedAt?: string
          userId?: string
        }
      }
      Post: {
        Row: {
          body: string
          buildingId: string
          createdAt: string
          id: string
          meta: Json
          type: Database["public"]["Enums"]["PostType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          body: string
          buildingId: string
          createdAt?: string
          id: string
          meta?: Json
          type: Database["public"]["Enums"]["PostType"]
          updatedAt?: string
          userId: string
        }
        Update: {
          body?: string
          buildingId?: string
          createdAt?: string
          id?: string
          meta?: Json
          type?: Database["public"]["Enums"]["PostType"]
          updatedAt?: string
          userId?: string
        }
      }
      Resident: {
        Row: {
          apartment: string | null
          buildingId: string
          createdAt: string
          floor: string | null
          id: string
          role: Database["public"]["Enums"]["ResidentRole"]
          updatedAt: string
          userId: string
        }
        Insert: {
          apartment?: string | null
          buildingId: string
          createdAt?: string
          floor?: string | null
          id: string
          role?: Database["public"]["Enums"]["ResidentRole"]
          updatedAt?: string
          userId: string
        }
        Update: {
          apartment?: string | null
          buildingId?: string
          createdAt?: string
          floor?: string | null
          id?: string
          role?: Database["public"]["Enums"]["ResidentRole"]
          updatedAt?: string
          userId?: string
        }
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
          image: string | null
          meta: Json
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
          image?: string | null
          meta?: Json
          name: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
          image?: string | null
          meta?: Json
          name?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      channels: {
        Row: {
          id: string | null
          members: Json | null
          message: string | null
          updatedAt: string | null
        }
      }
      messages: {
        Row: {
          body: string | null
          channelId: string | null
          createdAt: string | null
          id: string | null
          meta: Json | null
          user: Json | null
        }
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      BuildingType: "apartment" | "community"
      PostType: "ad" | "post" | "item" | "event"
      ResidentRole: "resident"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
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

