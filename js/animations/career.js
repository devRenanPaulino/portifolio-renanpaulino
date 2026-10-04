import { CAR_START, CAR_END } from "../config/career.js";

/** Carro percorre o circuito conforme a rolagem dos setores. */
export function initCareerScroll({ base, progress, car, length, sectors, setSector }) {
  const state = { p: CAR_START };

  const place = () => {
    const p = Math.min(state.p, 0.999);
    progress.style.strokeDashoffset = length * (1 - p);
    gsap.set(car, {
      motionPath: {
        path: base,
        align: base,
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
        start: p,
        end: p,
      },
    });
  };
  place();

  gsap
    .timeline({
      scrollTrigger: { trigger: ".sectors", start: "top 60%", end: "bottom 70%", scrub: 1 },
    })
    .to(state, { p: CAR_END, ease: "none", onUpdate: place });

  // Quando sair da seção, o carro volta para o início
  ScrollTrigger.create({
    trigger: "#carreira",
    start: "bottom bottom",
    onLeaveBack: () => {
      gsap.to(state, { p: CAR_START, duration: 1, ease: "power2.inOut", onUpdate: place });
    },
  });

  sectors.forEach((sector, index) => {
    ScrollTrigger.create({
      trigger: sector,
      start: "top 60%",
      end: "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) setSector(index);
      },
    });
  });

  gsap.from(".circuit svg", {
    rotate: -8,
    scale: 0.9,
    ease: "none",
    scrollTrigger: { trigger: "#carreira", start: "top bottom", end: "top top", scrub: true },
  });
}
