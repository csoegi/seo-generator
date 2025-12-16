import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import styles from "./container.module.css";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const websiteUrl = "https://seo-tunnel-generator.vercel.app/";
export const metadata: Metadata = {
  title: "SEO Generator - Create SEO metadata for your web pages",
  description:
    "With SEO Generator you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, X and more!",
  keywords: [
    "SEO",
    "SEO generator",
    "metadata",
    "meta tags",
    "Google preview",
    "Open Graph",
    "Twitter cards",
    "website optimization",
  ],
  authors: [{ name: "mrluisfer", url: websiteUrl }],
  creator: "mrluisfer",
  publisher: "mrluisfer",
  metadataBase: new URL(websiteUrl),
  openGraph: {
    title: "SEO Generator - Create SEO metadata for your web pages",
    description: "Generate and preview SEO metadata for Google, Facebook, X and more in one place.",
    url: websiteUrl,
    siteName: "SEO Generator",
    images: [
      {
        url: `${websiteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "SEO Generator Open Graph Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Generator - Create SEO metadata for your web pages",
    description: "Preview how your site looks on Google, Facebook, and X with SEO Generator.",
    creator: "@mrluisfer",
    images: [`${websiteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(geistSans.variable, geistMono.variable, "antialiased", styles.container)}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
