import React, { useState } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { loginWithSupabase, isSupabaseConfigured } from '../../utils/supabase';

interface AdminLoginViewProps {
  onLoginSuccess: () => void;
  onNavigateToPublic: () => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onNavigateToPublic
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড প্রদান করুন।');
      return;
    }

    setIsLoading(true);

    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      setError('Supabase কনফিগারেশন পাওয়া যায়নি। অনুগ্রহ করে VITE_SUPABASE_URL এবং VITE_SUPABASE_ANON_KEY এনভায়রনমেন্ট ভেরিয়েবল সেট করুন।');
      return;
    }

    try {
      const { session, error: authError } = await loginWithSupabase(email, password);
      setIsLoading(false);

      if (authError || !session) {
        setError(authError || 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।');
        return;
      }

      onLoginSuccess();
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'লগইন করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#161210] border border-[#b89758]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative filigree backdrop */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
        <div className="absolute -top-12 -left-12 text-[#b89758]/10 text-9xl font-serif select-none pointer-events-none">
          ❧
        </div>

        {/* Vintage Top Stamp & Seal */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#b89758]/60 bg-[#221a16] flex items-center justify-center text-2xl shadow-inner mb-3">
            💌
          </div>
          <span className="text-[10px] font-mono text-[#d4af37] tracking-[0.25em] uppercase">
            ADMINISTRATIVE PORTAL
          </span>
          <h1 className="text-2xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
            {SITE_CONFIG.siteName}
          </h1>
          <p className="text-xs text-[#a8957e] font-bengali-serif mt-1">
            অ্যাডমিন ড্যাশবোর্ড ম্যানেজমেন্ট প্যানেল
          </p>
        </div>

        {/* Alert Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/70 border border-red-700/50 text-red-200 text-xs font-bengali-serif flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bengali-serif text-[#d5c6ae] mb-1">
              অ্যাডমিন ইমেইল / ইউজারনেম
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
              required
              className="w-full py-2.5 px-3.5 rounded-lg bg-[#1f1713] text-[#faf4e6] placeholder-[#7d6b59] border border-[#3f3125] focus:border-[#d4af37] focus:outline-none text-sm font-sans transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bengali-serif text-[#d5c6ae] mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="w-full py-2.5 px-3.5 rounded-lg bg-[#1f1713] text-[#faf4e6] placeholder-[#7d6b59] border border-[#3f3125] focus:border-[#d4af37] focus:outline-none text-sm font-sans transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-[#a8957e]">
            <label className="flex items-center gap-2 cursor-pointer font-bengali-serif">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded accent-[#8c232c] bg-[#1f1713] border-[#3f3125]"
              />
              <span>আমাকে মনে রাখুন</span>
            </label>
            <span className="text-[#8c7865] font-serif text-[11px]">নিরাপদ সেশন</span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-sm font-bengali-serif font-bold shadow-lg border border-[#d4af37]/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                যাচাই করা হচ্ছে...
              </span>
            ) : (
              <span>🔐 অ্যাডমিন প্যানেলে প্রবেশ করুন</span>
            )}
          </button>
        </form>

        {/* Navigation Footer */}
        <div className="mt-5 pt-4 border-t border-[#2d221a] flex flex-col gap-2.5 text-center">
          <button
            type="button"
            onClick={onNavigateToPublic}
            className="text-xs text-[#9c8974] hover:text-[#faf4e6] font-bengali-serif cursor-pointer transition-colors"
          >
            ← মূল পাবলিক ওয়েবসাইটে ফিরে যান
          </button>
        </div>

        {/* Vintage Bottom Footnote */}
        <div className="mt-6 text-center text-[10px] font-mono text-[#786756]">
          PORTAL VERSION {SITE_CONFIG.version} • AUTHORIZED ACCESS ONLY
        </div>
      </div>
    </div>
  );
};
