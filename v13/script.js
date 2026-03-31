/* ========================================
   Campus Coffee Roulette — JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Hamburger Menu ----
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

  // ---- Scroll Fade-in Animation ----
  const fadeEls = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => observer.observe(el));

  // ---- Form Handling ----
  const form = document.getElementById('signupForm');
  const success = document.getElementById('formSuccess');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const university = form.university.value;
    const program = form.program.value.trim();

    let valid = true;

    if (!name) {
      form.fullName.classList.add('error');
      valid = false;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      form.email.classList.add('error');
      valid = false;
    }

    if (!university) {
      form.university.classList.add('error');
      valid = false;
    }

    if (!program) {
      form.program.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Show success, hide form
    form.style.display = 'none';
    success.classList.add('show');

    // Reset after 5 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = '';
      success.classList.remove('show');
    }, 5000);
  });

  // ---- Subtle parallax on orbs with mouse ----
  const orbs = document.querySelectorAll('.orb');

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;  // -1 to 1
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 8;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // ---- Nav background on scroll ----
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(30, 10, 60, 0.7)';
    } else {
      nav.style.background = '';
    }
  });

});
