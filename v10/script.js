/* ======================================================
   Campus Coffee Roulette — Script
   ====================================================== */

(function () {
  'use strict';

  /* ---- Fade-in on scroll ---- */
  const faders = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  faders.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* ---- Form handling ---- */
  const form = document.getElementById('signup-form');
  const confirmation = document.getElementById('confirmation');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const university = form.querySelector('#university');
      const program = form.querySelector('#program');

      if (!name.value.trim() || !email.value.trim() || !university.value || !program.value.trim()) {
        // Quietly highlight empty required fields
        [name, email, university, program].forEach(function (input) {
          if (!input.value || !input.value.trim()) {
            input.style.borderBottomColor = '#b8644c';
            setTimeout(function () {
              input.style.borderBottomColor = '';
            }, 2000);
          }
        });
        return;
      }

      // Simple email format check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderBottomColor = '#b8644c';
        setTimeout(function () {
          email.style.borderBottomColor = '';
        }, 2000);
        return;
      }

      // Show confirmation, hide form
      form.style.opacity = '0';
      form.style.transition = 'opacity 0.5s ease';

      setTimeout(function () {
        form.hidden = true;
        form.style.opacity = '';
        confirmation.hidden = false;
        confirmation.style.opacity = '0';
        confirmation.style.transition = 'opacity 0.6s ease';

        requestAnimationFrame(function () {
          confirmation.style.opacity = '1';
        });

        // Reset form and swap back after a pause
        setTimeout(function () {
          confirmation.style.opacity = '0';

          setTimeout(function () {
            confirmation.hidden = true;
            confirmation.style.opacity = '';
            form.reset();
            form.hidden = false;
            form.style.opacity = '0';
            form.style.transition = 'opacity 0.5s ease';

            requestAnimationFrame(function () {
              form.style.opacity = '1';
            });
          }, 500);
        }, 4000);
      }, 500);
    });
  }
})();
