import { $ } from "../utils/dom.js";

const pad = (value, size = 2) => String(value).padStart(size, "0");

/** Cronômetro de volta no hero (mm:ss.mmm desde que a página abriu). */
export function startLapTimer(element = $("#timer")) {
  const start = performance.now();
  const tick = () => {
    const elapsed = performance.now() - start;
    const minutes = Math.floor(elapsed / 60000) % 60;
    const seconds = Math.floor(elapsed / 1000) % 60;
    const millis = Math.floor(elapsed % 1000);
    element.textContent = `${pad(minutes)}:${pad(seconds)}.${pad(millis, 3)}`;
    requestAnimationFrame(tick);
  };
  tick();
}
