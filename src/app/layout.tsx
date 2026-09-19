import AppScroll from "@/components/app-scroll";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Pathway_Extreme } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const pathway_Extreme = Pathway_Extreme({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "VHD TV",
  description: "A sleek and modern app for streaming movies and series.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pathway_Extreme.className}>
        <Analytics />
        <Providers>
          <div className="flex h-dvh flex-col overflow-hidden">
            <AppScroll>
              <Header />
              {children}
              <Footer />
            </AppScroll>
          </div>
        </Providers>
      </body>
    </html>
  );
}
