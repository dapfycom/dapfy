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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
