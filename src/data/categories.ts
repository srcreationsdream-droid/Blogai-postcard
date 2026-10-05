import { PostcardCategory } from '../types';

export interface CategoryInfo {
  name: PostcardCategory;
  icon: string;
  description: string;
  slug: string;
  count: number;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    name: "প্রেম",
    icon: "❤️",
    description: "শাশ্বত ভালোবাসার মধুর অনুভূতি",
    slug: "prem",
    count: 28
  },
  {
    name: "রোমান্টিক",
    icon: "🌹",
    description: "হৃদয়স্পর্শী মিষ্টি প্রেমের বার্তা",
    slug: "romantic",
    count: 32
  },
  {
    name: "বিরহ",
    icon: "💔",
    description: "না পাওয়ার হাহাকার ও নীরব অশ্রু",
    slug: "biroho",
    count: 22
  },
  {
    name: "মিস করা",
    icon: "🥺",
    description: "দূরত্বে থাকা প্রিয়জনের ব্যাকুল ডাক",
    slug: "miss-kora",
    count: 19
  },
  {
    name: "বৃষ্টি",
    icon: "🌧️",
    description: "বৃষ্টিভেজা বিকেল আর পুরনো স্মৃতি",
    slug: "brishti",
    count: 24
  },
  {
    name: "রাতের অনুভূতি",
    icon: "🌙",
    description: "নিস্তব্ধ রাতের গোপন ভালোলাগা",
    slug: "rater-onubhuti",
    count: 18
  },
  {
    name: "প্রেমপত্র",
    icon: "💌",
    description: "হলদে খামে পাঠানো কাগুজে চিঠি",
    slug: "prem-potro",
    count: 26
  },
  {
    name: "প্রপোজ",
    icon: "💍",
    description: "হৃদয়ের কথা প্রথম নিবেদনের সাহস",
    slug: "propose",
    count: 15
  },
  {
    name: "জন্মদিন",
    icon: "🎂",
    description: "প্রিয় মানুষের বিশেষ দিনের শুভেচ্ছা",
    slug: "jonmodin",
    count: 14
  },
  {
    name: "Anniversary",
    icon: "💑",
    description: "একসাথে কাটানো পথচলার উৎসব",
    slug: "anniversary",
    count: 16
  },
  {
    name: "একতরফা প্রেম",
    icon: "🖤",
    description: "নীরবে ভালোবেসে যাওয়ার মায়াবী কষ্ট",
    slug: "ektorfa-prem",
    count: 17
  },
  {
    name: "স্মৃতি",
    icon: "🌸",
    description: "ফেলে আসা ফেলে যাওয়া মধুর মুহূর্ত",
    slug: "smriti",
    count: 25
  },
  {
    name: "Classic Vintage",
    icon: "🎞️",
    description: "চিরায়ত পুরনো দিনের আভিজাত্য",
    slug: "classic-vintage",
    count: 21
  },
  {
    name: "Bengali Vintage",
    icon: "🇧🇩",
    description: "খাঁটি বাঙালি নস্টালজিক রূপ",
    slug: "bengali-vintage",
    count: 29
  }
];
