// ===== Mobile Nav Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  }
});

// ===== Form Submission =====
const form = document.getElementById('signupForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Hide form, show confirmation
  form.style.display = 'none';
  confirmation.classList.add('show');

  // After 3 seconds, reset
  setTimeout(() => {
    confirmation.classList.remove('show');
    form.reset();
    form.style.display = 'flex';
  }, 3500);
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.step-card, .reason-card, .school-chip, .form');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== Nav background on scroll =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'rgba(0, 240, 255, 0.3)';
  } else {
    nav.style.borderBottomColor = 'rgba(0, 240, 255, 0.15)';
  }
});
