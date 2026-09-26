import { SiteHeader } from './components/SiteHeader';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { HowItWorks } from './components/HowItWorks';
import { Team } from './components/Team';
import { LogoStrip } from './components/LogoStrip';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { SiteFooter } from './components/SiteFooter';

function App() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <HowItWorks />
        <Team />
        <LogoStrip />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
