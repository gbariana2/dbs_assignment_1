// Campus Coffee Roulette — V20

(function () {
  'use strict';

  // Fade-in on scroll
  var faders = document.querySelectorAll('.fade-in');

  var observer = new IntersectionObserver(
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

  // School chips → scroll to form + pre-select university
  var schoolChips = document.querySelectorAll('.school[data-university]');
  var universitySelect = document.getElementById('university');

  schoolChips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      var value = chip.getAttribute('data-university');

      // Set the dropdown value
      universitySelect.value = value;

      // Brief highlight on the dropdown
      universitySelect.classList.add('highlighted');
      setTimeout(function () {
        universitySelect.classList.remove('highlighted');
      }, 2000);

      // Mark the clicked chip as active
      schoolChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');

      // Scroll to the form section
      var joinSection = document.getElementById('join');
      joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Focus the name field after scroll
      setTimeout(function () {
        document.getElementById('name').focus();
      }, 600);
    });
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
      schoolChips.forEach(function (c) { c.classList.remove('active'); });
      setTimeout(function () {
        form.style.opacity = '1';
      }, 400);
    }, 3500);
  });
})();
