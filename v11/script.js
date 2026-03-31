// ============================================
// Campus Coffee Roulette — Landing Page Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Nav Toggle ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });

  // ---- Scroll-triggered Fade-in Animations ----
  const fadeEls = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx * 80;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ---- Form Submission ----
  const form = document.getElementById('signupForm');
  const confirmation = document.getElementById('signupConfirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation already handled by required attributes
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Log for demo purposes
    console.log('Signup submitted:', data);

    // Hide form, show confirmation
    form.style.display = 'none';
    confirmation.classList.add('visible');

    // Reset and show form again after 4 seconds
    setTimeout(() => {
      confirmation.classList.remove('visible');
      form.reset();
      form.style.display = 'flex';
    }, 4000);
  });

  // ---- Smooth scroll offset for sticky nav ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height + breathing room
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Nav background on scroll (subtle enhancement) ----
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      nav.style.borderBottomColor = 'rgba(255,255,255,0.06)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

});
