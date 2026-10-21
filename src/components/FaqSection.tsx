import { useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";

export function FaqSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".faq-title, .faq-row",
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-card">
        <h2 className="faq-title" id="faq-heading">
          {t.faq.title}
        </h2>
        <div className="faq-list">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <article className={`faq-row${open ? " is-open" : ""}`} key={i}>
                <h3>
                  <button
                    type="button"
                    className="faq-question"
                    id={`faq-question-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="faq-q-text">{item.q}</span>
                    <span className="faq-toggle" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" className="faq-toggle-v" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  className="faq-answer"
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  inert={!open}
                >
                  <div className="faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
