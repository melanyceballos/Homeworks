import { createClient } from '@supabase/supabase-js';
import { isSupabaseConfigReady } from './configValidation.js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;
export const supabaseConfigured = isSupabaseConfigReady(url, key);
export const supabase = supabaseConfigured ? createClient(url, key) : null;
