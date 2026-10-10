(function () {
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const setup = (canvas, height = 280) => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.max(320, canvas.clientWidth || 620);
    canvas.width = width * ratio; canvas.height = height * ratio;
    const ctx = canvas.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { ctx, width, height };
  };
  const axes = (ctx, width, height) => {
    ctx.strokeStyle = css('--line'); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(38, height - 34); ctx.lineTo(width - 18, height - 34); ctx.moveTo(38, 18); ctx.lineTo(38, height - 34); ctx.stroke();
  };

  function initPolynomial() {
    const lab = document.querySelector('#poly-lab'); if (!lab) return;
    const canvas = lab.querySelector('canvas'); const slider = lab.querySelector('input'); const out = lab.querySelector('.readout');
    const data = [[0, .14], [.12, .28], [.25, .44], [.38, .47], [.5, .61], [.64, .58], [.77, .77], [.9, .73], [1, .9]];
    const draw = () => {
      const degree = Number(slider.value); const { ctx, width, height } = setup(canvas); axes(ctx, width, height);
      const px = (x) => 38 + x * (width - 60), py = (y) => height - 34 - y * (height - 60);
      ctx.strokeStyle = css('--accent'); ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 0; i <= 160; i++) {
        const x = i / 160;
        const base = .14 + .76 * x;
        const wiggle = degree <= 2 ? 0 : (degree - 2) * .018 * Math.sin((degree + 1) * Math.PI * x) / (.08 + x * (1 - x));
        const y = Math.max(-.15, Math.min(1.15, base + wiggle));
        i ? ctx.lineTo(px(x), py(y)) : ctx.moveTo(px(x), py(y));
      }
      ctx.stroke(); ctx.fillStyle = css('--highlight');
      data.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(px(x), py(y), 4.5, 0, Math.PI * 2); ctx.fill(); });
      const gap = degree < 3 ? '欠拟合：训练和验证都不理想' : degree > 7 ? '过拟合：训练点贴得更紧，点外剧烈摆动' : '较合适：曲线能跟随趋势，也不过分追噪声';
      out.textContent = `多项式次数 M = ${degree}\n${gap}\n观察：复杂度不是越大越好。`;
    };
    slider.addEventListener('input', draw); addEventListener('resize', draw); draw();
  }

  function initProjection() {
    const lab = document.querySelector('#projection-lab'); if (!lab) return;
    const canvas = lab.querySelector('canvas'); const slider = lab.querySelector('input'); const out = lab.querySelector('.readout');
    const draw = () => {
      const t = Number(slider.value); const { ctx, width, height } = setup(canvas); const ox = width * .18, oy = height * .78;
      const bx = width * .63, by = -height * .42; const tx = width * (.34 + t * .18), ty = -height * (.23 + t * .35);
      const dot = (tx * bx + ty * by) / (bx * bx + by * by); const px = dot * bx, py = dot * by;
      ctx.strokeStyle = css('--dim'); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox - bx * .2, oy - by * .2); ctx.lineTo(ox + bx * 1.1, oy + by * 1.1); ctx.stroke();
      const arrow = (x, y, color) => { ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + x, oy + y); ctx.stroke(); };
      arrow(tx, ty, css('--highlight')); arrow(px, py, css('--accent'));
      ctx.setLineDash([6, 6]); ctx.strokeStyle = css('--bad'); ctx.beginPath(); ctx.moveTo(ox + px, oy + py); ctx.lineTo(ox + tx, oy + ty); ctx.stroke(); ctx.setLineDash([]);
      out.textContent = `目标向量 t = (${(tx / 100).toFixed(2)}, ${(-ty / 100).toFixed(2)})\n蓝色：Xw 能到达的最近点\n红色残差与模型空间垂直：Xᵀr = 0`;
    };
    slider.addEventListener('input', draw); addEventListener('resize', draw); draw();
  }

  function initLikelihood() {
    const lab = document.querySelector('#likelihood-lab'); if (!lab) return;
    const canvas = lab.querySelector('canvas'); const slider = lab.querySelector('input'); const out = lab.querySelector('.readout');
    const points = [[.12, .22], [.28, .33], [.45, .55], [.65, .62], [.84, .86]];
    const draw = () => {
      const slope = Number(slider.value); const { ctx, width, height } = setup(canvas); axes(ctx, width, height);
      const px = (x) => 38 + x * (width - 60), py = (y) => height - 34 - y * (height - 60);
      ctx.strokeStyle = css('--accent'); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px(0), py(.08)); ctx.lineTo(px(1), py(.08 + slope)); ctx.stroke();
      let sse = 0; ctx.strokeStyle = css('--bad'); ctx.fillStyle = css('--highlight');
      points.forEach(([x, y]) => { const pred = .08 + slope * x; const r = y - pred; sse += r * r; ctx.beginPath(); ctx.moveTo(px(x), py(y)); ctx.lineTo(px(x), py(pred)); ctx.stroke(); ctx.beginPath(); ctx.arc(px(x), py(y), 4.5, 0, Math.PI * 2); ctx.fill(); });
      const nllCore = sse / 2;
      out.textContent = `斜率 w = ${slope.toFixed(2)}\n误差平方和 SSE = ${sse.toFixed(4)}\n高斯负对数似然（去掉常数，σ=1）= ${nllCore.toFixed(4)}\n两者同步达到最小：只是同一目标的两种语言。`;
    };
    slider.addEventListener('input', draw); addEventListener('resize', draw); draw();
  }

  function initBayes() {
    const lab = document.querySelector('#bayes-lab'); if (!lab) return;
    const prior = lab.querySelector('[data-prior]'); const sensitivity = lab.querySelector('[data-sensitivity]'); const fp = lab.querySelector('[data-fp]'); const out = lab.querySelector('.readout'); const bars = lab.querySelectorAll('[data-bar]');
    const draw = () => {
      const p0 = Number(prior.value), s = Number(sensitivity.value), f = Number(fp.value); const post = MLMath.bayesUpdate(p0, s, f);
      bars[0].style.width = `${p0 * 100}%`; bars[1].style.width = `${post * 100}%`;
      out.textContent = `先验 P(H) = ${p0.toFixed(2)}\n证据更像 H：P(E|H) = ${s.toFixed(2)}，P(E|非H) = ${f.toFixed(2)}\n后验 P(H|E) = ${post.toFixed(3)}\n后验 = 先验 × 证据支持度，再归一化。`;
    };
    [prior, sensitivity, fp].forEach((x) => x.addEventListener('input', draw)); draw();
  }

  window.addEventListener('DOMContentLoaded', () => { initPolynomial(); initProjection(); initLikelihood(); initBayes(); });
}());
