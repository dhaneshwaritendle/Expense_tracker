import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

// 1. Initialize Supabase globally on the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Instantiate custom Axios configurations
const api = axios.create({
  baseURL: apiBaseUrl,
});

// 3. Set up the automated token attachment engine
api.interceptors.request.use(
  async (config) => {
    try {
      // Fetches and automatically auto-refreshes stale sessions
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Token injection failed:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
