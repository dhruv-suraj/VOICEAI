import useReveal from '../../hooks/useReveal';
import styles from './PerformanceSection.module.css';

const metrics = [
  { label: 'Containment Rate', value: '82%', delta: '+27 vs benchmark' },
  { label: 'Avg. CSAT', value: '4.9/5', delta: 'Leading contact centers' },
  { label: 'Handle Time', value: '2m 13s', delta: '-65% vs human agents' },
];

export default function PerformanceSection() {
  const [ref, isVisible] = useReveal();

  return (
    <section className={`section-spacing ${styles.performance}`} ref={ref}>
      <div className={`container ${styles.performanceInner}`}>
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <span className={styles.sectionLabel}>BENCHMARKED AGAINST THE BEST</span>
          <h2>Fin outperforms every competitor</h2>
          <p>
            With an answer rate north of 96%, Fin resolves more customer questions than any other agent. It meets enterprise
            compliance requirements out of the box and scales globally.
          </p>
          <div className={styles.metricRow}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <span className={styles.value}>{metric.value}</span>
                <span className={styles.label}>{metric.label}</span>
                <span className={styles.delta}>{metric.delta}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.visualGrid} staggered-children-reveal ${isVisible ? 'is-visible' : ''}`}>
          <article className={styles.visualCard}>
            <header>
              <h4>Resolution Rate</h4>
              <span>Fin vs legacy IVR</span>
            </header>
            <div className={styles.barChart}>
              <div className={styles.bar} data-label="IVR"></div>
              <div className={`${styles.bar} ${styles.barAccent}`} data-label="Fin"></div>
            </div>
          </article>

          <article className={styles.visualCard}>
            <header>
              <h4>Call Volume Handled</h4>
              <span>Projected over 12 months</span>
            </header>
            <div className={styles.lineChart}>
              <div className={styles.line}></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
