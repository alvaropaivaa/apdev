import { useRef } from "react";
import { site } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";

export function BrandHandSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
            invalidateOnRefresh: true,
          },
        });
        timeline
          .fromTo(
            ".brand-hand-art",
            { autoAlpha: 0, scale: 0.68, y: 88 },
            { autoAlpha: 1, scale: 1, y: 0, duration: 1.3, ease: "power3.out" },
            0,
          )
          .fromTo(
            ".brand-hand-copy > *",
            { autoAlpha: 0, y: 38 },
            { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out" },
            0.1,
          );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="brand-hand-section" aria-labelledby="brand-hand-heading">
      <div className="brand-hand-inner">
        <div className="brand-hand-copy">
          <h2 id="brand-hand-heading">
            {t.brandHand.title}
            <br />
            {t.brandHand.titleLine2}
            <span>{t.brandHand.highlight}</span>
          </h2>
          <p>{t.brandHand.text}</p>
        </div>
        <img
          className="brand-hand-art"
          src={site.images.brandHand}
          alt={t.brandHand.artAlt}
          width={1254}
          height={1254}
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
