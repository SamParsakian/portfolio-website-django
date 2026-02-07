(() => {
  const scroller = document.querySelector(".right");
  const navItems = [...document.querySelectorAll(".nav-item")];
  const sections = ["about","experience","projects","writing"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // Make entire card clickable (opens the first <a> inside)
  document.querySelectorAll(".card-row.card-link").forEach(card => {
    card.addEventListener("click", (e) => {
      // Don't interfere when user clicks a real link
      if (e.target.closest("a")) return;

      const a = card.querySelector("a");
      if (a && a.href) {
        window.open(a.href, "_blank", "noopener,noreferrer");
      }
    });

    // Keyboard accessibility: Enter opens
    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const a = card.querySelector("a");
        if (a && a.href) window.open(a.href, "_blank", "noopener,noreferrer");
      }
    });
  });

  // Click nav: scroll INSIDE right container
  navItems.forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")?.replace("#","");
      const target = document.getElementById(id);
      if (!scroller || !target) return;
      e.preventDefault();
      setActive(id);
      const top = target.offsetTop;
      scroller.scrollTo({ top: top - 10, behavior: "smooth" });
    });
  });

  // Scroll-spy using IntersectionObserver within the scroller
  const setActive = (id) => {
    navItems.forEach(a => {
      a.classList.toggle("is-active", a.dataset.target === id);
    });
  };

  if (scroller && sections.length) {
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target?.id) setActive(visible.target.id);
    }, { root: scroller, threshold: [0.25, 0.4, 0.6] });

    sections.forEach(s => io.observe(s));
  }
})();