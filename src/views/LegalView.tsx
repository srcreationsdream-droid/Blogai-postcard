import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

interface LegalViewProps {
  section: 'privacy' | 'terms' | 'contact';
  onNavigate: (tab: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ section, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Navigation tabs between legal sections */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="flex items-center p-1 bg-[#181311] rounded-lg border border-[#382d23] text-xs sm:text-sm font-medium">
          <button
            onClick={() => onNavigate('privacy')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              section === 'privacy'
                ? 'bg-[#3b2d22] text-[#d4af37] shadow-sm font-bold'
                : 'text-[#a3907c] hover:text-[#faf4e6]'
            }`}
          >
            গোপনীয়তা নীতি (Privacy)
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              section === 'terms'
                ? 'bg-[#3b2d22] text-[#d4af37] shadow-sm font-bold'
                : 'text-[#a3907c] hover:text-[#faf4e6]'
            }`}
          >
            ব্যবহারের শর্তাবলি (Terms)
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${
              section === 'contact'
                ? 'bg-[#3b2d22] text-[#d4af37] shadow-sm font-bold'
                : 'text-[#a3907c] hover:text-[#faf4e6]'
            }`}
          >
            যোগাযোগ (Contact)
          </button>
        </div>
      </div>

      <div className="bg-[#14100e] border border-[#382d23] rounded-2xl p-6 sm:p-10 shadow-xl space-y-6 text-[#cfc1ad] leading-relaxed font-serif">
        {section === 'privacy' && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#faf4e6] border-b border-[#2e2319] pb-3">
              গোপনীয়তা নীতি (Privacy Policy)
            </h1>
            <p className="text-sm font-bengali-serif">
              {SITE_CONFIG.siteName}-এ আপনার ব্যক্তিগত গোপনীয়তা রক্ষা করা আমাদের অন্যতম অঙ্গীকার। নিচে আমাদের তথ্য ব্যবস্থাপনা নীতিমালা সংক্ষেপে উল্লেখ করা হলো:
            </p>

            <h3 className="text-lg font-bengali-serif font-semibold text-[#d4af37] pt-2">
              ১. ব্রাউজার স্টোরেজ (localStorage) ব্যবহার
            </h3>
            <p className="text-sm font-bengali-serif">
              আমাদের প্ল্যাটফর্মে পোস্টকার্ড ও উক্তি সংরক্ষণ করতে কোনো অ্যাকাউন্ট বা লগইনের প্রয়োজন নেই। আপনার পছন্দের তালিকা (Favorites) এবং পোস্টকার্ড ড্রাফট আপনার নিজস্ব ডিভাইসের ব্রাউজার <code>localStorage</code>-এ সংরক্ষিত থাকে। এই তথ্য আমাদের সার্ভারে পাঠানো বা ট্র্যাক করা হয় না।
            </p>

            <h3 className="text-lg font-bengali-serif font-semibold text-[#d4af37] pt-2">
              ২. স্পনসর ডাউনলোড গেট ও কোনো ট্র্যাকিং নেই
            </h3>
            <p className="text-sm font-bengali-serif">
              পোস্টকার্ড ডাউনলোডের পূর্বে একটি স্পনসর গেট প্রদর্শিত হয় যা একটি নতুন ট্যাবে স্পনসর পেজ উন্মুক্ত করে এবং একটি সাধারণ ৮-সেকেন্ডের টাইমার পরিচালনা করে। আমরা কোনো ব্যবহারকারীর বাহ্যিক স্পনসর সাইটের কার্যকলাপ নিরীক্ষণ বা নজরদারি (invasive tracking) করি না।
            </p>

            <h3 className="text-lg font-bengali-serif font-semibold text-[#d4af37] pt-2">
              ৩. ব্যবহারকারীর ছবি আপলোড নিষ্প্রয়োজন
            </h3>
            <p className="text-sm font-bengali-serif">
              ব্লগএআই পোস্টকার্ড প্ল্যাটফর্ম ব্যবহারের জন্য ব্যবহারকারীদের কোনো ছবি বা ব্যক্তিগত ফাইল আপলোড করার প্রয়োজন নেই। সমস্ত আর্টওয়ার্ক প্ল্যাটফর্মের নিজস্ব প্রাক-সংরক্ষিত ভিন্টেজ লাইব্রেরি থেকে সরবরাহ করা হয়।
            </p>
          </>
        )}

        {section === 'terms' && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#faf4e6] border-b border-[#2e2319] pb-3">
              ব্যবহারের শর্তাবলি (Terms of Service)
            </h1>
            <p className="text-sm font-bengali-serif">
              {SITE_CONFIG.siteName} ওয়েবসাইটটি ব্যবহারের মাধ্যমে আপনি নিম্নলিখিত শর্তাবলি মেনে নিচ্ছেন:
            </p>

            <h3 className="text-lg font-bengali-serif font-semibold text-[#d4af37] pt-2">
              ১. ব্যক্তিগত ও অবাণিজ্যিক ব্যবহার
            </h3>
            <p className="text-sm font-bengali-serif">
              তৈরিকৃত ভিন্টেজ পোস্টকার্ডসমূহ আপনার ব্যক্তিগত উপহার, স্মৃতি সংরক্ষণ, সোশ্যাল মিডিয়া শেয়ার বা প্রিন্টের উদ্দেশ্যে সম্পূর্ণ বিনামূল্যে ব্যবহারযোগ্য।
            </p>

            <h3 className="text-lg font-bengali-serif font-semibold text-[#d4af37] pt-2">
              ২. শালীন ও সুরুচিপূর্ণ ভাষা
            </h3>
            <p className="text-sm font-bengali-serif">
              পোস্টকার্ডে নিজের বার্তা লেখার সময় কোনো প্রকার কুরুচিপূর্ণ, আক্রমণাত্মক বা ধর্মীয় অনুভূতিতে আঘাত হানে এমন ভাষা ব্যবহার করা নিষিদ্ধ।
            </p>

            <h3 className="text-lg font-bengali-serif font-semibold text-[#d4af37] pt-2">
              ৩. ডাউনলোড শর্তাবলি
            </h3>
            <p className="text-sm font-bengali-serif">
              প্রতিটি পোস্টকার্ড বা গ্যালারি আর্ট ডাউনলোড প্রক্রিয়া স্পনসর কাউন্টডাউন গেটের মাধ্যমে সুরক্ষিত। কাউন্টডাউন শেষ হওয়ার পর ব্যবহারকারী হাই-রেজুলিউশনে ইমেজ ডাউনলোড করতে পারবেন।
            </p>
          </>
        )}

        {section === 'contact' && (
          <>
            <h1 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-[#faf4e6] border-b border-[#2e2319] pb-3">
              যোগাযোগ (Contact)
            </h1>
            <p className="text-sm font-bengali-serif">
              {SITE_CONFIG.siteName} সম্পর্কিত যেকোনো মতামত, নতুন ভিন্টেজ ডিজাইন প্রস্তাব বা অনুসন্ধানের জন্য নির্দ্বিধায় আমাদের সাথে যোগাযোগ করুন।
            </p>

            <div className="bg-[#1c1613] p-5 rounded-xl border border-[#3b2d20] space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <div className="text-xs text-[#a3907c] font-bengali-serif">ইমেইল:</div>
                  <div className="text-sm font-mono text-[#d4af37]">{SITE_CONFIG.contactEmail}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">📮</span>
                <div>
                  <div className="text-xs text-[#a3907c] font-bengali-serif">আর্কাইভ ঠিকানা:</div>
                  <div className="text-sm font-bengali-serif text-[#faf4e6]">
                    ব্লগএআই ভিন্টেজ পোস্টকার্ড কালেকশন • ঢাকা, বাংলাদেশ
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8c7a67] font-serif pt-4">
              আপনার মতামত আমাদের বাংলা সাহিত্যের সুন্দর উক্তি ও নস্টালজিক ভিন্টেজ আর্টকে আরও সমৃদ্ধ করতে সাহায্য করবে।
            </p>
          </>
        )}
      </div>
    </div>
  );
};
