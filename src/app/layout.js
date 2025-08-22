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
  title: "Gateway ICT Conference 2025 | School of Science and Technology",
  description: "Join us for the Gateway ICT Conference 2025 at Gateway ICT Polytechnic Saapade, Ogun State. Discover the latest in technology, innovation, and digital transformation. Conference details coming soon!",
  keywords: "Gateway ICT, Conference 2025, Technology, Innovation, Polytechnic, Saapade, Ogun State, Digital Transformation, ICT Education",
  authors: [{ name: "Gateway ICT Polytechnic" }],
  creator: "Gateway ICT Polytechnic",
  publisher: "Gateway ICT Polytechnic",
  robots: "index, follow",
  openGraph: {
    title: "Gateway ICT Conference 2025 | School of Science and Technology",
    description: "Join us for the Gateway ICT Conference 2025 at Gateway ICT Polytechnic Saapade, Ogun State. Conference details coming soon!",
    url: "https://www.gaposastconf.org",
    siteName: "Gateway ICT Conference",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gateway ICT Conference 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gateway ICT Conference 2025 | School of Science and Technology",
    description: "Join us for the Gateway ICT Conference 2025 at Gateway ICT Polytechnic Saapade, Ogun State. Conference details coming soon!",
    images: ["/images/twitter-image.jpg"],
    creator: "@GatewayICT",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
