import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { QueryProvider } from "@/lib/query-provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "DELY X Dashboard",
  description: "Traffic-aware intelligent delivery robot dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
