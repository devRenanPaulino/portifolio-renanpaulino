export const $ = (selector, context = document) => context.querySelector(selector);
export const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

/** Lê um design token do CSS, ex.: cssVar('--volt'). */
export const cssVar = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();
