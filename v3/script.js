/* ==========================================================================
   Campus Coffee Roulette — Script
   ========================================================================== */

(function () {
  'use strict';

  // --- DOM refs ---
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const form = document.getElementById('signupForm');
  const confirmation = document.getElementById('confirmation');

  // --- Navbar scroll shadow ---
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // --- Hamburger toggle ---
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Form validation & submit ---
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Clear previous errors
    form.querySelectorAll('.error').forEach(function (el) {
      el.classList.remove('error');
    });

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var university = form.university.value;
    var program = form.program.value.trim();
    var valid = true;

    if (!name) { form.name.classList.add('error'); valid = false; }
    if (!email || !email.includes('@') || !email.includes('.')) {
      form.email.classList.add('error');
      valid = false;
    }
    if (!university) { form.university.classList.add('error'); valid = false; }
    if (!program) { form.program.classList.add('error'); valid = false; }

    if (!valid) return;

    // Show confirmation
    confirmation.classList.add('show');

    // Reset after delay
    setTimeout(function () {
      confirmation.classList.remove('show');
      form.reset();
    }, 3500);
  });

  // --- Smooth scroll for anchor links (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = navbar.offsetHeight + 8;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
