(function () {
  const pageName = () => document.body?.dataset.page || 'page';

  function improveSearch() {
    const input = document.querySelector('[data-page-search]');
    if (!input || input.dataset.enhanced) return;
    input.type = 'search';
    input.setAttribute('aria-controls', 'page-search-results');
    input.dataset.enhanced = 'true';
    const status = document.createElement('p');
    status.className = 'search-status';
    status.id = 'page-search-results';
    status.setAttribute('aria-live', 'polite');
    input.insertAdjacentElement('afterend', status);
    const blocks = [...document.querySelectorAll('.knowledge-point, .practice-step, .concept')];
    const links = [...document.querySelectorAll('.toc a[href^="#"]')];
    const update = () => {
      const query = input.value.trim().toLowerCase();
      let visible = 0;
      blocks.forEach((block) => {
        const match = !query || block.textContent.toLowerCase().includes(query);
        block.hidden = !match;
        if (match) visible += 1;
      });
      links.forEach((link) => {
        const target = document.querySelector(link.getAttribute('href'));
        link.hidden = Boolean(query && (!target || target.hidden));
      });
      status.textContent = query ? `${visible} / ${blocks.length} 个区块匹配“${input.value}”` : `共 ${blocks.length} 个区块，可按 Ctrl+K 聚焦搜索`;
      status.classList.toggle('empty', Boolean(query && visible === 0));
    };
    input.addEventListener('input', update);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') { input.value = ''; update(); input.focus(); }
    });
    document.addEventListener('keydown', (event) => {
      const tag = document.activeElement?.tagName;
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); input.focus(); input.select(); }
      if (event.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') { event.preventDefault(); input.focus(); }
    });
    update();
  }

  function improveMobileNavigation() {
    const button = document.querySelector('[data-toc-toggle]');
    const aside = document.querySelector('.side-nav');
    if (!button || !aside || button.dataset.enhanced) { if (button && !aside) button.hidden = true; return; }
    aside.id = aside.id || 'course-toc';
    aside.setAttribute('aria-label', aside.getAttribute('aria-label') || '本页目录');
    button.setAttribute('aria-controls', aside.id);
    const outline = document.querySelector('.chapter-outline');
    if (outline) { outline.id = 'chapter-outline'; button.setAttribute('aria-controls', aside.id + ' ' + outline.id); }
    button.setAttribute('aria-expanded', 'false');
    button.dataset.enhanced = 'true';
    const close = () => {
      document.body.classList.remove('toc-open');
      button.setAttribute('aria-expanded', 'false');
    };
    button.addEventListener('click', () => {
      const open = document.body.classList.toggle('toc-open');
      button.setAttribute('aria-expanded', String(open));
      if (open) aside.querySelector('input, a')?.focus();
      else button.focus();
    });
    aside.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    outline?.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && document.body.classList.contains('toc-open')) { close(); button.focus(); } });
  }

  function improveTablesAndRecall() {
    document.querySelectorAll('.knowledge-point .derivation table, .source-index table').forEach((table) => {
      if (!table.parentElement.classList.contains('table-wrap')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrap';
        table.parentElement.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
      table.querySelectorAll('tr').forEach((row, rowIndex) => row.querySelectorAll('th').forEach((cell) => {
        if (cell.hasAttribute('scope')) return;
        cell.setAttribute('scope', rowIndex === 0 ? 'col' : 'row');
      }));
    });
    document.querySelectorAll('[data-recall]').forEach((button, index) => {
      const answer = button.closest('.recall')?.querySelector('.answer');
      if (!answer) return;
      answer.id = answer.id || `recall-answer-${index + 1}`;
      button.setAttribute('aria-controls', answer.id);
    });
  }

  function addMastery() {
    const key = 'ml-course-mastery-v1';
    let state = {};
    try { state = JSON.parse(localStorage.getItem(key) || '{}'); } catch (_) {}
    const items = pageName() === 'index' ? [] : [...document.querySelectorAll('.knowledge-point, .practice-step')];
    if (!items.length) return;
    items.forEach((item) => {
      if (!item.id || item.querySelector('[data-section-complete]')) return;
      const id = `${pageName()}:${item.id}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'btn section-complete';
      button.dataset.sectionComplete = id;
      const sync = () => { const done = Boolean(state[id]); button.textContent = done ? '✓ 本节已掌握' : '标记本节掌握'; button.classList.toggle('primary', done); button.setAttribute('aria-pressed', String(done)); };
      button.addEventListener('click', () => { state[id] = !state[id]; try { localStorage.setItem(key, JSON.stringify(state)); } catch (_) {} sync(); updateSummary(); });
      item.querySelector('.kicker')?.insertAdjacentElement('afterend', button);
      sync();
    });
    const summary = document.createElement('p');
    summary.className = 'mastery-summary';
    summary.setAttribute('aria-live', 'polite');
    document.querySelector('.hero')?.append(summary);
    function updateSummary() {
      const buttons = [...document.querySelectorAll('[data-section-complete]')];
      const done = buttons.filter((button) => button.getAttribute('aria-pressed') === 'true').length;
      summary.textContent = `本页掌握进度：${done} / ${buttons.length}`;
    }
    updateSummary();
  }

  function addEnvironmentPanel() {
    if (pageName() !== 'cifar10-practice' || document.querySelector('.environment-panel')) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const panel = document.createElement('section');
    panel.className = 'environment-panel';
    panel.setAttribute('aria-labelledby', 'environment-title');
    panel.innerHTML = '<h2 id="environment-title">运行环境：Anaconda · pytorch</h2>' +
      '<p>浏览器负责阅读、公式与关键图示；真实 CIFAR-10 训练在本机 Anaconda 环境中运行。当前交付包已用 `pytorch` 环境完成 smoke test，<a href="verified-results/pytorch-environment.json">环境快照</a>可查。</p>' +
      '<div class="environment-grid"><div><b>版本检查</b><pre><code>conda run -n pytorch python -c "import sys,torch,torchvision; print(sys.executable); print(torch.__version__, torchvision.__version__); print(torch.cuda.is_available())"</code></pre></div><div><b>最小运行</b><pre><code>conda run -n pytorch python downloads/cifar10_mlp_tutorial.py --smoke</code></pre></div></div>' +
      '<p class="muted">需要 Notebook 时，先执行 <code>python -m ipykernel install --user --name pytorch --display-name "Python (pytorch)"</code>，再从本页下载的 Notebook 中选择该内核。完整命令见 <a href="pytorch-environment.md">PyTorch 环境说明</a>。</p>';
    hero.append(panel);
  }

  function addFooter() {
    if (document.querySelector('.site-footer')) return;
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = '<span>课程知识库</span><span>教材推导 · 本地 MathJax · Anaconda PyTorch</span><a href="resources.html">资料中心</a><a href="read-README.html">运行说明</a>';
    document.body.append(footer);
  }

  function init() {
    improveSearch();
    improveMobileNavigation();
    improveTablesAndRecall();
    addMastery();
    addEnvironmentPanel();
    addFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
}());
