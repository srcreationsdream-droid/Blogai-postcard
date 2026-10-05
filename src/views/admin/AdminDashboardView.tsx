import React, { useState, useMemo } from 'react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { POSTCARD_TEMPLATES } from '../../data/postcards';
import { QUOTES_DATA } from '../../data/quotes';
import { GALLERY_ITEMS } from '../../data/gallery';
import { CATEGORIES_DATA } from '../../data/categories';
import { PostcardTemplate, QuoteItem, GalleryItem, PostcardCategory } from '../../types';
import { VintageArtwork } from '../../components/VintageArtwork';

interface AdminDashboardViewProps {
  onNavigateToPublic: (tab?: string) => void;
  onLogout: () => void;
  adminEmail?: string;
}

type AdminSection = 'overview' | 'postcards' | 'quotes' | 'gallery' | 'categories' | 'settings';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  onNavigateToPublic,
  onLogout,
  adminEmail
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // In-memory data states for interactive CRUD operations
  const [postcardsList, setPostcardsList] = useState<PostcardTemplate[]>(POSTCARD_TEMPLATES);
  const [quotesList, setQuotesList] = useState<QuoteItem[]>(QUOTES_DATA);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [categoriesList, setCategoriesList] = useState(CATEGORIES_DATA);

  // Search & Filter States
  const [postcardSearch, setPostcardSearch] = useState('');
  const [postcardCategoryFilter, setPostcardCategoryFilter] = useState('সব');
  const [quoteSearch, setQuoteSearch] = useState('');
  const [quoteCategoryFilter, setQuoteCategoryFilter] = useState('সব');
  const [gallerySearch, setGallerySearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');

  // Modals state
  const [postcardModalOpen, setPostcardModalOpen] = useState(false);
  const [editingPostcard, setEditingPostcard] = useState<PostcardTemplate | null>(null);

  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<QuoteItem | null>(null);

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // ===================== POSTCARD CRUD =====================
  const handleSavePostcard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingPostcard ? editingPostcard.id : `vp${String(postcardsList.length + 1).padStart(3, '0')}`;
    const title = formData.get('title') as string;
    const category = formData.get('category') as PostcardCategory;
    const defaultQuote = formData.get('defaultQuote') as string;
    const artworkType = (formData.get('artworkType') as any) || 'letter-quill';
    const defaultRecipient = (formData.get('defaultRecipient') as string) || 'প্রিয়তমা';
    const defaultSender = (formData.get('defaultSender') as string) || 'ইতি, তোমার...';
    const defaultDate = (formData.get('defaultDate') as string) || '১৩৮২';
    const tagsRaw = formData.get('tags') as string;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
    const featured = formData.get('featured') === 'on';
    const popular = formData.get('popular') === 'on';
    const isNew = formData.get('isNew') === 'on';

    const newPostcard: PostcardTemplate = {
      id,
      title,
      category,
      themeStyle: editingPostcard?.themeStyle || 'custom-theme',
      artworkType,
      defaultQuote,
      defaultRecipient,
      defaultSender,
      defaultDate,
      tags: tags.length > 0 ? tags : [category, 'vintage'],
      featured,
      popular,
      isNew,
      style: editingPostcard?.style || {
        textColor: '#2b2118',
        fontFamily: 'bengali-serif',
        textPosition: 'center',
        borderStyle: 'gold-frame',
        paperTone: 'aged-cream'
      }
    };

    if (editingPostcard) {
      setPostcardsList(prev => prev.map(p => p.id === id ? newPostcard : p));
      showToast('✅ পোস্টকার্ড সফলভাবে আপডেট করা হয়েছে!');
    } else {
      setPostcardsList(prev => [newPostcard, ...prev]);
      showToast('✅ নতুন পোস্টকার্ড সফলভাবে যুক্ত করা হয়েছে!');
    }
    setPostcardModalOpen(false);
    setEditingPostcard(null);
  };

  const handleDeletePostcard = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই পোস্টকার্ডটি মুছে ফেলতে চান?')) {
      setPostcardsList(prev => prev.filter(p => p.id !== id));
      showToast('🗑️ পোস্টকার্ড মুছে ফেলা হয়েছে।');
    }
  };

  const handleTogglePostcardFeatured = (id: string) => {
    setPostcardsList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, featured: !p.featured };
      }
      return p;
    }));
    showToast('ফিচার্ড স্ট্যাটাস পরিবর্তন করা হয়েছে।');
  };

  // ===================== QUOTE CRUD =====================
  const handleSaveQuote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingQuote ? editingQuote.id : `q${String(quotesList.length + 1).padStart(3, '0')}`;
    const text = formData.get('text') as string;
    const category = formData.get('category') as PostcardCategory;
    const author = formData.get('author') as string;
    const tagsRaw = formData.get('tags') as string;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

    const newQuote: QuoteItem = {
      id,
      text,
      category,
      author: author || undefined,
      tags: tags.length > 0 ? tags : [category]
    };

    if (editingQuote) {
      setQuotesList(prev => prev.map(q => q.id === id ? newQuote : q));
      showToast('✅ উক্তি সফলভাবে আপডেট করা হয়েছে!');
    } else {
      setQuotesList(prev => [newQuote, ...prev]);
      showToast('✅ নতুন উক্তি সফলভাবে যুক্ত করা হয়েছে!');
    }
    setQuoteModalOpen(false);
    setEditingQuote(null);
  };

  const handleDeleteQuote = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই উক্তিটি মুছে ফেলতে চান?')) {
      setQuotesList(prev => prev.filter(q => q.id !== id));
      showToast('🗑️ উক্তি মুছে ফেলা হয়েছে।');
    }
  };

  // ===================== GALLERY CRUD =====================
  const handleSaveGallery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingGallery ? editingGallery.id : `g${String(galleryList.length + 1).padStart(3, '0')}`;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const quoteText = formData.get('quoteText') as string;
    const subtext = formData.get('subtext') as string;
    const artworkType = (formData.get('artworkType') as string) || 'letter-quill';
    const accentColor = (formData.get('accentColor') as string) || '#d4af37';
    const tagsRaw = formData.get('tags') as string;
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

    const newGalleryItem: GalleryItem = {
      id,
      title,
      category,
      quoteText,
      subtext: subtext || undefined,
      artworkType,
      bgColor: editingGallery?.bgColor || 'from-[#2c1d11] to-[#120d09]',
      accentColor,
      tags: tags.length > 0 ? tags : [category, 'vintage']
    };

    if (editingGallery) {
      setGalleryList(prev => prev.map(g => g.id === id ? newGalleryItem : g));
      showToast('✅ গ্যালারি আর্ট সফলভাবে আপডেট করা হয়েছে!');
    } else {
      setGalleryList(prev => [newGalleryItem, ...prev]);
      showToast('✅ নতুন গ্যালারি আর্ট যোগ করা হয়েছে!');
    }
    setGalleryModalOpen(false);
    setEditingGallery(null);
  };

  const handleDeleteGallery = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই গ্যালারি আইটেমটি মুছে ফেলতে চান?')) {
      setGalleryList(prev => prev.filter(g => g.id !== id));
      showToast('🗑️ গ্যালারি আর্ট মুছে ফেলা হয়েছে।');
    }
  };

  // ===================== CATEGORIES CRUD =====================
  const handleSaveCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as PostcardCategory;
    const icon = formData.get('icon') as string;
    const description = formData.get('description') as string;
    const slug = (formData.get('slug') as string) || name.toLowerCase().replace(/\s+/g, '-');
    const count = Number(formData.get('count')) || 10;

    const newCategory = { name, icon, description, slug, count };

    if (editingCategory) {
      setCategoriesList(prev => prev.map(c => c.name === editingCategory.name ? newCategory : c));
      showToast('✅ ক্যাটাগরি আপডেট করা হয়েছে!');
    } else {
      setCategoriesList(prev => [...prev, newCategory]);
      showToast('✅ নতুন ক্যাটাগরি যুক্ত করা হয়েছে!');
    }
    setCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (name: string) => {
    if (confirm(`আপনি কি "${name}" ক্যাটাগরি মুছে ফেলতে চান?`)) {
      setCategoriesList(prev => prev.filter(c => c.name !== name));
      showToast('🗑️ ক্যাটাগরি মুছে ফেলা হয়েছে।');
    }
  };

  // Filtered queries
  const filteredPostcards = useMemo(() => {
    return postcardsList.filter(p => {
      const matchCat = postcardCategoryFilter === 'সব' || p.category === postcardCategoryFilter;
      const matchSearch = !postcardSearch ||
        p.title.toLowerCase().includes(postcardSearch.toLowerCase()) ||
        p.defaultQuote.toLowerCase().includes(postcardSearch.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(postcardSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [postcardsList, postcardCategoryFilter, postcardSearch]);

  const filteredQuotes = useMemo(() => {
    return quotesList.filter(q => {
      const matchCat = quoteCategoryFilter === 'সব' || q.category === quoteCategoryFilter;
      const matchSearch = !quoteSearch ||
        q.text.toLowerCase().includes(quoteSearch.toLowerCase()) ||
        (q.author && q.author.toLowerCase().includes(quoteSearch.toLowerCase())) ||
        q.tags.some(t => t.toLowerCase().includes(quoteSearch.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [quotesList, quoteCategoryFilter, quoteSearch]);

  const filteredGallery = useMemo(() => {
    return galleryList.filter(g => {
      return !gallerySearch ||
        g.title.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        g.quoteText.toLowerCase().includes(gallerySearch.toLowerCase()) ||
        g.category.toLowerCase().includes(gallerySearch.toLowerCase());
    });
  }, [galleryList, gallerySearch]);

  const filteredCategories = useMemo(() => {
    return categoriesList.filter(c => {
      return !categorySearch ||
        c.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
        c.description.toLowerCase().includes(categorySearch.toLowerCase());
    });
  }, [categoriesList, categorySearch]);

  const navItems = [
    { id: 'overview', label: '📊 ওভারভিউ (Overview)', count: null },
    { id: 'postcards', label: '💌 পোস্টকার্ড (Postcards)', count: postcardsList.length },
    { id: 'quotes', label: '✍️ উক্তি কালেকশন (Quotes)', count: quotesList.length },
    { id: 'gallery', label: '🖼️ ভিন্টেজ গ্যালারি (Gallery)', count: galleryList.length },
    { id: 'categories', label: '🏷️ ক্যাটাগরি (Categories)', count: categoriesList.length },
    { id: 'settings', label: '⚙️ সেটিংস ও স্পনসর (Settings)', count: null },
  ];

  return (
    <div className="min-h-screen bg-[#0e0c0b] text-[#f4eee2] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#241e1b] border border-[#d4af37] text-[#faf4e6] px-4 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-bengali-serif flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#14100e]/95 backdrop-blur border-b border-[#362b22] px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#221a16] border border-[#3d2f24] text-[#d4af37]"
            aria-label="Toggle navigation drawer"
          >
            ☰
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl">💌</span>
            <div>
              <span className="font-bengali-serif text-base sm:text-lg font-bold text-[#faf4e6] flex items-center gap-2">
                <span>ব্লগএআই অ্যাডমিন প্যানেল</span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#8c232c] text-white">
                  ADMIN v1.0
                </span>
              </span>
              <span className="hidden sm:block text-[10px] text-[#9c8974] font-serif">
                কনটেন্ট ও পোস্টকার্ড ম্যানেজমেন্ট সিস্টেম
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          {adminEmail && (
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[11px] font-mono text-[#d4af37] truncate max-w-[180px]">{adminEmail}</span>
              <span className="text-[9px] text-emerald-400 font-mono">AUTHENTICATED</span>
            </div>
          )}

          <button
            onClick={() => onNavigateToPublic('home')}
            className="py-1.5 px-3 rounded-lg bg-[#221a16] hover:bg-[#2d221c] text-xs font-bengali-serif text-[#d4af37] border border-[#4a392c] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>👁️</span>
            <span className="hidden sm:inline">পাবলিক সাইট দেখুন</span>
          </button>

          <button
            onClick={onLogout}
            className="py-1.5 px-3 rounded-lg bg-[#331c1e] hover:bg-[#8c232c] text-xs font-bengali-serif text-[#ffccd0] transition-colors cursor-pointer border border-[#632a2e] flex items-center gap-1.5"
            title="লগআউট"
          >
            <span>🚪</span>
            <span>লগআউট</span>
          </button>
        </div>
      </header>

      {/* Dashboard Body Grid: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#14100e] border-r border-[#291f17] flex flex-col justify-between p-4 transition-transform duration-300 transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            <div className="hidden lg:flex flex-col border-b border-[#291f17] pb-3">
              <span className="text-xs text-[#a8957e] font-serif">অ্যাডমিন ড্যাশবোর্ড মেনু</span>
              <span className="text-[11px] text-[#786756] font-mono">WORKSPACE ACTIVE</span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as AdminSection);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-bengali-serif transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-[#2b2018] text-[#d4af37] border border-[#b89758]/50 font-bold shadow-sm'
                        : 'text-[#c5b59f] hover:bg-[#1d1613] hover:text-[#faf4e6]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.count !== null && (
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-[#d4af37] text-black font-bold' : 'bg-[#251d18] text-[#a8957e]'
                      }`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer info & Logout */}
          <div className="pt-4 border-t border-[#291f17] text-xs text-[#8c7865] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span>SPONSOR GATE:</span>
              <span className="text-emerald-400 font-bold">ACTIVE (8s)</span>
            </div>
            <div className="text-[10px] font-serif text-[#6b5b4e]">
              ব্লগএআই রিয়েলটাইম আর্কিটেকচার
            </div>
            <button
              onClick={onLogout}
              className="w-full mt-2 py-2 px-3 rounded-lg bg-[#251517] hover:bg-[#8c232c] text-xs font-bengali-serif text-[#ffccd0] border border-[#522024] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚪</span>
              <span>লগআউট (Sign Out)</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/60 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0e0c0b]">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* ===================== OVERVIEW SECTION ===================== */}
            {activeSection === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#faf4e6]">
                    ড্যাশবোর্ড ওভারভিউ
                  </h1>
                  <p className="text-xs sm:text-sm text-[#a8957e] font-bengali-serif mt-1">
                    ব্লগএআই পোস্টকার্ড অ্যাপ্লিকেশনের কনটেন্ট, আর্টওয়ার্ক ও লাইভ স্ট্যাটাস একনজরে।
                  </p>
                </div>

                {/* 4 Core Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div
                    onClick={() => setActiveSection('postcards')}
                    className="p-5 rounded-xl bg-[#161210] border border-[#382d23] hover:border-[#b89758] transition-all cursor-pointer shadow-md group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#a8957e]">POSTCARDS</span>
                      <span className="text-2xl group-hover:scale-110 transition-transform">💌</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-[#faf4e6] mt-2">
                      {postcardsList.length}
                    </div>
                    <p className="text-xs text-[#d4af37] font-bengali-serif mt-1">
                      মোট পোস্টকার্ড ডিজাইন
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveSection('quotes')}
                    className="p-5 rounded-xl bg-[#161210] border border-[#382d23] hover:border-[#b89758] transition-all cursor-pointer shadow-md group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#a8957e]">QUOTES</span>
                      <span className="text-2xl group-hover:scale-110 transition-transform">✍️</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-[#faf4e6] mt-2">
                      {quotesList.length}
                    </div>
                    <p className="text-xs text-[#d4af37] font-bengali-serif mt-1">
                      রোমান্টিক ও ভিন্টেজ উক্তি
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveSection('gallery')}
                    className="p-5 rounded-xl bg-[#161210] border border-[#382d23] hover:border-[#b89758] transition-all cursor-pointer shadow-md group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#a8957e]">GALLERY</span>
                      <span className="text-2xl group-hover:scale-110 transition-transform">🖼️</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-[#faf4e6] mt-2">
                      {galleryList.length}
                    </div>
                    <p className="text-xs text-[#d4af37] font-bengali-serif mt-1">
                      প্রি-মেড আর্টওয়ার্ক
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveSection('categories')}
                    className="p-5 rounded-xl bg-[#161210] border border-[#382d23] hover:border-[#b89758] transition-all cursor-pointer shadow-md group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#a8957e]">CATEGORIES</span>
                      <span className="text-2xl group-hover:scale-110 transition-transform">🏷️</span>
                    </div>
                    <div className="text-3xl font-mono font-bold text-[#faf4e6] mt-2">
                      {categoriesList.length}
                    </div>
                    <p className="text-xs text-[#d4af37] font-bengali-serif mt-1">
                      মুড ও ক্যাটাগরি সংখ্যা
                    </p>
                  </div>
                </div>

                {/* Sponsor Gateway Control Card */}
                <div className="p-6 rounded-xl bg-[#181311] border border-[#b89758]/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">💎</span>
                      <h3 className="font-bengali-serif text-lg font-bold text-[#faf4e6]">
                        স্পনসর ডাউনলোড গেট (Active Configuration)
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-xs text-[#c5b59f] font-bengali-serif">
                      ডাউনলোডের পূর্বে প্রতিটি ব্যবহারকারীর জন্য {SITE_CONFIG.downloadCountdown} সেকেন্ডের টাইমার ও স্পনসর লিঙ্ক চালু থাকে।
                    </p>
                    <div className="text-[11px] font-mono text-[#a8957e] truncate max-w-xl">
                      URL: <span className="text-[#d4af37]">{SITE_CONFIG.sponsorUrl}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={SITE_CONFIG.sponsorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3.5 rounded-lg bg-[#271f1a] hover:bg-[#382c24] text-xs font-bengali-serif text-[#d4af37] border border-[#544131] transition-colors"
                    >
                      স্পনসর পেজ পরীক্ষা করুন ↗
                    </a>
                  </div>
                </div>

                {/* Quick Actions & Recent Postcards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Postcards */}
                  <div className="p-5 rounded-xl bg-[#161210] border border-[#382d23] shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#291f17]">
                        <h3 className="font-bengali-serif text-base font-bold text-[#faf4e6]">
                          💌 সাম্প্রতিক পোস্টকার্ডসমূহ
                        </h3>
                        <button
                          onClick={() => setActiveSection('postcards')}
                          className="text-xs text-[#d4af37] hover:underline font-bengali-serif cursor-pointer"
                        >
                          সব দেখুন →
                        </button>
                      </div>

                      <div className="space-y-3">
                        {postcardsList.slice(0, 4).map(p => (
                          <div
                            key={p.id}
                            className="p-2.5 rounded-lg bg-[#1f1713] border border-[#33261c] flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded bg-[#f5ede1] flex items-center justify-center text-[#8c2a32] text-xs">
                                ✉️
                              </div>
                              <div>
                                <h4 className="text-xs font-bengali-serif font-bold text-[#faf4e6]">{p.title}</h4>
                                <span className="text-[10px] text-[#a8957e] font-serif">{p.category} • ID: {p.id}</span>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#2e231c] text-[#d4af37]">
                              {p.featured ? 'FEATURED' : 'STANDARD'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingPostcard(null);
                        setPostcardModalOpen(true);
                      }}
                      className="mt-4 w-full py-2 rounded-lg bg-[#271f1a] hover:bg-[#8c232c] text-xs font-bengali-serif text-[#f4eee2] border border-[#443325] transition-colors cursor-pointer text-center"
                    >
                      + নতুন পোস্টকার্ড তৈরি করুন
                    </button>
                  </div>

                  {/* Recent Quotes */}
                  <div className="p-5 rounded-xl bg-[#161210] border border-[#382d23] shadow-md flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#291f17]">
                        <h3 className="font-bengali-serif text-base font-bold text-[#faf4e6]">
                          ✍️ সাম্প্রতিক প্রেমের উক্তি
                        </h3>
                        <button
                          onClick={() => setActiveSection('quotes')}
                          className="text-xs text-[#d4af37] hover:underline font-bengali-serif cursor-pointer"
                        >
                          সব দেখুন →
                        </button>
                      </div>

                      <div className="space-y-3">
                        {quotesList.slice(0, 4).map(q => (
                          <div
                            key={q.id}
                            className="p-2.5 rounded-lg bg-[#1f1713] border border-[#33261c] flex flex-col justify-between"
                          >
                            <p className="text-xs font-bengali-serif text-[#ebdcc8] line-clamp-1 italic">
                              “{q.text}”
                            </p>
                            <div className="mt-1 flex items-center justify-between text-[10px] text-[#9c8974]">
                              <span>{q.category}</span>
                              {q.author && <span className="text-[#d4af37]">— {q.author}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setEditingQuote(null);
                        setQuoteModalOpen(true);
                      }}
                      className="mt-4 w-full py-2 rounded-lg bg-[#271f1a] hover:bg-[#8c232c] text-xs font-bengali-serif text-[#f4eee2] border border-[#443325] transition-colors cursor-pointer text-center"
                    >
                      + নতুন উক্তি যোগ করুন
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===================== POSTCARDS SECTION ===================== */}
            {activeSection === 'postcards' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bengali-serif font-bold text-[#faf4e6]">
                      পোস্টকার্ড টেমপ্লেট ব্যবস্থাপনা ({postcardsList.length})
                    </h2>
                    <p className="text-xs text-[#a8957e] font-bengali-serif mt-0.5">
                      টেমপ্লেট তৈরি, সম্পাদনা, প্রিভিউ ও ফিল্টারিং ব্যবস্থা।
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingPostcard(null);
                      setPostcardModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-xs sm:text-sm font-bengali-serif font-bold shadow border border-[#d4af37]/40 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <span>+ নতুন পোস্টকার্ড তৈরি করুন</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={postcardSearch}
                      onChange={(e) => setPostcardSearch(e.target.value)}
                      placeholder="পোস্টকার্ড খুঁজুন (টাইটেল, উক্তি, ট্যাগ)..."
                      className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none text-xs sm:text-sm font-bengali-serif"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7865] text-sm">🔍</span>
                  </div>

                  <select
                    value={postcardCategoryFilter}
                    onChange={(e) => setPostcardCategoryFilter(e.target.value)}
                    className="py-2.5 px-3 rounded-xl bg-[#1c1613] text-[#faf4e6] border border-[#4d3d2e] focus:border-[#d4af37] text-xs sm:text-sm font-bengali-serif"
                  >
                    <option value="সব">সব ক্যাটাগরি</option>
                    {categoriesList.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Postcards Table / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPostcards.map(p => (
                    <div
                      key={p.id}
                      className="bg-[#161210] border border-[#382d23] hover:border-[#b89758]/60 rounded-xl p-4 flex flex-col justify-between transition-all shadow-md group"
                    >
                      <div>
                        {/* Miniature Artwork Preview */}
                        <div className="aspect-[3/2] w-full bg-[#f6eee0] rounded border border-[#4a392b] p-3 flex flex-col justify-between mb-3 relative overflow-hidden">
                          <div className="flex justify-between items-center text-[8px] font-mono text-[#8a6a42]">
                            <span>POST CARD</span>
                            <span>{p.category}</span>
                          </div>
                          <div className="my-auto flex justify-center opacity-85">
                            <VintageArtwork type={p.artworkType} className="w-16 h-16" accentColor="#73522a" />
                          </div>
                          <p className="text-[10px] text-[#3d2c1e] font-bengali-serif line-clamp-1 italic text-center">
                            “{p.defaultQuote}”
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[10px] font-mono text-[#a8957e]">ID: {p.id}</span>
                          <div className="flex items-center gap-1">
                            {p.featured && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#8c232c] text-white">
                                FEATURED
                              </span>
                            )}
                            {p.popular && (
                              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#3d2f21] text-[#d4af37]">
                                POPULAR
                              </span>
                            )}
                          </div>
                        </div>

                        <h3 className="font-bengali-serif text-sm font-bold text-[#faf4e6] line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#a8957e] font-bengali-serif line-clamp-2 mt-1">
                          “{p.defaultQuote}”
                        </p>

                        <div className="mt-2 flex flex-wrap gap-1">
                          {p.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[9px] font-mono bg-[#221a16] text-[#8c7865] px-1.5 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Controls */}
                      <div className="mt-4 pt-3 border-t border-[#291f17] flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleTogglePostcardFeatured(p.id)}
                          title="ফিচার্ড টগল করুন"
                          className={`text-xs p-1.5 rounded transition-colors ${
                            p.featured ? 'text-[#d4af37]' : 'text-[#7d6c5c] hover:text-[#d4af37]'
                          }`}
                        >
                          ★
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingPostcard(p);
                              setPostcardModalOpen(true);
                            }}
                            className="py-1 px-3 rounded bg-[#271f1a] hover:bg-[#3d3128] text-xs font-bengali-serif text-[#d4af37] border border-[#443527] transition-colors cursor-pointer"
                          >
                            এডিট
                          </button>
                          <button
                            onClick={() => handleDeletePostcard(p.id)}
                            className="py-1 px-2.5 rounded bg-[#331c1e] hover:bg-[#8c232c] text-xs font-bengali-serif text-red-200 transition-colors cursor-pointer border border-[#632a2e]"
                          >
                            মুছুন
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== QUOTES SECTION ===================== */}
            {activeSection === 'quotes' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bengali-serif font-bold text-[#faf4e6]">
                      উক্তি কালেকশন ({quotesList.length})
                    </h2>
                    <p className="text-xs text-[#a8957e] font-bengali-serif mt-0.5">
                      প্রেম, বিরহ, বৃষ্টি ও মির্জা গালিবের শায়েরী ব্যবস্থাপনা।
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingQuote(null);
                      setQuoteModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-xs sm:text-sm font-bengali-serif font-bold shadow border border-[#d4af37]/40 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <span>+ নতুন উক্তি যোগ করুন</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={quoteSearch}
                      onChange={(e) => setQuoteSearch(e.target.value)}
                      placeholder="উক্তি বা লেখক খুঁজুন (যেমন: গালিব, বৃষ্টি, স্মৃতি)..."
                      className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none text-xs sm:text-sm font-bengali-serif"
                    />
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7865] text-sm">🔍</span>
                  </div>

                  <select
                    value={quoteCategoryFilter}
                    onChange={(e) => setQuoteCategoryFilter(e.target.value)}
                    className="py-2.5 px-3 rounded-xl bg-[#1c1613] text-[#faf4e6] border border-[#4d3d2e] focus:border-[#d4af37] text-xs sm:text-sm font-bengali-serif"
                  >
                    <option value="সব">সব ক্যাটাগরি</option>
                    {categoriesList.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Quotes List Table / Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredQuotes.map(q => (
                    <div
                      key={q.id}
                      className="bg-[#161210] border border-[#382d23] hover:border-[#b89758]/50 rounded-xl p-4 flex flex-col justify-between transition-all shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-[#a8957e] mb-2 pb-1 border-b border-[#291f17]">
                          <span className="font-bengali-serif text-[#d4af37]">{q.category}</span>
                          <span className="font-mono text-[10px]">ID: {q.id}</span>
                        </div>

                        <p className="font-bengali-serif text-sm text-[#f0e7d8] leading-relaxed italic">
                          “{q.text}”
                        </p>

                        {q.author && (
                          <div className="mt-2 text-right">
                            <span className="font-bengali-serif text-xs text-[#d4af37]">
                              — {q.author}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#291f17] flex items-center justify-between">
                        <div className="flex gap-1">
                          {q.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-[9px] font-mono bg-[#221a16] text-[#8c7865] px-1.5 py-0.5 rounded">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingQuote(q);
                              setQuoteModalOpen(true);
                            }}
                            className="py-1 px-2.5 rounded bg-[#271f1a] hover:bg-[#3d3128] text-xs font-bengali-serif text-[#d4af37] border border-[#443527] transition-colors cursor-pointer"
                          >
                            এডিট
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(q.id)}
                            className="py-1 px-2.5 rounded bg-[#331c1e] hover:bg-[#8c232c] text-xs font-bengali-serif text-red-200 transition-colors cursor-pointer border border-[#632a2e]"
                          >
                            মুছুন
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== GALLERY SECTION ===================== */}
            {activeSection === 'gallery' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bengali-serif font-bold text-[#faf4e6]">
                      ভিন্টেজ গ্যালারি আর্ট কালেকশন ({galleryList.length})
                    </h2>
                    <p className="text-xs text-[#a8957e] font-bengali-serif mt-0.5">
                      পূর্ব-প্রস্তুত স্ট্যাটিক ভিন্টেজ আর্টওয়ার্ক ও কোট ম্যানেজমেন্ট।
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingGallery(null);
                      setGalleryModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-xs sm:text-sm font-bengali-serif font-bold shadow border border-[#d4af37]/40 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <span>+ নতুন গ্যালারি আর্ট যুক্ত করুন</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={gallerySearch}
                    onChange={(e) => setGallerySearch(e.target.value)}
                    placeholder="গ্যালারি আর্ট খুঁজুন..."
                    className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none text-xs sm:text-sm font-bengali-serif"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7865] text-sm">🔍</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredGallery.map(g => (
                    <div
                      key={g.id}
                      className="bg-[#161210] border border-[#382d23] hover:border-[#b89758]/50 rounded-xl p-4 flex flex-col justify-between transition-all shadow-md"
                    >
                      <div>
                        <div className={`aspect-square w-full rounded-lg bg-gradient-to-b ${g.bgColor} p-4 flex flex-col justify-between border border-[#4a392b]`}>
                          <div className="flex justify-between items-center text-[8px] font-mono text-[#d4af37]">
                            <span>{g.category}</span>
                            <span>ID: {g.id}</span>
                          </div>
                          <div className="my-auto text-center flex flex-col items-center">
                            <div className="w-12 h-12 mb-2 opacity-80">
                              <VintageArtwork type={g.artworkType} className="w-full h-full" accentColor={g.accentColor} />
                            </div>
                            <h4
                              className="font-bengali-serif text-xs font-bold leading-tight line-clamp-2 px-1"
                              style={{ color: g.accentColor }}
                            >
                              “{g.quoteText}”
                            </h4>
                          </div>
                          <div className="text-[7px] font-mono text-[#8a755d] text-right">
                            HD ARTWORK
                          </div>
                        </div>

                        <h3 className="font-bengali-serif text-sm font-bold text-[#faf4e6] mt-3 line-clamp-1">
                          {g.title}
                        </h3>
                        {g.subtext && (
                          <p className="text-xs text-[#a8957e] font-serif line-clamp-1">
                            {g.subtext}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#291f17] flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingGallery(g);
                            setGalleryModalOpen(true);
                          }}
                          className="py-1 px-3 rounded bg-[#271f1a] hover:bg-[#3d3128] text-xs font-bengali-serif text-[#d4af37] border border-[#443527] transition-colors cursor-pointer"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="py-1 px-2.5 rounded bg-[#331c1e] hover:bg-[#8c232c] text-xs font-bengali-serif text-red-200 transition-colors cursor-pointer border border-[#632a2e]"
                        >
                          মুছুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== CATEGORIES SECTION ===================== */}
            {activeSection === 'categories' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bengali-serif font-bold text-[#faf4e6]">
                      ক্যাটাগরি তালিকা ({categoriesList.length})
                    </h2>
                    <p className="text-xs text-[#a8957e] font-bengali-serif mt-0.5">
                      ব্যবহারকারীদের জন্য সহজ মুড ও থিম নেভিগেশন।
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setCategoryModalOpen(true);
                    }}
                    className="py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-xs sm:text-sm font-bengali-serif font-bold shadow border border-[#d4af37]/40 transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <span>+ নতুন ক্যাটাগরি তৈরি করুন</span>
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    placeholder="ক্যাটাগরি খুঁজুন..."
                    className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none text-xs sm:text-sm font-bengali-serif"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7865] text-sm">🔍</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredCategories.map(c => (
                    <div
                      key={c.name}
                      className="p-4 rounded-xl bg-[#161210] border border-[#382d23] hover:border-[#b89758]/60 transition-all flex flex-col justify-between shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-3xl">{c.icon}</span>
                          <span className="text-[10px] font-mono text-[#d4af37] bg-[#221a16] px-2 py-0.5 rounded border border-[#3d2e22]">
                            {c.count}+ পোস্টকার্ড
                          </span>
                        </div>
                        <h3 className="font-bengali-serif text-base font-bold text-[#faf4e6]">
                          {c.name}
                        </h3>
                        <p className="text-xs text-[#a8957e] font-bengali-serif mt-1">
                          {c.description}
                        </p>
                        <div className="text-[10px] font-mono text-[#786756] mt-2">
                          Slug: /{c.slug}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#291f17] flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingCategory(c);
                            setCategoryModalOpen(true);
                          }}
                          className="py-1 px-3 rounded bg-[#271f1a] hover:bg-[#3d3128] text-xs font-bengali-serif text-[#d4af37] border border-[#443527] transition-colors cursor-pointer"
                        >
                          এডিট
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(c.name)}
                          className="py-1 px-2.5 rounded bg-[#331c1e] hover:bg-[#8c232c] text-xs font-bengali-serif text-red-200 transition-colors cursor-pointer border border-[#632a2e]"
                        >
                          মুছুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== SETTINGS & SPONSOR SECTION ===================== */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bengali-serif font-bold text-[#faf4e6]">
                    সিস্টেম ও স্পনসর সেটিংস
                  </h2>
                  <p className="text-xs text-[#a8957e] font-bengali-serif mt-0.5">
                    সেন্ট্রাল কনফিগারেশন ও সাইট সেটিংস বিবরণী।
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#161210] border border-[#382d23] shadow-xl space-y-6 max-w-3xl">
                  <div>
                    <label className="block text-xs font-bengali-serif text-[#a8957e] mb-1">
                      অ্যাপ্লিকেশনের নাম (Site Name):
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={SITE_CONFIG.siteName}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] font-bengali-serif text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bengali-serif text-[#a8957e] mb-1">
                      ট্যাগলাইন (Tagline):
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={SITE_CONFIG.tagline}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] font-bengali-serif text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bengali-serif text-[#a8957e] mb-1">
                      সেন্ট্রাল স্পনসর URL (Sponsor URL):
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={SITE_CONFIG.sponsorUrl}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#1f1713] text-[#d4af37] border border-[#3f3125] font-mono text-xs cursor-not-allowed"
                    />
                    <p className="text-[11px] text-[#8c7865] font-serif mt-1">
                      * এই URLটি <code>src/config/siteConfig.ts</code> ফাইলে কেন্দ্রীভূত রয়েছে।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bengali-serif text-[#a8957e] mb-1">
                        ডাউনলোড কাউন্টডাউন টাইমার:
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={`${SITE_CONFIG.downloadCountdown} সেকেন্ড (08s)`}
                        className="w-full py-2.5 px-3 rounded-lg bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] font-mono text-xs cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bengali-serif text-[#a8957e] mb-1">
                        যোগাযোগ ইমেইল (Contact):
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={SITE_CONFIG.contactEmail}
                        className="w-full py-2.5 px-3 rounded-lg bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] font-mono text-xs cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#221a16] border border-[#443527] space-y-2">
                    <h4 className="text-xs font-bengali-serif font-bold text-[#d4af37]">
                      স্পনসর গেট সুরক্ষা নীতি
                    </h4>
                    <p className="text-xs text-[#c5b59f] font-bengali-serif leading-relaxed">
                      প্রতিটি ব্যবহারকারী যেকোনো পোস্টকার্ড বা গ্যালারি আর্ট ডাউনলোড করার আগে ৮-সেকেন্ডের আনলক গেটটি প্রদর্শন করে। এটি স্পনসর লিঙ্ক ওপেন করে এবং টাইমার শেষ হওয়া পর্যন্ত ডাউনলোড লক রাখে।
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ===================== POSTCARD CREATE/EDIT MODAL ===================== */}
      {postcardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#161210] border border-[#b89758]/50 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => {
                setPostcardModalOpen(false);
                setEditingPostcard(null);
              }}
              className="absolute top-4 right-4 text-[#a8957e] hover:text-white p-1"
            >
              ✕
            </button>

            <h3 className="font-bengali-serif text-xl font-bold text-[#faf4e6] mb-4">
              {editingPostcard ? 'পোস্টকার্ড সম্পাদনা করুন' : 'নতুন পোস্টকার্ড তৈরি করুন'}
            </h3>

            <form onSubmit={handleSavePostcard} className="space-y-4 text-xs font-bengali-serif">
              <div>
                <label className="block text-[#d5c6ae] mb-1">পোস্টকার্ড টাইটেল</label>
                <input
                  name="title"
                  required
                  defaultValue={editingPostcard?.title || ''}
                  placeholder="যেমন: Rainy Love (বৃষ্টির প্রেম)"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d5c6ae] mb-1">ক্যাটাগরি</label>
                  <select
                    name="category"
                    defaultValue={editingPostcard?.category || 'প্রেম'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37]"
                  >
                    {categoriesList.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#d5c6ae] mb-1">আর্টওয়ার্ক মোটিফ</label>
                  <select
                    name="artworkType"
                    defaultValue={editingPostcard?.artworkType || 'letter-quill'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37]"
                  >
                    <option value="rainy-umbrella">Rainy Umbrella (ছাতা ও বৃষ্টি)</option>
                    <option value="letter-quill">Letter & Quill (চিঠি ও পালক)</option>
                    <option value="rose-botanical">Rose Botanical (গোলাপ)</option>
                    <option value="gramophone-melody">Gramophone (গ্রামোফোন)</option>
                    <option value="moonlight-sea">Moonlight (জোছনা ও নদী)</option>
                    <option value="train-station">Train Station (রেলস্টেশন)</option>
                    <option value="sunset-river">Sunset River (গোধূলি ও নৌকা)</option>
                    <option value="cafe-coffee">Café Coffee (ক্যাফে ও চা)</option>
                    <option value="vintage-lovers">Vintage Silhouette (প্রেমযুগল)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">ডিফল্ট উক্তি</label>
                <textarea
                  name="defaultQuote"
                  required
                  rows={3}
                  defaultValue={editingPostcard?.defaultQuote || ''}
                  placeholder="উক্তি লিখুন..."
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[#d5c6ae] mb-1">প্রাপক</label>
                  <input
                    name="defaultRecipient"
                    defaultValue={editingPostcard?.defaultRecipient || 'প্রিয়তমা'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>
                <div>
                  <label className="block text-[#d5c6ae] mb-1">প্রেরক</label>
                  <input
                    name="defaultSender"
                    defaultValue={editingPostcard?.defaultSender || 'ইতি, তোমার...'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>
                <div>
                  <label className="block text-[#d5c6ae] mb-1">তারিখ</label>
                  <input
                    name="defaultDate"
                    defaultValue={editingPostcard?.defaultDate || 'শ্রাবণ, ১৩৮২'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)</label>
                <input
                  name="tags"
                  defaultValue={editingPostcard?.tags.join(', ') || ''}
                  placeholder="বৃষ্টি, প্রেম, romantic"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-[#d5c6ae]">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={editingPostcard?.featured || false}
                    className="accent-[#8c232c]"
                  />
                  <span>ফিচার্ড (Featured)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#d5c6ae]">
                  <input
                    type="checkbox"
                    name="popular"
                    defaultChecked={editingPostcard?.popular || false}
                    className="accent-[#8c232c]"
                  />
                  <span>জনপ্রিয় (Popular)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-[#d5c6ae]">
                  <input
                    type="checkbox"
                    name="isNew"
                    defaultChecked={editingPostcard?.isNew || false}
                    className="accent-[#8c232c]"
                  />
                  <span>নতুন (New)</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPostcardModalOpen(false);
                    setEditingPostcard(null);
                  }}
                  className="py-2 px-4 rounded bg-[#221a16] hover:bg-[#332720] text-[#a8957e]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] font-bold shadow border border-[#d4af37]/40"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== QUOTE CREATE/EDIT MODAL ===================== */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#161210] border border-[#b89758]/50 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => {
                setQuoteModalOpen(false);
                setEditingQuote(null);
              }}
              className="absolute top-4 right-4 text-[#a8957e] hover:text-white p-1"
            >
              ✕
            </button>

            <h3 className="font-bengali-serif text-xl font-bold text-[#faf4e6] mb-4">
              {editingQuote ? 'উক্তি সম্পাদনা করুন' : 'নতুন প্রেমের উক্তি যুক্ত করুন'}
            </h3>

            <form onSubmit={handleSaveQuote} className="space-y-4 text-xs font-bengali-serif">
              <div>
                <label className="block text-[#d5c6ae] mb-1">উক্তির মূল টেক্সট</label>
                <textarea
                  name="text"
                  required
                  rows={4}
                  defaultValue={editingQuote?.text || ''}
                  placeholder="উক্তি লিখুন..."
                  className="w-full py-2.5 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d5c6ae] mb-1">ক্যাটাগরি</label>
                  <select
                    name="category"
                    defaultValue={editingQuote?.category || 'প্রেম'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37]"
                  >
                    {categoriesList.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#d5c6ae] mb-1">লেখক / উৎস (ঐচ্ছিক)</label>
                  <input
                    name="author"
                    defaultValue={editingQuote?.author || ''}
                    placeholder="যেমন: মির্জা গালিব, রবীন্দ্রনাথ"
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)</label>
                <input
                  name="tags"
                  defaultValue={editingQuote?.tags.join(', ') || ''}
                  placeholder="প্রেম, বিরহ, গালিব"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuoteModalOpen(false);
                    setEditingQuote(null);
                  }}
                  className="py-2 px-4 rounded bg-[#221a16] hover:bg-[#332720] text-[#a8957e]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] font-bold shadow border border-[#d4af37]/40"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== GALLERY CREATE/EDIT MODAL ===================== */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#161210] border border-[#b89758]/50 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => {
                setGalleryModalOpen(false);
                setEditingGallery(null);
              }}
              className="absolute top-4 right-4 text-[#a8957e] hover:text-white p-1"
            >
              ✕
            </button>

            <h3 className="font-bengali-serif text-xl font-bold text-[#faf4e6] mb-4">
              {editingGallery ? 'গ্যালারি আর্ট সম্পাদন করুন' : 'নতুন গ্যালারি আর্ট যোগ করুন'}
            </h3>

            <form onSubmit={handleSaveGallery} className="space-y-4 text-xs font-bengali-serif">
              <div>
                <label className="block text-[#d5c6ae] mb-1">আর্টওয়ার্ক শিরোনাম</label>
                <input
                  name="title"
                  required
                  defaultValue={editingGallery?.title || ''}
                  placeholder="যেমন: Forever Begins With A Memory"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125] focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d5c6ae] mb-1">ক্যাটাগরি</label>
                  <input
                    name="category"
                    required
                    defaultValue={editingGallery?.category || 'Vintage Love'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>

                <div>
                  <label className="block text-[#d5c6ae] mb-1">অ্যাকসেন্ট কালার (Hex)</label>
                  <input
                    name="accentColor"
                    defaultValue={editingGallery?.accentColor || '#d4af37'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">মূল কোট টেক্সট</label>
                <input
                  name="quoteText"
                  required
                  defaultValue={editingGallery?.quoteText || ''}
                  placeholder="আর্টওয়ার্কে প্রদর্শিত টেক্সট..."
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">সাবটেক্সট (ঐচ্ছিক)</label>
                <input
                  name="subtext"
                  defaultValue={editingGallery?.subtext || ''}
                  placeholder="যেমন: — চিরকালীন ভালোবাসার স্মৃতিসৌধ"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">আর্টওয়ার্ক মোটিফ</label>
                <select
                  name="artworkType"
                  defaultValue={editingGallery?.artworkType || 'rose-botanical'}
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                >
                  <option value="rose-botanical">Rose Botanical</option>
                  <option value="rainy-umbrella">Rainy Umbrella</option>
                  <option value="gramophone-melody">Gramophone</option>
                  <option value="vintage-window">Vintage Window</option>
                  <option value="moonlight-sea">Moonlight</option>
                  <option value="train-station">Train Station</option>
                  <option value="nostalgic-tree">Nostalgic Tree</option>
                  <option value="letter-quill">Letter & Quill</option>
                </select>
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">ট্যাগসমূহ</label>
                <input
                  name="tags"
                  defaultValue={editingGallery?.tags.join(', ') || ''}
                  placeholder="memory, love, forever"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setGalleryModalOpen(false);
                    setEditingGallery(null);
                  }}
                  className="py-2 px-4 rounded bg-[#221a16] hover:bg-[#332720] text-[#a8957e]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] font-bold shadow border border-[#d4af37]/40"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== CATEGORY CREATE/EDIT MODAL ===================== */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-[#161210] border border-[#b89758]/50 rounded-2xl p-6 shadow-2xl my-8">
            <button
              onClick={() => {
                setCategoryModalOpen(false);
                setEditingCategory(null);
              }}
              className="absolute top-4 right-4 text-[#a8957e] hover:text-white p-1"
            >
              ✕
            </button>

            <h3 className="font-bengali-serif text-xl font-bold text-[#faf4e6] mb-4">
              {editingCategory ? 'ক্যাটাগরি সম্পাদনা করুন' : 'নতুন ক্যাটাগরি তৈরি করুন'}
            </h3>

            <form onSubmit={handleSaveCategory} className="space-y-4 text-xs font-bengali-serif">
              <div>
                <label className="block text-[#d5c6ae] mb-1">ক্যাটাগরির নাম</label>
                <input
                  name="name"
                  required
                  defaultValue={editingCategory?.name || ''}
                  placeholder="যেমন: গোধূলির প্রেম"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#d5c6ae] mb-1">ইমোজি আইকন</label>
                  <input
                    name="icon"
                    required
                    defaultValue={editingCategory?.icon || '❤️'}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>

                <div>
                  <label className="block text-[#d5c6ae] mb-1">পোস্টকার্ড সংখ্যা</label>
                  <input
                    name="count"
                    type="number"
                    defaultValue={editingCategory?.count || 15}
                    className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">সংক্ষিপ্ত বিবরণ</label>
                <input
                  name="description"
                  required
                  defaultValue={editingCategory?.description || ''}
                  placeholder="মুড বা অনুভূতির বিবরণ..."
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div>
                <label className="block text-[#d5c6ae] mb-1">URL Slug</label>
                <input
                  name="slug"
                  defaultValue={editingCategory?.slug || ''}
                  placeholder="যেমন: godhulir-prem"
                  className="w-full py-2 px-3 rounded bg-[#1f1713] text-[#faf4e6] border border-[#3f3125]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="py-2 px-4 rounded bg-[#221a16] hover:bg-[#332720] text-[#a8957e]"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] font-bold shadow border border-[#d4af37]/40"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
