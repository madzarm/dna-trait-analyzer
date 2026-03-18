import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DNA Trait Analyzer — AI-Powered Genetic Trait Analysis",
    template: "%s | DNA Trait Analyzer",
  },
  description:
    "Upload your 23andMe, AncestryDNA, MyHeritage, or FTDNA raw data and discover what your genes say about any trait. AI-powered analysis backed by published research.",
  keywords: [
    "DNA analysis",
    "genetic traits",
    "SNP analysis",
    "23andMe",
    "AncestryDNA",
    "MyHeritage",
    "FTDNA",
    "genetic testing",
    "trait analysis",
    "AI genetics",
  ],
  openGraph: {
    type: "website",
    title: "DNA Trait Analyzer — AI-Powered Genetic Trait Analysis",
    description:
      "Upload your raw DNA data and discover what your genes say about any trait. AI-powered analysis backed by published research and SNP databases.",
    siteName: "DNA Trait Analyzer",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DNA Trait Analyzer — AI-Powered Genetic Trait Analysis",
    description:
      "Upload your raw DNA data and discover what your genes say about any trait. AI-powered analysis backed by published research.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DNA Trait Analyzer",
    description:
      "Upload your raw DNA data and discover what your genes say about any trait. AI-powered analysis backed by published research.",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier with limited analyses",
    },
    featureList: [
      "23andMe raw data support",
      "AncestryDNA raw data support",
      "MyHeritage raw data support",
      "FTDNA raw data support",
      "AI-powered trait analysis",
      "SNP matching with evidence ratings",
      "Research citation linking",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
