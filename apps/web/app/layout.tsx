import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-noto-sans-bengali",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bluebird Online — Fiber Internet Bangladesh",
    template: "%s | Bluebird Online",
  },
  description:
    "Premium fiber internet service provider in Bangladesh. Ultra-fast speeds, reliable connectivity, and 24/7 support for homes and businesses.",
  keywords: ["fiber internet", "broadband", "Bangladesh", "FTTH", "high speed internet", "bluebird"],
  authors: [{ name: "Bluebird Technologies" }],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://bluebird.online",
    siteName: "Bluebird Online",
    title: "Bluebird Online — Fiber Internet Bangladesh",
    description: "Premium fiber internet with speeds up to 1 Gbps. Gaming optimized, 4K streaming ready.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Bluebird Online Fiber Internet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluebird Online — Fiber Internet Bangladesh",
    description: "Premium fiber internet with speeds up to 1 Gbps",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansBengali.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
