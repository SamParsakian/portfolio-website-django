(() => {
  const navItems = [...document.querySelectorAll(".nav-item")];
  const sections = ["about","experience","projects","writing"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const isMobileMode = () => window.matchMedia("(max-width: 900px)").matches;

  const setActive = (id) => {
    navItems.forEach(a => a.classList.toggle("is-active", a.dataset.target === id));
  };

  navItems.forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")?.replace("#","");
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      setActive(id);

      if (isMobileMode()) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        const scroller = document.querySelector(".right");
        if (!scroller) return;
        scroller.scrollTo({ top: target.offsetTop - 10, behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll(".card-row.card-link").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const a = card.querySelector("a");
      if (a && a.href) window.open(a.href, "_blank", "noopener,noreferrer");
    });
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const a = card.querySelector("a");
        if (a && a.href) window.open(a.href, "_blank", "noopener,noreferrer");
      }
    });
  });

  const left = document.querySelector(".left");
  const right = document.querySelector(".right");

  const isDesktopMode = () => window.matchMedia("(min-width: 901px)").matches;

  if (left && right) {
    left.addEventListener("wheel", (e) => {
      if (!isDesktopMode()) return;
      e.preventDefault();
      let deltaY = e.deltaY;
      if (e.deltaMode === 1) {
        deltaY *= 16;
      } else if (e.deltaMode === 2) {
        deltaY *= window.innerHeight;
      }
      right.scrollBy({ 
        top: deltaY, 
        left: 0, 
        behavior: "auto" 
      });
    }, { passive: false });
  }

  let io = null;
  const setupSpy = () => {
    if (io) { io.disconnect(); io = null; }
    if (isMobileMode()) return;

    const scroller = document.querySelector(".right");
    if (!scroller || !sections.length) return;

    io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { root: scroller, threshold: [0.25, 0.4, 0.6] });

    sections.forEach(s => io.observe(s));
  };

  setupSpy();
  window.addEventListener("resize", setupSpy);
})();