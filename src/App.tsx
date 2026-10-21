import { useEffect, useRef } from "react";
import { BrandHandSection } from "./components/BrandHandSection";
import { CloudsSection } from "./components/CloudsSection";
import { FaqSection } from "./components/FaqSection";
import { FloatingBar } from "./components/FloatingBar";
import { Footer } from "./components/Footer";
import { GatewaysSection } from "./components/GatewaysSection";
import { Hero } from "./components/Hero";
import { ProcessTimeline } from "./components/ProcessTimeline";
import { ProjectsSection } from "./components/ProjectsSection";
import { ScrollProgress } from "./components/ScrollProgress";
import { StatsSection } from "./components/StatsSection";
import { ValueSection } from "./components/ValueSection";
import { WalletSection } from "./components/WalletSection";
import { WhySection } from "./components/WhySection";
import { useI18n } from "./i18n/LanguageProvider";
import { ScrollTrigger } from "./lib/gsap";
import { usePointerEffects } from "./lib/pointerEffects";
import { initSmoothScroll } from "./lib/scroll";

export default function App() {
  const { lang } = useI18n();
  const firstLang = useRef(true);

  useEffect(() => initSmoothScroll(), []);
  usePointerEffects();

  // Recalcula as posições das animações quando o layout pode ter mudado.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  // Textos em outro idioma têm outra altura (a seção fixada depende disso).
  useEffect(() => {
    if (firstLang.current) {
      firstLang.current = false;
      return;
    }
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [lang]);

  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <ValueSection />
        <WalletSection />
        <StatsSection />
        <CloudsSection />
        <ProjectsSection />
        <ProcessTimeline />
        <WhySection />
        <GatewaysSection />
        <BrandHandSection />
        <FaqSection />
      </main>
      <Footer />
      <FloatingBar />
    </>
  );
}
