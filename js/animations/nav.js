import { $ } from "../utils/dom.js";

/** Esconde a barra ao rolar para baixo e mostra ao subir. */
export function initNavAutoHide() {
  const nav = $("#nav");
  let lastY = 0;
  ScrollTrigger.create({
    onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("is-hidden", y > lastY && y > 200);
      lastY = y;
    },
  });
}
