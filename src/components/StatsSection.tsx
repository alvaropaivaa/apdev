import { useRef } from "react";
import { site } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "../lib/gsap";

export function StatsSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
        const write = (i: number, value: number) => {
          counters[i].textContent = String(Math.round(value));
        };
        let tweens: gsap.core.Tween[] = [];

        const reset = () => {
          tweens.forEach((tween) => tween.kill());
          tweens = [];
          site.stats.forEach((_, i) => write(i, 0));
        };
        const play = () => {
          reset();
          tweens = site.stats.map((stat, i) => {
            const state = { value: 0 };
            return gsap.to(state, {
              value: stat.value,
              duration: 1.8,
              delay: i * 0.08,
              ease: "power2.out",
              onUpdate: () => write(i, state.value),
            });
          });
        };

        reset();
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 82%",
          end: "max",
          onEnter: play,
          onLeaveBack: reset,
        });
        // Página aberta já abaixo da seção: mostra os números finais.
        if (trigger.progress > 0) site.stats.forEach((stat, i) => write(i, stat.value));

        gsap.fromTo(
          ".stats-container",
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 92%", end: "top 55%", scrub: 0.5 },
          },
        );

        return () => {
          tweens.forEach((tween) => tween.kill());
          site.stats.forEach((stat, i) => write(i, stat.value));
        };
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="stats-section" id="resultados" aria-label={t.stats.label}>
      <div className="stats-container">
        <dl className="stats-grid">
          {site.stats.map((stat, i) => (
            <div className="stats-item" key={i}>
              <dt className="stats-label">{t.stats.items[i]}</dt>
              <dd className="stats-value" aria-label={`${stat.prefix}${stat.value}${stat.suffix}`}>
                <span aria-hidden="true">
                  {stat.prefix}
                  <span data-count>{stat.value}</span>
                  <span className="stats-suffix">{stat.suffix}</span>
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
