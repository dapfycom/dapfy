import Layout from "@/layout/MainLayout";
import RootProviders from "@/providers/rootProviders";
import type { Metadata } from "next";
import "./globals.css";

import { GeistSans } from "geist/font";
export const metadata: Metadata = {
  title: {
    template: "Dapfy | %s",
    default: "Dapfy",
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
    <html lang={params.lang} className={GeistSans.className}>
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
