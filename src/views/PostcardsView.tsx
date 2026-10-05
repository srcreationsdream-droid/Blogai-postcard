import React, { useState } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { CATEGORIES_DATA } from '../data/categories';
import { PostcardTemplate } from '../types';
import { PostcardCard } from '../components/PostcardCard';
import { toggleFavorite, isFavorite } from '../utils/storage';

interface PostcardsViewProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  initialCategory?: string;
}

export const PostcardsView: React.FC<PostcardsViewProps> = ({
  onSelectPostcard,
  initialCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setFavTick] = useState(0);

  const handleToggleFav = (id: string) => {
    toggleFavorite('postcards', id);
    setFavTick((p) => p + 1);
  };

  const filtered = POSTCARD_TEMPLATES.filter((p) => {
    const matchesCategory = selectedCategory === 'সব' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.defaultQuote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
          POSTCARD TEMPLATE ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-4xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
          পোস্টকার্ড কালেকশন
        </h1>
        <p className="text-sm font-bengali-serif text-[#b8a48e] mt-1">
          রোমান্টিক, বৃষ্টি, বিরহ ও নস্টালজিক সব ধরনের সুন্দর ভিন্টেজ পোস্টকার্ড থেকে বেছে নিন।
        </p>

        {/* Search Bar */}
        <div className="mt-4 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পোস্টকার্ড খুঁজুন... (উদা: বৃষ্টি, চিঠি, কলকাতা)"
            className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none text-sm font-bengali-serif shadow-inner"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7865] text-sm">
            🔍
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        <button
          onClick={() => setSelectedCategory('সব')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bengali-serif font-medium whitespace-nowrap transition-colors cursor-pointer border ${
            selectedCategory === 'সব'
              ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
              : 'bg-[#181311] text-[#a3907c] border-[#382d23] hover:text-[#faf4e6]'
          }`}
        >
          সব ডিজাইন ({POSTCARD_TEMPLATES.length})
        </button>

        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bengali-serif whitespace-nowrap transition-colors cursor-pointer border flex items-center gap-1.5 ${
              selectedCategory === cat.name
                ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37] font-semibold'
                : 'bg-[#181311] text-[#a3907c] border-[#382d23] hover:text-[#faf4e6]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Postcards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((tmpl) => (
            <PostcardCard
              key={tmpl.id}
              template={tmpl}
              isFavorite={isFavorite('postcards', tmpl.id)}
              onToggleFavorite={handleToggleFav}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#161210] rounded-xl border border-[#33281e]">
          <div className="text-3xl mb-2">📜</div>
          <h3 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো পোস্টকার্ড পাওয়া যায়নি</h3>
          <p className="text-xs text-[#a3907c] mt-1 font-serif">
            ক্যাটাগরি পরিবর্তন করুন অথবা অন্য কোনো অনুসন্ধান শব্দ ব্যবহার করুন।
          </p>
        </div>
      )}
    </div>
  );
};
