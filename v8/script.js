// ============================================
// CAMPUS COFFEE ROULETTE — v8 MANIFESTO SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Form Submission ---
  const form = document.getElementById('signupForm');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const university = form.university.value;
    const program = form.program.value.trim();

    if (!name || !email || !university || !program) {
      // Shake the form
      form.style.animation = 'none';
      void form.offsetWidth; // reflow
      form.style.animation = 'shake 0.4s ease';
      return;
    }

    // Simple email check
    if (!email.includes('@') || !email.includes('.')) {
      form.email.style.borderColor = '#ff0000';
      form.email.style.boxShadow = '3px 3px 0 #ff0000';
      setTimeout(() => {
        form.email.style.borderColor = '';
        form.email.style.boxShadow = '';
      }, 2000);
      return;
    }

    // Show confirmation
    form.style.display = 'none';
    confirmation.classList.add('visible');

    // Reset after 4 seconds
    setTimeout(() => {
      confirmation.classList.remove('visible');
      form.style.display = '';
      form.reset();
    }, 4000);
  });

  // Add shake keyframes dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      50% { transform: translateX(8px); }
      75% { transform: translateX(-4px); }
    }
  `;
  document.head.appendChild(style);

  // --- Scroll reveal for declarations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = `rotate(${entry.target.style.getPropertyValue('--rot') || '0deg'})`;
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.declaration, .how-step, .school-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

});
