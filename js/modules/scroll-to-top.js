import { $ } from "../utils/dom.js";
import { scrollToTop } from "../utils/scroll.js";

export function initScrollToTop() {
  $("#toTop").addEventListener("click", scrollToTop);
}
