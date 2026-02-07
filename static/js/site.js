(() => {
  const scroller = document.querySelector(".right");
  const navItems = [...document.querySelectorAll(".nav-item")];
  const sections = ["about","experience","projects","writing"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  // Click nav: scroll INSIDE right container
  navItems.forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")?.replace("#","");
      const target = document.getElementById(id);
      if (!scroller || !target) return;
      e.preventDefault();
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