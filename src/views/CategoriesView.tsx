import React from 'react';
import { CATEGORIES_DATA } from '../data/categories';

interface CategoriesViewProps {
  onSelectCategory: (categoryName: string, targetTab: 'postcards' | 'quotes') => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
          CATEGORIES & MOODS
        </span>
        <h1 className="text-3xl sm:text-4xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
          ক্যাটাগরি বেছে নিন
        </h1>
        <p className="text-sm font-bengali-serif text-[#b8a48e] mt-1">
          ভালোবাসার প্রতিটি সূক্ষ্ম অনুভূতির জন্য আমাদের আলাদা পোস্টকার্ড ও উক্তি সংগ্রহ রয়েছে।
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {CATEGORIES_DATA.map((cat) => (
          <div
            key={cat.name}
            className="bg-[#181311] border border-[#382d23] hover:border-[#b89758] rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-[11px] font-mono text-[#d4af37] bg-[#271f1a] px-2 py-0.5 rounded border border-[#4a392c]">
                  {cat.count}+ পোস্টকার্ড
                </span>
              </div>

              <h3 className="font-bengali-serif text-lg font-bold text-[#faf4e6] group-hover:text-[#d4af37] transition-colors">
                {cat.name}
              </h3>

              <p className="text-xs text-[#a3907c] font-bengali-serif mt-1.5 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#292019] flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectCategory(cat.name, 'postcards')}
                className="flex-1 py-1.5 px-2 rounded bg-[#251d18] hover:bg-[#8c232c] text-[#dfcfb9] hover:text-white text-xs font-bengali-serif font-medium border border-[#3d2f23] transition-colors text-center cursor-pointer"
              >
                পোস্টকার্ড দেখুন
              </button>
              <button
                onClick={() => onSelectCategory(cat.name, 'quotes')}
                className="py-1.5 px-3 rounded bg-[#1f1713] hover:bg-[#33261e] text-[#a8957e] hover:text-[#d4af37] text-xs font-bengali-serif border border-[#33251a] transition-colors cursor-pointer"
              >
                উক্তি →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
