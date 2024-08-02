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

const cleanAccent = (str: string): string => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

export const generateFileName = (
  title: string,
  quality: string,
  extension: string
): string => {
  const timestamp = Date.now();
  const sanitizedTitle = cleanAccent(title)
    .replace(/[^\w\s-]/g, "") // Loại bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, "_") // Thay khoảng trắng bằng dấu gạch dưới
    .toLowerCase() // Chuyển đổi thành chữ thường
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

export function checkQuality(quality: string) {
  return quality.includes("720") || quality.includes("1080") || quality.includes("hd");
}
