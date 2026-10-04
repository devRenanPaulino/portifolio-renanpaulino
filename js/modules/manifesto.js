import { $, $$ } from "../utils/dom.js";

/**
 * Quebra o texto do manifesto em <span class="w"> (uma por palavra).
 * Elementos com [data-hl] viram uma palavra inteira com a classe "hl-target".
 * Retorna a lista de palavras para a animação de preenchimento.
 */
export function splitManifesto(element = $("#manifesto")) {
  [...element.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((piece) => {
        if (!piece) return;
        if (/^\s+$/.test(piece)) {
          fragment.appendChild(document.createTextNode(piece));
          return;
        }
        const word = document.createElement("span");
        word.className = "w";
        word.textContent = piece;
        fragment.appendChild(word);
      });
      node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const word = document.createElement("span");
      word.className = "w" + (node.hasAttribute("data-hl") ? " hl-target" : "");
      word.textContent = node.textContent;
      node.replaceWith(word);
    }
  });
  return $$(".w", element);
}
