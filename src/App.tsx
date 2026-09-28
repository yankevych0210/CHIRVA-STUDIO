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

export function App() {
  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans">
      <a href="#main" className="skip-link">Перейти до змісту</a>

      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Landing Page Flow */}
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Cases />
        <Pricing />
        <InstagramFeed />
        <InstagramCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
