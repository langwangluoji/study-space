(function () {
  const css = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  function initBce() {
    const lab = document.querySelector('#bce-lab'); if (!lab) return;
    const slider = lab.querySelector('input'); const out = lab.querySelector('.readout'); const canvas = lab.querySelector('canvas');
    const draw = () => {
      const p = Number(slider.value); const ratio = Math.min(devicePixelRatio || 1, 2); const width = Math.max(320, canvas.clientWidth || 620), height = 280;
      canvas.width = width * ratio; canvas.height = height * ratio; const ctx = canvas.getContext('2d'); ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const left = 42, bottom = height - 35, top = 20, right = width - 20;
      ctx.strokeStyle = css('--line'); ctx.beginPath(); ctx.moveTo(left, top); ctx.lineTo(left, bottom); ctx.lineTo(right, bottom); ctx.stroke();
      ctx.strokeStyle = css('--accent'); ctx.lineWidth = 3; ctx.beginPath();
      for (let i = 1; i < 100; i++) { const x = i / 100, loss = -Math.log(x); const px = left + x * (right - left), py = bottom - Math.min(loss, 5) / 5 * (bottom - top); i === 1 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); } ctx.stroke();
      const loss = MLMath.binaryCrossEntropy(1, p); const px = left + p * (right - left), py = bottom - Math.min(loss, 5) / 5 * (bottom - top);
      ctx.fillStyle = css('--highlight'); ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
      out.textContent = `真实标签 t = 1\n模型给真实类别的概率 p = ${p.toFixed(2)}\n损失 −log p = ${loss.toFixed(3)}\n越不相信已经发生的事实，惩罚越大。`;
    };
    slider.addEventListener('input', draw); addEventListener('resize', draw); draw();
  }
  function initSoftmax() {
    const lab = document.querySelector('#softmax-lab'); if (!lab) return;
    const slider = lab.querySelector('input'); const out = lab.querySelector('.readout'); const bars = [...lab.querySelectorAll('[data-class-bar]')];
    const draw = () => {
      const temperature = Number(slider.value); const logits = [2.1, 1.2, -.4].map((x) => x / temperature); const p = MLMath.softmax(logits);
      bars.forEach((bar, i) => { bar.style.width = `${p[i] * 100}%`; bar.parentElement.nextElementSibling.textContent = p[i].toFixed(3); });
      out.textContent = `logits/T = [${logits.map((x) => x.toFixed(2)).join(', ')}]\n概率和 = ${p.reduce((a, b) => a + b, 0).toFixed(3)}\n温度越低，最大分数越占优势；类别顺序不变。`;
    };
    slider.addEventListener('input', draw); draw();
  }
  addEventListener('DOMContentLoaded', () => { initBce(); initSoftmax(); });
}());
