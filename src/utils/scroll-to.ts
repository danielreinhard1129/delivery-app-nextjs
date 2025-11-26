export function scrollToElement(id: string, delay: number = 1700) {
  if (typeof window === "undefined") return;

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, delay);
}
