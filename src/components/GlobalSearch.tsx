import React, { useState, useMemo } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES_DATA } from '../data/quotes';
import { GALLERY_ITEMS } from '../data/gallery';
import { PostcardTemplate, QuoteItem, GalleryItem } from '../types';

interface GlobalSearchProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  onSelectQuote: (quote: QuoteItem) => void;
  onSelectGallery: (item: GalleryItem) => void;
  initialQuery?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  onSelectPostcard,
  onSelectQuote,
  onSelectGallery,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState<'all' | 'postcards' | 'quotes' | 'gallery'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        postcards: POSTCARD_TEMPLATES.slice(0, 4),
        quotes: QUOTES_DATA.slice(0, 4),
        gallery: GALLERY_ITEMS.slice(0, 4)
      };
    }

    const matchString = (str?: string) => str?.toLowerCase().includes(q) || false;
    const matchTags = (tags?: string[]) => tags?.some(t => t.toLowerCase().includes(q)) || false;

    const matchedPostcards = POSTCARD_TEMPLATES.filter(p =>
      matchString(p.title) ||
      matchString(p.category) ||
      matchString(p.defaultQuote) ||
      matchTags(p.tags)
    );

    const matchedQuotes = QUOTES_DATA.filter(qItem =>
      matchString(qItem.text) ||
      matchString(qItem.category) ||
      matchString(qItem.author) ||
      matchTags(qItem.tags)
    );

    const matchedGallery = GALLERY_ITEMS.filter(g =>
      matchString(g.title) ||
      matchString(g.category) ||
      matchString(g.quoteText) ||
      matchTags(g.tags)
    );

    return {
      postcards: matchedPostcards,
      quotes: matchedQuotes,
      gallery: matchedGallery
    };
  }, [query]);

  const totalResults =
    filtered.postcards.length + filtered.quotes.length + filtered.gallery.length;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Search Input Bar */}
      <div className="relative w-full max-w-2xl mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="উক্তি বা পোস্টকার্ড খুঁজুন... (উদা: বৃষ্টি, চিঠি, গোলাপ, বিরহ)"
          className="w-full py-3.5 pl-11 pr-10 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-sm sm:text-base font-bengali-serif shadow-inner transition-all"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c7865] text-base">
          🔍
        </span>
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8c7865] hover:text-[#faf4e6] text-sm p-1"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Tabs (Interactive segmented buttons per constitution) */}
      <div className="flex items-center gap-1.5 p-1 bg-[#181412] rounded-lg border border-[#382d23] text-xs font-medium mb-6">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#3b2e23] text-[#d4af37] shadow-sm font-semibold'
              : 'text-[#a3907c] hover:text-[#faf4e6]'
          }`}
        >
          সব ফলাফল ({totalResults})
        </button>
        <button
          onClick={() => setActiveFilter('postcards')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'postcards'
              ? 'bg-[#3b2e23] text-[#d4af37] shadow-sm font-semibold'
              : 'text-[#a3907c] hover:text-[#faf4e6]'
          }`}
        >
          পোস্টকার্ড ({filtered.postcards.length})
        </button>
        <button
          onClick={() => setActiveFilter('quotes')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'quotes'
              ? 'bg-[#3b2e23] text-[#d4af37] shadow-sm font-semibold'
              : 'text-[#a3907c] hover:text-[#faf4e6]'
          }`}
        >
          উক্তি ({filtered.quotes.length})
        </button>
        <button
          onClick={() => setActiveFilter('gallery')}
          className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
            activeFilter === 'gallery'
              ? 'bg-[#3b2e23] text-[#d4af37] shadow-sm font-semibold'
              : 'text-[#a3907c] hover:text-[#faf4e6]'
          }`}
        >
          গ্যালারি আর্ট ({filtered.gallery.length})
        </button>
      </div>

      {/* Empty State */}
      {query && totalResults === 0 && (
        <div className="text-center py-10 px-4 bg-[#181412] rounded-xl border border-[#362b22] w-full max-w-lg">
          <div className="text-3xl mb-2">📜</div>
          <h4 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো ফলাফল পাওয়া যায়নি</h4>
          <p className="text-xs text-[#a3907c] mt-1 font-serif">
            “{query}” শব্দের সাথে মিলে এমন কোনো পোস্টকার্ড বা উক্তি পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।
          </p>
        </div>
      )}

      {/* Results View */}
      <div className="w-full space-y-8">
        {/* Postcards Section */}
        {(activeFilter === 'all' || activeFilter === 'postcards') && filtered.postcards.length > 0 && (
          <div>
            <h4 className="font-bengali-serif text-base font-semibold text-[#d4af37] mb-3 flex items-center gap-2">
              <span>💌</span> পোস্টকার্ড ডিজাইন ({filtered.postcards.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.postcards.map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectPostcard(p)}
                  className="bg-[#181412] border border-[#3a2f24] hover:border-[#b89758] p-3 rounded-lg cursor-pointer transition-all hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] text-[#d4af37] font-bengali-serif">{p.category}</span>
                    <h5 className="font-bengali-serif text-sm font-semibold text-[#faf4e6] mt-0.5 line-clamp-1">{p.title}</h5>
                    <p className="text-xs text-[#c5b59f] font-bengali-serif line-clamp-2 mt-1 italic">“{p.defaultQuote}”</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#2d241c] text-right">
                    <span className="text-xs text-[#b89758] font-bengali-serif">এডিট করুন →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotes Section */}
        {(activeFilter === 'all' || activeFilter === 'quotes') && filtered.quotes.length > 0 && (
          <div>
            <h4 className="font-bengali-serif text-base font-semibold text-[#d4af37] mb-3 flex items-center gap-2">
              <span>✍️</span> প্রেমের উক্তি ({filtered.quotes.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.quotes.map(q => (
                <div
                  key={q.id}
                  onClick={() => onSelectQuote(q)}
                  className="bg-[#181412] border border-[#3a2f24] hover:border-[#b89758] p-3.5 rounded-lg cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] text-[#d4af37] font-bengali-serif">{q.category}</span>
                    <p className="font-bengali-serif text-sm text-[#faf4e6] mt-1 leading-relaxed italic">
                      “{q.text}”
                    </p>
                  </div>
                  <div className="mt-3 text-right">
                    <span className="text-xs text-[#b89758] font-bengali-serif">পোস্টকার্ডে লিখুন →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {(activeFilter === 'all' || activeFilter === 'gallery') && filtered.gallery.length > 0 && (
          <div>
            <h4 className="font-bengali-serif text-base font-semibold text-[#d4af37] mb-3 flex items-center gap-2">
              <span>🖼️</span> ভিন্টেজ গ্যালারি আর্ট ({filtered.gallery.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filtered.gallery.map(g => (
                <div
                  key={g.id}
                  onClick={() => onSelectGallery(g)}
                  className="bg-[#181412] border border-[#3a2f24] hover:border-[#b89758] p-3 rounded-lg cursor-pointer transition-all flex flex-col justify-between"
                >
                  <div className="aspect-square bg-[#221a15] rounded border border-[#4a392a] p-3 flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] text-[#b89758] uppercase font-mono">{g.category}</span>
                    <p className="font-bengali-serif text-xs font-semibold text-[#faf4e6] mt-1 line-clamp-2">
                      “{g.quoteText}”
                    </p>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-[#a3907c] font-bengali-serif line-clamp-1">{g.title}</span>
                    <span className="text-[#b89758] shrink-0">ডাউনলোড →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
