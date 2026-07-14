import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { PageWrapper } from "@/components/layout";
import { AppProvider } from "@/providers";

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
  title: {
    default: "Gamers Unite",
    template: "%s | Gamers Unite",
  },
  description:
    "Discover gaming cafes, popular games, and trusted player reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AppProvider>
          <PageWrapper>{children}</PageWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
