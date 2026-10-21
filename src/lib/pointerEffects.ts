import { useEffect } from "react";
import { MOTION_OK } from "./gsap";

/**
 * Brilho que segue o mouse nos cards marcados com data-spotlight (um único listener
 * no documento). Só atualiza --mx/--my; o visual está em effects.css e nada se move.
 */
export function usePointerEffects() {
  useEffect(() => {
    if (!window.matchMedia(`(hover: hover) and (pointer: fine) and ${MOTION_OK}`).matches) return;

    const onMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      const spot = event.target.closest<HTMLElement>("[data-spotlight]");
      if (!spot) return;
      const rect = spot.getBoundingClientRect();
      spot.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      spot.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
}
