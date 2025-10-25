import { useState } from 'react';
import styles from './Header.module.css';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
  { label: 'Resources', href: '#resources' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <a className={styles.logo} href="#top" aria-label="VOICE AI home">
          <span className={styles.logoMark}>✶</span>
          <span className={styles.logoType}>VOICE AI</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <button className={`${styles.search} subtle-scale-on-hover`} type="button">
            <span className={styles.searchIcon} aria-hidden="true">⌕</span>
            <span>Search Fin</span>
          </button>
          <a href="#contact" className={styles.secondaryAction}>
            Contact Sales
          </a>
          <a href="#demo" className={`button button-primary ${styles.primaryAction}`}>
            View Demo
          </a>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        <nav className={styles.mobileNavContent}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className={styles.mobileActions}>
            <a href="#contact" className={styles.mobileContact}>
              Contact Sales
            </a>
            <a href="#demo" className={`button button-primary ${styles.mobileCta}`}>
              View Demo
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
