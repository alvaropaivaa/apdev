import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "../lib/gsap";

/**
 * Alterna as palavras deslizando de baixo para cima.
 * Todas ficam empilhadas na mesma célula do grid, então a largura é sempre a da
 * maior palavra e o resto do título não se mexe na troca.
 */
export function RotatingWord({ words, interval = 2.4 }: { words: string[]; interval?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".hero-rotator-word");
      if (items.length < 2) return;
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // y: 0 explícito: ao recriar (troca de idioma) o GSAP não soma um deslocamento antigo em px.
        gsap.set(items, { y: 0, yPercent: 110, autoAlpha: 0 });
        gsap.set(items[0], { yPercent: 0, autoAlpha: 1, filter: "blur(0px)" });

        let index = 0;
        const swap = () => {
          const current = items[index];
          index = (index + 1) % items.length;
          gsap.to(current, { yPercent: -110, autoAlpha: 0, filter: "blur(6px)", duration: 0.55, ease: "power3.in" });
          gsap.fromTo(
            items[index],
            { yPercent: 110, autoAlpha: 0, filter: "blur(6px)" },
            { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.7, delay: 0.3, ease: "power3.out" },
          );
          timer.restart(true);
        };
        const timer = gsap.delayedCall(interval, swap);

        // Não roda enquanto o banner está fora da tela.
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? timer.resume() : timer.pause()),
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [words.join("|")], revertOnUpdate: true },
  );

  return (
    <span ref={ref} className="hero-rotator">
      {words.map((word) => (
        <span key={word} className="hero-rotator-word">
          {word}
        </span>
      ))}
    </span>
  );
}
