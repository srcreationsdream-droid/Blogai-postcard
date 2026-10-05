import React, { useState } from 'react';
import { QuoteItem } from '../types';

interface QuoteCardProps {
  quote: QuoteItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onUseQuote: (quote: QuoteItem) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({
  quote,
  isFavorite,
  onToggleFavorite,
  onUseQuote
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(quote.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#181412] border border-[#3a2f26] hover:border-[#b89758]/50 rounded-lg p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg">
      <div>
        {/* Category & Favorite Header */}
        <div className="flex items-center justify-between text-xs text-[#a3907c] mb-3">
          <span className="text-[#d4af37] font-bengali-serif">{quote.category}</span>
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              title="উক্তিটি কপি করুন"
              className="p-1 rounded text-[#a3907c] hover:text-[#f4eee2] hover:bg-[#2b221c] transition-colors text-xs"
            >
              {copied ? '✓ কপি হয়েছে' : '📋'}
            </button>
            <button
              onClick={() => onToggleFavorite(quote.id)}
              className={`p-1 rounded transition-colors text-xs ${
                isFavorite ? 'text-[#e04f5f]' : 'text-[#a3907c] hover:text-[#d4af37]'
              }`}
            >
              {isFavorite ? '❤️' : '♡'}
            </button>
          </div>
        </div>

        {/* Quote Prose */}
        <p className="font-bengali-serif text-[#f0e7d8] text-sm sm:text-base leading-relaxed italic">
          “{quote.text}”
        </p>

        {quote.author && (
          <div className="mt-2 text-right">
            <span className="font-bengali-serif text-xs text-[#d4af37]/80">
              — {quote.author}
            </span>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 border-t border-[#31261d] flex items-center justify-end">
        <button
          onClick={() => onUseQuote(quote)}
          className="py-1.5 px-3 rounded bg-[#2b221c] hover:bg-[#8c232c] text-[#dfcfb9] hover:text-white text-xs font-bengali-serif transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>ব্যবহার করুন</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
