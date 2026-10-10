(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('[data-page-search]');
    if (!input) return;
    const blocks = [...document.querySelectorAll('.concept, .knowledge-point, .practice-step')];
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      blocks.forEach((block) => { block.hidden = query && !block.textContent.toLowerCase().includes(query); });
    });
  });
}());
