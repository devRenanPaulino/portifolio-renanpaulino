export function initContactAnimation() {
  gsap.from(".contact h2", {
    yPercent: 20,
    skewY: 4,
    ease: "none",
    scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 30%", scrub: true },
  });
}
