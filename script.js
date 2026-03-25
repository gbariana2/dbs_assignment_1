// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Scroll fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));
