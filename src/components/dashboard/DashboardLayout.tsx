"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard-shell">
      <button 
        className={`sidebar-toggle ${isSidebarOpen ? "active" : ""}`} 
        onClick={toggleSidebar} 
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        <i className={`fa-solid ${isSidebarOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>
      <div className={`sidebar-overlay ${isSidebarOpen ? "active" : ""}`} onClick={closeSidebar}></div>
      <Sidebar pathname={pathname} isActive={isSidebarOpen} onToggle={closeSidebar} />
      <div className="dashboard-main">
        <Topbar title={title} />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
