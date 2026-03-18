import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import Scrollytelling from "@/components/Scrollytelling";
import FloatingActions from "@/components/FloatingActions";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Stats from "@/components/sections/Stats";
import TechStack from "@/components/sections/TechStack";
import Security from "@/components/sections/Security";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Developer from "@/components/sections/Developer";
import Footer from "@/components/Footer";
import FAQJsonLd from "@/components/FAQJsonLd";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <FloatingActions />

      {/* Scrollytelling + Hero overlay section */}
      <div id="hero" className="relative">
        <Scrollytelling />
        <Hero />
      </div>

      {/* Rest of the site appears after scrollytelling finishes */}
      <main className="relative z-20 bg-background">
        <Problem />
        <Features />
        <HowItWorks />
        <Stats />
        <TechStack />
        <Security />
        <FAQ />
        <Developer />
        <CTA />
      </main>
      <Footer />
      <FAQJsonLd />
    </>
  );
}
