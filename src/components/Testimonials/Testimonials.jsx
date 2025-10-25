import useReveal from '../../hooks/useReveal';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote:
      'Fin is in a completely different league. It is now involved in 92% of conversations and resolves up to 68% end-to-end without human agents.',
    author: 'April Wang, Senior Director of CX, Supercharged Support',
  },
  {
    quote:
      'With Fin we scale globally without hiring sprints. Every location has consistent quality, tone, and compliance.',
    author: 'Jayme Goodwin, VP Support, Culture Collective',
  },
  {
    quote:
      'What I like about Fin is that we control it. We do not need engineers to make it work. We can adapt ourselves.',
    author: 'Jayson Castillo, Support Lead, Gamma Finance',
  },
];

export default function Testimonials() {
  const [ref, isVisible] = useReveal();

  return (
    <section id="customers" className={`section-spacing-tight ${styles.testimonials}`} ref={ref}>
      <div className={`container ${styles.testimonialsInner}`}>
        <div className={`fade-in-up ${isVisible ? 'is-visible' : ''}`}>
          <span className={styles.sectionLabel}>CUSTOMERS WHO RELY ON FIN</span>
          <h2>The most trusted AI agent in customer service</h2>
        </div>
        <div className={`${styles.grid} staggered-children-reveal ${isVisible ? 'is-visible' : ''}`}>
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.author} className={`surface-card ${styles.card}`}>
              <p>“{testimonial.quote}”</p>
              <footer>{testimonial.author}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
