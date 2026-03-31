// Campus Coffee Roulette — V18

(function () {
  'use strict';

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  faders.forEach(function (el) {
    observer.observe(el);
  });

  // Form submission
  const form = document.getElementById('signup-form');
  const thankYou = document.getElementById('thank-you');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide form fields, show thank you
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.5s ease';

    setTimeout(function () {
      thankYou.classList.add('visible');
    }, 400);

    // Reset after a pause
    setTimeout(function () {
      thankYou.classList.remove('visible');
      form.reset();
      setTimeout(function () {
        form.style.opacity = '1';
      }, 400);
    }, 3500);
  });
})();
