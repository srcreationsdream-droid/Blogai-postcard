import { useState, useEffect, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { GeneratorView } from './views/GeneratorView';
import { PostcardsView } from './views/PostcardsView';
import { QuotesView } from './views/QuotesView';
import { GalleryView } from './views/GalleryView';
import { CategoriesView } from './views/CategoriesView';
import { FavoritesView } from './views/FavoritesView';
import { LegalView } from './views/LegalView';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { GlobalSearch } from './components/GlobalSearch';
import { PostcardTemplate, QuoteItem, GalleryItem } from './types';
import { getFavorites } from './utils/storage';
import { getSupabaseSession, subscribeToAuthChanges, logoutSupabase } from './utils/supabase';

export default function App() {
  // Parse initial route from window.location.pathname
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '');
      if (path === '/admin/login') return 'admin-login';
      if (path === '/admin') return 'admin';
    }
    return 'home';
  };

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('সব');
  const [selectedTemplateForGenerator, setSelectedTemplateForGenerator] = useState<PostcardTemplate | undefined>(undefined);
  const [selectedQuoteForGenerator, setSelectedQuoteForGenerator] = useState<string | undefined>(undefined);
  const [favoritesCount, setFavoritesCount] = useState<number>(0);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Sync Supabase Auth session on mount and subscribe to changes
  useEffect(() => {
    let isMounted = true;

    getSupabaseSession().then((initialSession) => {
      if (isMounted) {
        setSession(initialSession);
        setIsAuthLoading(false);
      }
    });

    const { unsubscribe } = subscribeToAuthChanges((newSession) => {
      if (isMounted) {
        setSession(newSession);
        setIsAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Protect /admin and /admin/login routes based on authentication state
  useEffect(() => {
    if (isAuthLoading) return;

    if (currentTab === 'admin') {
      // Unauthenticated users trying to access /admin must be redirected to /admin/login
      if (!session) {
        setCurrentTab('admin-login');
        if (window.location.pathname !== '/admin/login') {
          window.history.replaceState(null, '', '/admin/login');
        }
      }
    } else if (currentTab === 'admin-login') {
      // Authenticated admins visiting /admin/login are redirected to /admin
      if (session) {
        setCurrentTab('admin');
        if (window.location.pathname !== '/admin') {
          window.history.replaceState(null, '', '/admin');
        }
      }
    }
  }, [currentTab, session, isAuthLoading]);

  // Sync favorites count
  useEffect(() => {
    const updateCount = () => {
      const favs = getFavorites();
      setFavoritesCount(favs.postcards.length + favs.quotes.length + favs.gallery.length);
    };
    updateCount();
    window.addEventListener('favorites-updated', updateCount);
    return () => window.removeEventListener('favorites-updated', updateCount);
  }, []);

  // Listen to browser forward/backward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      if (path === '/admin/login') {
        setCurrentTab('admin-login');
      } else if (path === '/admin') {
        setCurrentTab('admin');
      } else {
        setCurrentTab('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation handler with browser history syncing
  const handleNavigate = useCallback((tab: string, filterCategory?: string) => {
    if (filterCategory) {
      setActiveCategoryFilter(filterCategory);
    }

    if (tab === '/admin' || tab === 'admin') {
      // Route protection check on navigation
      if (!session) {
        setCurrentTab('admin-login');
        if (window.location.pathname !== '/admin/login') {
          window.history.pushState(null, '', '/admin/login');
        }
      } else {
        setCurrentTab('admin');
        if (window.location.pathname !== '/admin') {
          window.history.pushState(null, '', '/admin');
        }
      }
    } else if (tab === '/admin/login' || tab === 'admin-login') {
      if (session) {
        setCurrentTab('admin');
        if (window.location.pathname !== '/admin') {
          window.history.pushState(null, '', '/admin');
        }
      } else {
        setCurrentTab('admin-login');
        if (window.location.pathname !== '/admin/login') {
          window.history.pushState(null, '', '/admin/login');
        }
      }
    } else {
      setCurrentTab(tab);
      if (window.location.pathname.startsWith('/admin')) {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [session]);

  // When user selects a postcard template from home/library/search -> load into Generator
  const handleSelectPostcardForGenerator = (template: PostcardTemplate) => {
    setSelectedTemplateForGenerator(template);
    handleNavigate('create');
    setIsSearchOpen(false);
  };

  // When user clicks "ব্যবহার করুন" on quote
  const handleSelectQuoteForGenerator = (quote: QuoteItem) => {
    setSelectedQuoteForGenerator(quote.text);
    handleNavigate('create');
    setIsSearchOpen(false);
  };

  // When user clicks "এডিটরে ব্যবহার করুন" on gallery item
  const handleUseGalleryInGenerator = (item: GalleryItem) => {
    setSelectedQuoteForGenerator(item.quoteText);
    handleNavigate('create');
    setIsSearchOpen(false);
  };

  // Logout handler for authenticated admins
  const handleAdminLogout = async () => {
    await logoutSupabase();
    setSession(null);
    handleNavigate('/admin/login');
  };

  // ================= ADMIN ROUTING =================
  if (currentTab === 'admin-login') {
    return (
      <div className="min-h-screen bg-[#0e0c0b] text-[#f4eee2] flex flex-col justify-between selection:bg-[#7e1d1d] selection:text-[#fbf7ee]">
        <AdminLoginView
          onLoginSuccess={() => handleNavigate('/admin')}
          onNavigateToPublic={() => handleNavigate('home')}
        />
      </div>
    );
  }

  if (currentTab === 'admin') {
    // If auth state is still determining, show minimal dark vintage loader
    if (isAuthLoading) {
      return (
        <div className="min-h-screen bg-[#0e0c0b] text-[#f4eee2] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="inline-block w-6 h-6 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            <span className="font-bengali-serif text-xs text-[#a8957e]">প্রবেশাধিকার যাচাই করা হচ্ছে...</span>
          </div>
        </div>
      );
    }

    // Double check protection: if no session, render login screen
    if (!session) {
      return (
        <div className="min-h-screen bg-[#0e0c0b] text-[#f4eee2] flex flex-col justify-between selection:bg-[#7e1d1d] selection:text-[#fbf7ee]">
          <AdminLoginView
            onLoginSuccess={() => handleNavigate('/admin')}
            onNavigateToPublic={() => handleNavigate('home')}
          />
        </div>
      );
    }

    return (
      <AdminDashboardView
        onNavigateToPublic={(tab) => handleNavigate(tab || 'home')}
        onLogout={handleAdminLogout}
        adminEmail={session.user.email}
      />
    );
  }

  // ================= PUBLIC WEBSITE =================
  return (
    <div className="min-h-screen bg-[#0e0c0b] text-[#f4eee2] flex flex-col justify-between selection:bg-[#7e1d1d] selection:text-[#fbf7ee]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        favoritesCount={favoritesCount}
      />

      {/* Floating or Top Global Search Bar Strip */}
      <div className="bg-[#14100e] border-b border-[#291f17] py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#a8957e] font-serif">
            <span className="text-[#d4af37]">✦</span>
            <span>খাঁটি বাঙালি নস্টালজিক পোস্টকার্ড ও প্রেমের উক্তি সংগ্রহ</span>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 py-1 px-3 rounded-full bg-[#1e1713] hover:bg-[#2b211a] text-xs text-[#c5b59f] border border-[#3b2d22] transition-colors cursor-pointer"
          >
            <span>🔍</span>
            <span>উক্তি বা পোস্টকার্ড খুঁজুন...</span>
          </button>
        </div>
      </div>

      {/* Global Search Modal Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/80 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl bg-[#14100e] border border-[#b89758]/50 rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 text-[#a8957e] hover:text-white p-1 text-base cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <span className="text-xl">🔍</span>
              <h3 className="font-bengali-serif text-xl font-bold text-[#faf4e6] mt-1">
                সার্বজনীন অনুসন্ধান (Global Search)
              </h3>
            </div>
            <GlobalSearch
              onSelectPostcard={handleSelectPostcardForGenerator}
              onSelectQuote={handleSelectQuoteForGenerator}
              onSelectGallery={handleUseGalleryInGenerator}
            />
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onSelectPostcard={handleSelectPostcardForGenerator}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'create' && (
          <GeneratorView
            initialTemplate={selectedTemplateForGenerator}
            initialQuote={selectedQuoteForGenerator}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'postcards' && (
          <PostcardsView
            onSelectPostcard={handleSelectPostcardForGenerator}
            initialCategory={activeCategoryFilter}
          />
        )}

        {currentTab === 'quotes' && (
          <QuotesView
            onUseQuote={handleSelectQuoteForGenerator}
            initialCategory={activeCategoryFilter}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView onUseInGenerator={handleUseGalleryInGenerator} />
        )}

        {currentTab === 'categories' && (
          <CategoriesView
            onSelectCategory={(catName, targetTab) => handleNavigate(targetTab, catName)}
          />
        )}

        {currentTab === 'favorites' && (
          <FavoritesView
            onSelectPostcard={handleSelectPostcardForGenerator}
            onUseQuote={handleSelectQuoteForGenerator}
            onUseInGenerator={handleUseGalleryInGenerator}
          />
        )}

        {(currentTab === 'privacy' || currentTab === 'terms' || currentTab === 'contact') && (
          <LegalView section={currentTab as any} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

