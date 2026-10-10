(function () {
  const key = 'ml-course-progress-v1';
  const read = () => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) { return {}; } };
  const write = (state) => { try { localStorage.setItem(key, JSON.stringify(state)); } catch (_) {} };
  window.addEventListener('DOMContentLoaded', () => {
    const state = read();
    document.querySelectorAll('[data-complete]').forEach((button) => {
      const id = button.dataset.complete;
      const sync = () => {
        const done = Boolean(state[id]);
        button.textContent = done ? '✓ 已完成' : '标记完成';
        button.classList.toggle('primary', done);
        button.setAttribute('aria-pressed', String(done));
      };
      button.addEventListener('click', () => { state[id] = !state[id]; write(state); sync(); });
      sync();
    });
  });
}());
