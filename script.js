// Initialize AOS animations
AOS.init({
  duration: 800,
  once: true,
});

// Typing effect
const typingElement = document.querySelector(".typing");
const phrases = [
  "Building scalable APIs.",
  "Crafting clean UI experiences.",
  "Deploying reliable web platforms.",
];
let phraseIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (typingForward) {
    charIndex++;
    if (charIndex === currentPhrase.length) {
      typingForward = false;
      setTimeout(typeLoop, 1200);
      typingElement.textContent = currentPhrase;
      return;
    }
  } else {
    charIndex--;
    if (charIndex === 0) {
      typingForward = true;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  typingElement.textContent = currentPhrase.substring(0, charIndex);
  setTimeout(typeLoop, typingForward ? 80 : 40);
}

if (typingElement) {
  typeLoop();
}

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const navbar = document.getElementById("navbar");
const savedTheme = localStorage.getItem("portfolio-theme");

const setTheme = (theme) => {
  body.classList.toggle("theme-light", theme === "light");
  body.classList.toggle("theme-dark", theme === "dark");
  navbar.classList.toggle("navbar-light", theme === "light");
  navbar.classList.toggle("navbar-dark", theme === "dark");
  localStorage.setItem("portfolio-theme", theme);
};

if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = body.classList.contains("theme-dark") ? "light" : "dark";
  setTheme(nextTheme);
});

// Scroll-based active nav highlight
const sectionIds = ["home", "about", "skills", "projects", "experience", "contact"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll(".navbar .nav-link");

const updateActiveNav = () => {
  const offset = 120;
  let activeId = sections[0]?.id || "";

  sections.forEach((section) => {
    const top = section.offsetTop - offset;
    if (window.scrollY >= top) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${activeId}`);
  });
};

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

// Project modal population
const projectButtons = document.querySelectorAll(".project-modal-btn");
const modalTitle = document.getElementById("projectModalLabel");
const modalDesc = document.getElementById("projectModalDesc");
const modalTech = document.getElementById("projectModalTech");
const modalGitHub = document.getElementById("projectModalGitHub");

projectButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const title = btn.getAttribute("data-title") || "Project Details";
    const desc = btn.getAttribute("data-desc") || "";
    const tech = btn.getAttribute("data-tech") || "";
    const github = btn.getAttribute("data-github") || "#";

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalTech.textContent = `Tech: ${tech}`;
    modalGitHub.setAttribute("href", github);
  });
});

// Show "View Details" only when excerpt overflows
const updateProjectButtons = () => {
  document.querySelectorAll(".project-card").forEach((card) => {
    const excerpt = card.querySelector(".project-excerpt");
    const button = card.querySelector(".project-modal-btn");
    if (!excerpt || !button) return;
    const hasOverflow = excerpt.scrollHeight > excerpt.clientHeight;
    button.style.display = hasOverflow ? "inline-flex" : "none";
  });
};

window.addEventListener("load", updateProjectButtons);
window.addEventListener("resize", updateProjectButtons);
