(function () {
  const key = 'ml-course-theme';
  const root = document.documentElement;
  try {
    const stored = localStorage.getItem(key);
    if (stored) root.dataset.theme = stored;
  } catch (_) {}

  window.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    const sync = () => {
      const light = root.dataset.theme === 'light';
      button.textContent = light ? '☾' : '☀';
      button.setAttribute('aria-label', light ? '切换到深色主题' : '切换到浅色主题');
    };
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem(key, root.dataset.theme); } catch (_) {}
      sync();
      window.dispatchEvent(new Event('resize'));
    });
    sync();
  });
}());
