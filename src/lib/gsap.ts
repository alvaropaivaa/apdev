import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Evita recalcular tudo (e "pular" o pin) quando a barra de endereço do celular aparece/some.
ScrollTrigger.config({ ignoreMobileResize: true });

/** Condição usada em gsap.matchMedia(): só anima se o usuário não pediu menos movimento. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, useGSAP };
