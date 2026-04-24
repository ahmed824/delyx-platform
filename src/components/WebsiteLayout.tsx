import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type WebsiteLayoutProps = {
  children: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
