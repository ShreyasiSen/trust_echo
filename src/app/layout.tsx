import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner"; // Import the Toaster component
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fidefeed",
  description: "Know your worth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <html lang="en">
          <head>
            <link rel="icon" href="/favicon.ico" />
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased `}
          >
            <Toaster position="bottom-right" />
            {children}
          </body>
        </html>
      </ClerkProvider>
      <Analytics />
    </>
  );
}