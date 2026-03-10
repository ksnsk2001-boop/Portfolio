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
