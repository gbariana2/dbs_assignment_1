/* ============================================================
   THE COFFEE ROULETTE DISPATCH — Issue No. 07
   Script
   ============================================================ */

(function () {
  'use strict';

  // --- DOM REFS ---
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
  const runningHeader = document.getElementById('runningHeader');
  const sectionIndicator = document.getElementById('sectionIndicator');
  const pageNum = document.getElementById('pageNum');
  const signupForm = document.getElementById('signupForm');
  const formConfirmation = document.getElementById('formConfirmation');

  const sections = document.querySelectorAll('[data-section]');

  // --- MOBILE NAV ---
  function openNav() {
    mobileNav.classList.add('open');
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (mobileNav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeNav);
  }

  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
    });
  });

  // --- RUNNING HEADER VISIBILITY ---
  let lastScrollY = 0;
  let headerHidden = false;

  function handleScroll() {
    const scrollY = window.scrollY;
    const coverHeight = document.getElementById('cover').offsetHeight;

    // Hide header on cover
    if (scrollY < coverHeight * 0.5) {
      if (!headerHidden) {
        runningHeader.classList.add('hidden');
        headerHidden = true;
      }
    } else {
      if (headerHidden) {
        runningHeader.classList.remove('hidden');
        headerHidden = false;
      }
    }

    // Update section indicator
    let currentSection = '01';
    let pageIndex = 1;
    sections.forEach(function (section, i) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) {
        currentSection = section.getAttribute('data-section');
        pageIndex = i + 1;
      }
    });

    sectionIndicator.textContent = currentSection;
    pageNum.textContent = Math.min(pageIndex * 2, 12);

    lastScrollY = scrollY;
  }

  // Throttle scroll
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial state
  runningHeader.classList.add('hidden');

  // --- FORM SUBMISSION ---
  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation visual
    const inputs = signupForm.querySelectorAll('input, select');
    let valid = true;
    inputs.forEach(function (input) {
      if (!input.value || (input.type === 'email' && !input.value.includes('.edu'))) {
        input.style.borderBottomColor = '#ff3333';
        valid = false;
      } else {
        input.style.borderBottomColor = '';
      }
    });

    if (!valid) return;

    // Show confirmation
    formConfirmation.classList.add('show');

    // Reset after delay
    setTimeout(function () {
      formConfirmation.classList.remove('show');
      signupForm.reset();
    }, 3500);
  });

  // --- SCROLL REVEAL ANIMATION ---
  const revealElements = document.querySelectorAll(
    '.section-marker, .section-headline, .mechanism-step, .school-card, ' +
    '.pull-quote, .voice-block, .stat, .lede-opening, .three-col, ' +
    '.enroll-text, .enroll-form-wrapper, .photo-caption-block'
  );

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });

  // CSS class for revealed
  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Stagger mechanism steps and school cards
  document.querySelectorAll('.mechanism-step').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  document.querySelectorAll('.school-card').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  document.querySelectorAll('.stat').forEach(function (el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
  });

  // --- SMOOTH SCROLL FOR COVER CUE ---
  const scrollCue = document.querySelector('.cover-scroll-cue');
  if (scrollCue) {
    scrollCue.style.cursor = 'pointer';
    scrollCue.addEventListener('click', function () {
      document.getElementById('lede').scrollIntoView({ behavior: 'smooth' });
    });
  }

})();
