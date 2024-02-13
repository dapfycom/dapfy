import Layout from "@/layout/MainLayout";
import RootProviders from "@/providers/rootProviders";
import type { Metadata } from "next";
import "./globals.css";

import { siteMetadata } from "@/utils/constants/siteMetadata";
import { GeistSans } from "geist/font";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
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
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  console.log("params", params);

  return (
    <html lang={params.lang} className={GeistSans.className}>
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="dapfy.com"
        defer
      />

      <Script
        id="seona-js-plugin"
        src="https://assets.usestyle.ai/seonajsplugin"
        type="text/javascript"
      />

      <body>
        <RootProviders>
          <Layout>
            <main>{children}</main>
          </Layout>
        </RootProviders>
      </body>
    </html>
  );
}
