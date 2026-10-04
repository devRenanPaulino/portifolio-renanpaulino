import { $ } from "../utils/dom.js";
import { prefersReducedMotion } from "../utils/env.js";

const PLUM = "139,59,234";

/** Ondas de sinal no card da Vivo. */
export function initPulseCanvas(canvas = $("#pulse")) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (time) => {
    ctx.clearRect(0, 0, width, height);
    const x = width * 0.5;
    const y = height * 0.42;

    for (let i = 0; i < 7; i++) {
      const progress = (time / 2600 + i / 7) % 1;
      const radius = 20 + progress * Math.max(width, height) * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${PLUM},${(1 - progress) * 0.55})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${PLUM})`;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#eef0e6";
    ctx.fill();

    if (!prefersReducedMotion) requestAnimationFrame(draw);
  };

  resize();
  addEventListener("resize", resize);
  requestAnimationFrame(draw);
}
