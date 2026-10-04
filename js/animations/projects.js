import { $, $$ } from "../utils/dom.js";

/** Trilho horizontal de projetos (somente em telas largas; no celular os cards empilham). */
export function initProjectsScroll() {
  gsap.matchMedia().add("(min-width: 900px) and (min-height: 560px)", () => {
    const track = $("#track");
    const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    const end = () => "+=" + distance();

    const scroll = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".work",
        start: "top top",
        end,
        pin: ".work-pin",
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    gsap.to("#workProg", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: ".work", start: "top top", end, scrub: true },
    });

    // Parallax da arte dentro de cada card
    $$(".card .art").forEach((art) => {
      gsap.fromTo(
        art,
        { xPercent: 8 },
        {
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: art.closest(".card"),
            containerAnimation: scroll,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    });
  });
}
