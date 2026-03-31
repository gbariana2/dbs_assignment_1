// ===== Mobile Nav Toggle =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== Form Handling =====
const form = document.getElementById('signupForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Simple validation
  const fields = form.querySelectorAll('input, select');
  let valid = true;

  fields.forEach(field => {
    field.classList.remove('invalid');
    if (!field.value.trim() || (field.type === 'email' && !field.value.includes('@'))) {
      field.classList.add('invalid');
      valid = false;
    }
    if (field.tagName === 'SELECT' && field.value === '') {
      field.classList.add('invalid');
      valid = false;
    }
  });

  if (!valid) return;

  // Show confirmation
  confirmation.classList.add('show');

  // Reset after delay
  setTimeout(() => {
    confirmation.classList.remove('show');
    form.reset();
  }, 3000);
});

// Remove invalid style on input
form.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
  field.addEventListener('change', () => field.classList.remove('invalid'));
});

// ===== Scroll-triggered nav background =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  } else {
    nav.style.boxShadow = 'none';
  }
});
