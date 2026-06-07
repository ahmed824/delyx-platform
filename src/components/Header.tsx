"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLogout } from '@/hooks/use-auth';
import toast from 'react-hot-toast';
import LogoutModal from '@/components/LogoutModal';
import { debugToken } from '@/lib/jwt-utils';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.add("loaded");
  }, []);

  useEffect(() => {
    // Check for user role on mount and when localStorage changes
    const checkUserRole = () => {
      const role = localStorage.getItem("user_role");
      setUserRole(role);
    };

    // Check authentication status
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    };

    checkUserRole();
    checkAuth();

    // Listen for storage changes (for multi-tab support)
    window.addEventListener("storage", checkUserRole);
    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkUserRole);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Debug token before logout
    const token = localStorage.getItem("access_token");
    console.log('[Logout] Token before logout:', {
      hasToken: !!token,
      tokenLength: token?.length,
      tokenPreview: token ? `${token.substring(0, 20)}...` : 'none',
    });
    debugToken(token);

    logout(
      { flag: "all" },
      {
        onSuccess: (response) => {
          toast.success(response.message);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_role");
          setIsAuthenticated(false);
          setUserRole(null);
          router.push("/");
          closeMobileMenu();
          setShowLogoutModal(false);
        },
        onError: (error: any) => {
          console.error('[Logout Error]', error);
          toast.error(error.message || "Logout failed");
          // Still clear local storage on error to ensure user is logged out locally
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user_role");
          setIsAuthenticated(false);
          setUserRole(null);
          router.push("/");
          closeMobileMenu();
          setShowLogoutModal(false);
        },
      }
    );
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/product', label: 'Product' },
    { href: '/contact', label: 'Contact US' },
  ];

  if (userRole === 'admin') {
    navLinks.push({ href: '/dashboard', label: 'Dashboard' });
  }

  return (
    <header>
      <div className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container__header">
          <div className="logo">
            <Link href="/" onClick={closeMobileMenu}>
              <img src="/images/Logo.png" alt="Logo" className="logo__header animate-logo" />
            </Link>
            <img src="/images/Logo.png" alt="Logo Dark" className="logo__header dar animate-logo" />
            <Link href="/" onClick={closeMobileMenu}>
              <img src="/images/Logo__dark.png" alt="Logo Mobile Dark" className="logo__header mobile" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <div className="navigation animate-link">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={pathname === link.href ? 'active' : ''}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          <div className="icon__header animate-icons desktop-only">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                  fontSize: '22px',
                  color: 'var(--text-color-light)',
                  transition: 'all 0.3s ease',
                  opacity: isLoggingOut ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoggingOut) e.currentTarget.style.color = 'var(--first-color)';
                }}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-color-light)'}
                aria-label="Logout"
              >
                <i className={`fa-solid ${isLoggingOut ? 'fa-spinner fa-spin' : 'fa-right-from-bracket'}`}></i>
              </button>
            ) : (
              <Link href="/register">
                <i className="fa-solid fa-circle-user"></i>
              </Link>
            )}
            {/* <Link href="/register">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-content">
          <button
            className="sidebar-close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="sidebar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={pathname === link.href ? 'active' : ''}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="sidebar-icons">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--text-color)',
                  fontSize: '16px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  background: 'none',
                  border: 'none',
                  cursor: isLoggingOut ? 'not-allowed' : 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  opacity: isLoggingOut ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isLoggingOut) {
                    e.currentTarget.style.background = '#f5f5f5';
                    e.currentTarget.style.color = 'var(--first-color)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none';
                  e.currentTarget.style.color = 'var(--text-color)';
                }}
              >
                <i className={`fa-solid ${isLoggingOut ? 'fa-spinner fa-spin' : 'fa-right-from-bracket'}`} style={{ fontSize: '20px' }}></i>
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </button>
            ) : (
              <Link href="/register" onClick={closeMobileMenu}>
                <i className="fa-solid fa-circle-user"></i>
                <span>Account</span>
              </Link>
            )}
            {/* <Link href="/register" onClick={closeMobileMenu}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Cart</span>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Overlay Backdrop */}
      <div
        className={`sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      ></div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        isLoggingOut={isLoggingOut}
      />
    </header>
  );
}
