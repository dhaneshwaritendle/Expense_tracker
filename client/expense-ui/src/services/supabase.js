import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Get the Supabase URL and Anon Key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// It's important to throw an error if these are missing.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key are required.");
}

// Create and export the Supabase client
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);