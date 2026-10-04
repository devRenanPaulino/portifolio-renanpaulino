import { $$ } from "../utils/dom.js";

/** Números da faixa de estatísticas contam de 0 até o valor de data-count. */
export function initCounters() {
  $$("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => (el.textContent = Math.round(counter.value)),
        });
      },
    });
  });
}
