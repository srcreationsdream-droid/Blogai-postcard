import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0908] border-t border-[#292019] text-[#a89884] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💌</span>
            <span className="font-bengali-serif text-lg font-bold text-[#faf4e6]">
              {SITE_CONFIG.siteName}
            </span>
          </div>
          <p className="text-sm font-bengali-serif text-[#b8a792] max-w-sm">
            “{SITE_CONFIG.tagline}”
          </p>
          <p className="text-xs text-[#736352] mt-1 font-serif">
            বাঙালির নস্টালজিয়া ও প্রেমের চিরন্তন পোস্টকার্ড আর্কাইভ
          </p>
        </div>

        {/* Links Navigation */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('postcards')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Postcards
          </button>
          <button
            onClick={() => onNavigate('quotes')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Quotes
          </button>
          <button
            onClick={() => onNavigate('gallery')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Gallery
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Terms
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            Contact
          </button>
          <button
            onClick={() => onNavigate('/admin')}
            className="text-[#8c7865] hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
          >
            <span>🔐</span> Admin
          </button>
        </div>
      </div>

      {/* Hairline Divider & Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#211a14] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6e5d4d] gap-2">
        <p>© {currentYear} {SITE_CONFIG.siteName}। সর্বস্বত্ব সংরক্ষিত।</p>
        <p className="font-mono text-[11px]">
          HIGH RESOLUTION POSTAL ARCHIVE ENGINE
        </p>
      </div>
    </footer>
  );
};
