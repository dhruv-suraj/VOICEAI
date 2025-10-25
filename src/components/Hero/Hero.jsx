import useReveal from '../../hooks/useReveal';
import styles from './Hero.module.css';

const highlights = [
  'Natural conversations, instant answers.',
  'Resolving 82% of phone cases without human handoff.',
  'Tone-aware, brand-aligned speech in 36 languages.',
];

const stats = [
  { label: 'Avg. CSAT', value: '97%' },
  { label: 'Resolution Rate', value: '82%' },
  { label: 'Speed to Response', value: '0.4s' },
];

export default function Hero() {
  const [heroRef, isHeroVisible] = useReveal();
  const [statsRef, areStatsVisible] = useReveal();

  return (
    <section id="top" className={`${styles.hero} background-grid`} ref={heroRef}>
      <div className={`container ${styles.heroInner}`}>
        <div className={`${styles.copy} fade-in-up ${isHeroVisible ? 'is-visible' : ''}`}>
          <span className={styles.tag}>INTRODUCING FIN VOICE</span>
          <h1>The #1 AI Agent for all customer service—now on the phone</h1>
          <p>
            Fin Voice delivers the warmth of a top-performing agent with the throughput of automation. Route calls instantly,
            remove IVR frustration, and deliver accurate resolutions in seconds.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className={`button button-primary ${styles.primaryCta}`}>
              Contact Sales
            </a>
            <a href="#demo" className={`button button-ghost ${styles.secondaryCta}`}>
              View Demo
            </a>
          </div>
          <ul className={`${styles.highlights} staggered-children-reveal ${isHeroVisible ? 'is-visible' : ''}`}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={`${styles.visual} fade-in-up ${isHeroVisible ? 'is-visible' : ''}`}>
          <div className={styles.deviceFrame}>
            <div className={styles.deviceGlow}></div>
            <div className={styles.deviceTop}>Incoming Call · Fin Voice Support</div>
            <div className={styles.deviceScreen}>
              <div className={styles.callAction}>Resolve issue with Fin Voice</div>
              <div className={styles.waveform}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={styles.callButtonRow}>
                <button type="button" className={styles.actionGhost}>Transfer</button>
                <button type="button" className={styles.actionPrimary}>End Call</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.statsWrapper}`} ref={statsRef}>
        <div className={`${styles.stats} fade-in-up ${areStatsVisible ? 'is-visible' : ''}`}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
