import React, { useState } from 'react';
import { QUOTES_DATA } from '../data/quotes';
import { CATEGORIES_DATA } from '../data/categories';
import { QuoteItem } from '../types';
import { QuoteCard } from '../components/QuoteCard';
import { toggleFavorite, isFavorite } from '../utils/storage';

interface QuotesViewProps {
  onUseQuote: (quote: QuoteItem) => void;
  initialCategory?: string;
}

export const QuotesView: React.FC<QuotesViewProps> = ({
  onUseQuote,
  initialCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [, setFavTick] = useState(0);

  const handleToggleFav = (id: string) => {
    toggleFavorite('quotes', id);
    setFavTick((p) => p + 1);
  };

  const filtered = QUOTES_DATA.filter((q) => {
    const matchesCategory = selectedCategory === 'সব' || q.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
          BENGALI ROMANTIC & NOSTALGIC QUOTES
        </span>
        <h1 className="text-3xl sm:text-4xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
          হৃদয়ছোঁয়া প্রেমের উক্তি
        </h1>
        <p className="text-sm font-bengali-serif text-[#b8a48e] mt-1">
          ভালোবাসা, বিরহ, বৃষ্টি ও স্মৃতির চিরায়ত পঙক্তিমালা। এক ক্লিকে পোস্টকার্ডে ব্যবহার করুন।
        </p>

        {/* Search */}
        <div className="mt-4 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="উক্তি খুঁজুন... (উদা: তুমি, স্মৃতি, বৃষ্টি, দূরত্ব)"
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
          সব উক্তি ({QUOTES_DATA.length})
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

      {/* Quotes Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((quote) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              isFavorite={isFavorite('quotes', quote.id)}
              onToggleFavorite={handleToggleFav}
              onUseQuote={onUseQuote}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#161210] rounded-xl border border-[#33281e]">
          <div className="text-3xl mb-2">✍️</div>
          <h3 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো উক্তি পাওয়া যায়নি</h3>
          <p className="text-xs text-[#a3907c] mt-1 font-serif">
            অনুসন্ধানের জন্য অন্য কোনো শব্দ ব্যবহার করুন।
          </p>
        </div>
      )}
    </div>
  );
};
