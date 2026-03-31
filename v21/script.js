// Campus Coffee Roulette — V21

(function () {
  'use strict';

  // ---- Fade-in on scroll ----
  var faders = document.querySelectorAll('.fade-in');
  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  faders.forEach(function (el) { fadeObserver.observe(el); });

  // ---- Animated stat counters ----
  var statNums = document.querySelectorAll('.stat-num[data-count]');
  var countObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-count'));
        var text = el.getAttribute('data-text');
        if (text) { el.textContent = text; countObserver.unobserve(el); return; }
        var duration = 1200;
        var start = performance.now();
        function tick(now) {
          var progress = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + (target === 6 ? '+' : '');
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(function (el) { countObserver.observe(el); });

  // ---- Mobile nav toggle ----
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // ---- Demo match modal ----
  var demoBtn = document.getElementById('demo-btn');
  var modal = document.getElementById('demo-modal');
  var modalClose = document.getElementById('modal-close');
  var revealBtn = document.getElementById('demo-reveal');
  var matchAvatar = document.getElementById('demo-match-avatar');
  var matchSchool = document.getElementById('demo-match-school');
  var demoResult = document.getElementById('demo-result');
  var matchThem = document.querySelector('.match-them');

  var demoMatches = [
    { initials: 'SK', school: 'Kellogg MBA', msg: 'Sarah studies behavioral economics and loves climbing.' },
    { initials: 'RJ', school: 'UChicago CS PhD', msg: 'Raj researches machine learning and makes great chai.' },
    { initials: 'ML', school: 'IIT Engineering', msg: 'Maria is building a robotics startup and runs marathons.' },
    { initials: 'AP', school: 'Loyola JD', msg: 'Alex studies immigration law and plays in a jazz band.' },
    { initials: 'TC', school: 'DePaul CDM', msg: 'Tyler designs interfaces and is obsessed with typography.' },
    { initials: 'JW', school: 'UIC Medicine', msg: 'Jasmine is in her third year of med school and paints watercolors.' }
  ];

  function resetDemo() {
    matchAvatar.textContent = '?';
    matchSchool.textContent = '???';
    demoResult.textContent = '';
    demoResult.classList.remove('visible');
    revealBtn.classList.remove('hidden');
    matchThem.classList.remove('revealed');
  }

  demoBtn.addEventListener('click', function () {
    resetDemo();
    modal.classList.add('open');
  });

  modalClose.addEventListener('click', function () {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.classList.remove('open');
  });

  revealBtn.addEventListener('click', function () {
    var match = demoMatches[Math.floor(Math.random() * demoMatches.length)];
    revealBtn.classList.add('hidden');
    matchThem.classList.add('revealed');
    matchAvatar.textContent = match.initials;
    matchSchool.textContent = match.school;
    setTimeout(function () {
      demoResult.textContent = match.msg;
      demoResult.classList.add('visible');
    }, 400);
  });

  // ---- Step progress animation ----
  var stepCards = document.querySelectorAll('.step-card');
  var progressFill = document.getElementById('step-progress-fill');

  var stepObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateSteps();
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  stepObserver.observe(document.querySelector('.steps-grid'));

  function animateSteps() {
    stepCards.forEach(function (card, i) {
      setTimeout(function () {
        card.classList.add('active');
        progressFill.style.width = ((i + 1) / stepCards.length * 100) + '%';
      }, i * 600);
    });
  }

  // ---- School chips → form ----
  var schoolChips = document.querySelectorAll('.school[data-university]');
  var universitySelect = document.getElementById('university');

  schoolChips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      e.preventDefault();
      universitySelect.value = chip.getAttribute('data-university');
      validateField(universitySelect);
      schoolChips.forEach(function (c) { c.classList.remove('active'); });
      chip.classList.add('active');
      document.getElementById('join').scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () { document.getElementById('name').focus(); }, 600);
    });
  });

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // ---- Live form validation ----
  var form = document.getElementById('signup-form');
  var thankYou = document.getElementById('thank-you');
  var submitBtn = document.getElementById('submit-btn');
  var formProgress = document.getElementById('form-progress');
  var emailHint = document.getElementById('email-hint');
  var fields = form.querySelectorAll('input, select');

  function validateField(field) {
    var parent = field.closest('.field');
    if (!parent) return false;
    var valid = false;
    if (field.type === 'email') {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (field.value && !valid) {
        emailHint.textContent = 'Please enter a valid email';
      } else if (field.value && valid && !field.value.includes('.edu')) {
        emailHint.textContent = 'Tip: use your .edu email for faster verification';
        valid = true;
      } else {
        emailHint.textContent = '';
      }
    } else if (field.tagName === 'SELECT') {
      valid = field.value !== '';
    } else {
      valid = field.value.trim().length >= 2;
    }
    parent.classList.toggle('valid', valid);
    return valid;
  }

  function checkFormComplete() {
    var allValid = true;
    var filled = 0;
    fields.forEach(function (f) {
      if (validateField(f)) filled++;
      else allValid = false;
    });
    submitBtn.disabled = !allValid;
    if (allValid) {
      formProgress.textContent = 'Ready to go!';
      formProgress.style.color = 'var(--green)';
    } else {
      formProgress.textContent = filled + ' of ' + fields.length + ' fields complete';
      formProgress.style.color = '';
    }
  }

  fields.forEach(function (f) {
    f.addEventListener('input', checkFormComplete);
    f.addEventListener('change', checkFormComplete);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.style.opacity = '0';
    form.style.transition = 'opacity 0.5s ease';
    setTimeout(function () { thankYou.classList.add('visible'); }, 400);
    setTimeout(function () {
      thankYou.classList.remove('visible');
      form.reset();
      submitBtn.disabled = true;
      formProgress.textContent = 'Fill in all fields to continue';
      formProgress.style.color = '';
      form.querySelectorAll('.field').forEach(function (f) { f.classList.remove('valid'); });
      schoolChips.forEach(function (c) { c.classList.remove('active'); });
      emailHint.textContent = '';
      setTimeout(function () { form.style.opacity = '1'; }, 400);
    }, 3500);
  });

  // ---- Back to top button ----
  var backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
