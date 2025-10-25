import useReveal from '../../hooks/useReveal';
import styles from './FeatureShowcase.module.css';

const features = [
  {
    title: 'Reach 24/7 at the tone',
    description:
      'Fin Voice delivers enterprise-ready coverage around the clock. Calls connect instantly with sub-second latency and no IVR tree.',
  },
  {
    title: 'Conversations that feel natural',
    description:
      'Large speech-to-action models keep track of nuance, remember context, and adapt tone in real time to match your brand.',
  },
  {
    title: 'Seamlessly tied to your tools',
    description:
      'Integrate with Zendesk, Salesforce, custom CRMs, and ticketing systems so every resolution is logged automatically.',
  },
];

export default function FeatureShowcase() {
  const [ref, isVisible] = useReveal();

  return (
    <section id="product" className={styles.featureSection} ref={ref}>
      <div className={`container ${styles.featureInner}`}>
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <span className={styles.sectionLabel}>PHONE SUPPORT, REIMAGINED</span>
          <h2>Natural conversations. Instant answers.</h2>
          <p>
            For leaders who want to deliver an experience callers love. Fin Voice personalizes every touchpoint, understands intent,
            and resolves issues end-to-end.
          </p>
        </div>
        <div className={`${styles.featureGrid} staggered-children-reveal ${isVisible ? 'is-visible' : ''}`}>
          {features.map((feature) => (
            <article key={feature.title} className={`surface-card ${styles.featureCard} subtle-scale-on-hover`}>
              <div className={styles.cardBadge}>Fin Voice</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
