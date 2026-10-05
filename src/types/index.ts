export type PostcardCategory =
  | "প্রেম"
  | "রোমান্টিক"
  | "বিরহ"
  | "মিস করা"
  | "বৃষ্টি"
  | "রাতের অনুভূতি"
  | "প্রেমপত্র"
  | "প্রপোজ"
  | "জন্মদিন"
  | "Anniversary"
  | "একতরফা প্রেম"
  | "স্মৃতি"
  | "Classic Vintage"
  | "Bengali Vintage";

export type ExportRatio =
  | "postcard" // 3:2 landscape
  | "square" // 1:1
  | "story" // 9:16
  | "reels" // 9:16 Instagram Reels / TikTok / YouTube Shorts
  | "facebook" // 1.91:1
  | "whatsapp"; // 9:16

export type VintageEffect =
  | "original"
  | "sepia"
  | "old-paper"
  | "faded"
  | "bw"
  | "film-grain"
  | "dust"
  | "scratch"
  | "coffee-stain"
  | "warm-vintage";

export type FontFamilyType =
  | "bengali-serif"
  | "bengali-calligraphy"
  | "bengali-vintage"
  | "bengali-modern"
  | "vintage-serif"
  | "typewriter";

export type TextPosition = "center" | "top" | "bottom" | "left" | "postal-split";

export interface PostcardTemplate {
  id: string;
  title: string;
  category: PostcardCategory;
  themeStyle: string; // background visual theme identifier or SVG generator
  artworkType: "vintage-lovers" | "rainy-umbrella" | "letter-quill" | "rose-botanical" | "gramophone-melody" | "train-station" | "night-lantern" | "cafe-coffee" | "vintage-window" | "sunset-river" | "nostalgic-tree" | "parchment-scroll" | "antique-clock" | "bicycle-flowers" | "moonlight-sea" | "classic-post";
  defaultQuote: string;
  defaultRecipient?: string;
  defaultSender?: string;
  defaultDate?: string;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  popular?: boolean;
  style: {
    textColor: string;
    fontFamily: FontFamilyType;
    textPosition: TextPosition;
    borderStyle: "gold-frame" | "postal-strip" | "double-antique" | "ornate-filigree" | "minimal-deckle";
    paperTone: "aged-cream" | "sepia-parchment" | "rose-tint" | "tea-stained" | "antique-white";
  };
}

export interface QuoteItem {
  id: string;
  text: string;
  category: PostcardCategory;
  author?: string;
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  quoteText: string;
  subtext?: string;
  artworkType: string;
  bgColor: string;
  accentColor: string;
  tags: string[];
}

export interface PostcardCustomization {
  templateId: string;
  recipient: string;
  quoteText: string;
  sender: string;
  date: string;
  fontFamily: FontFamilyType;
  fontSize: number; // 14 to 36
  isBold: boolean;
  isItalic: boolean;
  textAlign: "left" | "center" | "right";
  letterSpacing: number; // in px
  lineHeight: number; // e.g. 1.5, 1.8
  textColor: string;
  textPosition: TextPosition;
  effect: VintageEffect;
  ratio: ExportRatio;
}
