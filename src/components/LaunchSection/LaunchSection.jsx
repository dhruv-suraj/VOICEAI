import useReveal from '../../hooks/useReveal';
import styles from './LaunchSection.module.css';

const checklist = [
  'Simulate production calls before launch.',
  'Review transcripts with built-in quality scoring.',
  'Fine-tune tone and policies with a no-code editor.',
  'Push updates instantly across phone and chat.',
];

const cards = [
  {
    title: 'Scenario Testing',
    description: 'Replay the top 100 intents in minutes and compare success metrics side by side.',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Monitor live performance with CSAT predictions, containment, and handoff reasons.',
  },
];

export default function LaunchSection() {
  const [ref, isVisible] = useReveal();

  return (
    <section id="solutions" className={`section-spacing ${styles.launchSection}`} ref={ref}>
      <div className={`container ${styles.launchInner}`}>
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <span className={styles.sectionLabel}>ORCHESTRATE WITH CONFIDENCE</span>
          <h2>Test, refine, and launch with confidence</h2>
          <p>
            Preview the voice before it goes live. Test calls, review transcripts, and give policy updates in minutes — not sprints.
            Every adjustment instantly cascades across channels.
          </p>
          <div className={styles.checklist}>
            {checklist.map((item) => (
              <div key={item} className={styles.checkItem}>
                <span aria-hidden="true">✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className={styles.links}>
            <a href="#contact" className="button button-primary">
              Start free trial
            </a>
            <a href="#demo" className="button button-ghost">
              Explore dashboard
            </a>
          </div>
        </div>

        <div className={`${styles.cardStack} staggered-children-reveal ${isVisible ? 'is-visible' : ''}`}>
          {cards.map((card) => (
            <article key={card.title} className={`surface-card ${styles.card}`}>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
              <div className={styles.cardFooter}>
                <span className="button-link">View playbook →</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
