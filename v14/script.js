/* ============================================
   CAMPUS COFFEE ROULETTE — TERMINAL SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // TYPEWRITER EFFECT
  // ========================================

  const typewriterEl = document.getElementById('typewriter');
  const heroCursor = document.getElementById('hero-cursor');

  const lines = [
    '> Welcome to Campus Coffee Roulette.',
    '> Connecting Chicago grad students, one cup at a time.',
    '>',
    '> You study in your department. You eat in your department.',
    '> You probably only know people in your department.',
    '>',
    '> That ends now.',
    '>',
    '> Sign up. Get matched. Grab coffee with someone brilliant',
    '> from a completely different world.',
    '>',
    '> 7 universities. 80+ programs. 1 city. Infinite possibilities.',
  ];

  const fullText = lines.join('\n');
  let charIndex = 0;
  const speed = 22; // ms per character

  function typeWriter() {
    if (charIndex < fullText.length) {
      const char = fullText[charIndex];
      typewriterEl.textContent += char;
      charIndex++;

      // Slightly longer pause on newlines
      const delay = char === '\n' ? speed * 6 : speed;
      setTimeout(typeWriter, delay);
    }
  }

  // Start after a brief delay
  setTimeout(typeWriter, 600);


  // ========================================
  // SIGNUP FORM
  // ========================================

  const form = document.getElementById('signup-form');
  const successDiv = document.getElementById('signup-success');
  const resetBtn = document.getElementById('reset-btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate email ends with .edu
    const email = document.getElementById('field-email').value;
    if (!email.endsWith('.edu')) {
      alert('[ERROR] Please use a valid .edu email address.');
      return;
    }

    // Hide form, show success
    form.style.display = 'none';
    successDiv.classList.remove('hidden');

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Reset form
  resetBtn.addEventListener('click', () => {
    form.reset();
    form.style.display = 'block';
    successDiv.classList.add('hidden');
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });


  // ========================================
  // MATRIX RAIN BACKGROUND
  // ========================================

  const canvas = document.getElementById('matrix-rain');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789COFFEE';
  const charArray = chars.split('');
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = new Array(columns).fill(1);

  function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }
  }

  initDrops();
  window.addEventListener('resize', initDrops);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px Fira Code, monospace';

    for (let i = 0; i < drops.length; i++) {
      if (drops[i] < 0) {
        drops[i]++;
        continue;
      }

      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = Math.floor(Math.random() * -20);
      }

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);


  // ========================================
  // SECTION FADE-IN ON SCROLL
  // ========================================

  const sections = document.querySelectorAll('.section');

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(10px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
  });

});
