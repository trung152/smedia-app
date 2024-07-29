import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = [
  "ar",
  "de",
  "en",
  "es",
  "fr",
  "hi",
  "ko",
  "pt",
  "vi",
  "zh",
] as const;
export const localePrefix = "always";

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  {
    locales,
    localePrefix,
  }
);
