import { $$ } from "../utils/dom.js";

/** Separa o nome do hero em letras para a animação de entrada. */
export function splitHeroLetters() {
  $$(".hero-name .row").forEach((row) => {
    row.innerHTML = [...row.textContent].map((char) => `<span class="ch">${char}</span>`).join("");
  });
}
