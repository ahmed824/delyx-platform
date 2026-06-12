"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogout } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import LogoutModal from "@/components/LogoutModal";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "fa-table-cells" },
  { label: "Order list", href: "/orders", icon: "fa-list" },
  { label: "Tracking Delivery", href: "/tracking", icon: "fa-location-dot" },
  { label: "Setting", href: "/settings", icon: "fa-gear" },
];

type SidebarProps = {
  pathname: string;
  isActive?: boolean;
  onToggle?: () => void;
};

export default function Sidebar({ pathname, isActive = false, onToggle }: SidebarProps) {
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout(
      { flag: "all" },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_role");
          setShowLogoutModal(false);
          onToggle?.();
          router.push("/");
        },
        onError: (error: any) => {
          console.error("Logout error:", error);
          toast.error(error.message || "Logout failed");
          // Still clear local storage on error
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_role");
          setShowLogoutModal(false);
          onToggle?.();
          router.push("/");
        },
      }
    );
  };

  return (
    <aside className={`sidebar ${isActive ? "active" : ""}`}>
      <div>
        <Link href="/" className="brand" aria-label="DELY X dashboard">
          <span>DELY</span>
          <strong>X</strong>
          <i></i>
        </Link>
        <div className="sidebar-line" />

        <nav className="side-nav" aria-label="Dashboard navigation">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={active ? "active" : ""}
                onClick={() => onToggle?.()}
              >
                <span className="nav-icon">
                  <i className={`fa-solid ${item.icon}`}></i>
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-line" />
        <div className="user-row">
          <img src="/images/ahmed.jpg" alt="Ahmed Abdo" />
          <div>
            <strong>Ahmed Abdo</strong>
            <span>owner of store</span>
          </div>
        </div>
        <button 
          className="logout-button" 
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        isLoggingOut={isLoggingOut}
      />
    </aside>
  );
}
