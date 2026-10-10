(function () {
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  function initGd() {
    const lab = document.querySelector('#gd-lab'); if (!lab) return;
    const rate = lab.querySelector('input'); const step = lab.querySelector('[data-step]'); const reset = lab.querySelector('[data-reset]'); const canvas = lab.querySelector('canvas'); const out = lab.querySelector('.readout'); let x = 3.4; let path = [x];
    const draw = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2); const width = Math.max(320, canvas.clientWidth || 620), height = 280; canvas.width = width * ratio; canvas.height = height * ratio; const ctx = canvas.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const px = (v) => 35 + (v + 4) / 8 * (width - 55), py = (v) => height - 28 - v / 18 * (height - 48);
      ctx.strokeStyle = css('--accent'); ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i <= 160; i++) { const v = -4 + i / 20; const loss = (v - .6) ** 2; i ? ctx.lineTo(px(v), py(loss)) : ctx.moveTo(px(v), py(loss)); } ctx.stroke();
      ctx.strokeStyle = css('--highlight'); ctx.lineWidth = 2; ctx.beginPath(); path.forEach((v, i) => { const xx = px(v), yy = py((v - .6) ** 2); i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); }); ctx.stroke(); ctx.fillStyle = css('--highlight'); ctx.beginPath(); ctx.arc(px(x), py((x - .6) ** 2), 6, 0, Math.PI * 2); ctx.fill();
      const grad = 2 * (x - .6); out.textContent = `当前位置 θ = ${x.toFixed(4)}\n梯度 dL/dθ = ${grad.toFixed(4)}\n下一步：θ ← θ − ${Number(rate.value).toFixed(2)} × 梯度`;
    };
    step.addEventListener('click', () => { x = MLMath.gradientStep(x, 2 * (x - .6), Number(rate.value)); path.push(x); draw(); }); reset.addEventListener('click', () => { x = 3.4; path = [x]; draw(); }); rate.addEventListener('input', draw); addEventListener('resize', draw); draw();
  }
  function initMlp() {
    const lab = document.querySelector('#mlp-lab'); if (!lab) return;
    const inputs = [...lab.querySelectorAll('input')]; const out = lab.querySelector('.readout'); const nodes = [...lab.querySelectorAll('[data-node]')];
    const draw = () => {
      const [x1, x2, w1, w2, b, v, c] = inputs.map((el) => Number(el.value)); const r = MLMath.mlpForward([x1, x2], [w1, w2], b, v, c);
      const values = [x1, x2, r.hiddenPre, r.hidden, r.output]; nodes.forEach((node, i) => { node.textContent = values[i].toFixed(3); });
      out.textContent = `a = ${w1.toFixed(2)}×${x1.toFixed(2)} + ${w2.toFixed(2)}×${x2.toFixed(2)} + ${b.toFixed(2)} = ${r.hiddenPre.toFixed(3)}\nz = sigmoid(a) = ${r.hidden.toFixed(3)}\ny = ${v.toFixed(2)}×z + ${c.toFixed(2)} = ${r.output.toFixed(3)}\n前向传播就是按箭头顺序保存中间量。`;
    };
    inputs.forEach((el) => el.addEventListener('input', draw)); draw();
  }
  addEventListener('DOMContentLoaded', () => { initGd(); initMlp(); });
}());
