// Ponto de entrada. Ordem: 1) monta o DOM  2) efeitos de mouse  3) animações GSAP (se disponíveis).
import { hasGsap, prefersReducedMotion } from "./utils/env.js";

import { renderSkills } from "./modules/skills-meter.js";
import { splitManifesto } from "./modules/manifesto.js";
import { splitHeroLetters } from "./modules/hero-letters.js";
import { startLapTimer } from "./modules/lap-timer.js";
import { initCopyEmail } from "./modules/copy-email.js";
import { initPulseCanvas } from "./modules/pulse-canvas.js";
import { initPointerEffects } from "./modules/pointer-effects.js";
import { createCircuit } from "./modules/circuit.js";
import { initScrollToTop } from "./modules/scroll-to-top.js";
import { initProjectModal } from "./modules/project-modal.js";

import { initSmoothScroll } from "./animations/smooth-scroll.js";
import { initNavAutoHide } from "./animations/nav.js";
import { initHeroAnimations } from "./animations/hero.js";
import { initTickers } from "./animations/tickers.js";
import { initCounters } from "./animations/counters.js";
import { initAboutAnimations } from "./animations/about.js";
import { initNowAnimation } from "./animations/now.js";
import { initProjectsScroll } from "./animations/projects.js";
import { initCareerScroll } from "./animations/career.js";
import { initSkillsLights } from "./animations/skills.js";
import { initEducationAnimation } from "./animations/education.js";
import { initContactAnimation } from "./animations/contact.js";

function init() {
  // 1) DOM
  renderSkills();
  const manifestoWords = splitManifesto();
  splitHeroLetters();
  startLapTimer();
  initCopyEmail();
  initPulseCanvas();
  const circuit = createCircuit();
  initScrollToTop();
  initProjectModal();

  // 2) Mouse
  initPointerEffects();

  // 3) Animações. Sem GSAP (CDN fora do ar) ou com "reduzir movimento", o site fica estático e legível.
  if (!hasGsap || prefersReducedMotion) {
    circuit.setSector(0);
    return;
  }

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  initSmoothScroll();
  initNavAutoHide();
  initHeroAnimations();
  initTickers();
  initCounters();
  initAboutAnimations(manifestoWords);
  initNowAnimation();
  initProjectsScroll();
  initCareerScroll(circuit);
  initSkillsLights();
  initEducationAnimation();
  initContactAnimation();

  addEventListener("load", () => ScrollTrigger.refresh());
}

init();
