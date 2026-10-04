// Detecção de ambiente. GSAP, ScrollTrigger e Lenis chegam por <script> (CDN) como globais.
export const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const hasFinePointer = matchMedia("(pointer: fine)").matches;
export const hasGsap = typeof gsap !== "undefined";
export const hasLenis = typeof Lenis !== "undefined";
