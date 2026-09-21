import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Cases } from './components/Cases';
import { Pricing } from './components/Pricing';
import { InstagramFeed } from './components/InstagramFeed';
import { InstagramCTA } from './components/InstagramCTA';
import { Footer } from './components/Footer';
import { CREATOR_INFO } from './data/portfolioData';

export function App() {
  const handleOpenInstagram = () => {
    window.open(CREATOR_INFO.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans selection:bg-black selection:text-white">
      {/* Fixed Navigation Header */}
      <Header onOpenContact={handleOpenInstagram} />

      {/* Main Landing Page Flow */}
      <main className="flex-1">
        <Hero onOpenContact={handleOpenInstagram} />
        <About />
        <Services onSelectService={handleOpenInstagram} />
        <Portfolio onInquire={handleOpenInstagram} />
        <Cases onOpenContact={handleOpenInstagram} />
        <Pricing onSelectPlan={handleOpenInstagram} />
        <InstagramFeed />
        <InstagramCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
