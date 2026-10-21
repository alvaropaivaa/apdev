import { useCallback, useRef, useState, type JSX, type MouseEvent, type RefObject } from "react";
import { site } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import type { Lang } from "../i18n/content";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "../lib/gsap";
import { scrollToTarget } from "../lib/scroll";
import { HeroParticles } from "./HeroParticles";
import { FlagBR, FlagUS, Languages } from "./Icons";
import { MobileMenu } from "./MobileMenu";
import { QuoteButton } from "./QuoteButton";
import { RotatingWord } from "./RotatingWord";

const LANGS: { id: Lang; Flag: () => JSX.Element }[] = [
  { id: "en", Flag: FlagUS },
  { id: "pt", Flag: FlagBR },
];

function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-toggle" role="group" aria-label={t.language.label}>
      <Languages className="lang-toggle-icon" size={17} />
      {LANGS.map(({ id, Flag }) => (
        <button
          key={id}
          type="button"
          className={`lang-toggle-btn${lang === id ? " is-active" : ""}`}
          aria-pressed={lang === id}
          aria-label={t.language[id]}
          onClick={() => setLang(id)}
        >
          <span className="lang-toggle-flag">
            <Flag />
          </span>
        </button>
      ))}
    </div>
  );
}

/** Marca no menu a seção visível (o original só atualizava no clique). */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useGSAP(() => {
    const triggers: ScrollTrigger[] = [];
    const update = () => {
      const current = triggers.filter((st) => st.isActive).pop();
      setActive(current ? String(current.vars.id) : ids[0]);
    };
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      triggers.push(
        ScrollTrigger.create({
          id,
          trigger: el,
          start: "top 45%",
          endTrigger: "html",
          end: "bottom top",
          // Calcula depois do pin da seção "processo", que muda a altura da página.
          refreshPriority: -1,
          onToggle: update,
        }),
      );
    }
  }, [ids.join()]);
  return active;
}

/** Efeitos do banner: entrada ao abrir a página e o banner "se afastando" ao rolar. */
function useHeroEffects(heroRef: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // Explícito para o GSAP não "adivinhar" o translate(-50%) do CSS.
        gsap.set(".creative-portrait", { xPercent: -50, x: 0 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".creative-backdrop", { autoAlpha: 0, duration: 1.4 }, 0)
          .from(".creative-portrait", { autoAlpha: 0, scale: 1.12, duration: 1.6 }, 0)
          .from(".creative-particles", { autoAlpha: 0, duration: 2 }, 0.4)
          .from(".hero-line-inner", { yPercent: 115, duration: 1.1, stagger: 0.12, ease: "power4.out" }, 0.2)
          .from(".creative-left > p, .creative-cta-row", { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.1 }, 0.6)
          .from(".creative-right > *", { y: 30, autoAlpha: 0, duration: 1, stagger: 0.12 }, 0.7)
          .from(".creative-nav", { y: -20, autoAlpha: 0, duration: 0.8 }, 0.5);

        gsap
          .timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } })
          .to(".creative-media", { yPercent: 14, scale: 1.06, ease: "none" }, 0)
          .to(".creative-left, .creative-right", { yPercent: -40, autoAlpha: 0, ease: "none" }, 0);
      });

      return () => mm.revert();
    },
    { scope: heroRef },
  );
}

export function Hero() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const active = useActiveSection(t.nav.items.map((item) => item.id));
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useHeroEffects(heroRef);

  const goTo = (event: MouseEvent, id: string) => {
    event.preventDefault();
    setMenuOpen(false);
    // Espera o menu destravar a rolagem da página (no próximo quadro) antes de rolar.
    requestAnimationFrame(() => scrollToTarget(id === "top" ? 0 : `#${id}`));
  };

  return (
    <div ref={heroRef} className="creative-hero" id="top">
      <header className="creative-nav">
        <nav className="creative-pill" aria-label={t.nav.label}>
          {t.nav.items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : undefined}
              aria-current={active === item.id ? "location" : undefined}
              onClick={(event) => goTo(event, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="creative-nav-actions">
          <LanguageToggle />
          <button
            type="button"
            className="creative-burger"
            aria-label={menuOpen ? t.nav.close : t.nav.open}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} active={active} onClose={closeMenu} onNavigate={goTo} />

      <div
        className="creative-backdrop"
        style={{ backgroundImage: `url(${site.images.heroPortrait})` }}
        aria-hidden="true"
      />
      <div className="creative-media" aria-hidden="true">
        <div className="creative-portrait" style={{ backgroundImage: `url(${site.images.heroPortrait})` }} />
      </div>
      <HeroParticles />

      <section className="creative-left" aria-labelledby="creative-headline">
        <h1 id="creative-headline">
          <span className="sr-only">{t.hero.title.label}</span>
          <span aria-hidden="true">
            <span className="hero-line">
              <span className="hero-line-inner">{t.hero.title.before}</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">
                <RotatingWord words={t.hero.title.rotating} />
              </span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">{t.hero.title.after}</span>
            </span>
          </span>
        </h1>
        <p>{t.hero.text}</p>
        <div className="creative-cta-row">
          <QuoteButton />
          <a className="cta-btn cta-secondary" href="#projects" onClick={(event) => goTo(event, "projects")}>
            {t.hero.projectsButton}
          </a>
        </div>
      </section>

      <section className="creative-right" aria-labelledby="studio-heading">
        <h2 id="studio-heading">
          {t.hero.sideTitle[0]}
          <br />
          {t.hero.sideTitle[1]}
        </h2>
        <p>{t.hero.sideText}</p>
      </section>
    </div>
  );
}
