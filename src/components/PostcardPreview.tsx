import React, { forwardRef } from 'react';
import { PostcardCustomization, PostcardTemplate } from '../types';
import { VintageArtwork } from './VintageArtwork';

interface PostcardPreviewProps {
  template: PostcardTemplate;
  customization: PostcardCustomization;
  previewId?: string;
  className?: string;
}

export const PostcardPreview = forwardRef<HTMLDivElement, PostcardPreviewProps>(
  ({ template, customization, previewId = 'postcard-render-node', className = '' }, ref) => {
    const {
      recipient,
      quoteText,
      sender,
      date,
      fontFamily,
      fontSize,
      isBold,
      isItalic,
      textAlign,
      letterSpacing,
      lineHeight,
      textColor,
      textPosition,
      effect,
      ratio
    } = customization;

    // Aspect ratio classes for responsive display
    const ratioClasses = {
      postcard: 'aspect-[3/2] w-full max-w-[680px]',
      square: 'aspect-square w-full max-w-[540px]',
      story: 'aspect-[9/16] w-full max-w-[390px]',
      reels: 'aspect-[9/16] w-full max-w-[380px]',
      facebook: 'aspect-[1.91/1] w-full max-w-[720px]',
      whatsapp: 'aspect-[9/16] w-full max-w-[390px]'
    }[ratio] || 'aspect-[3/2] w-full max-w-[680px]';

    // Paper tone background styling
    const paperBackgrounds = {
      'aged-cream': 'bg-[#fcf8ec]',
      'sepia-parchment': 'bg-[#f4ebd0]',
      'rose-tint': 'bg-[#faf0ec]',
      'tea-stained': 'bg-[#eedfbe]',
      'antique-white': 'bg-[#faf9f5]'
    }[template.style.paperTone] || 'bg-[#fcf8ec]';

    // Border styling
    const borderStyleClasses = {
      'gold-frame': 'border-[3px] border-[#b08d4b] ring-2 ring-[#b08d4b]/30 ring-offset-2 ring-offset-[#fcf8ec]',
      'postal-strip': 'border-4 border-dashed border-[#8c433e]',
      'double-antique': 'border-4 border-double border-[#6e5134]',
      'ornate-filigree': 'border-2 border-[#a47e3b] shadow-inner',
      'minimal-deckle': 'border border-[#c5b597]'
    }[template.style.borderStyle] || 'border-2 border-[#b08d4b]';

    // Effect filter
    const effectClass = {
      original: '',
      sepia: 'effect-sepia',
      'old-paper': 'effect-old-paper',
      faded: 'effect-faded',
      bw: 'effect-bw',
      'film-grain': 'contrast-[1.05] brightness-[0.98]',
      dust: 'contrast-[1.02]',
      scratch: 'contrast-[1.08] sepia-[0.2]',
      'coffee-stain': 'sepia-[0.3] contrast-[1.05]',
      'warm-vintage': 'effect-warm-vintage'
    }[effect] || '';

    // Font family class
    const fontClass = {
      'bengali-serif': 'font-bengali-serif',
      'bengali-calligraphy': 'font-bengali-calligraphy',
      'bengali-vintage': 'font-bengali-vintage',
      'bengali-modern': 'font-bengali-modern',
      'vintage-serif': 'font-vintage-serif',
      typewriter: 'font-typewriter'
    }[fontFamily] || 'font-bengali-serif';

    const isVerticalLayout = ratio === 'story' || ratio === 'whatsapp' || ratio === 'reels';
    const isPostalSplit = textPosition === 'postal-split' && !isVerticalLayout;

    return (
      <div className={`relative flex items-center justify-center p-2 sm:p-4 select-none ${className}`}>
        {/* The export container - exactly captured without external chrome */}
        <div
          id={previewId}
          ref={ref}
          className={`relative overflow-hidden transition-all duration-300 ${ratioClasses} ${paperBackgrounds} ${borderStyleClasses} ${effectClass} shadow-2xl rounded-[4px] p-5 sm:p-7 flex flex-col justify-between`}
          style={{
            backgroundImage: `radial-gradient(#c7b28c 0.75px, transparent 0.75px)`,
            backgroundSize: '24px 24px'
          }}
        >
          {/* Subtle Vintage Texture Overlays */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[rgba(120,53,15,0.04)] via-transparent to-[rgba(28,25,23,0.08)]" />
          
          {/* Coffee ring / stain effect if selected */}
          {effect === 'coffee-stain' && (
            <div className="absolute top-6 right-16 w-28 h-28 rounded-full border-[3px] border-[#7d4b1a]/25 blur-[1px] pointer-events-none transform -rotate-12" />
          )}

          {/* Film Grain / Scratch overlay if selected */}
          {(effect === 'scratch' || effect === 'film-grain' || effect === 'dust') && (
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#3a2818_1px,transparent_1px)] [background-size:12px_12px]" />
          )}

          {/* Corner Vintage Filigree Accents */}
          <div className="absolute top-2 left-2 text-[#b08d4b]/60 text-xs select-none">❧</div>
          <div className="absolute top-2 right-2 text-[#b08d4b]/60 text-xs select-none">☙</div>
          <div className="absolute bottom-2 left-2 text-[#b08d4b]/60 text-xs select-none">☙</div>
          <div className="absolute bottom-2 right-2 text-[#b08d4b]/60 text-xs select-none">❧</div>

          {/* Top Vintage Postcard Header */}
          <div className="relative z-10 flex items-start justify-between border-b border-[#b08d4b]/30 pb-2 mb-2">
            <div className="flex flex-col">
              <span className="font-vintage-serif tracking-[0.25em] text-[11px] sm:text-xs uppercase text-[#5a4428] font-bold">
                POST CARD • পোস্টকার্ড
              </span>
              <span className="text-[9px] text-[#7d613c] tracking-widest font-mono">
                BENGAL POSTAL ARCHIVE • NO. {template.id.toUpperCase()}
              </span>
            </div>

            {/* Vintage Postage Stamp & Postmark Lockup */}
            <div className="relative flex items-center gap-1.5 shrink-0">
              {/* Rubber Postmark Cancellation Stamp */}
              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-dashed border-[#8c2a32]/60 flex flex-col items-center justify-center p-1 transform -rotate-12 pointer-events-none">
                <span className="text-[7px] text-[#8c2a32] font-serif leading-none">কলিকাতা</span>
                <span className="text-[8px] font-mono text-[#8c2a32] font-bold leading-none my-0.5">
                  {date || '1974'}
                </span>
                <span className="text-[6px] tracking-tighter text-[#8c2a32]">G.P.O.</span>
              </div>

              {/* Perforated Postage Stamp */}
              <div className="w-12 h-14 sm:w-14 sm:h-16 bg-[#faf3e3] border border-[#a47e3b] p-1 shadow-sm flex flex-col justify-between items-center text-center">
                <div className="w-full flex justify-between items-center text-[7px] font-mono text-[#8a6834]">
                  <span>ডাক</span>
                  <span>15P</span>
                </div>
                <div className="w-7 h-7 flex items-center justify-center text-[#8c2a32]">
                  <VintageArtwork type={template.artworkType} className="w-6 h-6" accentColor="#8c2a32" />
                </div>
                <span className="text-[6px] text-[#715429] uppercase font-serif tracking-wider">
                  INDIA
                </span>
              </div>
            </div>
          </div>

          {/* Body Content Area */}
          <div className="relative z-10 flex-1 flex flex-col justify-center my-auto py-2">
            {isPostalSplit ? (
              /* Classical Split Postcard (Left: Letter, Right: Address lines & Artwork) */
              <div className="grid grid-cols-12 gap-4 h-full items-center">
                {/* Left Column: Message */}
                <div className="col-span-7 pr-3 border-r border-dashed border-[#b08d4b]/40 flex flex-col justify-between h-full">
                  {recipient && (
                    <div className="font-bengali-calligraphy text-base sm:text-lg text-[#633a1e] mb-1">
                      {recipient},
                    </div>
                  )}

                  <p
                    className={`${fontClass} leading-relaxed my-auto`}
                    style={{
                      color: textColor,
                      fontSize: `${fontSize}px`,
                      fontWeight: isBold ? '700' : '400',
                      fontStyle: isItalic ? 'italic' : 'normal',
                      textAlign: textAlign,
                      letterSpacing: `${letterSpacing}px`,
                      lineHeight: lineHeight
                    }}
                  >
                    {quoteText}
                  </p>

                  <div className="mt-2 text-right">
                    {sender && (
                      <div className="font-bengali-calligraphy text-sm sm:text-base text-[#523017]">
                        {sender}
                      </div>
                    )}
                    {date && (
                      <div className="text-[10px] text-[#8c7150] font-serif">
                        {date}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Address & Botanical Motif */}
                <div className="col-span-5 flex flex-col justify-between items-center h-full pl-2">
                  <div className="w-24 h-24 opacity-80 my-auto">
                    <VintageArtwork type={template.artworkType} className="w-full h-full" accentColor="#8c6d3b" />
                  </div>
                  {/* Address Guide Lines */}
                  <div className="w-full space-y-2 mt-auto">
                    <div className="border-b border-[#b08d4b]/30 w-full" />
                    <div className="border-b border-[#b08d4b]/30 w-full" />
                    <div className="border-b border-[#b08d4b]/30 w-3/4 ml-auto" />
                  </div>
                </div>
              </div>
            ) : (
              /* Full Panoramic / Center / Top / Bottom Layout */
              <div className="flex flex-col justify-between h-full">
                {/* Background Artwork Watermark / Accent */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                  <VintageArtwork type={template.artworkType} className="w-64 h-64 max-w-full" accentColor="#73522a" />
                </div>

                {/* Recipient */}
                {recipient && (
                  <div className="font-bengali-calligraphy text-lg sm:text-xl text-[#5e381c] mb-2">
                    {recipient},
                  </div>
                )}

                {/* Main Quote / Message */}
                <div className={`my-auto py-2 flex flex-col ${
                  textPosition === 'top' ? 'justify-start' :
                  textPosition === 'bottom' ? 'justify-end' :
                  'justify-center'
                }`}>
                  <p
                    className={`${fontClass} leading-relaxed transition-all`}
                    style={{
                      color: textColor,
                      fontSize: `${fontSize}px`,
                      fontWeight: isBold ? '700' : '400',
                      fontStyle: isItalic ? 'italic' : 'normal',
                      textAlign: textAlign,
                      letterSpacing: `${letterSpacing}px`,
                      lineHeight: lineHeight
                    }}
                  >
                    “{quoteText}”
                  </p>
                </div>

                {/* Footer of the note: Sender & Date */}
                <div className="mt-3 pt-2 border-t border-[#b08d4b]/20 flex items-end justify-between">
                  <div className="text-[10px] text-[#826a4c] font-serif italic">
                    {date ? `তারিখ: ${date}` : 'ব্লগএআই আর্কাইভ'}
                  </div>
                  {sender && (
                    <div className="font-bengali-calligraphy text-base sm:text-lg text-[#523017]">
                      {sender}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom subtle postal footer */}
          <div className="relative z-10 flex items-center justify-between text-[8px] font-mono text-[#8a7251] pt-1">
            <span className="tracking-widest">★ VINTAGE ARCHIVE COLLECTION ★</span>
            <span className="tracking-tighter">AUTHENTIC POSTAL REPRODUCTION</span>
          </div>
        </div>
      </div>
    );
  }
);

PostcardPreview.displayName = 'PostcardPreview';
