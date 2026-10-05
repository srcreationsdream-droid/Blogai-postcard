import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../types';
import { GalleryCard } from '../components/GalleryCard';
import { SponsorModal } from '../components/SponsorModal';
import { exportElementAsImage } from '../utils/export';
import { toggleFavorite, isFavorite } from '../utils/storage';

interface GalleryViewProps {
  onUseInGenerator?: (item: GalleryItem) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onUseInGenerator }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('সব');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [sponsorModalOpen, setSponsorModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [, setFavTick] = useState(0);

  const handleToggleFav = (id: string) => {
    toggleFavorite('gallery', id);
    setFavTick((p) => p + 1);
  };

  const handleDownloadRequest = (item: GalleryItem) => {
    setSelectedGalleryItem(item);
    setFeedbackMessage(null);
    setSponsorModalOpen(true);
  };

  const handleExecuteDownload = async () => {
    if (!selectedGalleryItem) return;
    setIsExporting(true);
    setFeedbackMessage(null);

    const node = document.getElementById(`gallery-artwork-${selectedGalleryItem.id}`);
    if (!node) {
      setFeedbackMessage('আর্টওয়ার্ক নোড পাওয়া যায়নি।');
      setIsExporting(false);
      return;
    }

    try {
      const success = await exportElementAsImage(node, {
        format: 'png',
        filename: `blogai-vintage-gallery-${selectedGalleryItem.id}`
      });

      if (success) {
        setFeedbackMessage('✅ গ্যালারি আর্টওয়ার্ক ডাউনলোড সম্পন্ন হয়েছে!');
        setSponsorModalOpen(false);
      } else {
        setFeedbackMessage('ডাউনলোড তৈরি করা যায়নি। আবার চেষ্টা করুন।');
      }
    } catch {
      setFeedbackMessage('ডাউনলোড তৈরি করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  const categories = ['সব', ...Array.from(new Set(GALLERY_ITEMS.map((g) => g.category)))];

  const filtered = GALLERY_ITEMS.filter((g) => {
    const matchesCategory = selectedCategory === 'সব' || g.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.quoteText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
          CURATED VINTAGE ARTWORK COLLECTION
        </span>
        <h1 className="text-3xl sm:text-4xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
          🖼️ Vintage Quote Gallery
        </h1>
        <p className="text-sm font-bengali-serif text-[#b8a48e] mt-1">
          পূর্ব-প্রস্তুত উচ্চমানের ভিন্টেজ আর্ট ও কোটেশন। সরাসরি দেখুন এবং ডাউনলোড করুন।
        </p>

        {/* Search */}
        <div className="mt-4 relative max-w-md mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="গ্যালারি খুঁজুন... (উদা: memory, বৃষ্টি, গল্প)"
            className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-[#1c1613] text-[#faf4e6] placeholder-[#8c7865] border border-[#4d3d2e] focus:border-[#d4af37] focus:outline-none text-sm font-bengali-serif shadow-inner"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8c7865] text-sm">
            🔍
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bengali-serif whitespace-nowrap transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37] font-semibold'
                : 'bg-[#181311] text-[#a3907c] border-[#382d23] hover:text-[#faf4e6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {feedbackMessage && (
        <div className="max-w-md mx-auto mb-6 p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-200 text-xs font-bengali-serif text-center">
          {feedbackMessage}
        </div>
      )}

      {/* Gallery Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              isFavorite={isFavorite('gallery', item.id)}
              onToggleFavorite={handleToggleFav}
              onDownloadRequest={handleDownloadRequest}
              onUseInGenerator={onUseInGenerator}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#161210] rounded-xl border border-[#33281e]">
          <div className="text-3xl mb-2">🖼️</div>
          <h3 className="font-bengali-serif text-lg text-[#faf4e6]">কোনো আর্টওয়ার্ক পাওয়া যায়নি</h3>
          <p className="text-xs text-[#a3907c] mt-1 font-serif">
            অনুসন্ধানের জন্য অন্য কোনো শব্দ ব্যবহার করুন।
          </p>
        </div>
      )}

      {/* Sponsor Modal */}
      {selectedGalleryItem && (
        <SponsorModal
          isOpen={sponsorModalOpen}
          onClose={() => setSponsorModalOpen(false)}
          onDownloadConfirm={handleExecuteDownload}
          isDownloading={isExporting}
          itemTitle={selectedGalleryItem.title}
        />
      )}
    </div>
  );
};
