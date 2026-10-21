import { useRef, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { site } from "../config/site";
import { useModal } from "../hooks/useModal";
import { useI18n } from "../i18n/LanguageProvider";
import { ArrowUpRight, Close, Instagram } from "./Icons";
import { QuoteButton } from "./QuoteButton";

type Props = {
  open: boolean;
  active: string;
  onClose: () => void;
  onNavigate: (event: MouseEvent, id: string) => void;
};

/**
 * Menu de tela cheia em vidro fosco: abre num círculo a partir do botão do menu
 * e os links entram um a um. Fica sempre montado para animar também ao fechar.
 */
export function MobileMenu({ open, active, onClose, onNavigate }: Props) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  useModal(open, onClose, ref);

  const links = [...t.nav.items, { id: "contact", label: t.nav.contact }];
  const delay = (i: number) => ({ "--i": i }) as CSSProperties;

  return createPortal(
    <div
      ref={ref}
      id="mobile-menu"
      className={`mmenu${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.menu}
      aria-hidden={!open}
      inert={!open}
      tabIndex={-1}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <span className="mmenu-glow" aria-hidden="true" />

      <div className="mmenu-top">
        <img className="mmenu-logo" src={site.images.logoFloating} alt={site.name} width={409} height={200} />
        <button type="button" className="mmenu-close" onClick={onClose} aria-label={t.nav.close} data-autofocus>
          <Close size={22} strokeWidth={1.8} />
        </button>
      </div>

      <nav className="mmenu-links" aria-label={t.nav.label}>
        {links.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`mmenu-link${active === item.id ? " is-active" : ""}`}
            aria-current={active === item.id ? "location" : undefined}
            style={delay(i)}
            onClick={(event) => onNavigate(event, item.id)}
          >
            <span className="mmenu-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="mmenu-label">{item.label}</span>
            <span className="mmenu-arrow" aria-hidden="true">
              <ArrowUpRight size={20} strokeWidth={1.8} />
            </span>
          </a>
        ))}
      </nav>

      <div className="mmenu-foot" style={delay(links.length)}>
        <QuoteButton tabIndex={open ? 0 : -1} />
        <a className="mmenu-insta" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
          <Instagram size={18} />@{site.instagram.user}
        </a>
      </div>
    </div>,
    document.body,
  );
}
