// ============================================
// Campus Coffee Roulette — V16: Warm Editorial
// ============================================

(function () {
  'use strict';

  // --- Scroll fade-in observer ---
  const faders = document.querySelectorAll('.fade-in');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  faders.forEach(function (el) {
    fadeObserver.observe(el);
  });

  // --- Form submission ---
  const form = document.getElementById('signup-form');
  const confirmation = document.getElementById('confirmation');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Gather values (for future use)
      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        university: form.university.value,
        program: form.program.value.trim()
      };

      // Show confirmation
      confirmation.textContent = 'Welcome to the table, ' + data.name.split(' ')[0] + '. You\u2019ll hear from us before the next matching round.';
      confirmation.classList.add('visible');

      // Reset form after a pause
      setTimeout(function () {
        form.reset();
      }, 600);

      // Fade out confirmation after a while
      setTimeout(function () {
        confirmation.classList.remove('visible');
      }, 6000);
    });
  }
})();
