import AppScroll from "@/components/app-scroll";
import Footer from "@/components/footer";
import Header from "@/components/header";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/utils";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Pathway_Extreme } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const pathway_Extreme = Pathway_Extreme({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "900"],
});

const DESCRIPTION =
  "A sleek and modern app for streaming movies and series, powered by TMDB.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VHD TV — Stream Movies & TV Series",
    template: "%s | VHD TV",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "VHD TV",
    "watch movies online",
    "watch TV series online",
    "movie streaming",
    "TV series streaming",
    "trending movies",
    "popular TV shows",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: "VHD TV — Stream Movies & TV Series",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VHD TV — Stream Movies & TV Series",
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#171717",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/search?keyword={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pathway_Extreme.className}>
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={organizationJsonLd} />
        <Analytics />
        <Providers>
          <div className="flex h-dvh flex-col overflow-hidden">
            <Header />
            <AppScroll>
              {children}
              <Footer />
            </AppScroll>
          </div>
        </Providers>
      </body>
    </html>
  );
}
