"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="dashboard-shell">
      <Sidebar pathname={pathname} />
      <div className="dashboard-main">
        <Topbar title={title} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
