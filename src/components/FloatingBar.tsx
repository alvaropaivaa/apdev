import { useRef, useState } from "react";
import { site } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { ScrollTrigger, useGSAP } from "../lib/gsap";
import { QuoteButton } from "./QuoteButton";

/** Seções de fundo claro: sobre elas a barra fica mais escura para manter contraste. */
const LIGHT_SECTIONS = ".value-section, .projects-section, .process-timeline";

function overlaps(a: DOMRect, b: DOMRect) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function FloatingBar() {
  const { t } = useI18n();
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [onLight, setOnLight] = useState(false);

  // Aparece depois do hero e some quando o rodapé chega. Antes isso era checado
  // por um setInterval de 200ms + listener de scroll rodando o tempo todo.
  useGSAP(() => {
    const state = { pastHero: false, atFooter: false };
    const sync = () => setVisible(state.pastHero && !state.atFooter);

    ScrollTrigger.create({
      trigger: ".value-section",
      start: "top 70%",
      end: "max",
      refreshPriority: -1,
      onToggle: (self) => {
        state.pastHero = self.isActive;
        sync();
      },
    });
    ScrollTrigger.create({
      trigger: ".site-footer",
      start: "top 85%",
      end: "max",
      refreshPriority: -1,
      onToggle: (self) => {
        state.atFooter = self.isActive;
        sync();
      },
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      refreshPriority: -1,
      onUpdate: () => {
        const bar = barRef.current;
        if (!bar) return;
        const rect = bar.getBoundingClientRect();
        const light = Array.from(document.querySelectorAll(LIGHT_SECTIONS)).some((el) =>
          overlaps(rect, el.getBoundingClientRect()),
        );
        setOnLight(light);
      },
    });
  });

  return (
    <div
      ref={barRef}
      className={`floating-bar${visible ? " floating-bar--ativo" : ""}${onLight ? " floating-bar--claro" : ""}`}
      aria-hidden={!visible}
      inert={!visible}
    >
      <img
        className="floating-bar-logo"
        src={site.images.logoFloating}
        alt={t.logoAlt(site.name)}
        width={70}
        height={34}
        decoding="async"
      />
      <QuoteButton tabIndex={visible ? 0 : -1} />
    </div>
  );
}
