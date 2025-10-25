import useReveal from '../../hooks/useReveal';
import styles from './BrandMarquee.module.css';

const brands = ['Amplitude', 'Anthropic', 'Notion', 'Circle', 'Coda', 'Cultura', 'Linear', 'Intercom', 'Rippling', 'Loom'];

export default function BrandMarquee() {
  const [ref, isVisible] = useReveal();

  return (
    <section className={styles.marquee} aria-label="Customer logos">
      <div className={`container fade-in-up ${isVisible ? 'is-visible' : ''}`} ref={ref}>
        <div className={styles.track}>
          {brands.map((brand) => (
            <span key={brand} className={styles.brand}>
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
