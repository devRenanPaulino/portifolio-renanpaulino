import { $ } from "../utils/dom.js";

/** Botão "Copiar e-mail" com fallback para seleção do texto. */
export function initCopyEmail() {
  const address = $("#mail");
  const message = $("#copyMsg");

  const selectText = () => {
    const range = document.createRange();
    range.selectNodeContents(address);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    message.textContent = "Selecionado. Use Ctrl+C para copiar.";
  };

  $("#copyBtn").addEventListener("click", () => {
    try {
      navigator.clipboard
        .writeText(address.textContent.trim())
        .then(() => (message.textContent = "E-mail copiado."), selectText);
    } catch {
      selectText();
    }
  });
}
