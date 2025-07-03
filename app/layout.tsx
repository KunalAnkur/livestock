import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/ui/Sidebar";

export const metadata = {
  title: "Livestock App",
  description: "Livestock tools and calculators",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
