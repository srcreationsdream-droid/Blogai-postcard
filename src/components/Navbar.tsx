import React, { useState } from 'react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, filterCategory?: string) => void;
  favoritesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  favoritesCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'postcards', label: 'Postcards' },
    { id: 'quotes', label: 'Quotes' },
    { id: 'gallery', label: 'Vintage Gallery' },
    { id: 'categories', label: 'Categories' },
    {
      id: 'favorites',
      label: `Favorites${favoritesCount > 0 ? ` (${favoritesCount})` : ''}`
    }
  ];

  const handleNav = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#120f0d]/95 backdrop-blur border-b border-[#362b22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single Brand element */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="text-xl">💌</span>
          <span className="font-bengali-serif text-lg sm:text-xl font-bold tracking-tight text-[#faf4e6] group-hover:text-[#d4af37] transition-colors">
            ব্লগএআই পোস্টকার্ড
          </span>
        </button>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`transition-colors cursor-pointer py-1 border-b-2 ${
                  isActive
                    ? 'text-[#d4af37] border-[#d4af37] font-semibold'
                    : 'text-[#d0c2ae] border-transparent hover:text-[#faf4e6]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNav('create')}
            className="py-2 px-3.5 sm:px-4 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-xs sm:text-sm font-bengali-serif font-semibold shadow-md border border-[#d4af37]/40 transition-all cursor-pointer whitespace-nowrap"
          >
            ✨ পোস্টকার্ড তৈরি করুন
          </button>

          {/* Hamburger toggle button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 text-[#d5c6ae] hover:text-white rounded-md bg-[#221a16] border border-[#3d2f24]"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#181412] border-b border-[#3d2f24] px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`w-full text-left py-2 px-3 rounded text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-[#2b221c] text-[#d4af37] font-bold'
                  : 'text-[#cfc1ad] hover:bg-[#221b16]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
