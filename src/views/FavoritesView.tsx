import React, { useState, useEffect } from 'react';
import { getFavorites, toggleFavorite } from '../utils/storage';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES_DATA } from '../data/quotes';
import { GALLERY_ITEMS } from '../data/gallery';
import { PostcardTemplate, QuoteItem, GalleryItem } from '../types';
import { PostcardCard } from '../components/PostcardCard';
import { QuoteCard } from '../components/QuoteCard';
import { GalleryCard } from '../components/GalleryCard';
import { SponsorModal } from '../components/SponsorModal';
import { exportElementAsImage } from '../utils/export';

interface FavoritesViewProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  onUseQuote: (quote: QuoteItem) => void;
  onUseInGenerator?: (item: GalleryItem) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectPostcard,
  onUseQuote,
  onUseInGenerator
}) => {
  const [activeTab, setActiveTab] = useState<'postcards' | 'quotes' | 'gallery'>('postcards');
  const [favState, setFavState] = useState(getFavorites());
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [sponsorModalOpen, setSponsorModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  useEffect(() => {
    const handleUpdate = () => {
      setFavState(getFavorites());
    };
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  const handleToggle = (type: 'postcards' | 'quotes' | 'gallery', id: string) => {
    toggleFavorite(type, id);
    setFavState(getFavorites());
  };

  const favoritedPostcards = POSTCARD_TEMPLATES.filter((p) => favState.postcards.includes(p.id));
  const favoritedQuotes = QUOTES_DATA.filter((q) => favState.quotes.includes(q.id));
  const favoritedGallery = GALLERY_ITEMS.filter((g) => favState.gallery.includes(g.id));

  const handleGalleryDownloadRequest = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setSponsorModalOpen(true);
  };

  const handleExecuteGalleryDownload = async () => {
    if (!selectedGalleryItem) return;
    setIsExporting(true);
    const node = document.getElementById(`gallery-artwork-${selectedGalleryItem.id}`);
    if (node) {
      await exportElementAsImage(node, {
        format: 'png',
        filename: `blogai-fav-gallery-${selectedGalleryItem.id}`
      });
      setSponsorModalOpen(false);
    }
    setIsExporting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
          SAVED FAVORITES
        </span>
        <h1 className="text-3xl sm:text-4xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
          ♡ আমার পছন্দ
        </h1>
        <p className="text-sm font-bengali-serif text-[#b8a48e] mt-1">
          আপনার সংরক্ষিত প্রিয় পোস্টকার্ড, উক্তি ও গ্যালারি আর্ট। এই তথ্য আপনার ব্রাউজারে সংরক্ষিত থাকে।
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="flex items-center p-1 bg-[#181311] rounded-lg border border-[#382d23] text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('postcards')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'postcards'
                ? 'bg-[#3b2d22] text-[#d4af37] shadow-sm font-bold'
                : 'text-[#a3907c] hover:text-[#faf4e6]'
            }`}
          >
            পোস্টকার্ড ({favoritedPostcards.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-[#3b2d22] text-[#d4af37] shadow-sm font-bold'
                : 'text-[#a3907c] hover:text-[#faf4e6]'
            }`}
          >
            উক্তি ({favoritedQuotes.length})
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#3b2d22] text-[#d4af37] shadow-sm font-bold'
                : 'text-[#a3907c] hover:text-[#faf4e6]'
            }`}
          >
            গ্যালারি ({favoritedGallery.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'postcards' && (
        favoritedPostcards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {favoritedPostcards.map((p) => (
              <PostcardCard
                key={p.id}
                template={p}
                isFavorite={true}
                onToggleFavorite={(id) => handleToggle('postcards', id)}
                onSelect={onSelectPostcard}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#161210] rounded-xl border border-[#33281e]">
            <div className="text-3xl mb-2">💌</div>
            <h3 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো পোস্টকার্ড পছন্দের তালিকায় নেই</h3>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              পছন্দের পোস্টকার্ডের ওপর ♡ বাটনে ক্লিক করে এখানে যুক্ত করুন।
            </p>
          </div>
        )
      )}

      {activeTab === 'quotes' && (
        favoritedQuotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {favoritedQuotes.map((q) => (
              <QuoteCard
                key={q.id}
                quote={q}
                isFavorite={true}
                onToggleFavorite={(id) => handleToggle('quotes', id)}
                onUseQuote={onUseQuote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#161210] rounded-xl border border-[#33281e]">
            <div className="text-3xl mb-2">✍️</div>
            <h3 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো উক্তি পছন্দের তালিকায় নেই</h3>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              পছন্দের উক্তির পাশে ♡ বাটনে ক্লিক করে সংরক্ষণ করুন।
            </p>
          </div>
        )
      )}

      {activeTab === 'gallery' && (
        favoritedGallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritedGallery.map((item) => (
              <GalleryCard
                key={item.id}
                item={item}
                isFavorite={true}
                onToggleFavorite={(id) => handleToggle('gallery', id)}
                onDownloadRequest={handleGalleryDownloadRequest}
                onUseInGenerator={onUseInGenerator}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#161210] rounded-xl border border-[#33281e]">
            <div className="text-3xl mb-2">🖼️</div>
            <h3 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো গ্যালারি আর্ট পছন্দের তালিকায় নেই</h3>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              ভিন্টেজ গ্যালারি থেকে পছন্দের আর্টের ওপর ♡ বাটনে ক্লিক করুন।
            </p>
          </div>
        )
      )}

      {selectedGalleryItem && (
        <SponsorModal
          isOpen={sponsorModalOpen}
          onClose={() => setSponsorModalOpen(false)}
          onDownloadConfirm={handleExecuteGalleryDownload}
          isDownloading={isExporting}
          itemTitle={selectedGalleryItem.title}
        />
      )}
    </div>
  );
};
