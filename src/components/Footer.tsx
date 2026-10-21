import { useCallback, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { site } from "../config/site";
import { useModal } from "../hooks/useModal";
import { useI18n } from "../i18n/LanguageProvider";
import type { LegalDocId } from "../i18n/content";
import { scrollToTarget } from "../lib/scroll";
import { ArrowUp, Close, Instagram } from "./Icons";

function LegalModal({ doc, onClose }: { doc: LegalDocId; onClose: () => void }) {
  const { t, lang } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const data = t.legal.docs[doc];
  useModal(true, onClose, dialogRef);

  return createPortal(
    <div
      className="legal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="legal-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        tabIndex={-1}
      >
        <header className="legal-modal-head">
          <div>
            <h2 id="legal-modal-title">{data.label}</h2>
            <span>{t.legal.updated(site.legalUpdatedAt[lang])}</span>
          </div>
          <button type="button" className="legal-modal-close" onClick={onClose} aria-label={t.legal.close} data-autofocus>
            <Close size={20} strokeWidth={2.2} />
          </button>
        </header>
        <div className="legal-modal-body" data-lenis-prevent>
          <p className="legal-modal-intro">{data.intro}</p>
          {data.sections.map((section) => (
            <section className="legal-modal-section" key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function Footer() {
  const { t } = useI18n();
  const [legalDoc, setLegalDoc] = useState<LegalDocId | null>(null);
  const closeLegal = useCallback(() => setLegalDoc(null), []);
  const links = t.footer.links;

  const goTo = (target: string | number) => (event: MouseEvent) => {
    event.preventDefault();
    scrollToTarget(target);
  };
  const openLegal = (doc: LegalDocId) => (event: MouseEvent) => {
    event.preventDefault();
    setLegalDoc(doc);
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <img
              src={site.images.logoFooter}
              alt={t.logoAlt(site.name)}
              className="site-footer-mark"
              width={110}
              height={54}
              loading="lazy"
              decoding="async"
            />
            <p>{t.footer.tagline}</p>
          </div>

          <nav className="site-footer-col" aria-label={t.footer.navLabel}>
            <a href="#top" onClick={goTo(0)}>
              {links.home}
            </a>
            <a href="#projects" onClick={goTo("#projects")}>
              {links.projects}
            </a>
            <a href="#processo" onClick={goTo("#processo")}>
              {links.process}
            </a>
            <a href="#faq" onClick={goTo("#faq")}>
              {links.faq}
            </a>
          </nav>

          <nav className="site-footer-col" aria-label={t.footer.sectionsLabel}>
            <a href="#vantagens" onClick={goTo("#vantagens")}>
              {links.advantages}
            </a>
            <a href="#resultados" onClick={goTo("#resultados")}>
              {links.results}
            </a>
            <a href="#diferenciais" onClick={goTo("#diferenciais")}>
              {links.why}
            </a>
            <a href="#plataforma" onClick={goTo("#plataforma")}>
              {links.platform}
            </a>
          </nav>

          <nav className="site-footer-col site-footer-legal" aria-label={t.footer.legalLabel}>
            {(Object.keys(t.legal.docs) as LegalDocId[]).map((doc) => (
              <a key={doc} href={`#${doc}`} onClick={openLegal(doc)}>
                {t.legal.docs[doc].label}
              </a>
            ))}
          </nav>
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copy">{t.footer.rights(new Date().getFullYear())}</p>
          <div className="site-footer-actions">
            <a className="site-footer-insta" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
              <span className="site-footer-insta-chip">
                <Instagram size={20} />
              </span>
              <span>{site.instagram.user}</span>
            </a>
            <a href="#top" className="site-footer-top-circle" onClick={goTo(0)} aria-label={t.footer.backToTop}>
              <ArrowUp size={20} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>

      {legalDoc && <LegalModal doc={legalDoc} onClose={closeLegal} />}
    </footer>
  );
}
