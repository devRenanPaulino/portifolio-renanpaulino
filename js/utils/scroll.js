import { prefersReducedMotion } from "./env.js";

let lenis = null;

export const setLenis = (instance) => {
  lenis = instance;
};

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0);
  else scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

/** Pausa/retoma a rolagem suave (usado enquanto um modal está aberto). */
export function lockScroll(locked) {
  if (lenis) locked ? lenis.stop() : lenis.start();
}
