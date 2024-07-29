import createMiddleware from 'next-intl/middleware';
import { locales } from './navigation';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  localePrefix: 'always',
  // Used when no locale matches
  defaultLocale: 'en'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|de|en|es|fr|hi|ko|pt|vi|zh)/:path*']
};