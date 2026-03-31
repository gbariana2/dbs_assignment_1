// ========================================
// CAMPUS COFFEE ROULETTE — BRUTALIST JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Nav ----------
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ---------- Form Submission ----------
  const form = document.getElementById('signupForm');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const university = document.getElementById('university');
    const program = document.getElementById('program');

    let valid = true;

    if (!name.value.trim()) {
      name.classList.add('error');
      valid = false;
    }

    if (!email.value.trim() || !email.value.includes('@')) {
      email.classList.add('error');
      valid = false;
    }

    if (!university.value) {
      university.classList.add('error');
      valid = false;
    }

    if (!program.value.trim()) {
      program.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Show confirmation
    confirmation.classList.add('active');

    // Reset after 2.5 seconds
    setTimeout(() => {
      confirmation.classList.remove('active');
      form.reset();
    }, 2500);
  });

  // ---------- Scroll-triggered nav border emphasis ----------
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.borderBottomWidth = '6px';
    } else {
      nav.style.borderBottomWidth = '4px';
    }
  });

});
