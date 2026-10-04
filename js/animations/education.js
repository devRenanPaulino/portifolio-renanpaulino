export function initEducationAnimation() {
  gsap.from(".edu-item", {
    y: 40,
    rotate: 2,
    stagger: 0.1,
    duration: 1,
    ease: "expo.out",
    scrollTrigger: { trigger: ".edu", start: "top 85%" },
  });
}
