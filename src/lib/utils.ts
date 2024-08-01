import { type ClassValue, clsx } from "clsx";
import localFont from "next/font/local";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export const secretKey: string | undefined = process.env.NEXT_PUBLIC_SECRET_KEY;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
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

export const generateFileName = (
  title: string,
  quality: string,
  extension: string
): string => {
  const timestamp = Date.now();
  const sanitizedTitle = title
    .replace(/[^\w\s-]/g, "") // Loại bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "_") // Thay khoảng trắng bằng dấu gạch dưới
    .substring(0, 50); // Giới hạn độ dài tiêu đề

  return `${sanitizedTitle}_${quality}_${timestamp}.${extension}`;
};

export async function getFileSize(url: string): Promise<any> {
  try {
    const response = await axios.head(url);
    const contentLength = response.headers["content-length"];
    if (contentLength) {
      const sizeInBytes = parseInt(contentLength, 10);

      return sizeInBytes;
    }
    return "???";
  } catch (error) {
    console.error("Lỗi khi lấy kích thước file:", error);
    return "???";
  }
}

export function byteToMb(bytes: number) {
  if (bytes) {
    const mb = bytes / (1024 * 1024);
    console.log("🚀 ~ byteToMb ~ mb:", mb);
    if (mb) {
      return mb.toFixed(1) ? `(${mb.toFixed(1)} MB)` : "";
    }
    return "";
  }
  return "";
}
