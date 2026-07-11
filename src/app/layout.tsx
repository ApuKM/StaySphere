import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/homepage/Navbar";
import Footer from "@/components/homepage/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = {
  title: "Stay-Sphere: A Modern Property/Room Booking Platform",
  description: "A Modern Property/Room Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="h-full bg-brand-bg text-brand-text flex flex-col">
        <AppNavbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
