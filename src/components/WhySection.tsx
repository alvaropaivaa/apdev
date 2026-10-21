import { useRef } from "react";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";
import { QuoteButton } from "./QuoteButton";
import { AiVisual, SiteVisual, SystemVisual } from "./WhyVisuals";

/** Ilustração de cada card, na mesma ordem dos textos em content.ts (site, sistema, IA). */
const CARD_VISUALS = [SiteVisual, SystemVisual, AiVisual];

export function WhySection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".why-head",
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".why-head", start: "top 84%", toggleActions: "play none none reverse" },
          },
        );
        gsap.fromTo(
          ".why-card",
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".why-grid", start: "top 86%", toggleActions: "play none none reverse" },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="why-section" id="diferenciais" aria-labelledby="why-headline">
      <div className="why-head">
        <h2 className="why-headline" id="why-headline">
          {t.why.title[0]}
          <br />
          {t.why.title[1]}
          <br />
          <span className="why-grad">{t.why.highlight}</span>
        </h2>
      </div>

      <div className="why-grid">
        {t.why.cards.map((card, i) => {
          const CardVisual = CARD_VISUALS[i];
          return (
            <article className="why-card" key={i} data-spotlight>
              {CardVisual && <CardVisual />}
              <h3>{card.title}</h3>
              <p className="why-card-text">{card.text}</p>
              <div className="why-card-glow" aria-hidden="true" />
            </article>
          );
        })}
      </div>

      <div className="why-cta-row">
        <QuoteButton />
      </div>
    </section>
  );
}
