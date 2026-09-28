
(function () {
const root = document.documentElement;
const animated = root.classList.contains("js");
const rows = Array.from(document.querySelectorAll("main li"));
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-menu");

/* page-loader
const loader = document.querySelector(".page-loader");

if (loader) {
    loader.classList.add("initial");
     
    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            loader.classList.add("leaving");
        });
    });
}
*/

rows.forEach(function (li) {
    const fill = document.createElement("span");
    fill.className = "fill";
    fill.setAttribute("aria-hidden", "true");
    li.appendChild(fill);
});

if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Åpne meny" : "Lukk meny");
    menu.classList.toggle("open", !open);
    });

    document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Åpne meny");
        menu.classList.remove("open");
    }
    });
}

/* page-loader
document.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener("click", function (event) {
    if (!animated || !loader || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.protocol === "mailto:" || url.pathname === location.pathname && url.hash) return;
    event.preventDefault();
    loader.hidden = false;
    requestAnimationFrame(function () {
        loader.classList.remove("leaving");
        loader.classList.add("entering");
    });
    setTimeout(function () { location.href = url.href; }, 520);
    });
});
*/

if (animated) {
    const h1 = document.querySelector("h1");
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

if (animated && "IntersectionObserver" in window) {
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
