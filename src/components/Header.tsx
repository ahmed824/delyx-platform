"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header>
      <div className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container__header">
          <div className="logo">
            <Link href="/">
              <img src="/images/Logo.png" alt="Logo" className="logo__header animate-logo" />
            </Link>
            <img src="/images/Logo.png" alt="Logo Dark" className="logo__header dar animate-logo" />
            <Link href="/">
              <img src="/images/Logo__dark.png" alt="Logo Mobile Dark" className="logo__header mobile" />
            </Link>
          </div>
          <nav>
            <div className="navigation animate-link">
              <Link href="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
              <Link href="/services" className={pathname === '/services' ? 'active' : ''}>Services</Link>
              <Link href="/product" className={pathname === '/product' ? 'active' : ''}>Product</Link>
              <Link href="/contact" className={pathname === '/contact' ? 'active' : ''}>Contact US</Link>
              <Link href="/dashboard" className={pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
            </div>
          </nav>
          <div className="icon__header animate-icons">
            <Link href="/register">
              <i className="fa-solid fa-circle-user"></i>
            </Link>
            <Link href="/register">
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
