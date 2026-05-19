(function () {
  const input = document.querySelector('[data-filter-input]');
  const cards = Array.from(document.querySelectorAll('[data-filter-card]'));
  const buttons = Array.from(document.querySelectorAll('[data-filter-value]'));
  let mode = 'all';
  function apply() {
    const q = (input?.value || '').trim().toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const modeOk = mode === 'all' || tags.includes(mode);
      const searchOk = !q || text.includes(q) || tags.includes(q);
      card.style.display = modeOk && searchOk ? '' : 'none';
    });
  }
  input?.addEventListener('input', apply);
  buttons.forEach(button => button.addEventListener('click', () => {
    mode = button.getAttribute('data-filter-value') || 'all';
    buttons.forEach(b => b.classList.toggle('primary', b === button));
    apply();
  }));
})();
