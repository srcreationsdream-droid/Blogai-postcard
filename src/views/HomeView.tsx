import React, { useState } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { CATEGORIES_DATA } from '../data/categories';
import { PostcardTemplate } from '../types';
import { PostcardCard } from '../components/PostcardCard';
import { PostcardPreview } from '../components/PostcardPreview';
import { toggleFavorite, isFavorite } from '../utils/storage';

interface HomeViewProps {
  onSelectPostcard: (template: PostcardTemplate) => void;
  onNavigate: (tab: string, filterCategory?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectPostcard,
  onNavigate
}) => {
  const [, setFavTick] = useState(0);

  const handleToggleFav = (id: string) => {
    toggleFavorite('postcards', id);
    setFavTick((p) => p + 1);
  };

  // Featured collections
  const popularPostcards = POSTCARD_TEMPLATES.filter((p) => p.popular).slice(0, 4);
  const newPostcards = POSTCARD_TEMPLATES.filter((p) => p.isNew || p.featured).slice(0, 4);
  const romanticPostcards = POSTCARD_TEMPLATES.filter(
    (p) => p.category === 'রোমান্টিক' || p.category === 'প্রেম'
  ).slice(0, 4);
  const rainyPostcards = POSTCARD_TEMPLATES.filter(
    (p) => p.category === 'বৃষ্টি'
  ).slice(0, 4);
  const letterPostcards = POSTCARD_TEMPLATES.filter(
    (p) => p.category === 'প্রেমপত্র' || p.category === 'Bengali Vintage'
  ).slice(0, 4);

  // Hero interactive sample
  const heroTemplate = POSTCARD_TEMPLATES[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 border-b border-[#2e241c]">
        {/* Subtle radial amber gradient behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d4af37]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left: Brand & Copy */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#261f1a] border border-[#4a3a2d] text-xs font-serif text-[#d4af37] mb-4">
              <span>💌</span>
              <span>ব্লগএআই পোস্টকার্ড আর্কাইভ</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bengali-serif font-bold text-[#faf4e6] leading-[1.2] tracking-tight">
              পুরনো দিনের অনুভূতি,<br />
              <span className="text-[#d4af37]">আজকের ভালোবাসার জন্য।</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg font-bengali-serif text-[#c5b59f] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Postcard। পুরনো চিঠি ও ডাকটিকিটের মায়াবী ছোঁয়ায় ভালোবাসার কথা জানান।
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate('create')}
                className="py-3 px-6 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-base font-bengali-serif font-bold shadow-xl border border-[#d4af37]/40 transition-all cursor-pointer transform hover:scale-102 flex items-center gap-2"
              >
                <span>✨ পোস্টকার্ড তৈরি করুন</span>
              </button>

              <button
                onClick={() => onNavigate('gallery')}
                className="py-3 px-6 rounded-lg bg-[#221a16] hover:bg-[#322720] text-[#e8dac7] text-base font-bengali-serif font-medium border border-[#4d3d2e] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>🖼️ Vintage Gallery দেখুন</span>
              </button>
            </div>

            {/* Micro proof markers */}
            <div className="mt-8 pt-6 border-t border-[#292019] flex items-center justify-center lg:justify-start gap-6 text-xs text-[#9c8974]">
              <span className="flex items-center gap-1.5 font-serif">
                <span>✦</span> ১০০% ফ্রি ও ওয়াটারমার্কহীন
              </span>
              <span className="flex items-center gap-1.5 font-serif">
                <span>✦</span> আল্ট্রা HD প্রিন্ট রেডি
              </span>
            </div>
          </div>

          {/* Right: Realistic Vintage Postcard Preview Box */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group max-w-lg w-full transform hover:rotate-0 transition-transform duration-500 rotate-1">
              {/* Antique envelope peek effect in background */}
              <div className="absolute -inset-3 bg-[#1e1713] rounded-xl border border-[#423325] -rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-2xl" />

              <div className="relative z-10">
                <PostcardPreview
                  template={heroTemplate}
                  customization={{
                    templateId: heroTemplate.id,
                    recipient: 'প্রিয়তমা',
                    quoteText: heroTemplate.defaultQuote,
                    sender: 'ইতি, তোমার অমল',
                    date: 'শ্রাবণ, ১৩৮২',
                    fontFamily: 'bengali-serif',
                    fontSize: 15,
                    isBold: false,
                    isItalic: false,
                    textAlign: 'center',
                    letterSpacing: 0,
                    lineHeight: 1.6,
                    textColor: '#2b2118',
                    textPosition: 'center',
                    effect: 'warm-vintage',
                    ratio: 'postcard'
                  }}
                />
              </div>

              {/* Float action banner */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20">
                <button
                  onClick={() => onSelectPostcard(heroTemplate)}
                  className="py-2 px-4 rounded-full bg-[#181412] hover:bg-[#8c232c] text-[#d4af37] hover:text-white border border-[#b89758] shadow-lg text-xs font-bengali-serif font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>এই ডিজাইনটি কাস্টমাইজ করুন</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-[#291f17]">
          <div>
            <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
              EXPLORE BY MOOD & THEME
            </span>
            <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
              ক্যাটাগরি বেছে নিন
            </h2>
          </div>
          <button
            onClick={() => onNavigate('categories')}
            className="text-xs sm:text-sm font-bengali-serif text-[#d4af37] hover:underline mt-2 sm:mt-0 flex items-center gap-1 cursor-pointer"
          >
            <span>সব ক্যাটাগরি দেখুন ({CATEGORIES_DATA.length})</span>
            <span>→</span>
          </button>
        </div>

        {/* 14 Clickable Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {CATEGORIES_DATA.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onNavigate('postcards', cat.name)}
              className="group p-3.5 rounded-xl bg-[#181311] border border-[#362b21] hover:border-[#b89758] transition-all flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:shadow-black/40"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform mb-1.5">
                {cat.icon}
              </span>
              <span className="text-xs sm:text-sm font-bengali-serif font-semibold text-[#faf4e6] group-hover:text-[#d4af37] transition-colors">
                {cat.name}
              </span>
              <span className="text-[10px] text-[#8c7865] font-serif mt-0.5">
                {cat.count}+ পোস্টকার্ড
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED: জনপ্রিয় পোস্টকার্ড */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#291f17]">
          <h2 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#faf4e6] flex items-center gap-2">
            <span>🔥</span> জনপ্রিয় পোস্টকার্ড
          </h2>
          <button
            onClick={() => onNavigate('postcards')}
            className="text-xs sm:text-sm font-bengali-serif text-[#d4af37] hover:underline cursor-pointer"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularPostcards.map((p) => (
            <PostcardCard
              key={p.id}
              template={p}
              isFavorite={isFavorite('postcards', p.id)}
              onToggleFavorite={handleToggleFav}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* FEATURED: নতুন পোস্টকার্ড */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#291f17]">
          <h2 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#faf4e6] flex items-center gap-2">
            <span>✨</span> নতুন পোস্টকার্ড
          </h2>
          <button
            onClick={() => onNavigate('postcards')}
            className="text-xs sm:text-sm font-bengali-serif text-[#d4af37] hover:underline cursor-pointer"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newPostcards.map((p) => (
            <PostcardCard
              key={p.id}
              template={p}
              isFavorite={isFavorite('postcards', p.id)}
              onToggleFavorite={handleToggleFav}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* FEATURED: Romantic Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#291f17]">
          <h2 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#faf4e6] flex items-center gap-2">
            <span>❤️</span> Romantic Collection
          </h2>
          <button
            onClick={() => onNavigate('postcards', 'রোমান্টিক')}
            className="text-xs sm:text-sm font-bengali-serif text-[#d4af37] hover:underline cursor-pointer"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {romanticPostcards.map((p) => (
            <PostcardCard
              key={p.id}
              template={p}
              isFavorite={isFavorite('postcards', p.id)}
              onToggleFavorite={handleToggleFav}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* FEATURED: Rainy Love Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#291f17]">
          <h2 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#faf4e6] flex items-center gap-2">
            <span>🌧️</span> Rainy Love Collection
          </h2>
          <button
            onClick={() => onNavigate('postcards', 'বৃষ্টি')}
            className="text-xs sm:text-sm font-bengali-serif text-[#d4af37] hover:underline cursor-pointer"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rainyPostcards.map((p) => (
            <PostcardCard
              key={p.id}
              template={p}
              isFavorite={isFavorite('postcards', p.id)}
              onToggleFavorite={handleToggleFav}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* FEATURED: Vintage Letter Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#291f17]">
          <h2 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#faf4e6] flex items-center gap-2">
            <span>💌</span> Vintage Letter Collection
          </h2>
          <button
            onClick={() => onNavigate('postcards', 'প্রেমপত্র')}
            className="text-xs sm:text-sm font-bengali-serif text-[#d4af37] hover:underline cursor-pointer"
          >
            সব দেখুন →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {letterPostcards.map((p) => (
            <PostcardCard
              key={p.id}
              template={p}
              isFavorite={isFavorite('postcards', p.id)}
              onToggleFavorite={handleToggleFav}
              onSelect={onSelectPostcard}
            />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS / 4-STEP WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-[#161210] rounded-2xl border border-[#33281e]">
        <div className="text-center mb-8">
          <span className="text-xs font-mono text-[#d4af37] tracking-widest uppercase">
            SIMPLE & BEAUTIFUL WORKFLOW
          </span>
          <h3 className="text-2xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
            যেভাবে কাজ করে
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-[#1c1613] border border-[#3a2d21] flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#8c232c] text-white flex items-center justify-center font-bold text-sm mb-3">
              ১
            </span>
            <h4 className="font-bengali-serif text-base font-bold text-[#faf4e6]">ডিজাইন নির্বাচন</h4>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              বৃষ্টি, প্রেমপত্র বা নস্টালজিক যেকোনো ভিন্টেজ টেমপ্লেট বেছে নিন।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1613] border border-[#3a2d21] flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#8c232c] text-white flex items-center justify-center font-bold text-sm mb-3">
              ২
            </span>
            <h4 className="font-bengali-serif text-base font-bold text-[#faf4e6]">উক্তি বা নিজের লেখা</h4>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              রেডিমেড রোমান্টিক উক্তি পছন্দ করুন অথবা নিজের প্রিয় মানুষটির জন্য লিখুন।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1613] border border-[#3a2d21] flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#8c232c] text-white flex items-center justify-center font-bold text-sm mb-3">
              ৩
            </span>
            <h4 className="font-bengali-serif text-base font-bold text-[#faf4e6]">সহজ কাস্টমাইজ</h4>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              বাঙালি ক্যালিগ্রাফি বা টাইপরাইটার ফন্ট ও সেপিয়া ইফেক্ট দিন।
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1c1613] border border-[#3a2d21] flex flex-col items-center">
            <span className="w-10 h-10 rounded-full bg-[#8c232c] text-white flex items-center justify-center font-bold text-sm mb-3">
              ৪
            </span>
            <h4 className="font-bengali-serif text-base font-bold text-[#faf4e6]">HD ডাউনলোড</h4>
            <p className="text-xs text-[#a3907c] mt-1 font-serif">
              ৮ সেকেন্ডের স্পনসর কাউন্টডাউন শেষে সরাসরি ডাউনলোড করুন ফুল HD ইমেজ।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
