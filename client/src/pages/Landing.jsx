import { useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import HealthyCreations from '../components/HealthyCreations';
import Features from '../components/Features';
import ImageStrip from '../components/ImageStrip';
import EarlyAccess from '../components/EarlyAccess';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Landing() {
  const earlyAccessRef = useRef(null);

  const scrollToEarlyAccess = () => {
    earlyAccessRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Header />
      <Hero onCtaClick={scrollToEarlyAccess} />
      <About />
      <HealthyCreations />
      <Features />
      <ImageStrip />
      <div ref={earlyAccessRef}>
        <EarlyAccess />
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
