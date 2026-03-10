const toggle = document.getElementById("themeToggle");
const root = document.documentElement;
const body = document.body;
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar .nav-link");
const sections = [...document.querySelectorAll("section[id]")];
const saved = localStorage.getItem("portfolio-theme");

const applyTheme = (isDark) => {
  if (isDark) {
    body.classList.add("dark-theme");
    navbar.classList.add("navbar-dark");
    navbar.classList.remove("navbar-light");
    toggle.classList.add("btn-warning");
    toggle.classList.remove("btn-outline-warning");
    localStorage.setItem("portfolio-theme", "dark");
  } else {
    body.classList.remove("dark-theme");
    navbar.classList.add("navbar-light");
    navbar.classList.remove("navbar-dark");
    toggle.classList.remove("btn-warning");
    toggle.classList.add("btn-outline-warning");
    localStorage.setItem("portfolio-theme", "light");
  }
};

if (saved === "dark") {
  applyTheme(true);
} else {
  applyTheme(false);
}

let isDark = body.classList.contains("dark-theme");

toggle.addEventListener("click", () => {
  isDark = !isDark;
  applyTheme(isDark);
});

const setActiveLink = () => {
  let currentId = "home";
  const offset = 120;

  sections.forEach((section) => {
    const top = section.offsetTop - offset;
    if (window.scrollY >= top) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isActive = href === `#${currentId}`;
    link.classList.toggle("active-link", isActive);
  });
};

const setFloatingNav = () => {
  const isFloating = window.scrollY > 8;
  navbar.classList.toggle("is-floating", isFloating);
  if (isFloating) {
    document.body.style.paddingTop = `${navbar.offsetHeight}px`;
  } else {
    document.body.style.paddingTop = "0px";
  }
};

window.addEventListener("scroll", () => {
  setActiveLink();
  setFloatingNav();
});

window.addEventListener("load", () => {
  setActiveLink();
  setFloatingNav();
});
