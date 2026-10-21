import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";

const CLOUD_SRC = {
  soft: "/images/cloud-soft.webp",
  voluminous: "/images/cloud-voluminous.webp",
} as const;

type Cloud = { className: string; variant: keyof typeof CLOUD_SRC };

const LAYERS: { layer: string; className?: string; from: number; to: number; clouds: Cloud[] }[] = [
  {
    layer: "1",
    className: "fraaame-layer--back",
    from: -20,
    to: 35,
    clouds: [
      { className: "fc-b1", variant: "soft" },
      { className: "fc-b2", variant: "voluminous" },
      { className: "fc-b3", variant: "voluminous" },
      { className: "fc-b4", variant: "soft" },
      { className: "fc-b5", variant: "soft" },
      { className: "fc-b6", variant: "voluminous" },
    ],
  },
  {
    layer: "2",
    from: -10,
    to: 20,
    clouds: [
      { className: "fraaame-cloud--center", variant: "voluminous" },
      { className: "fraaame-cloud--left", variant: "soft" },
      { className: "fraaame-cloud--right", variant: "soft" },
      { className: "fc-m1", variant: "voluminous" },
      { className: "fc-m2", variant: "voluminous" },
      { className: "fc-m3", variant: "soft" },
      { className: "fc-m4", variant: "voluminous" },
    ],
  },
  {
    layer: "3",
    className: "fraaame-layer--front",
    from: 25,
    to: -30,
    clouds: [
      { className: "fc-f1", variant: "soft" },
      { className: "fc-f2", variant: "voluminous" },
      { className: "fc-f3", variant: "soft" },
      { className: "fc-f4", variant: "voluminous" },
    ],
  },
];

/** Deriva individual das nuvens do fundo (px). */
const BACK_DRIFT = [
  { selector: ".fc-b1", from: -5, to: 7 },
  { selector: ".fc-b2", from: 6, to: -6 },
  { selector: ".fc-b3", from: -4, to: 5 },
  { selector: ".fc-b4", from: 5, to: -7 },
  { selector: ".fc-b5", from: -6, to: 4 },
  { selector: ".fc-b6", from: 4, to: -4 },
];

export function CloudsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const range = { trigger: sectionRef.current, start: "top bottom", end: "bottom top" };
        const parallax = gsap.timeline({ scrollTrigger: { ...range, scrub: 0.3 } });
        LAYERS.forEach(({ layer, from, to }, i) => {
          parallax.fromTo(`[data-cloud-layer="${layer}"]`, { yPercent: from }, { yPercent: to, ease: "none" }, i === 0 ? 0 : "<");
        });
        // x/xPercent/yPercent explícitos preservam o translate(-50%, -50%) do CSS. No original o
        // GSAP tentava adivinhar o -50% pela largura em px e errava em algumas nuvens.
        BACK_DRIFT.forEach(({ selector, from, to }) => {
          gsap.fromTo(
            selector,
            { x: 0, xPercent: -50, yPercent: -50, y: from },
            { x: 0, xPercent: -50, yPercent: -50, y: to, ease: "sine.inOut", scrollTrigger: { ...range, scrub: 0.8 } },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="fraaame-section"
      aria-hidden="true"
      style={{ backgroundImage: "url(/images/clouds-bg.png)" }}
    >
      <div className="fraaame-cloud-wrap">
        {LAYERS.map(({ layer, className, clouds }) => (
          <div key={layer} className={`fraaame-cloud-layer${className ? ` ${className}` : ""}`} data-cloud-layer={layer}>
            {clouds.map((cloud) => (
              <img
                key={cloud.className}
                className={`fraaame-cloud ${cloud.className}`}
                src={CLOUD_SRC[cloud.variant]}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
