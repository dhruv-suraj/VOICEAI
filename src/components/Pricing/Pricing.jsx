import useReveal from '../../hooks/useReveal';
import styles from './Pricing.module.css';

const bullets = [
  'Only pay for resolved conversations — $0.99 per minute.',
  'Enterprise-grade SLAs and dedicated launch engineers.',
  'Privacy-first architecture with SOC2 Type II controls.',
];

export default function Pricing() {
  const [ref, isVisible] = useReveal();

  return (
    <section id="pricing" className={`section-spacing ${styles.pricing}`} ref={ref}>
      <div className={`container ${styles.pricingInner}`}>
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <span className={styles.sectionLabel}>FAIR, OUTCOME-BASED PRICING</span>
          <h2>Simple, outcome-based pricing</h2>
          <p>
            Predictable pricing that scales with impact. Only pay when Fin resolves the call — never for transfers or escalations.
            Get transparent reporting down to the penny.
          </p>
          <ul className={styles.bulletList}>
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`${styles.card} fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <div className={styles.priceTag}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>0.99</span>
            <span className={styles.frequency}>per resolved minute</span>
          </div>
          <div className={styles.cardActions}>
            <a href="#contact" className="button button-primary">
              Contact sales
            </a>
            <a href="#demo" className="button button-ghost">
              Try the simulator
            </a>
          </div>
          <div className={styles.footnote}>Volume discounts for teams completing 50k+ calls per month.</div>
        </div>
      </div>
    </section>
  );
}
