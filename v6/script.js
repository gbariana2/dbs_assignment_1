/* ============================================
   Campus Coffee Roulette — Script
   ============================================ */

(function () {
  'use strict';

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll Fade-In ----
  const fadeTargets = document.querySelectorAll(
    '.section-header-row, .how-step, .how-intro, .pull-quote, ' +
    '.school-card, .why-item, .why-feature-quote, ' +
    '.signup-intro, .signup-detail, .signup-form, ' +
    '.hero-left, .hero-right'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in'));

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeTargets.forEach(el => fadeObserver.observe(el));

  // ---- Smooth Scroll for Nav (fallback for older browsers) ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Form Handling ----
  const form = document.getElementById('signupForm');
  const confirmation = document.getElementById('formConfirmation');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.fullName.value.trim();
    const email = form.email.value.trim();
    const university = form.university.value;
    const program = form.program.value.trim();

    if (!name || !email || !university || !program) {
      // Let browser handle with required attribute on retry
      form.reportValidity();
      return;
    }

    // Simple email check
    if (!email.includes('@') || !email.includes('.')) {
      form.email.setCustomValidity('Please enter a valid email address.');
      form.reportValidity();
      form.email.setCustomValidity('');
      return;
    }

    // Show confirmation
    confirmation.classList.add('visible');

    // Reset after delay
    setTimeout(() => {
      confirmation.classList.remove('visible');
      form.reset();
    }, 3500);
  });

  // ---- Nav background on scroll ----
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      nav.style.background = 'rgba(245, 242, 237, 0.97)';
    } else {
      nav.style.background = 'rgba(245, 242, 237, 0.92)';
    }
  }, { passive: true });

})();
