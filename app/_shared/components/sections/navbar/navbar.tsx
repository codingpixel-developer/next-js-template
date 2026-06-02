'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { images } from '@/app/_shared/assets/images';
import styles from './navbar.module.scss';

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'APP', href: '#app' },
  { label: 'HOW IT WORKS', href: '#how-it-works' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'SUPPORT', href: '#support' },
] as const;

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <Image
            src={images.logoWhite}
            alt="SteelAngel"
            width={144}
            height={34}
            priority
          />
        </Link>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#download" className={styles.ctaBtn}>
          DOWNLOAD THE APP
        </a>

        <button
          className={styles.menuBtn}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen
            ? <X size={22} color="#F5EFE6" />
            : <Menu size={22} color="#F5EFE6" />
          }
        </button>
      </div>

      <div
        className={[
          styles.mobileMenu,
          mobileOpen ? styles.mobileMenuOpen : '',
        ].filter(Boolean).join(' ')}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileNavLink}
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#download" className={styles.mobileCta}>
          DOWNLOAD THE APP
        </a>
      </div>
    </nav>
  );
};
