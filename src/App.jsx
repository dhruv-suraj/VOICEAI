import './global.css';
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import BrandMarquee from './components/BrandMarquee/BrandMarquee.jsx';
import FeatureShowcase from './components/FeatureShowcase/FeatureShowcase.jsx';
import LaunchSection from './components/LaunchSection/LaunchSection.jsx';
import PerformanceSection from './components/PerformanceSection/PerformanceSection.jsx';
import Testimonials from './components/Testimonials/Testimonials.jsx';
import Integrations from './components/Integrations/Integrations.jsx';
import Pricing from './components/Pricing/Pricing.jsx';
import CTASection from './components/CTASection/CTASection.jsx';
import Footer from './components/Footer/Footer.jsx';
import CookieBanner from './components/CookieBanner/CookieBanner.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <BrandMarquee />
        <FeatureShowcase />
        <LaunchSection />
        <PerformanceSection />
        <Testimonials />
        <Integrations />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}
