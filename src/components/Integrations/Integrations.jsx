import useReveal from '../../hooks/useReveal';
import styles from './Integrations.module.css';

const integrations = [
  'Salesforce',
  'Zendesk',
  'ServiceNow',
  'Freshdesk',
  'Custom APIs',
  'Data Warehouse',
];

export default function Integrations() {
  const [ref, isVisible] = useReveal();

  return (
    <section id="resources" className={styles.integrations} ref={ref}>
      <div className={`container ${styles.content}`}>
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <span className={styles.sectionLabel}>CONNECT ANYWHERE</span>
          <h2>Seamlessly integrate with your existing systems</h2>
          <p>
            Fin Voice connects to your stack in hours. Drop-in connectors sync knowledge bases, CRM records, and workflows so
            every call ends with the right action. Use our composable APIs to create bespoke experiences.
          </p>
          <div className={styles.actions}>
            <a href="#docs" className="button button-ghost">
              Explore documentation
            </a>
            <a href="#contact" className="button button-primary">
              Talk to integrations
            </a>
          </div>
        </div>
        <div className={`${styles.integrationList} staggered-children-reveal ${isVisible ? 'is-visible' : ''}`}>
          {integrations.map((item) => (
            <div key={item} className={styles.integrationItem}>
              <span>{item}</span>
              <span>↗</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
