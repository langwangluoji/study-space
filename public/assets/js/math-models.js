(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MLMath = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const clampProbability = (p) => Math.min(1 - 1e-12, Math.max(1e-12, p));
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  return {
    clampProbability,
    sigmoid,
    gaussianNllCore(residual, sigma) {
      if (!(sigma > 0)) throw new RangeError('sigma must be positive');
      return (residual * residual) / (2 * sigma * sigma);
    },
    binaryCrossEntropy(target, probability) {
      const p = clampProbability(probability);
      return -(target * Math.log(p) + (1 - target) * Math.log(1 - p));
    },
    softmax(logits) {
      if (!Array.isArray(logits) || logits.length === 0) return [];
      const max = Math.max(...logits);
      const exps = logits.map((x) => Math.exp(x - max));
      const total = exps.reduce((a, b) => a + b, 0);
      return exps.map((x) => x / total);
    },
    bayesUpdate(prior, sensitivity, falsePositiveRate) {
      const numerator = prior * sensitivity;
      const evidence = numerator + (1 - prior) * falsePositiveRate;
      return evidence === 0 ? 0 : numerator / evidence;
    },
    gradientStep(parameter, gradient, learningRate) {
      return parameter - learningRate * gradient;
    },
    mlpForward(input, hiddenWeights, hiddenBias, outputWeight, outputBias) {
      const hiddenPre = input.reduce((sum, x, i) => sum + x * hiddenWeights[i], hiddenBias);
      const hidden = sigmoid(hiddenPre);
      return { hiddenPre, hidden, output: outputWeight * hidden + outputBias };
    }
  };
}));
