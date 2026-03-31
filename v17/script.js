// =========================================
// Campus Coffee Roulette — V17
// Elegant Calm
// =========================================

(function () {
  'use strict';

  // --- Fade-in on scroll (opacity only, no movement) ---

  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // --- Form handling ---

  const form = document.getElementById('signup-form');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide form, show confirmation
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.4s ease';

    setTimeout(() => {
      form.style.display = 'none';
      confirmation.classList.add('visible');
    }, 400);

    // Reset and bring form back after a pause
    setTimeout(() => {
      confirmation.classList.remove('visible');

      setTimeout(() => {
        form.reset();
        form.style.display = '';
        // Force reflow
        void form.offsetHeight;
        form.style.opacity = '1';
      }, 500);
    }, 4000);
  });
})();
