(function () {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('pre').forEach((pre) => {
      const wrap = pre.parentElement;
      if (!wrap || !wrap.classList.contains('code-wrap')) return;
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.type = 'button';
      button.textContent = '复制';
      button.setAttribute('aria-label', '复制代码');
      const status = document.createElement('span');
      status.className = 'sr-only';
      status.setAttribute('aria-live', 'polite');
      wrap.appendChild(status);
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          button.textContent = '已复制';
          status.textContent = '代码已复制到剪贴板';
          setTimeout(() => { button.textContent = '复制'; }, 1200);
        } catch (_) { button.textContent = '请手动复制'; status.textContent = '自动复制失败，请手动选择代码'; }
      });
      wrap.appendChild(button);
    });
  });
}());
