import { type ClassValue, clsx } from "clsx"
import localFont from 'next/font/local'
import { twMerge } from "tailwind-merge"

export const secretKey: string | undefined = process.env.NEXT_PUBLIC_SECRET_KEY;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const scrollToSection = (sectionId : string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}


export const listLanguages = [
  {
    code: "en",
    name: "English",
    img: "/en.svg",
  },
  {
    code: "es",
    name: "Spanish",
    img: "/es.svg",
  },
  {
    code: "fr",
    name: "French",
    img: "/fr.svg",
  },
  {
    code: "vi",
    name: "Vietnamese",
    img: "/vi.svg",
  },
];