import UserProvider from "@/context/UserContext";
import { ThemeProvider } from "@/provider/theme-provider";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { siteMetadata } from "./siteMetaData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.author}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  openGraph: {
    type: siteMetadata.openGraph.type,
    locale: siteMetadata.openGraph.locale,
    url: siteMetadata.openGraph.url,
    title: siteMetadata.openGraph.title,
    description: siteMetadata.openGraph.description,
    siteName: siteMetadata.openGraph.siteName,
    images: siteMetadata.openGraph.images,
  },
  twitter: {
    card: siteMetadata.twitter.card,
    title: siteMetadata.twitter.title,
    description: siteMetadata.twitter.description,
    images: siteMetadata.twitter.images,
    creator: siteMetadata.twitter.creator,
    site: siteMetadata.twitter.site,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
    yandex: "your-yandex-verification-code", // Add if needed
    yahoo: "your-yahoo-verification-code", // Add if needed
  },
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>{children}</UserProvider>
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </html>
    </ViewTransitions>
  );
}
