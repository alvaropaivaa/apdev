import { useRef } from "react";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";
import { AutoplayVideo } from "./AutoplayVideo";

export function GatewaysSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  // O original animava esta seção mesmo com "reduzir movimento" ativado.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reveal = (target: string, trigger: string, start: string, from: gsap.TweenVars, to: gsap.TweenVars) =>
          gsap.fromTo(target, from, {
            ...to,
            ease: "power3.out",
            scrollTrigger: { trigger, start, toggleActions: "play none none reverse" },
          });

        reveal(".gateways-head", ".gateways-head", "top 82%", { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });
        reveal(
          ".gateways-panel",
          ".gateways-panel",
          "top 85%",
          { y: 90, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 1.1 },
        );
        reveal(
          ".gateways-feature",
          ".gateways-features",
          "top 88%",
          { y: 56, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="gateways-section"
      id="plataforma"
      aria-labelledby="gateways-headline"
      style={{ backgroundImage: "url(/images/gateways-bg.png)" }}
    >
      <div className="gateways-head">
        <h2 className="gateways-headline" id="gateways-headline">
          {t.gateways.title}
          <br />
          {t.gateways.titleLine2}
          <span className="gateways-grad">{t.gateways.highlight}</span>
        </h2>
        <p className="gateways-sub">{t.gateways.sub}</p>
      </div>

      <div className="gateways-panel">
        <AutoplayVideo
          className="gateways-panel-video"
          src="/videos/gateways-panel.webm"
          poster="/images/gateways-panel-poster.webp"
        />
        <div className="gateways-panel-copy">
          <h3>
            {t.gateways.panelTitle[0]}
            <br />
            {t.gateways.panelTitle[1]}
            <br />
            {t.gateways.panelTitle[2]}
          </h3>
          <p>
            <span className="gateways-sub-line">{t.gateways.panelText[0]}</span>
            <span className="gateways-sub-line">{t.gateways.panelText[1]}</span>
          </p>
        </div>
      </div>

      <div className="gateways-features">
        {t.gateways.features.map((feature, i) => (
          <article
            className="gateways-feature"
            data-spotlight
            key={i}
            style={{ backgroundImage: "url(/images/gateways-feature-bg.webp)" }}
          >
            <h4>{feature.title}</h4>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
