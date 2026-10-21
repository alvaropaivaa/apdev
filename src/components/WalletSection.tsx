import { useRef } from "react";
import { whatsappUrl } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";
import { ArrowUpRight } from "./Icons";
import { WalletBill } from "./WalletBill";

/** Direção "para fora da carteira" da nota (ela está inclinada na foto). */
const BILL_AXIS = { x: -0.229, y: -0.973 };

export function WalletSection() {
  const { t, lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  // Refaz a timeline quando o idioma muda: as palavras são outros elementos.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const reveal = gsap.timeline({
          scrollTrigger: { trigger: ".wallet-headline", start: "top 85%", end: "top 30%", scrub: 0.5 },
        });
        reveal
          .fromTo(".wallet-word", { opacity: 0.12 }, { opacity: 1, stagger: 0.12, duration: 1, ease: "none" })
          .fromTo(".wallet-left-copy", { opacity: 0, x: -64 }, { opacity: 1, x: 0, duration: 1.4, ease: "power1.out" }, ">-0.02")
          .fromTo(".wallet-right-copy", { opacity: 0, x: 64 }, { opacity: 1, x: 0, duration: 1.4, ease: "power1.out" }, "<0.12");
      });
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [lang], revertOnUpdate: true },
  );

  // Carteira cresce e a nota sai de dentro dela.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const section = sectionRef.current;
        const slide = section?.querySelector<HTMLElement>(".wallet-bill-slide");
        if (!section || !slide) return;

        gsap.fromTo(
          ".wallet-stack",
          { scale: 0.7, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: section, start: "top bottom", end: "bottom bottom", scrub: 0.5 },
          },
        );

        // A nota desliza ao longo do próprio eixo (inclinada), de dentro da carteira para fora.
        // O balanço com o vento é feito em WebGL (WalletBill).
        const depth = () => slide.offsetHeight * 0.8;
        gsap.fromTo(
          slide,
          { x: () => BILL_AXIS.x * -depth(), y: () => BILL_AXIS.y * -depth() },
          {
            x: 0,
            y: 0,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: section,
              start: "top 45%",
              end: "bottom bottom",
              scrub: 0.6,
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
    <section
      ref={sectionRef}
      className="wallet-section"
      id="work"
      aria-labelledby="wallet-headline"
      style={{ backgroundImage: "url(/images/wallet-bg.webp)" }}
    >
      <h2 className="wallet-headline" id="wallet-headline" key={lang}>
        {t.wallet.lines.map((line, lineIndex) => {
          const words = line.split(" ");
          return (
            <span className="wallet-line" key={lineIndex}>
              {words.map((word, i) => (
                <span className="wallet-word" key={i}>
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          );
        })}
      </h2>

      <div className="wallet-art-position">
        <div className="wallet-stack">
          {/* A nota fica atrás da carteira; o recorte esconde o que está "dentro" dela. */}
          <div className="wallet-bill-clip" aria-hidden="true">
            <div className="wallet-bill-slide">
              <WalletBill src="/images/wallet-bill.webp" />
            </div>
          </div>
          <img
            className="wallet-art"
            src="/images/wallet-base.webp"
            alt={t.wallet.artAlt}
            width={1200}
            height={1200}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className="wallet-left-copy">
        <p>
          {t.wallet.left[0]}
          <br />
          {t.wallet.left[1]}
        </p>
      </div>

      <div className="wallet-right-copy">
        <p>
          {t.wallet.right[0]}
          <br />
          {t.wallet.right[1]}
        </p>
        <a className="wallet-cta" href={whatsappUrl(lang)} target="_blank" rel="noopener noreferrer">
          {t.cta.quoteShort}{" "}
          <span className="wallet-cta-chip" aria-hidden="true">
            <ArrowUpRight size={15} strokeWidth={2.2} />
          </span>
        </a>
      </div>
    </section>
  );
}
