export function initNowAnimation() {
  gsap.from(".now h3", {
    letterSpacing: ".2em",
    ease: "none",
    scrollTrigger: { trigger: ".now", start: "top bottom", end: "top 40%", scrub: true },
  });
}
