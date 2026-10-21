import { useRef } from "react";
import { site } from "../config/site";
import { useI18n } from "../i18n/LanguageProvider";
import { MOTION_OK, gsap, useGSAP } from "../lib/gsap";

export function ProjectsSection() {
  const { t, lang } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".projects-headline, .projects-sub, .project-card",
          { opacity: 0, y: 52 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power1.out",
            stagger: 0.14,
            scrollTrigger: { trigger: sectionRef.current, start: "top 82%", end: "top 38%", scrub: 0.5 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="projects-section" id="projects" aria-labelledby="projects-headline">
      <h2 className="projects-headline" id="projects-headline">
        {t.projects.title.before}
        <span className="projects-grad">{t.projects.title.highlight}</span> <br />
        {t.projects.title.after}
      </h2>
      <p className="projects-sub">
        {t.projects.sub.before}
        <strong>{t.projects.sub.strong}</strong>
      </p>

      <div className="projects-grid">
        {site.projects.map((project) => (
          <article className="project-card" key={project.name} data-spotlight>
            <div className="project-media">
              <img
                src={project.image}
                alt={t.projects.imageAlt(project.name)}
                width={1536}
                height={640}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-foot">
              <div className="project-meta">
                <h3>{project.name}</h3>
                <span>{project.type[lang]}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
