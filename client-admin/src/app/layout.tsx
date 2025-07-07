import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // ⬅️ Import toast styles
import "./globals.css";

import { ToastContainer } from "react-toastify"; // ⬅️ Import ToastContainer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeraldSync Admin Panel",
  description: "Admin panel to manage lateslips and schedules.",
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
        {/* ToastContainer should be rendered once here */}
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="container-fluid px-3">{children}</div>
      </body>
    </html>
  );
}
