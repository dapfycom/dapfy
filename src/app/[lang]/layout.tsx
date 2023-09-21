import Layout from "@/layout/MainLayout";
import RootProviders from "@/providers/rootProviders";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "xBeskar | %s",
    default: "xBeskar",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <RootProviders>
          <Layout>
            <main>{children}</main>
          </Layout>
        </RootProviders>
      </body>
    </html>
  );
}
