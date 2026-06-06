"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    checkUserRole();

    // Listen for storage changes (for multi-tab support)
    window.addEventListener("storage", checkUserRole);
    return () => window.removeEventListener("storage", checkUserRole);
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
            <Link href="/register">
              <i className="fa-solid fa-circle-user"></i>
            </Link>
            <Link href="/register">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
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
            <Link href="/register" onClick={closeMobileMenu}>
              <i className="fa-solid fa-circle-user"></i>
              <span>Account</span>
            </Link>
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
    </header>
  );
}
