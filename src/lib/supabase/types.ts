export type AppRole = "user" | "moderator" | "admin";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          home_city: string | null;
          travel_style: string | null;
          budget_preference: string | null;
          social_vibe: string | null;
          interests: string[];
          onboarding_completed: boolean;
          profile_completion_percent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          home_city?: string | null;
          travel_style?: string | null;
          budget_preference?: string | null;
          social_vibe?: string | null;
          interests?: string[];
          onboarding_completed?: boolean;
          profile_completion_percent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          home_city?: string | null;
          travel_style?: string | null;
          budget_preference?: string | null;
          social_vibe?: string | null;
          interests?: string[];
          onboarding_completed?: boolean;
          profile_completion_percent?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_private: {
        Row: {
          user_id: string;
          date_of_birth: string | null;
          is_18_plus_confirmed: boolean;
          phone_number: string | null;
          verification_level: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          date_of_birth?: string | null;
          is_18_plus_confirmed?: boolean;
          phone_number?: string | null;
          verification_level?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          date_of_birth?: string | null;
          is_18_plus_confirmed?: boolean;
          phone_number?: string | null;
          verification_level?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          user_id: string;
          role: AppRole;
          created_at: string;
        };
        Insert: {
          user_id: string;
          role?: AppRole;
          created_at?: string;
        };
        Update: {
          role?: AppRole;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
