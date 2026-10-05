import React from 'react';
import { PostcardTemplate } from '../types';
import { VintageArtwork } from './VintageArtwork';

interface PostcardCardProps {
  template: PostcardTemplate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (template: PostcardTemplate) => void;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({
  template,
  isFavorite,
  onToggleFavorite,
  onSelect
}) => {
  return (
    <div className="group relative bg-[#181412] border border-[#3a2f26] hover:border-[#b89758]/60 rounded-lg p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/50">
      {/* Top Artwork Miniature Preview */}
      <div
        onClick={() => onSelect(template)}
        className="relative aspect-[3/2] w-full rounded border border-[#4d3d2e] overflow-hidden bg-[#faf5eb] p-2 flex flex-col justify-between cursor-pointer"
        style={{
          backgroundImage: 'radial-gradient(#c7b28c 0.6px, transparent 0.6px)',
          backgroundSize: '16px 16px'
        }}
      >
        {/* Subtle postal header */}
        <div className="flex justify-between items-center text-[7px] font-mono text-[#8a6a42]">
          <span>POST CARD</span>
          <span className="text-[#8c2a32] font-serif">15P</span>
        </div>

        {/* Artwork icon */}
        <div className="my-auto flex justify-center items-center opacity-85">
          <VintageArtwork type={template.artworkType} className="w-20 h-20" accentColor="#73522a" />
        </div>

        {/* Truncated Quote snippet */}
        <p className="text-[10px] text-[#3d2c1e] font-bengali-serif line-clamp-2 italic text-center px-1">
          “{template.defaultQuote}”
        </p>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(template.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-[#8c232c] text-white'
              : 'bg-[#181412]/80 text-[#d4af37] hover:bg-[#8c232c] hover:text-white'
          }`}
        >
          <span className="text-xs">{isFavorite ? '❤️' : '♡'}</span>
        </button>
      </div>

      {/* Card Info & Actions */}
      <div className="mt-3 flex flex-col">
        <div className="flex items-center justify-between text-xs text-[#a3907c] mb-1">
          <span className="font-bengali-serif text-[#d4af37]">{template.category}</span>
          <span className="font-mono text-[10px]">ID: {template.id}</span>
        </div>

        <h4
          onClick={() => onSelect(template)}
          className="font-bengali-serif text-sm sm:text-base font-semibold text-[#f4eee2] hover:text-[#d4af37] cursor-pointer line-clamp-1 transition-colors"
        >
          {template.title}
        </h4>

        {/* Action Button: ব্যবহার করুন */}
        <button
          onClick={() => onSelect(template)}
          className="mt-3 w-full py-2 px-3 rounded bg-[#261f1b] hover:bg-[#8c232c] text-[#e8dac7] hover:text-white text-xs sm:text-sm font-bengali-serif font-medium border border-[#4d3d2e] hover:border-[#b89758] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>ব্যবহার করুন</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};
