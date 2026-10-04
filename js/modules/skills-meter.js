import { $ } from "../utils/dom.js";
import { SKILLS, METER_LIGHTS, METER_BANDS } from "../config/skills.js";

const toneFor = (index) => METER_BANDS.find((band) => index < band.upTo).tone;

function lightsMarkup(level) {
  const lit = Math.round(level / (100 / METER_LIGHTS));
  return Array.from({ length: METER_LIGHTS }, (_, i) => {
    return `<i class="${toneFor(i)}${i < lit ? " on" : ""}"></i>`;
  }).join("");
}

export function renderSkills(container = $("#tele")) {
  SKILLS.forEach(({ name, level }) => {
    const row = document.createElement("div");
    row.className = "gauge";
    row.innerHTML = `
      <span class="name">${name}</span>
      <span class="lights" role="img" aria-label="${name}: ${level}%">${lightsMarkup(level)}</span>
      <span class="pct">${level}%</span>`;
    container.appendChild(row);
  });
}
