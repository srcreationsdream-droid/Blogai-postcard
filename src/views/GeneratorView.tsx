import React, { useState, useRef, useEffect } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES_DATA } from '../data/quotes';
import { PostcardTemplate, QuoteItem, PostcardCustomization, FontFamilyType, TextPosition, VintageEffect, ExportRatio } from '../types';
import { PostcardPreview } from '../components/PostcardPreview';
import { SponsorModal } from '../components/SponsorModal';
import { exportElementAsImage } from '../utils/export';

interface GeneratorViewProps {
  initialTemplate?: PostcardTemplate;
  initialQuote?: string;
  onNavigate?: (tab: string) => void;
}

export const GeneratorView: React.FC<GeneratorViewProps> = ({
  initialTemplate,
  initialQuote,
  onNavigate
}) => {
  // Current active template
  const [selectedTemplate, setSelectedTemplate] = useState<PostcardTemplate>(
    initialTemplate || POSTCARD_TEMPLATES[0]
  );

  // Customization state
  const [customization, setCustomization] = useState<PostcardCustomization>({
    templateId: (initialTemplate || POSTCARD_TEMPLATES[0]).id,
    recipient: (initialTemplate || POSTCARD_TEMPLATES[0]).defaultRecipient || 'প্রিয়তমা',
    quoteText: initialQuote || (initialTemplate || POSTCARD_TEMPLATES[0]).defaultQuote,
    sender: (initialTemplate || POSTCARD_TEMPLATES[0]).defaultSender || 'ইতি, তোমার...',
    date: (initialTemplate || POSTCARD_TEMPLATES[0]).defaultDate || 'শ্রাবণ, ১৩৮২',
    fontFamily: (initialTemplate || POSTCARD_TEMPLATES[0]).style.fontFamily,
    fontSize: 16,
    isBold: false,
    isItalic: false,
    textAlign: 'center',
    letterSpacing: 0,
    lineHeight: 1.6,
    textColor: (initialTemplate || POSTCARD_TEMPLATES[0]).style.textColor,
    textPosition: (initialTemplate || POSTCARD_TEMPLATES[0]).style.textPosition,
    effect: 'original',
    ratio: 'postcard'
  });

  // Category filter for step 1 & 2
  const [quoteCategory, setQuoteCategory] = useState<string>('সব');
  const [templateCategory, setTemplateCategory] = useState<string>('সব');

  // Custom Text draft state
  const [customRecipient, setCustomRecipient] = useState<string>(customization.recipient);
  const [customQuote, setCustomQuote] = useState<string>(customization.quoteText);
  const [customSender, setCustomSender] = useState<string>(customization.sender);
  const [customDate, setCustomDate] = useState<string>(customization.date);

  // Sponsor Download Gate Modal state
  const [sponsorModalOpen, setSponsorModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpg'>('png');
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);
  const [exportErrorMessage, setExportErrorMessage] = useState<string | null>(null);

  // Ref to postcard DOM element
  const postcardNodeRef = useRef<HTMLDivElement>(null);

  // Sync when initial props change
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      setCustomization((prev) => ({
        ...prev,
        templateId: initialTemplate.id,
        recipient: initialTemplate.defaultRecipient || 'প্রিয়তমা',
        quoteText: initialQuote || initialTemplate.defaultQuote,
        sender: initialTemplate.defaultSender || 'ইতি, তোমার...',
        date: initialTemplate.defaultDate || '১৩৮২',
        fontFamily: initialTemplate.style.fontFamily,
        textColor: initialTemplate.style.textColor,
        textPosition: initialTemplate.style.textPosition
      }));
      setCustomRecipient(initialTemplate.defaultRecipient || 'প্রিয়তমা');
      setCustomQuote(initialQuote || initialTemplate.defaultQuote);
      setCustomSender(initialTemplate.defaultSender || 'ইতি, তোমার...');
      setCustomDate(initialTemplate.defaultDate || '১৩৮২');
    }
  }, [initialTemplate, initialQuote]);

  // Handle template selection
  const handleSelectTemplate = (template: PostcardTemplate) => {
    setSelectedTemplate(template);
    setCustomization((prev) => ({
      ...prev,
      templateId: template.id,
      textColor: template.style.textColor,
      fontFamily: template.style.fontFamily,
      textPosition: template.style.textPosition,
      quoteText: prev.quoteText || template.defaultQuote,
      recipient: prev.recipient || template.defaultRecipient || 'প্রিয়তমা',
      sender: prev.sender || template.defaultSender || 'ইতি, তোমার...',
      date: prev.date || template.defaultDate || ''
    }));
  };

  // Handle ready-made quote selection
  const handleSelectQuote = (quote: QuoteItem) => {
    setCustomization((prev) => ({ ...prev, quoteText: quote.text }));
    setCustomQuote(quote.text);
  };

  // Apply custom written text
  const handleApplyCustomText = () => {
    setCustomization((prev) => ({
      ...prev,
      recipient: customRecipient,
      quoteText: customQuote,
      sender: customSender,
      date: customDate
    }));
  };

  // Reset text styles
  const handleResetTextStyle = () => {
    setCustomization((prev) => ({
      ...prev,
      fontFamily: selectedTemplate.style.fontFamily,
      fontSize: 16,
      isBold: false,
      isItalic: false,
      textAlign: 'center',
      letterSpacing: 0,
      lineHeight: 1.6,
      textColor: selectedTemplate.style.textColor,
      textPosition: selectedTemplate.style.textPosition
    }));
  };

  // Surprise Me logic
  const handleSurpriseMe = () => {
    const randomTemplate = POSTCARD_TEMPLATES[Math.floor(Math.random() * POSTCARD_TEMPLATES.length)];
    const randomQuote = QUOTES_DATA[Math.floor(Math.random() * QUOTES_DATA.length)];
    const fontOptions: FontFamilyType[] = ['bengali-serif', 'bengali-calligraphy', 'bengali-vintage', 'typewriter'];
    const randomFont = fontOptions[Math.floor(Math.random() * fontOptions.length)];
    const posOptions: TextPosition[] = ['center', 'top', 'bottom', 'left', 'postal-split'];
    const randomPos = posOptions[Math.floor(Math.random() * posOptions.length)];

    setSelectedTemplate(randomTemplate);
    setCustomization((prev) => ({
      ...prev,
      templateId: randomTemplate.id,
      quoteText: randomQuote.text,
      recipient: randomTemplate.defaultRecipient || 'প্রিয়তমা',
      sender: randomTemplate.defaultSender || 'ইতি, তোমার...',
      date: randomTemplate.defaultDate || 'শ্রাবণ, ১৩৮২',
      fontFamily: randomFont,
      textPosition: randomPos,
      textColor: randomTemplate.style.textColor
    }));

    setCustomQuote(randomQuote.text);
    setCustomRecipient(randomTemplate.defaultRecipient || 'প্রিয়তমা');
    setCustomSender(randomTemplate.defaultSender || 'ইতি, তোমার...');
    setCustomDate(randomTemplate.defaultDate || 'শ্রাবণ, ১৩৮২');
  };

  // Trigger download gate
  const handleInitiateDownload = () => {
    setExportErrorMessage(null);
    setExportSuccessMessage(null);
    setSponsorModalOpen(true);
  };

  // Perform actual download after sponsor timer completes
  const handleExecuteDownload = async () => {
    if (!postcardNodeRef.current) return;
    setIsExporting(true);
    setExportErrorMessage(null);

    try {
      const success = await exportElementAsImage(postcardNodeRef.current, {
        format: exportFormat,
        filename: `blogai-postcard-${selectedTemplate.id}-${Date.now()}`
      });

      if (success) {
        setExportSuccessMessage('✅ আপনার HD পোস্টকার্ড ডাউনলোড সফল হয়েছে!');
        setSponsorModalOpen(false);
      } else {
        setExportErrorMessage('ডাউনলোড তৈরি করা যায়নি। আবার চেষ্টা করুন।');
      }
    } catch {
      setExportErrorMessage('ডাউনলোড তৈরি করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  const filteredQuotes = quoteCategory === 'সব'
    ? QUOTES_DATA
    : QUOTES_DATA.filter((q) => q.category === quoteCategory);

  const filteredTemplates = templateCategory === 'সব'
    ? POSTCARD_TEMPLATES
    : POSTCARD_TEMPLATES.filter((t) => t.category === templateCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page Title & Tagline */}
      <div className="text-center mb-8">
        <span className="text-xs font-mono tracking-widest text-[#d4af37] uppercase">
          VINTAGE LOVE POSTCARD GENERATOR
        </span>
        <h1 className="text-3xl sm:text-4xl font-bengali-serif font-bold text-[#faf4e6] mt-1">
          💌 ব্লগএআই Postcard Generator
        </h1>
        <p className="text-sm font-bengali-serif text-[#b8a58e] mt-1">
          ডিজাইন বাছুন, মিষ্টি প্রেমের উক্তি দিন এবং তৈরি করুন অমলিন ভিন্টেজ পোস্টকার্ড।
        </p>

        {/* Surprise Me Quick Action */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSurpriseMe}
            className="py-2 px-4 rounded-full bg-[#271f1a] hover:bg-[#3d3128] text-[#d4af37] border border-[#b89758]/50 text-xs sm:text-sm font-bengali-serif font-medium transition-all shadow-md flex items-center gap-2 cursor-pointer transform hover:scale-102"
          >
            <span>🎲 Surprise Me</span>
            <span className="text-[11px] text-[#a8957e]">(অটো রেন্ডম পোস্টকার্ড)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout: Left (Live Preview & Export) / Right (Editor Controls) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Postcard Live Preview (Dominant visual anchor) */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col items-center">
          <div className="w-full bg-[#14100e] border border-[#382d23] rounded-xl p-4 sm:p-6 shadow-2xl flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-xs text-[#a8957e] mb-3 pb-2 border-b border-[#292019]">
              <span className="font-bengali-serif font-semibold text-[#d4af37]">
                লাইভ পোস্টকার্ড প্রিভিউ
              </span>
              <span className="font-mono text-[11px]">
                {customization.ratio.toUpperCase()} • HD
              </span>
            </div>

            {/* The Live Postcard Preview Component with ref */}
            <div className="w-full flex justify-center py-2">
              <PostcardPreview
                ref={postcardNodeRef}
                template={selectedTemplate}
                customization={customization}
              />
            </div>

            {/* Notifications / Alerts */}
            {exportSuccessMessage && (
              <div className="w-full mt-3 p-3 bg-emerald-950/80 border border-emerald-600/50 rounded-lg text-emerald-200 text-xs font-bengali-serif text-center">
                {exportSuccessMessage}
              </div>
            )}
            {exportErrorMessage && (
              <div className="w-full mt-3 p-3 bg-red-950/80 border border-red-600/50 rounded-lg text-red-200 text-xs font-bengali-serif text-center">
                {exportErrorMessage}
              </div>
            )}

            {/* Export Format & Ratio Selector */}
            <div className="w-full mt-4 pt-4 border-t border-[#292019] flex flex-col gap-3">
              {/* Aspect Ratio Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-[#b8a48e] font-bengali-serif">
                  এক্সপোর্ট সাইজ নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-xs">
                  {[
                    { id: 'reels', label: '🎥 Reels / রিলস (9:16)' },
                    { id: 'story', label: 'Story / স্টোরি (9:16)' },
                    { id: 'postcard', label: 'Postcard (3:2)' },
                    { id: 'square', label: 'Instagram (1:1)' },
                    { id: 'facebook', label: 'Facebook Post' },
                    { id: 'whatsapp', label: 'WhatsApp Status' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setCustomization((p) => ({ ...p, ratio: r.id as ExportRatio }))}
                      className={`py-1.5 px-2 rounded text-[11px] font-mono transition-colors cursor-pointer border ${
                        customization.ratio === r.id
                          ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                          : 'bg-[#1b1512] text-[#9c8974] border-[#31251b] hover:text-[#faf4e6]'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Format selection & Primary CTA Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                {/* Format Toggle */}
                <div className="flex items-center gap-1 bg-[#1c1613] p-1 rounded-lg border border-[#382d23] self-stretch sm:self-auto justify-center">
                  <button
                    onClick={() => setExportFormat('png')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                      exportFormat === 'png'
                        ? 'bg-[#8c232c] text-white'
                        : 'text-[#9c8974] hover:text-[#faf4e6]'
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => setExportFormat('jpg')}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-colors ${
                      exportFormat === 'jpg'
                        ? 'bg-[#8c232c] text-white'
                        : 'text-[#9c8974] hover:text-[#faf4e6]'
                    }`}
                  >
                    JPG
                  </button>
                </div>

                {/* Primary Download Button */}
                <button
                  onClick={handleInitiateDownload}
                  className="flex-1 w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#8c232c] to-[#6a151b] hover:from-[#a02832] hover:to-[#7c1b22] text-[#fff8ee] text-sm sm:text-base font-bengali-serif font-bold shadow-lg border border-[#d4af37]/40 transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <span>⬇️ HD পোস্টকার্ড ডাউনলোড করুন</span>
                </button>
              </div>

              <p className="text-[10px] text-[#786756] text-center font-mono mt-1">
                উচ্চ রেজুলেশন • কোনো ওয়াটারমার্ক ছাড়া খাঁটি ভিন্টেজ প্রিন্ট
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Editor Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* STEP 1: পোস্টকার্ড নির্বাচন করুন */}
          <div className="bg-[#14100e] border border-[#382d23] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bengali-serif font-bold text-[#faf4e6] flex items-center gap-2">
                <span>১. পোস্টকার্ড নির্বাচন করুন</span>
              </h3>
              <span className="text-xs text-[#a8957e] font-serif">
                মোট {POSTCARD_TEMPLATES.length}টি ডিজাইন
              </span>
            </div>

            {/* Category filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs scrollbar-thin">
              {['সব', 'বৃষ্টি', 'প্রেমপত্র', 'Bengali Vintage', 'রোমান্টিক', 'বিরহ', 'রাতের অনুভূতি', 'প্রপোজ'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTemplateCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs whitespace-nowrap font-bengali-serif transition-colors cursor-pointer ${
                    templateCategory === cat
                      ? 'bg-[#3b2d22] text-[#d4af37] border border-[#b89758]/50'
                      : 'bg-[#1b1512] text-[#9c8974] hover:text-[#faf4e6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Thumbnails Carousel/Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {filteredTemplates.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`relative p-2 rounded border cursor-pointer transition-all flex flex-col items-center text-center ${
                      isSelected
                        ? 'bg-[#2b2018] border-[#d4af37] ring-1 ring-[#d4af37]'
                        : 'bg-[#1a1411] border-[#382b20] hover:border-[#8c6d3b]'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#f4ebdc] flex items-center justify-center text-xs text-[#8c2a32] shadow-sm mb-1">
                      ✉️
                    </div>
                    <span className="text-[11px] font-bengali-serif text-[#faf4e6] line-clamp-1">
                      {tmpl.title.split('(')[0]}
                    </span>
                    <span className="text-[9px] text-[#9c8974] font-bengali-serif">
                      {tmpl.category}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2: উক্তি নির্বাচন করুন */}
          <div className="bg-[#14100e] border border-[#382d23] rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-bengali-serif font-bold text-[#faf4e6]">
                ২. উক্তি নির্বাচন করুন
              </h3>
              <button
                onClick={handleSurpriseMe}
                className="text-xs text-[#d4af37] hover:underline font-bengali-serif flex items-center gap-1 cursor-pointer"
              >
                <span>🎲 Surprise Me</span>
              </button>
            </div>

            {/* Category filter tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs scrollbar-thin">
              {['সব', 'প্রেম', 'রোমান্টিক', 'বিরহ', 'বৃষ্টি', 'প্রেমপত্র', 'স্মৃতি', 'প্রপোজ', 'মিস করা'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQuoteCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs whitespace-nowrap font-bengali-serif transition-colors cursor-pointer ${
                    quoteCategory === cat
                      ? 'bg-[#3b2d22] text-[#d4af37] border border-[#b89758]/50'
                      : 'bg-[#1b1512] text-[#9c8974] hover:text-[#faf4e6]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quotes List with [ব্যবহার করুন] button */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {filteredQuotes.map((q) => (
                <div
                  key={q.id}
                  className="p-3 rounded-lg bg-[#1a1411] border border-[#362a1f] flex flex-col justify-between hover:border-[#b89758]/50 transition-colors"
                >
                  <p className="text-xs sm:text-sm font-bengali-serif text-[#ebdcc8] italic leading-relaxed">
                    “{q.text}”
                  </p>
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-[#291e16]">
                    <span className="text-[10px] text-[#9c8974] font-bengali-serif">{q.category}</span>
                    <button
                      onClick={() => handleSelectQuote(q)}
                      className="py-1 px-2.5 rounded bg-[#2b211a] hover:bg-[#8c232c] text-[#d4af37] hover:text-white text-xs font-bengali-serif transition-colors cursor-pointer"
                    >
                      [ ব্যবহার করুন ]
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: নিজের লেখা লিখুন */}
          <div className="bg-[#14100e] border border-[#382d23] rounded-xl p-5 shadow-lg">
            <h3 className="text-base sm:text-lg font-bengali-serif font-bold text-[#faf4e6] mb-3">
              ✍️ অথবা নিজের লেখা লিখুন
            </h3>

            <div className="space-y-3">
              {/* Recipient */}
              <div>
                <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                  প্রাপক:
                </label>
                <input
                  type="text"
                  value={customRecipient}
                  onChange={(e) => setCustomRecipient(e.target.value)}
                  placeholder="প্রিয়তমা / সুচরিতেষু / প্রিয়..."
                  className="w-full py-2 px-3 rounded bg-[#1b1512] text-[#faf4e6] border border-[#382c20] text-sm font-bengali-serif focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              {/* Main Quote / Body */}
              <div>
                <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                  মূল লেখা:
                </label>
                <textarea
                  rows={3}
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  placeholder="এখানে আপনার নিজের লেখা লিখুন..."
                  className="w-full py-2 px-3 rounded bg-[#1b1512] text-[#faf4e6] border border-[#382c20] text-sm font-bengali-serif focus:border-[#d4af37] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Sender */}
                <div>
                  <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                    প্রেরক:
                  </label>
                  <input
                    type="text"
                    value={customSender}
                    onChange={(e) => setCustomSender(e.target.value)}
                    placeholder="ইতি, তোমার..."
                    className="w-full py-2 px-3 rounded bg-[#1b1512] text-[#faf4e6] border border-[#382c20] text-sm font-bengali-serif focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                    তারিখ (ঐচ্ছিক):
                  </label>
                  <input
                    type="text"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    placeholder="শ্রাবণ, ১৩৮২ / ১৯৭১"
                    className="w-full py-2 px-3 rounded bg-[#1b1512] text-[#faf4e6] border border-[#382c20] text-sm font-bengali-serif focus:border-[#d4af37] focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleApplyCustomText}
                className="w-full mt-2 py-2 px-4 rounded bg-[#33261e] hover:bg-[#4a372b] text-[#d4af37] font-bengali-serif text-sm font-medium border border-[#b89758]/40 transition-colors cursor-pointer"
              >
                লেখাটি ব্যবহার করুন
              </button>
            </div>
          </div>

          {/* STEP 4: টেক্সট ও ভিন্টেজ কাস্টমাইজেশন */}
          <div className="bg-[#14100e] border border-[#382d23] rounded-xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#291f17] pb-2">
              <h3 className="text-base sm:text-lg font-bengali-serif font-bold text-[#faf4e6]">
                🎨 টেক্সট ও ইফেক্ট কাস্টমাইজেশন
              </h3>
              <button
                onClick={handleResetTextStyle}
                className="text-xs text-[#b89758] hover:underline font-bengali-serif cursor-pointer"
              >
                Reset Text Style
              </button>
            </div>

            {/* Font Family Selection */}
            <div>
              <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                ফন্ট স্টাইল:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'bengali-serif', label: 'Elegant Bengali (সেরিফ)' },
                  { id: 'bengali-calligraphy', label: 'Handwritten (ক্যালিগ্রাফি)' },
                  { id: 'bengali-vintage', label: 'Vintage Serif (তিরো)' },
                  { id: 'typewriter', label: 'Typewriter (টাইপরাইটার)' },
                  { id: 'bengali-modern', label: 'Classic (অনেকা)' },
                  { id: 'vintage-serif', label: 'Old Newspaper (গারামন্ড)' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setCustomization((p) => ({ ...p, fontFamily: f.id as FontFamilyType }))}
                    className={`py-2 px-2.5 rounded text-left border transition-colors cursor-pointer ${
                      customization.fontFamily === f.id
                        ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                        : 'bg-[#1a1411] text-[#a8957e] border-[#362a1f] hover:text-[#faf4e6]'
                    }`}
                  >
                    <span className="block text-xs font-bengali-serif">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size & Weight & Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs text-[#b8a58e] mb-1 font-bengali-serif">
                  <span>ফন্ট সাইজ:</span>
                  <span className="font-mono">{customization.fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="13"
                  max="28"
                  value={customization.fontSize}
                  onChange={(e) => setCustomization((p) => ({ ...p, fontSize: Number(e.target.value) }))}
                  className="w-full accent-[#d4af37]"
                />
              </div>

              {/* Toggles: Bold, Italic, Alignment */}
              <div>
                <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                  স্টাইল ও অ্যালাইনমেন্ট:
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setCustomization((p) => ({ ...p, isBold: !p.isBold }))}
                    className={`py-1.5 px-3 rounded text-xs font-bold border transition-colors cursor-pointer ${
                      customization.isBold
                        ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                        : 'bg-[#1b1512] text-[#a8957e] border-[#362a1f]'
                    }`}
                  >
                    B
                  </button>
                  <button
                    onClick={() => setCustomization((p) => ({ ...p, isItalic: !p.isItalic }))}
                    className={`py-1.5 px-3 rounded text-xs italic border transition-colors cursor-pointer ${
                      customization.isItalic
                        ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                        : 'bg-[#1b1512] text-[#a8957e] border-[#362a1f]'
                    }`}
                  >
                    I
                  </button>
                  <div className="flex items-center gap-1 ml-auto">
                    {(['left', 'center', 'right'] as const).map((align) => (
                      <button
                        key={align}
                        onClick={() => setCustomization((p) => ({ ...p, textAlign: align }))}
                        className={`py-1.5 px-2.5 rounded text-xs border uppercase transition-colors cursor-pointer ${
                          customization.textAlign === align
                            ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                            : 'bg-[#1b1512] text-[#a8957e] border-[#362a1f]'
                        }`}
                      >
                        {align === 'left' ? '⫷' : align === 'center' ? '☰' : '⫸'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Position */}
            <div>
              <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                টেক্সট পজিশন:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-xs">
                {[
                  { id: 'center', label: 'মাঝখানে' },
                  { id: 'top', label: 'উপরে' },
                  { id: 'bottom', label: 'নিচে' },
                  { id: 'left', label: 'বাম পাশে' },
                  { id: 'postal-split', label: 'স্প্লিট চিঠি' }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => setCustomization((p) => ({ ...p, textPosition: pos.id as TextPosition }))}
                    className={`py-1.5 px-2 rounded font-bengali-serif transition-colors cursor-pointer border ${
                      customization.textPosition === pos.id
                        ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                        : 'bg-[#1b1512] text-[#9c8974] border-[#31251b] hover:text-[#faf4e6]'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vintage Effects */}
            <div>
              <label className="block text-xs font-bengali-serif text-[#b8a58e] mb-1">
                ভিন্টেজ ইফেক্ট:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                {[
                  { id: 'original', label: 'Original' },
                  { id: 'sepia', label: 'Sepia' },
                  { id: 'old-paper', label: 'Old Paper' },
                  { id: 'faded', label: 'Faded' },
                  { id: 'bw', label: 'Black & White' },
                  { id: 'film-grain', label: 'Film Grain' },
                  { id: 'coffee-stain', label: 'Coffee Stain' },
                  { id: 'warm-vintage', label: 'Warm Vintage' }
                ].map((eff) => (
                  <button
                    key={eff.id}
                    onClick={() => setCustomization((p) => ({ ...p, effect: eff.id as VintageEffect }))}
                    className={`py-1.5 px-2 rounded font-serif text-[11px] transition-colors cursor-pointer border ${
                      customization.effect === eff.id
                        ? 'bg-[#3b2d22] text-[#d4af37] border-[#d4af37]'
                        : 'bg-[#1b1512] text-[#9c8974] border-[#31251b] hover:text-[#faf4e6]'
                    }`}
                  >
                    {eff.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Second Sponsor Download Gate Modal */}
      <SponsorModal
        isOpen={sponsorModalOpen}
        onClose={() => setSponsorModalOpen(false)}
        onDownloadConfirm={handleExecuteDownload}
        isDownloading={isExporting}
        itemTitle={`${selectedTemplate.title} — ${customization.ratio.toUpperCase()}`}
      />
    </div>
  );
};
