import styles from './Footer.module.css';

const footerLinks = [
  {
    heading: 'Product',
    links: ['Voice Agent', 'Chat Agent', 'Knowledge Base', 'Automations'],
  },
  {
    heading: 'Solutions',
    links: ['Contact Center', 'Ecommerce', 'Fintech', 'B2B SaaS'],
  },
  {
    heading: 'Resources',
    links: ['Docs', 'Security', 'Blog', 'Status'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.brandBlock}>
          <span className={styles.logoMark}>✶</span>
          <span className={styles.logoType}>VOICE AI</span>
          <p>
            The autonomous agent trusted by the world’s fastest-growing companies to deliver personal customer support at scale.
          </p>
        </div>
        <div className={styles.linkGrid}>
          {footerLinks.map((section) => (
            <div key={section.heading} className={styles.column}>
              <h5>{section.heading}</h5>
              <ul>
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <span>© {new Date().getFullYear()} Fin Technologies Inc.</span>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
