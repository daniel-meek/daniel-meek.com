(function () {
  const root = document.documentElement;
  const animated = root.classList.contains("js");
  const isNo = root.lang === "no";

  const rows = Array.from(document.querySelectorAll("main:not(.tool-workspace) li"));
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".site-menu");

  if (menuButton && menu) {
    const labelOpen = isNo ? "Åpne meny" : "Open menu";
    const labelClose = isNo ? "Lukk meny" : "Close menu";

    menuButton.addEventListener("click", function () {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      menuButton.setAttribute("aria-label", open ? labelOpen : labelClose);
      menu.classList.toggle("open", !open);
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", labelOpen);
        menu.classList.remove("open");
      }
    });
  }

  if (animated && !document.body.hasAttribute("data-tool")) {
    const h1 = document.querySelector("h1:not([data-no-split])");
    if (h1) {
      const text = h1.textContent;
      h1.setAttribute("aria-label", text);
      h1.textContent = "";
      Array.from(text).forEach(function (character, index) {
        const span = document.createElement("span");
        span.className = "ch";
        span.setAttribute("aria-hidden", "true");
        span.style.setProperty("--i", index);
        span.textContent = character;
        h1.appendChild(span);
      });
    }
  }

  if (animated && "IntersectionObserver" in window && rows.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      let index = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const li = entry.target;
        li.style.setProperty("--d", (index++ * 0.15) + "s");
        li.classList.add("in");
        observer.unobserve(li);
        setTimeout(function () { li.style.setProperty("--d", "0s"); }, 2000);
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -6% 0px" });
    rows.forEach(function (li) { observer.observe(li); });
  } else {
    rows.forEach(function (li) { li.classList.add("in"); });
  }

  if (matchMedia("(hover: hover)").matches) {
    rows.forEach(function (li) {
      li.addEventListener("pointerenter", function () { li.classList.add("hover"); });
      li.addEventListener("pointerleave", function () { li.classList.remove("hover"); });
    });
  }
})();