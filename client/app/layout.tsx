import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/ui/Toast";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "MyContacts",
  description: "Your personal contact manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="h-full antialiased bg-[#F9FAFB] text-[#111827]">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
