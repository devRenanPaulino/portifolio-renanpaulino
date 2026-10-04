import { $, $$ } from "../utils/dom.js";
import { hasFinePointer, prefersReducedMotion } from "../utils/env.js";

function initCursor() {
  document.documentElement.classList.add("has-cursor");
  const ring = $(".cursor");
  const dot = $(".cursor-dot");
  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px,${mouseY}px)`;
  });

  (function follow() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px,${ringY}px)`;
    requestAnimationFrame(follow);
  })();

  document.addEventListener("mouseover", (e) => {
    const onView = e.target.closest(".view");
    const onLink = e.target.closest("a,button");
    ring.classList.toggle("is-view", !!onView);
    ring.classList.toggle("is-link", !onView && !!onLink);
  });
}

/** Botões .magnet seguem o mouse de leve. */
function initMagnetic() {
  $$(".magnet").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.25}px,${y * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform .5s cubic-bezier(.2,.7,.2,1)";
      el.style.transform = "";
      setTimeout(() => (el.style.transition = ""), 500);
    });
  });
}

/** Cards de projeto inclinam em 3D. */
function initCardTilt() {
  $$(".card").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transition = "transform .6s cubic-bezier(.2,.7,.2,1),border-color .3s";
      el.style.transform = "";
      setTimeout(() => (el.style.transition = ""), 600);
    });
  });
}

/** Só ativa com mouse e sem preferência por menos movimento. */
export function initPointerEffects() {
  if (!hasFinePointer || prefersReducedMotion) return;
  initCursor();
  initMagnetic();
  initCardTilt();
}
