import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadConfirm: () => void;
  isDownloading?: boolean;
  itemTitle?: string;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({
  isOpen,
  onClose,
  onDownloadConfirm,
  isDownloading = false,
  itemTitle = 'আপনার ভিন্টেজ পোস্টকার্ড'
}) => {
  const [countdown, setCountdown] = useState<number>(SITE_CONFIG.downloadCountdown);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [hasOpenedSponsor, setHasOpenedSponsor] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset states whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setCountdown(SITE_CONFIG.downloadCountdown);
      setIsCounting(false);
      setIsUnlocked(false);
      setHasOpenedSponsor(false);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  // Handle countdown interval
  useEffect(() => {
    if (isCounting && countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsCounting(false);
            setIsUnlocked(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCounting, countdown]);

  // Keyboard accessibility: ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isDownloading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDownloading, onClose]);

  if (!isOpen) return null;

  const handleOpenSponsor = () => {
    try {
      // 1. Attempt to open SITE_CONFIG.sponsorUrl in a new tab/window
      window.open(SITE_CONFIG.sponsorUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup may have been blocked:', e);
    }
    // 2. Start countdown & state updates
    setHasOpenedSponsor(true);
    setIsCounting(true);
  };

  const handleFinalDownload = () => {
    if (isUnlocked && !isDownloading) {
      onDownloadConfirm();
    }
  };

  const formatCountdown = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sponsor-modal-title"
    >
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={!isDownloading ? onClose : undefined} />

      {/* Modal Dialog Card */}
      <div
        className="relative z-10 w-full max-w-md bg-[#181412] text-[#f4eee2] rounded-xl border border-[#b89758]/50 shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px rgba(184, 151, 88, 0.15)'
        }}
      >
        {/* Subtle decorative top filigree header */}
        <div className="text-[#b89758]/70 text-xs tracking-widest uppercase mb-1 flex items-center gap-2">
          <span>❧</span>
          <span>পোস্টকার্ড ডাউনলোড গেট</span>
          <span>☙</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDownloading}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-[#d5c6ae]/60 hover:text-[#f4eee2] p-1 rounded-md transition-colors disabled:opacity-50"
        >
          ✕
        </button>

        {/* Title */}
        <h3
          id="sponsor-modal-title"
          className="text-2xl font-bengali-serif font-bold text-[#faf4e6] mt-2 mb-2"
        >
          💌 আপনার পোস্টকার্ড প্রস্তুত
        </h3>

        {/* Item preview context */}
        <p className="text-xs text-[#b8a48b] mb-4 line-clamp-1 italic font-serif">
          {itemTitle}
        </p>

        {/* Instruction Text */}
        <div className="bg-[#241e1b] rounded-lg p-3.5 border border-[#4a3b2c] w-full mb-5 text-sm text-[#e4d8c5]">
          <p className="font-bengali-serif text-sm">
            ডাউনলোড চালু করার আগে Sponsor Page দেখুন।
          </p>
          <p className="text-xs text-[#a0907e] mt-1 font-serif">
            স্পনসর পেজে ক্লিক করার পর ৮ সেকেন্ডের টাইমার স্বয়ংক্রিয়ভাবে ডাউনলোড আনলক করবে।
          </p>
        </div>

        {/* Action 1: Sponsor Button */}
        {!hasOpenedSponsor ? (
          <button
            onClick={handleOpenSponsor}
            className="w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] font-bengali-serif font-semibold text-base shadow-lg border border-[#d4af37]/40 transition-all transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>👁️ Sponsor দেখুন</span>
          </button>
        ) : (
          <div className="w-full flex flex-col items-center">
            {/* Countdown Display */}
            <div className="my-2 flex flex-col items-center justify-center">
              {isCounting ? (
                <>
                  <div className="text-5xl font-mono font-bold tracking-wider text-[#d4af37] animate-pulse">
                    {formatCountdown(countdown)}
                  </div>
                  <div className="text-xs text-[#c4b59f] font-bengali-serif mt-2 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                    Download প্রস্তুত হচ্ছে...
                  </div>
                </>
              ) : isUnlocked ? (
                <>
                  <div className="text-3xl font-bengali-serif font-bold text-emerald-400 flex items-center gap-2">
                    <span>✓</span> READY
                  </div>
                  <div className="text-xs text-emerald-300/80 font-bengali-serif mt-1">
                    ✅ Download Ready — এখন সেভ করুন!
                  </div>
                </>
              ) : null}
            </div>

            {/* Optional Sponsor Re-open link if popup was blocked */}
            {!isUnlocked && (
              <button
                onClick={handleOpenSponsor}
                className="text-[11px] text-[#b89758] hover:underline mt-2 mb-3"
              >
                পেজ খোলেনি? পুনরায় স্পনসর লিঙ্ক খুলুন
              </button>
            )}

            {/* Action 2: Final Download Button */}
            <button
              onClick={handleFinalDownload}
              disabled={!isUnlocked || isDownloading}
              className={`w-full mt-3 py-3.5 px-6 rounded-lg font-bengali-serif font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                isUnlocked && !isDownloading
                  ? 'bg-gradient-to-r from-[#205e3b] to-[#144229] hover:from-[#267046] hover:to-[#194f31] text-[#f2faee] border border-emerald-500/50 shadow-lg cursor-pointer transform active:scale-98'
                  : 'bg-[#2b2420] text-[#716455] border border-[#3e352f] cursor-not-allowed'
              }`}
            >
              {isDownloading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                  ইমেজ রেন্ডার হচ্ছে...
                </span>
              ) : isUnlocked ? (
                <span>⬇️ DOWNLOAD NOW</span>
              ) : (
                <span>🔒 Download Locked ({formatCountdown(countdown)}s)</span>
              )}
            </button>
          </div>
        )}

        {/* Micro Footer Notice */}
        <p className="text-[10px] text-[#786b5c] mt-4 font-mono">
          ব্লগএআই সুরক্ষিত ডাউনলোড চ্যানেল • কোনো ওয়াটারমার্ক ছাড়া HD কোয়ালিটি
        </p>
      </div>
    </div>
  );
};
