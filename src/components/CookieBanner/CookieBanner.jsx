import { useState } from 'react';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <aside className={styles.banner} role="region" aria-label="Cookie consent">
      <div className={styles.content}>
        <p>
          We use cookies to personalize your experience. By continuing to browse, you agree to our updated{' '}
          <a href="#">Privacy Policy</a> and <a href="#">Cookie Policy</a>.
        </p>
        <div className={styles.actions}>
          <button type="button" className="button button-ghost" onClick={() => setDismissed(true)}>
            Manage preferences
          </button>
          <button type="button" className="button button-primary" onClick={() => setDismissed(true)}>
            Accept all
          </button>
        </div>
      </div>
    </aside>
  );
}
