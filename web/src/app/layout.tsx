import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Providers from "@/components/providers/providers";
import Container from "@/components/ui/container";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Programming Hero",
  description:
    "Learn and master programming to open a new career opportunity. Enjoy the most effective and fun way to learn programming as an absolute beginner.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          <Container>{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
