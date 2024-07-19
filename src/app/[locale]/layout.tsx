import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Providers from "@/components/common/Provider";
import NavBar from "@/components/common/NavBar";
import FooterSection from "@/components/sections/FooterSection";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export const metadata: Metadata = {
  title: "Super Social Media Downloader",
  description: "Super Social Media Downloader",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={roboto.className}>
      <NextIntlClientProvider messages={messages}>
        <Providers>
          <main>
            {/* <NavBar /> */}
            <div className=" flex flex-col mx-4 md:mx-[50px] gap-[50px] md:gap-[160px] lg:mx-[150px]">
              {children}
            </div>
            {/* <FooterSection /> */}
          </main>
        </Providers>
        </NextIntlClientProvider>
      {/*   <script src="//code.tidio.co/xgyi2qd1nggw3p5ua7njiojcvhlyn51k.js" async></script> */}
      </body>
      <GoogleAnalytics gaId="G-RWTRF36D3N" />
      <GoogleTagManager gtmId="GTM-WL4JZPQH" />
    </html>
  );
}
