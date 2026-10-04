import { $, $$ } from "../utils/dom.js";
import { hasLenis } from "../utils/env.js";
import { setLenis } from "../utils/scroll.js";

/** Rolagem suave (Lenis) ligada ao ScrollTrigger, e âncoras internas animadas. */
export function initSmoothScroll() {
  if (!hasLenis) return;

  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  setLenis(lenis);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      const target = id === "#topo" ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      if (target !== 0) target.focus?.({ preventScroll: true });
      lenis.scrollTo(target, { offset: id === "#projetos" ? 0 : -40, duration: 1.4 });
    });
  });
}
