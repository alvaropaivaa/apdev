import { useRef } from "react";
import { site, whatsappUrl } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";
import { ArrowUpRight } from "./Icons";

export function ValueSection() {
  const { t, lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  // Textos entram desfocados e subindo, em cascata.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".value-left > *, .value-copy > *",
          { y: 40, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="value-section" id="vantagens" aria-labelledby="value-heading">
      <div className="value-inner">
        <div className="value-left">
          <span className="value-tag">{t.value.tag}</span>
          <h2 id="value-heading">
            {t.value.title[0]}
            <br />
            {t.value.title[1]}
            <br />
            <span>{t.value.highlight}</span>
          </h2>
          <div className="value-social">
            <div className="value-avatars">
              {site.images.clients.map((client) => (
                <span className="imgg" key={client.name}>
                  <img src={client.logo} alt={client.name} title={client.name} width={42} height={42} loading="lazy" decoding="async" />
                </span>
              ))}
            </div>
            <p>{t.value.socialProof(site.clientsServed)}</p>
          </div>
        </div>

        <div className="value-copy">
          <p className="value-lead">{t.value.lead}</p>
          <p className="value-muted">{t.value.muted}</p>
          <a className="value-cta" href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer">
            {t.cta.quote}{" "}
            <span aria-hidden="true">
              <ArrowUpRight size={17} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
