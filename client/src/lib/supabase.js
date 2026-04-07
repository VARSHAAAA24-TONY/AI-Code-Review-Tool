import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Forensic Toggle: Use a mock client if no real keys are provided
const isMockMode = !supabaseUrl || supabaseUrl.includes('placeholder');

export const supabase = isMockMode ? {
  auth: {
    getSession: async () => ({ data: { session: { user: { id: 'guest-node-01', email: 'guest@forensic.core' } } }, error: null }),
    getUser: async () => ({ data: { user: { id: 'guest-node-01', email: 'guest@forensic.core' } }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: async () => ({ error: null }),
    signOut: async () => ({ 
      error: null 
    }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null }),
          then: (cb) => cb({ data: [], error: null })
        }),
        then: (cb) => cb({ data: [], error: null })
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: [], error: null }),
        then: (cb) => cb({ data: [], error: null })
      }),
      then: (cb) => cb({ data: [], error: null })
    }),
    insert: () => ({
      then: (cb) => cb({ error: null })
    }),
  })
} : createClient(supabaseUrl, supabaseAnonKey);
