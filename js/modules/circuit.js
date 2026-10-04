import { $, $$ } from "../utils/dom.js";
import { SECTORS, CAR_START } from "../config/career.js";

const SVG_NS = "http://www.w3.org/2000/svg";

/**
 * Prepara o circuito SVG: marcadores dos setores, traçado de progresso e posição inicial do carro.
 * Retorna o que a animação de scroll (animations/career.js) precisa.
 */
export function createCircuit() {
  const base = $("#trackBase");
  const progress = $("#trackProg");
  const car = $("#car");
  const markers = $("#markers");
  const sectors = $$(".sector");
  const length = base.getTotalLength();

  sectors.forEach((sector, index) => {
    const at = Math.min(parseFloat(sector.dataset.at), 0.999);
    const point = base.getPointAtLength(length * at);
    const group = document.createElementNS(SVG_NS, "g");
    group.setAttribute("class", "sector-dot" + (index === 0 ? " on" : ""));
    group.setAttribute("transform", `translate(${point.x} ${point.y})`);
    group.innerHTML = `<circle r="9"/><text x="14" y="-12">${SECTORS[index].marker}</text>`;
    markers.appendChild(group);
  });
  const dots = $$(".sector-dot", markers);

  progress.style.strokeDasharray = length;
  progress.style.strokeDashoffset = length * (1 - CAR_START);

  const start = base.getPointAtLength(length * CAR_START);
  car.setAttribute("transform", `translate(${start.x} ${start.y})`);

  /** Destaca o setor atual no texto, nos marcadores e no HUD. */
  function setSector(index) {
    sectors.forEach((sector, i) => sector.classList.toggle("on", i === index));
    dots.forEach((dot, i) => dot.classList.toggle("on", i <= index));
    $("#hudSector").textContent = SECTORS[index].hudCode;
    $("#hudName").textContent = SECTORS[index].hudName;
  }

  return { base, progress, car, length, sectors, setSector };
}
