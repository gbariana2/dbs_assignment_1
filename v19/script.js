// Campus Coffee Roulette — V19

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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  faders.forEach(function (el) {
    observer.observe(el);
  });

  // Form submission
  var form = document.getElementById('signup-form');
  var thankYou = document.getElementById('thank-you');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    form.style.opacity = '0';
    form.style.transition = 'opacity 0.5s ease';

    setTimeout(function () {
      thankYou.classList.add('visible');
    }, 400);

    setTimeout(function () {
      thankYou.classList.remove('visible');
      form.reset();
      setTimeout(function () {
        form.style.opacity = '1';
      }, 400);
    }, 3500);
  });
})();
