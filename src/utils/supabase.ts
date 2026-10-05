import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    !supabaseUrl.includes('your-project') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export async function loginWithSupabase(email: string, password: string): Promise<{ session: Session | null; error: string | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      session: null,
      error: 'Supabase কনফিগারেশন অনুপস্থিত। অনুগ্রহ করে VITE_SUPABASE_URL এবং VITE_SUPABASE_ANON_KEY পরিবেশ ভেরিয়েবল সেট করুন।'
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      let banglaMessage = error.message;
      const lower = error.message.toLowerCase();
      if (lower.includes('invalid login credentials')) {
        banglaMessage = 'ভুল ইমেইল অথবা পাসওয়ার্ড প্রদান করা হয়েছে। অনুগ্রহ করে সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।';
      } else if (lower.includes('email not confirmed')) {
        banglaMessage = 'আপনার ইমেইল ভেরিফাই করা হয়নি। অনুগ্রহ করে ইনবক্স চেক করে ইমেইল কনফার্ম করুন।';
      } else if (lower.includes('too many requests') || lower.includes('rate limit')) {
        banglaMessage = 'অতিরিক্ত ভুল চেষ্টার কারণে সাময়িকভাবে ব্লক করা হয়েছে। কিছুক্ষণ পর চেষ্টা করুন।';
      }
      return { session: null, error: banglaMessage };
    }

    return { session: data.session, error: null };
  } catch (err: any) {
    return { session: null, error: err?.message || 'লগইন ব্যর্থ হয়েছে। পুনরায় চেষ্টা করুন।' };
  }
}

export async function logoutSupabase(): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { error: null };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    return { error: null };
  } catch (err: any) {
    return { error: err?.message || 'লগআউট করতে ব্যর্থ হয়েছে।' };
  }
}

export async function getSupabaseSession(): Promise<Session | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data) return null;
    return data.session;
  } catch {
    return null;
  }
}

export function subscribeToAuthChanges(callback: (session: Session | null) => void) {
  if (!isSupabaseConfigured() || !supabase) {
    return { unsubscribe: () => {} };
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return {
    unsubscribe: () => {
      subscription.unsubscribe();
    }
  };
}
