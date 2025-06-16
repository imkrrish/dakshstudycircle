import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "./head";
import SEO from "@/next-seo.config";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = SEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />
      <body className={`${inter.className} antialiased`}>
        <NavbarDemo />
        {children}
        <Footer />
      </body>
    </html>
  );
}
