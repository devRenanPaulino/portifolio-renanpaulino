const heroScrub = (trigger = ".hero") => ({
  trigger,
  start: "top top",
  end: "bottom top",
  scrub: true,
});

export function initHeroAnimations() {
  // Entrada
  gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .from(".hero-name .row:first-child .ch", { yPercent: 110, duration: 1.3, stagger: 0.05 })
    .from(".hero-name .row:last-child .ch", { yPercent: -110, duration: 1.3, stagger: 0.04 }, "<.1")
    .from(".hero-photo .disc", { scale: 0, duration: 1.2, ease: "back.out(1.6)" }, "<.15")
    .from(".hero-photo .disc img", { scale: 1.25, duration: 1.6 }, "<")
    .from(".sig", { clipPath: "inset(0 100% 0 0)", duration: 1, ease: "power3.inOut" }, "-=.8")
    .from(".hero-meta > *, .hero-side > *", { y: 24, duration: 0.9, stagger: 0.06 }, "-=.9");

  // Parallax ao rolar
  gsap.to(".hero-name .row:first-child", {
    xPercent: -14,
    ease: "none",
    scrollTrigger: heroScrub(),
  });
  gsap.to(".hero-name .row:last-child", { xPercent: 10, ease: "none", scrollTrigger: heroScrub() });
  gsap.to(".hero-photo", { yPercent: 12, scale: 0.92, ease: "none", scrollTrigger: heroScrub() });
  gsap.to(".sig", { rotate: -24, y: -60, ease: "none", scrollTrigger: heroScrub() });
}
