import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

let lenis: Lenis | null = null;
let lockCount = 0;

/** Liga o smooth scroll (Lenis) no mesmo ticker do GSAP. Retorna a função de limpeza. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};

  const instance = new Lenis({ duration: 1.2 });
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  if (lockCount > 0) instance.stop();
  lenis = instance;

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    lenis = null;
  };
}

/** Rola até um seletor (#id), elemento ou posição — usando o Lenis quando ativo. */
export function scrollToTarget(target: string | HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target);
    return;
  }
  const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
    return;
  }
  const el = typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior });
}

function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) {
    lenis?.stop();
    document.documentElement.classList.add("is-scroll-locked");
  }
}

function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    lenis?.start();
    document.documentElement.classList.remove("is-scroll-locked");
  }
}

/**
 * Trava o scroll da página enquanto `active` for true (modais).
 * Funciona com e sem Lenis — no original só o overflow do body era alterado
 * e o Lenis continuava rolando a página por trás do modal.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return unlockScroll;
  }, [active]);
}
