import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Markdown to Medium Converter',
  description: 'Convert Markdown to Medium-compatible HTML format',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-PFXTJDC8BE" />
    </html>
  )
}