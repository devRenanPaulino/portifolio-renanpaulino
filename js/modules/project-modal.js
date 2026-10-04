import { $, $$ } from "../utils/dom.js";
import { lockScroll } from "../utils/scroll.js";
import { PROJECTS } from "../config/projects.js";

const esc = (text) =>
  String(text).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );

function list(items, cls) {
  return `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
}

/** HTML do conteúdo do modal para um projeto (dados em js/config/projects.js). */
function render(p) {
  const links = p.links
    .map(
      (l, i) =>
        `<a class="btn ${i ? "ghost" : ""}" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`,
    )
    .join("");
  return `
    <span class="eyebrow">${esc(p.num)} · ${esc(p.role)}</span>
    <h3 id="pmTitle">${esc(p.title)}</h3>
    <p class="pm-lead">${esc(p.summary)}</p>
    <div class="pm-links">${links}</div>
    <p class="pm-context">${esc(p.context)}</p>
    ${p.evolution ? `<p class="pm-evo"><b>Evolução.</b> ${esc(p.evolution)}</p>` : ""}
    <div class="pm-cols">
      <section>
        <h4>O que funcionou</h4>
        ${list(p.strengths, "pm-good")}
      </section>
      <section>
        <h4>O que eu melhoraria</h4>
        <ol class="pm-todo">
          ${p.improve.map((i) => `<li><b>${esc(i.t)}</b><span>${esc(i.d)}</span></li>`).join("")}
        </ol>
      </section>
    </div>
    <section class="pm-next">
      <h4>Próximos passos</h4>
      ${list(p.next, "pm-steps")}
    </section>`;
}

/** Abre um modal (autocrítica) ao clicar nos cards de projeto; sem JS o card segue o link normalmente. */
export function initProjectModal() {
  const dialog = $("#projectModal");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const body = $("#pmBody");
  let opener = null;

  const close = () => dialog.open && dialog.close();

  $$(".card[data-project]").forEach((card) => {
    card.addEventListener("click", (event) => {
      const project = PROJECTS[card.dataset.project];
      if (!project || event.metaKey || event.ctrlKey || event.shiftKey || event.button) return;
      event.preventDefault();
      opener = card;
      body.innerHTML = render(project);
      dialog.querySelector(".pm-panel").scrollTop = 0;
      dialog.showModal();
      lockScroll(true);
    });
  });

  dialog.addEventListener("click", (event) => {
    // clique no fundo escuro ou no X
    if (event.target === dialog || event.target.closest("[data-pm-close]")) close();
  });
  dialog.addEventListener("close", () => {
    lockScroll(false);
    opener?.focus({ preventScroll: true });
  });
}
