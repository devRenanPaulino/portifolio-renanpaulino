// Script clássico (não módulo): avisa quando a página é aberta com duplo clique.
// Módulos ES só funcionam via http(s), então use Live Server ou `npm start`.
if (location.protocol === "file:") {
  document.addEventListener("DOMContentLoaded", function () {
    var box = document.createElement("div");
    box.setAttribute("role", "alert");
    box.style.cssText =
      "position:fixed;left:16px;right:16px;bottom:16px;z-index:200;padding:14px 18px;" +
      "background:#d4ff2a;color:#101400;font:600 14px system-ui,sans-serif;border-radius:12px";
    box.textContent =
      "Abra o site por um servidor local (extensão Live Server do VS Code ou npm start). Os módulos JavaScript não rodam direto de file://.";
    document.body.appendChild(box);
  });
}
