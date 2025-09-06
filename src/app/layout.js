import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#9333ea',
}

export const metadata = {
  metadataBase: new URL('https://www.gaposastconf.org'),
  title: "ICONFST'25 - International Conference on Science and Technology",
  description: "Join ICONFST'25 exploring Artificial Intelligence Revolution and Circular Economy: The Synergy to Curb Global Waste Crises. Leading international conference on science and technology.",
  keywords: ["ICONFST", "science", "technology", "AI", "artificial intelligence", "circular economy", "waste management", "sustainability", "conference", "2025", "research", "innovation"],
  authors: [{ name: "ICONFST'25 Conference" }],
  creator: "ICONFST'25 Conference",
  publisher: "ICONFST'25 Conference",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ICONFST'25 - International Conference on Science and Technology",
    description: "Join ICONFST'25 exploring Artificial Intelligence Revolution and Circular Economy: The Synergy to Curb Global Waste Crises.",
    url: "https://www.gaposastconf.org",
    siteName: "ICONFST'25",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ICONFST'25 - International Conference on Science and Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ICONFST'25 - International Conference on Science and Technology",
    description: "Join ICONFST'25 exploring Artificial Intelligence Revolution and Circular Economy: The Synergy to Curb Global Waste Crises.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
