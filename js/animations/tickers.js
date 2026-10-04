import { $$ } from "../utils/dom.js";

/** Faixas de texto: velocidade base + impulso proporcional à velocidade da rolagem. */
export function initTickers() {
  $$(".ticker-track").forEach((track) => {
    const direction = parseFloat(track.dataset.speed) || 1;
    let x = 0;
    let boost = 0;

    ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        boost = gsap.utils.clamp(-12, 12, self.getVelocity() / 180);
      },
    });

    gsap.ticker.add(() => {
      x -= (0.7 + Math.abs(boost)) * direction * (boost < 0 ? -1 : 1);
      boost *= 0.92;
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
}
