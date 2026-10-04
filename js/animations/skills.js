import { $$ } from "../utils/dom.js";

/** Luzes de troca acendem em sequência quando a linha entra na tela. */
export function initSkillsLights() {
  $$(".gauge").forEach((gauge) => {
    const lit = $$(".lights i.on", gauge);
    ScrollTrigger.create({
      trigger: gauge,
      start: "top 88%",
      onEnter: () => {
        lit.forEach((light) => light.classList.remove("on"));
        lit.forEach((light, i) => setTimeout(() => light.classList.add("on"), 60 * i));
      },
    });
  });
}
