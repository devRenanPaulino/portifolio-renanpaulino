import { $, $$, cssVar } from "../utils/dom.js";

/** Manifesto se acende palavra por palavra; as palavras-chave ficam neon no final. */
export function initAboutAnimations(words) {
  const manifesto = $("#manifesto");

  gsap.to(words, {
    color: cssVar("--bone"),
    stagger: 0.1,
    ease: "none",
    scrollTrigger: { trigger: manifesto, start: "top 80%", end: "bottom 45%", scrub: true },
  });

  ScrollTrigger.create({
    trigger: manifesto,
    start: "bottom 50%",
    onEnter: () =>
      $$(".hl-target", manifesto).forEach((word) => {
        word.classList.add("hl");
        gsap.set(word, { color: "" });
      }),
    onLeaveBack: () => $$(".hl-target", manifesto).forEach((word) => word.classList.remove("hl")),
  });

  gsap.from(".stage img", {
    rotate: -6,
    yPercent: 8,
    ease: "none",
    scrollTrigger: { trigger: "#sobre", start: "top bottom", end: "bottom top", scrub: true },
  });
}
