import { PostcardTemplate } from '../types';

export const POSTCARD_TEMPLATES: PostcardTemplate[] = [
  {
    id: "vp001",
    title: "Rainy Love (বৃষ্টির প্রেম)",
    category: "বৃষ্টি",
    themeStyle: "rainy-serenade",
    artworkType: "rainy-umbrella",
    defaultQuote: "বৃষ্টির শব্দে আজও শুধু তোমার কথাই মনে পড়ে। এক কাপ চা আর ভেজা কাঁচের ওপারে তুমি।",
    defaultRecipient: "প্রিয়তমা",
    defaultSender: "ইতি, তোমার অমল",
    defaultDate: "শ্রাবণ, ১৩৮২",
    tags: ["বৃষ্টি", "ছাতা", "রোমান্টিক", "প্রেম", "rain"],
    featured: true,
    popular: true,
    style: {
      textColor: "#2b2118",
      fontFamily: "bengali-serif",
      textPosition: "center",
      borderStyle: "gold-frame",
      paperTone: "aged-cream"
    }
  },
  {
    id: "vp002",
    title: "Old Love Letter (হলুদ খামের চিঠি)",
    category: "প্রেমপত্র",
    themeStyle: "vintage-quill",
    artworkType: "letter-quill",
    defaultQuote: "তোমার কথা মনে পড়লে পুরনো দিনের চিঠিগুলোও যেন কথা বলে। প্রতিটি ভাঁজে শুধুই তোমার স্পর্শ।",
    defaultRecipient: "সুচরিতেষু",
    defaultSender: "ইতি, চিরদিনের আমি",
    defaultDate: "১২ই বৈশাখ, ১৩৬৫",
    tags: ["চিঠি", "প্রেমপত্র", "খাম", "কালি", "letter"],
    featured: true,
    popular: true,
    style: {
      textColor: "#221a14",
      fontFamily: "bengali-calligraphy",
      textPosition: "left",
      borderStyle: "ornate-filigree",
      paperTone: "sepia-parchment"
    }
  },
  {
    id: "vp003",
    title: "Bengali Nostalgia (গ্রামোফোনের সুর)",
    category: "Bengali Vintage",
    themeStyle: "gramophone-sepia",
    artworkType: "gramophone-melody",
    defaultQuote: "গ্রামোফোনের সুর আর শিউলি ফুলের গন্ধে ঘেরা এই গোধূলি বেলায় কেবল তোমার উপস্থিতি কামনা করি।",
    defaultRecipient: "মায়াবতী",
    defaultSender: "ইতি, সুরের কাঙাল",
    defaultDate: "আশ্বিন, ১৩৭৪",
    tags: ["বাঙালি", "গ্রামোফোন", "সুর", "স্মৃতি", "nostalgia"],
    featured: true,
    popular: true,
    style: {
      textColor: "#2e1c14",
      fontFamily: "bengali-vintage",
      textPosition: "center",
      borderStyle: "double-antique",
      paperTone: "tea-stained"
    }
  },
  {
    id: "vp004",
    title: "Romantic Rose (রক্তগোলাপের সৌরভ)",
    category: "রোমান্টিক",
    themeStyle: "rose-botanic",
    artworkType: "rose-botanical",
    defaultQuote: "তোমাকে পাওয়ার জন্য নয়, তোমাকে একদিন ভালোবেসেছিলাম—শুধু ভালোবাসার প্রয়োজনে।",
    defaultRecipient: "আমার প্রিয়",
    defaultSender: "ইতি, তোমার ভালোবাসার মানুষ",
    defaultDate: "বসন্তের কোনো এক দুপুর",
    tags: ["গোলাপ", "রোমান্টিক", "ফুল", "প্রেম", "rose"],
    featured: true,
    isNew: true,
    style: {
      textColor: "#3d191c",
      fontFamily: "bengali-serif",
      textPosition: "center",
      borderStyle: "gold-frame",
      paperTone: "rose-tint"
    }
  },
  {
    id: "vp005",
    title: "Moonlight Serenade (জোছনা ও নীরবতা)",
    category: "রাতের অনুভূতি",
    themeStyle: "moonlit-night",
    artworkType: "moonlight-sea",
    defaultQuote: "চাঁদের আলো যখন আমার জানালার গ্রিল ছুঁয়ে যায়, তখন নিস্তব্ধতায় কেবল তোমার নিঃশ্বাস শুনতে পাই।",
    defaultRecipient: "হে নিশাচরী",
    defaultSender: "ইতি, চাঁদের আলোয় মুগ্ধ কেউ",
    defaultDate: "পূর্ণিমার রাত",
    tags: ["রাত", "চাঁদ", "জোছনা", "রাতের অনুভূতি", "moonlight"],
    featured: true,
    popular: true,
    style: {
      textColor: "#1d232a",
      fontFamily: "bengali-vintage",
      textPosition: "center",
      borderStyle: "ornate-filigree",
      paperTone: "aged-cream"
    }
  },
  {
    id: "vp006",
    title: "Railway Farewell (স্টেশনের বিদায়)",
    category: "বিরহ",
    themeStyle: "station-steam",
    artworkType: "train-station",
    defaultQuote: "রেলস্টেশনের শেষ হুইসেলে যে কান্না চাপা থাকে, বিরহ ঠিক তেমনই এক নিস্তব্ধ বেদনার নাম।",
    defaultRecipient: "হে দূরের মানুষ",
    defaultSender: "ইতি, প্ল্যাটফর্মের শেষ যাত্রী",
    defaultDate: "১৯৭৫ সালের এক শীতের সন্ধ্যা",
    tags: ["বিরহ", "রেলস্টেশন", "বিদায়", "ট্রেন", "sad"],
    featured: false,
    popular: true,
    style: {
      textColor: "#28231d",
      fontFamily: "typewriter",
      textPosition: "postal-split",
      borderStyle: "postal-strip",
      paperTone: "sepia-parchment"
    }
  },
  {
    id: "vp007",
    title: "Old Town Tram (কলকাতার ট্রাম ও প্রেম)",
    category: "Bengali Vintage",
    themeStyle: "kolkata-tram",
    artworkType: "vintage-window",
    defaultQuote: "কলকাতার ট্রামের মতো আমাদের প্রেমও হয়তো মন্থর, কিন্তু তার প্রতিটি বাঁকে অদ্ভুত মায়া লেগে আছে।",
    defaultRecipient: "কল্লোলিনী",
    defaultSender: "ইতি, ট্রামের শেষ সিটের সহযাত্রী",
    defaultDate: "শ্যামবাজার, ১৯৬৮",
    tags: ["কলকাতা", "ট্রাম", "বাঙালি", "স্মৃতি", "vintage"],
    featured: true,
    isNew: true,
    style: {
      textColor: "#261d16",
      fontFamily: "bengali-serif",
      textPosition: "center",
      borderStyle: "gold-frame",
      paperTone: "aged-cream"
    }
  },
  {
    id: "vp008",
    title: "Eternal Proposal (চিরদিনের অঙ্গীকার)",
    category: "প্রপোজ",
    themeStyle: "proposal-ring",
    artworkType: "letter-quill",
    defaultQuote: "তুমি কি আমার জীবনের শেষ বিকেলের সেই মিষ্টি রোদটুকু হবে? সারা জীবন তোমার পাশে চলার অধিকার দেবে?",
    defaultRecipient: "আমার হৃদয়েশ্বরী",
    defaultSender: "ইতি, তোমার চিরসাথী হতে চাওয়া একজন",
    defaultDate: "আজ এবং চিরকাল",
    tags: ["প্রপোজ", "আংটি", "ভালোবাসা", "অঙ্গীকার", "proposal"],
    featured: true,
    popular: true,
    style: {
      textColor: "#381a1d",
      fontFamily: "bengali-calligraphy",
      textPosition: "center",
      borderStyle: "ornate-filigree",
      paperTone: "rose-tint"
    }
  },
  {
    id: "vp009",
    title: "Longing Distance (দূরত্বের হাহাকার)",
    category: "মিস করা",
    themeStyle: "distance-horizon",
    artworkType: "night-lantern",
    defaultQuote: "দূরত্ব হয়তো শরীরের মাপকাঠি, কিন্তু মনের স্পন্দনে তুমি প্রতি মুহূর্তে জড়িয়ে আছো। ভীষণ মিস করছি তোমায়।",
    defaultRecipient: "দূরবীনের ওপারে থাকা মানুষটি",
    defaultSender: "ইতি, তোমার প্রতীক্ষারত মন",
    defaultDate: "আজকের নীরব মধ্যরাত",
    tags: ["মিস করা", "দূরত্ব", "অপেক্ষা", "longing"],
    featured: false,
    popular: true,
    style: {
      textColor: "#211b15",
      fontFamily: "bengali-vintage",
      textPosition: "left",
      borderStyle: "double-antique",
      paperTone: "tea-stained"
    }
  },
  {
    id: "vp010",
    title: "Vintage Café Corner (পুরনো ক্যাফের কোণ)",
    category: "Classic Vintage",
    themeStyle: "coffee-aroma",
    artworkType: "cafe-coffee",
    defaultQuote: "বাকিটা জীবন আমার চায়ের কাপে চিনি বেশি হলে তুমি কি একটু বকা দিয়ে ভালোবাসবে?",
    defaultRecipient: "কফি হাউজের প্রিয় মুখ",
    defaultSender: "ইতি, টেবিল নম্বর সাত",
    defaultDate: "বিকেল ৫টা বেজে ১৫ মিনিট",
    tags: ["ক্যাফে", "কফি", "চা", "আড্ডা", "স্মৃতি"],
    featured: false,
    isNew: true,
    style: {
      textColor: "#301e12",
      fontFamily: "typewriter",
      textPosition: "postal-split",
      borderStyle: "postal-strip",
      paperTone: "antique-white"
    }
  },
  {
    id: "vp011",
    title: "Golden Anniversary (পঞ্চাশটি বসন্ত)",
    category: "Anniversary",
    themeStyle: "golden-milestone",
    artworkType: "vintage-lovers",
    defaultQuote: "বছরের পর বছর কেটে গেলেও আমাদের ভালোবাসার গন্ধ ঠিক প্রথম দিনের বকুল ফুলের মতোই তাজা।",
    defaultRecipient: "আমার অর্ধাঙ্গিনী",
    defaultSender: "ইতি, তোমার আজীবন অর্ধাঙ্গ",
    defaultDate: "বিবাহের সুবর্ণজয়ন্তী",
    tags: ["anniversary", "বিয়ে", "সংসার", "ভালোবাসা"],
    featured: true,
    popular: false,
    style: {
      textColor: "#2d1c0b",
      fontFamily: "bengali-serif",
      textPosition: "center",
      borderStyle: "gold-frame",
      paperTone: "aged-cream"
    }
  },
  {
    id: "vp012",
    title: "One Sided Love (একতরফা ভালোবাসা)",
    category: "একতরফা প্রেম",
    themeStyle: "silent-devotion",
    artworkType: "nostalgic-tree",
    defaultQuote: "তুমি আমাকে না চিনলেও ক্ষতি নেই, তোমাকে ভালোবেসেই আমি আমার জীবনের পরম পূর্ণতা পেয়েছি।",
    defaultRecipient: "অচেনা রাজকুমারী",
    defaultSender: "ইতি, একজন বেনামী পথিক",
    defaultDate: "স্মৃতির ডায়েরি থেকে",
    tags: ["একতরফা", "নীরব", "একাকী", "প্রেম"],
    featured: false,
    popular: false,
    style: {
      textColor: "#231f1d",
      fontFamily: "bengali-modern",
      textPosition: "left",
      borderStyle: "minimal-deckle",
      paperTone: "sepia-parchment"
    }
  },
  {
    id: "vp013",
    title: "River Sunset (নদীর ঘাটে গোধূলি)",
    category: "প্রেম",
    themeStyle: "river-sunset",
    artworkType: "sunset-river",
    defaultQuote: "যদি কখনো পথ হারিয়ে ফেলি, তবে পুরনো দিনের মতো আমার হাতটি আবার ধরে নিও।",
    defaultRecipient: "আমার জীবনসঙ্গী",
    defaultSender: "ইতি, তোমার পাশে থাকার প্রতিশ্রুতি",
    defaultDate: "পদ্মার পাড়, ১৩৮৮",
    tags: ["নদী", "সূর্যাস্ত", "প্রেম", "হাত", "sunset"],
    featured: true,
    isNew: false,
    style: {
      textColor: "#331a0e",
      fontFamily: "bengali-serif",
      textPosition: "center",
      borderStyle: "gold-frame",
      paperTone: "tea-stained"
    }
  },
  {
    id: "vp014",
    title: "Birthday Reverie (জন্মদিনের প্রদীপ)",
    category: "জন্মদিন",
    themeStyle: "birthday-glow",
    artworkType: "rose-botanical",
    defaultQuote: "আজকের দিনে তোমার আগমন পৃথিবীকে সুন্দর করেছিল, আর আমার জীবনে এনেছিল পূর্ণতা। শুভ জন্মদিন প্রিয়!",
    defaultRecipient: "জন্মদিনের রাজকন্যা",
    defaultSender: "ইতি, তোমার ভালোবাসার ঋণী",
    defaultDate: "আজকের এই শুভলগ্নে",
    tags: ["জন্মদিন", "শুভেচ্ছা", "উপহার", "birthday"],
    featured: false,
    popular: true,
    style: {
      textColor: "#381519",
      fontFamily: "bengali-calligraphy",
      textPosition: "center",
      borderStyle: "ornate-filigree",
      paperTone: "rose-tint"
    }
  },
  {
    id: "vp015",
    title: "Cinema Romance (সাদা-কালো রুপালি পর্দা)",
    category: "Classic Vintage",
    themeStyle: "cinema-reels",
    artworkType: "vintage-lovers",
    defaultQuote: "উত্তম-সুচিত্রার সাদা-কালো রোমান্সের চেয়েও আমাদের গল্পটা আমার কাছে ঢের বেশি দামি।",
    defaultRecipient: "আমার সিনেমার নায়িকা",
    defaultSender: "ইতি, তোমার মুগ্ধ দর্শক",
    defaultDate: "মিনার্ভা সিনেমা হল, ১৯৬২",
    tags: ["সিনেমা", "উত্তম", "রুপালি পর্দা", "vintage"],
    featured: false,
    popular: true,
    style: {
      textColor: "#1f1d1b",
      fontFamily: "bengali-vintage",
      textPosition: "postal-split",
      borderStyle: "double-antique",
      paperTone: "aged-cream"
    }
  },
  {
    id: "vp016",
    title: "Airmail Vintage (প্রবাসী চিঠি)",
    category: "প্রেমপত্র",
    themeStyle: "airmail-strip",
    artworkType: "classic-post",
    defaultQuote: "আমার হলুদ খামের প্রতিটি ভাঁজে শুধু তোমার নাম লেখা ছিল, হয়তো ডাকপিয়ন কখনো পথ খুঁজে পায়নি।",
    defaultRecipient: "প্রিয়তমা অপর্ণা",
    defaultSender: "ইতি, বিলেত ফেরত সুবীর",
    defaultDate: "বাই এয়ার মেইল, ১৯৭৩",
    tags: ["এয়ারমেইল", "চিঠি", "ডাক", "ডাকটিকেট", "post"],
    featured: true,
    popular: true,
    style: {
      textColor: "#1c222b",
      fontFamily: "typewriter",
      textPosition: "postal-split",
      borderStyle: "postal-strip",
      paperTone: "antique-white"
    }
  },
  {
    id: "vp017",
    title: "Ghalib's Gazal (মির্জা গালিবের শায়েরী)",
    category: "বিরহ",
    themeStyle: "ghalib-vintage",
    artworkType: "letter-quill",
    defaultQuote: "হাজারো ইচ্ছের প্রতিটি যদি দম আটকে নেওয়ার মতো তীব্র হতো, তবুও কত ইচ্ছে অপূর্ণই রয়ে গেল!",
    defaultRecipient: "হে মায়াবিনী",
    defaultSender: "ইতি, মির্জা গালিব",
    defaultDate: "দিল্লি, ১৮৫৭",
    tags: ["মির্জা গালিব", "গালিব", "শায়েরী", "গজল", "বিরহ", "প্রেম", "ghalib"],
    featured: true,
    isNew: true,
    popular: true,
    style: {
      textColor: "#2b1812",
      fontFamily: "bengali-calligraphy",
      textPosition: "center",
      borderStyle: "ornate-filigree",
      paperTone: "sepia-parchment"
    }
  }
];
