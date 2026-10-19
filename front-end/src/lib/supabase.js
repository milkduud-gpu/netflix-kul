import { createClient } from '@supabase/supabase-js'

// No auth in this app yet, so never persist or refresh a session.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } },
)
