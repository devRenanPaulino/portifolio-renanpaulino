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
      scrollTrigger: {
        trigger: sectors[0],
        endTrigger: sectors[sectors.length - 1],
        start: "top 60%",
        end: "bottom 70%",
        scrub: 1,
      },
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

  // Mobile: a pista fica com opacidade total enquanto não há texto na tela e esmaece por
  // trás dele. Os dois fades acontecem nos espaços vazios, antes de o primeiro setor entrar
  // e depois de o último sair, para a pista nunca ficar nítida sob o texto.
  const MOBILE_DIM = 0.28;
  gsap.matchMedia().add("(max-width: 900px)", () => {
    const first = sectors[0];
    const last = sectors[sectors.length - 1];
    gsap.set(".circuit", { opacity: 1 });
    gsap.to(".circuit", {
      opacity: MOBILE_DIM,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: first,
        start: () => `top top+=${innerHeight * 1.35}`,
        end: () => `top top+=${innerHeight * 1.05}`,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    gsap.fromTo(
      ".circuit",
      { opacity: MOBILE_DIM },
      {
        opacity: 1,
        ease: "power1.inOut",
        immediateRender: false,
        scrollTrigger: {
          trigger: last,
          start: () => `bottom top+=${innerHeight * 0.05}`,
          end: () => `bottom top-=${innerHeight * 0.5}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      },
    );
  });

  gsap.from(".circuit svg", {
    rotate: -8,
    scale: 0.9,
    ease: "none",
    scrollTrigger: { trigger: "#carreira", start: "top bottom", end: "top top", scrub: true },
  });
}
