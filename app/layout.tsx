import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dapfy - Monetise Your Creativity",
  description:
    "A marketplace for creators to sell digital products like videos, music, images, ebooks, and docs.",
  keywords:
    "digital marketplace, creator economy, digital products, monetization",
  openGraph: {
    title: "Dapfy - Monetise Your Creativity",
    description:
      "Join the waitlist for Dapfy, the ultimate platform for creators to sell digital products.",
    images: [
      {
        url: "/android-chrome-384x384.png",
        width: 1200,
        height: 630,
        alt: "Dapfy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dapfy - Monetise Your Creativity",
    description:
      "Join the waitlist for Dapfy, the ultimate platform for creators to sell digital products.",
    images: ["/android-chrome-384x384.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="dapfy.com"
          src="https://plausible.io/js/script.js"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
