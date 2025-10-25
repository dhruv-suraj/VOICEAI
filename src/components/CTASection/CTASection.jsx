import useReveal from '../../hooks/useReveal';
import styles from './CTASection.module.css';

export default function CTASection() {
  const [ref, isVisible] = useReveal();

  return (
    <section className={styles.cta} ref={ref}>
      <div className={`container ${styles.ctaInner} fade-in-up ${isVisible ? 'is-visible' : ''}`}>
        <div>
          <span className={styles.sectionLabel}>READY WHEN YOU ARE</span>
          <h2>See Fin Voice on your calls this week</h2>
          <p>
            Pair with an onboarding specialist, import your knowledge base, and launch your first intents in days. Your customers
            feel the difference immediately.
          </p>
        </div>
        <div className={styles.actions}>
          <a href="#demo" className="button button-primary">
            Book a demo
          </a>
          <a href="#contact" className="button button-ghost">
            Download playbook
          </a>
        </div>
      </div>
    </section>
  );
}
