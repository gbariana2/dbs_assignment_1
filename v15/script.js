/* ===================================================
   Campus Coffee Roulette — Script
   =================================================== */

(function () {
  'use strict';

  const form = document.getElementById('signup-form');
  const confirmation = document.getElementById('confirmation');

  if (!form || !confirmation) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation (HTML5 handles required, but double-check)
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const university = form.university.value;
    const program = form.program.value.trim();

    if (!name || !email || !university || !program) {
      return;
    }

    // Validate email looks like a university address
    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid university email address.');
      return;
    }

    // Hide form, show confirmation
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');

    // Scroll confirmation into view
    confirmation.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset after 4 seconds so another person could sign up
    setTimeout(function () {
      form.reset();
      confirmation.classList.add('hidden');
      form.classList.remove('hidden');
    }, 4000);
  });

  /* ------- Subtle entrance animations via IntersectionObserver ------- */
  const animTargets = document.querySelectorAll(
    '.sticky, .card, .polaroid, .notepad, .sticker-join'
  );

  if ('IntersectionObserver' in window) {
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

    animTargets.forEach(function (el) {
      el.classList.add('anim-ready');
      observer.observe(el);
    });
  }

  /* ------- Add CSS for entrance animations dynamically ------- */
  const style = document.createElement('style');
  style.textContent = `
    .anim-ready {
      opacity: 0;
      transform: translateY(24px) rotate(var(--r, 0deg));
      transition: opacity .5s ease, transform .6s ease;
    }
    .anim-ready.visible {
      opacity: 1;
      transform: translateY(0) rotate(var(--r, 0deg));
    }
    /* Keep hover override working */
    .sticky.anim-ready.visible:hover {
      transform: rotate(0deg) scale(1.03);
    }
  `;
  document.head.appendChild(style);
})();
