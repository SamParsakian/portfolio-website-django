(() => {
  const navItems = [...document.querySelectorAll(".nav-item")];
  const sections = ["about","experience","projects","articles"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const isMobileMode = () => window.matchMedia("(max-width: 900px)").matches;
  const SCROLL_OFFSET = 88;

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
        scroller.scrollTo({ top: Math.max(0, target.offsetTop - SCROLL_OFFSET), behavior: "smooth" });
      }
    });
  });

  // CARD click (same as before if you already added it)
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

  // Desktop only: forward mouse wheel from LEFT panel to RIGHT scroll container
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");

  const isDesktopMode = () => window.matchMedia("(min-width: 901px)").matches;

  if (left && right) {
    left.addEventListener("wheel", (e) => {
      if (!isDesktopMode()) return;

      // prevent the page from trying to scroll (or feeling slow)
      e.preventDefault();

      // Handle deltaMode properly for consistent physics
      let deltaY = e.deltaY;

      // deltaMode 0 = pixels (default), 1 = lines, 2 = pages
      if (e.deltaMode === 1) {
        deltaY *= 16; // lines to pixels
      } else if (e.deltaMode === 2) {
        deltaY *= window.innerHeight; // pages to pixels
      }

      // Use scrollBy with auto behavior to match native physics exactly
      right.scrollBy({
        top: deltaY,
        left: 0,
        behavior: "auto"
      });
    }, { passive: false });
  }

  // Scroll-spy: use positions relative to the scroll container (offsetTop can be wrong if offsetParent ≠ scroller)
  const scroller = document.querySelector(".right");
  const THRESHOLD_RATIO = 0.3;

  function getSectionTopInContent(section) {
    const scrollTop = scroller.scrollTop;
    const scrollerRect = scroller.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    return scrollTop + (sectionRect.top - scrollerRect.top);
  }

  function getActiveSectionId() {
    if (isMobileMode() || !scroller || !sections.length) return null;
    const scrollTop = scroller.scrollTop;
    const triggerY = scrollTop + scroller.clientHeight * THRESHOLD_RATIO;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const top = getSectionTopInContent(section);
      const bottom = top + section.offsetHeight;
      if (triggerY >= top && triggerY < bottom) return section.id;
    }
    if (triggerY < getSectionTopInContent(sections[0])) return sections[0].id;
    return sections[sections.length - 1].id;
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const id = getActiveSectionId();
      if (id) setActive(id);
      ticking = false;
    });
  }

  if (scroller && sections.length) {
    scroller.addEventListener("scroll", onScroll, { passive: true });
    setActive(getActiveSectionId() || sections[0].id);
  }
  window.addEventListener("resize", () => {
    if (scroller && sections.length) setActive(getActiveSectionId() || sections[0].id);
  });
})();
