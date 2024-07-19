import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "es", "fr", "vi"] as const;
export const localePrefix = "always";

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  {
    locales,
    localePrefix,
  }
);
