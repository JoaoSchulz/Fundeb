import { useEffect } from "react";
import {
  LandingHeader,
  LandingHero,
  LandingFooter,
} from "./components";
import {
  AboutSection,
  HowItWorksSection,
  SimulationsSection,
  UsersSection,
  BenefitsSection,
  OfficialDataSection,
  SecuritySection,
  TestimonialsSection,
  FaqSection,
  ContactSection,
} from "./components/sections";

export const LandingPage = (): JSX.Element => {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Intersection Observer para animações no scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-on-scroll");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Delay para garantir que os elementos estão no DOM
    setTimeout(() => {
      const elements = document.querySelectorAll(".fade-up, .zoom-in");
      elements.forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <LandingHeader />
      <main>
        <LandingHero />
        <AboutSection />
        <HowItWorksSection />
        <SimulationsSection />
        <UsersSection />
        <BenefitsSection />
        <OfficialDataSection />
        <SecuritySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <LandingFooter />
    </div>
  );
};

