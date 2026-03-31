/* ------------------------------------------------
   Campus Coffee Roulette — Script
   ------------------------------------------------ */

(function () {
  'use strict';

  // ---- Fade-in on scroll (opacity only) ----

  const faders = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    threshold: 0.15,
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, observerOptions);
  faders.forEach((el) => observer.observe(el));

  // ---- Form handling ----

  const form = document.getElementById('signup-form');
  const thankYou = document.getElementById('thank-you');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Hide form, show thank-you
    form.style.display = 'none';
    thankYou.classList.add('visible');

    // Reset after a quiet pause
    setTimeout(() => {
      form.reset();
      thankYou.classList.remove('visible');
      form.style.display = 'block';
    }, 4000);
  });
})();
