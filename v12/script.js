// ==========================================================================
// Campus Coffee Roulette — The Graduate Gazette
// ==========================================================================

(function () {
  'use strict';

  const form = document.getElementById('signup-form');
  const confirmation = document.getElementById('confirmation');

  if (!form || !confirmation) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#full-name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const university = form.querySelector('#university').value;
    const program = form.querySelector('#program').value.trim();

    if (!name || !email || !university || !program) {
      highlightEmptyFields();
      return;
    }

    // Validate email format (must look like a .edu address)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      shakeField(form.querySelector('#email'));
      return;
    }

    // Show confirmation
    confirmation.classList.remove('hidden');

    // Reset form and hide confirmation after 4 seconds
    setTimeout(function () {
      form.reset();
      confirmation.classList.add('hidden');
    }, 4000);
  });

  function highlightEmptyFields() {
    const fields = form.querySelectorAll('input, select');
    fields.forEach(function (field) {
      if (
        !field.value ||
        (field.tagName === 'SELECT' && field.value === '')
      ) {
        shakeField(field);
      }
    });
  }

  function shakeField(field) {
    field.style.borderColor = '#8b0000';
    field.style.transition = 'border-color 0.3s';
    setTimeout(function () {
      field.style.borderColor = '';
    }, 2000);
  }

  // Animate the ticker numbers on scroll (networking index)
  const ticker = document.querySelector('.ticker');
  if (ticker) {
    let tickerInterval = setInterval(function () {
      updateTickerValues();
    }, 8000);

    function updateTickerValues() {
      const coffees = 1247 + Math.floor(Math.random() * 5);
      const connections = 863 + Math.floor(Math.random() * 3);
      const index = 42 + Math.floor(Math.random() * 3) - 1;
      const arrow = index >= 42 ? '\u2191' : '\u2193';
      const cls = index >= 42 ? 'ticker-up' : '';

      ticker.innerHTML =
        'Networking Index: <span class="ticker-up">' +
        arrow + ' ' + index +
        '%</span> &nbsp;|&nbsp; Coffees Brewed: ' +
        coffees.toLocaleString() +
        ' &nbsp;|&nbsp; Connections Made: ' +
        connections.toLocaleString();
    }
  }
})();
