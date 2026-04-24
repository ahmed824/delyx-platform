import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
