import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { ArrowUpRight } from "./Icons";

type Phase = "idle" | "filling" | "filled" | "returning";

const PHASE_CLASS: Record<Phase, string> = {
  idle: "",
  filling: " is-filled is-filling",
  filled: " is-filled",
  returning: " is-filled is-returning",
};

/** CTA principal (WhatsApp) com a animação de preenchimento azul. */
export function QuoteButton({ tabIndex }: { tabIndex?: number }) {
  const { t, lang } = useI18n();
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  // O link abre de forma nativa no próprio clique (sem preventDefault):
  // a animação roda em paralelo e nenhum bloqueador de pop-up interfere.
  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("filling");
    timers.current = [
      window.setTimeout(() => setPhase("filled"), 1050),
      window.setTimeout(() => setPhase("returning"), 6100),
      window.setTimeout(() => setPhase("idle"), 7050),
    ];
  };

  return (
    <a
      className={`cta-btn cta-primary${PHASE_CLASS[phase]}`}
      href={whatsappUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={tabIndex}
      onClick={handleClick}
    >
      <span className="cta-fill cta-fill--green" aria-hidden="true" />
      <span className="cta-fill cta-fill--white" aria-hidden="true" />
      <span className="cta-label">{t.cta.quote}</span>
      <span className="cta-chip">
        <ArrowUpRight size={16} strokeWidth={2.2} />
      </span>
    </a>
  );
}
