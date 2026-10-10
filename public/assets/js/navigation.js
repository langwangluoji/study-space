(function () {
  window.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('script[data-frontend-enhancements]')) {
      const enhancements = document.createElement('script');
      enhancements.src = 'assets/js/frontend-enhancements.js';
      enhancements.dataset.frontendEnhancements = 'true';
      document.body.appendChild(enhancements);
    }
    if (document.body?.dataset.page === 'index' && !document.querySelector('.source-index')) {
      const map = document.querySelector('#map');
      if (map) {
        map.insertAdjacentHTML('beforebegin', '<section class="concept source-index" id="sources"><p class="kicker">课件索引</p><h2>按教师课件查阅前三章</h2><p class="muted">章节页保留课件顺序，并在每个知识点标出对应页码。网页参考教材补足推导、解释与成立条件，作业要求仍以原课件为准。</p><div class="table-wrap"><table><thead><tr><th>讲次</th><th>教师课件</th><th>页数</th><th>网页主线</th><th>入口</th></tr></thead><tbody><tr><th>第 1 讲</th><td>线性回归与最小二乘</td><td>63</td><td>拟合 → 几何 → 高斯似然 → 优化 → 泛化与正则化</td><td><a href="lecture-1.html">在线阅读</a></td></tr><tr><th>第 2 讲</th><td>线性分类与感知机</td><td>58</td><td>判别函数 → LS/LDA → 感知机 → Logistic/Softmax</td><td><a href="lecture-2.html">在线阅读</a></td></tr><tr><th>第 3 讲</th><td>非线性回归与多层感知机</td><td>49</td><td>自适应基函数 → 激活 → 训练 → 反向传播</td><td><a href="lecture-3.html">在线阅读</a></td></tr></tbody></table></div></section>');
      }
    }

    const sourceMeta = {
      'lecture-1': '教师课件：1-线性回归与最小二乘 · 63 页',
      'lecture-2': '教师课件：2-线性分类与感知机 · 58 页',
      'lecture-3': '教师课件：3-非线性回归与多层感知机 · 49 页'
    };
    const currentSource = sourceMeta[document.body?.dataset.page];
    const hero = document.querySelector('.hero');
    if (currentSource && hero && !hero.querySelector('.source-note')) {
      hero.insertAdjacentHTML('beforeend', '<p class="source-note"><span>内容基线</span>' + currentSource + ' · <a href="ppt-source-outline.md">查看前三章整理</a></p>');
    }

    const progress = document.querySelector('#reading-progress');
    const links = [...document.querySelectorAll('.toc a[href^="#"]')];
    const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
    const update = () => {
      const height = document.documentElement.scrollHeight - innerHeight;
      if (progress) progress.style.width = (height > 0 ? Math.min(100, scrollY / height * 100) : 0) + '%';
      let active = 0;
      sections.forEach((section, index) => { if (section && section.offsetTop - 130 <= scrollY) active = index; });
      links.forEach((link, index) => link.classList.toggle('active', index === active));
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update, { passive: true });
    update();

    document.querySelectorAll('[data-recall]').forEach((button) => {
      button.addEventListener('click', () => {
        const card = button.closest('.recall');
        const open = card.classList.toggle('open');
        button.textContent = open ? '收起答案' : '查看答案';
        button.setAttribute('aria-expanded', String(open));
      });
    });
  });
}());
