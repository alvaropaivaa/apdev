import { useRef } from "react";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";

const DESKTOP_PATH = "M 44 66 H 950 Q 980 66 980 96 V 270 Q 980 300 950 300 H 44";
const MOBILE_PATH = "M 8 32 V 520";

export function ProcessTimeline() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const mm = gsap.matchMedia();

      mm.add(
        { desktop: `(min-width: 761px) and ${MOTION_OK}`, mobile: `(max-width: 760px) and ${MOTION_OK}` },
        (context) => {
          const mobile = Boolean(context.conditions?.mobile);
          const line = section.querySelector<SVGPathElement>(
            mobile ? ".process-path-mobile .process-line-active" : ".process-path-desktop .process-line-active",
          );
          const steps = gsap.utils.toArray<HTMLElement>(".process-step");
          if (!line || steps.length < 2) return;

          const length = line.getTotalLength();
          // Distância (no path) até cada bolinha numerada.
          const stops = mobile
            ? steps.map((_, i) => (length * i) / (steps.length - 1))
            : [0, 326, 652, length - 652, length - 326, length];

          gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          gsap.set(steps.slice(1), { opacity: 0.28 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * (mobile ? 2.4 : 3.2))}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          for (let i = 1; i < steps.length; i++) {
            timeline.to(line, { strokeDashoffset: length - stops[i], duration: 1, ease: "none" }, i - 1);
            timeline.to(steps[i], { opacity: 1, duration: 0.5, ease: "none" }, i - 0.5);
          }
        },
      );
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="process-timeline" id="processo" aria-labelledby="process-timeline-heading">
      <div className="process-timeline-inner">
        <div className="process-bg-layer" aria-hidden="true">
          <picture>
            <source media="(min-width: 1440px)" srcSet="/images/process-bg-desktop-grande.png" />
            <source media="(min-width: 1280px)" srcSet="/images/process-bg-desktop.png" />
            <source media="(min-width: 761px)" srcSet="/images/process-bg-tablet.png" />
            <img className="process-bg" src="/images/process-bg-mobile.png" alt="" decoding="async" />
          </picture>
        </div>

        <h2 id="process-timeline-heading">
          {t.process.title}
          <br />
          <span>{t.process.highlight}</span>
        </h2>

        <div className="process-stage">
          <svg className="process-path-desktop" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
            <path className="process-line-base" d={DESKTOP_PATH} />
            <path className="process-line-active" d={DESKTOP_PATH} />
          </svg>
          <svg className="process-path-mobile" viewBox="0 0 100 560" preserveAspectRatio="none" aria-hidden="true">
            <path className="process-line-base" d={MOBILE_PATH} />
            <path className="process-line-active" d={MOBILE_PATH} />
          </svg>

          <ol className="process-steps">
            {t.process.steps.map((step, i) => (
              <li className={`process-step process-step--${i + 1}`} key={i}>
                <span className="process-number" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="process-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
