import React from 'react';
import { GalleryItem } from '../types';
import { VintageArtwork } from './VintageArtwork';

interface GalleryCardProps {
  item: GalleryItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onDownloadRequest: (item: GalleryItem) => void;
  onUseInGenerator?: (item: GalleryItem) => void;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onDownloadRequest,
  onUseInGenerator
}) => {
  return (
    <div className="bg-[#181412] border border-[#382d23] hover:border-[#b89758]/50 rounded-lg p-3 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group">
      {/* Artwork Canvas View */}
      <div
        id={`gallery-artwork-${item.id}`}
        className={`relative aspect-square w-full rounded border border-[#524131] overflow-hidden bg-gradient-to-b ${item.bgColor} p-6 flex flex-col justify-between shadow-inner`}
      >
        {/* Subtle decorative border & filigree inside */}
        <div className="absolute inset-2 border border-[#b89758]/20 rounded pointer-events-none" />
        
        {/* Top header */}
        <div className="flex justify-between items-center text-[9px] font-mono text-[#a38965] tracking-widest uppercase">
          <span>{item.category}</span>
          <span>ART ARCHIVE</span>
        </div>

        {/* Center Artwork & Typography */}
        <div className="my-auto flex flex-col items-center text-center py-2">
          <div className="w-16 h-16 mb-3 opacity-80">
            <VintageArtwork type={item.artworkType} className="w-full h-full" accentColor={item.accentColor} />
          </div>
          <h4
            className="font-bengali-serif text-base sm:text-lg font-bold leading-snug px-2"
            style={{ color: item.accentColor }}
          >
            “{item.quoteText}”
          </h4>
          {item.subtext && (
            <p className="text-[11px] text-[#b8a48e] font-serif mt-1 italic">
              {item.subtext}
            </p>
          )}
        </div>

        {/* Bottom Vintage Stamp */}
        <div className="flex justify-between items-end text-[8px] font-mono text-[#8a755d]">
          <span>ব্লগএআই গ্যালারি</span>
          <span className="text-[#b89758]">HD ARCHIVE</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-[#8c232c] text-white'
              : 'bg-[#181412]/80 text-[#d4af37] hover:bg-[#8c232c] hover:text-white'
          }`}
        >
          <span className="text-xs">{isFavorite ? '❤️' : '♡'}</span>
        </button>
      </div>

      {/* Info & Download Actions */}
      <div className="mt-3 flex flex-col gap-2">
        <h5 className="font-bengali-serif text-sm font-semibold text-[#f4eee2] line-clamp-1">
          {item.title}
        </h5>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDownloadRequest(item)}
            className="flex-1 py-2 px-3 rounded bg-[#8c232c] hover:bg-[#a32833] text-white text-xs font-bengali-serif font-medium shadow border border-[#b89758]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>⬇️ HD Download</span>
          </button>

          {onUseInGenerator && (
            <button
              onClick={() => onUseInGenerator(item)}
              title="এডিটরে ব্যবহার করুন"
              className="py-2 px-2.5 rounded bg-[#27201c] hover:bg-[#382e27] text-[#d6c5af] text-xs font-bengali-serif border border-[#4a3b2e] transition-colors"
            >
              ✏️
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
