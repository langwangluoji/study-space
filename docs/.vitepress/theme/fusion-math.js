// Scalar, independent linear-Gaussian Bayesian update; variances are positive.
export function scalarFusion(priorMean, priorSigma, measurement, sensorSigma) {
  if (![priorMean, priorSigma, measurement, sensorSigma].every(Number.isFinite) || priorSigma <= 0 || sensorSigma <= 0) throw new RangeError('Means must be finite and standard deviations positive.')
  const priorVariance = priorSigma ** 2
  const sensorVariance = sensorSigma ** 2
  const variance = 1 / (1 / priorVariance + 1 / sensorVariance)
  const gain = priorVariance / (priorVariance + sensorVariance)
  const mean = variance * (priorMean / priorVariance + measurement / sensorVariance)
  return { mean, variance, sigma: Math.sqrt(variance), gain, priorWeight: 1 - gain, sensorWeight: gain, innovation: measurement - priorMean }
}
export function fusionCosts(x, priorMean, priorSigma, measurement, sensorSigma) {
  const prior = 0.5 * ((x - priorMean) / priorSigma) ** 2
  const sensor = 0.5 * ((measurement - x) / sensorSigma) ** 2
  return { prior, sensor, total: prior + sensor }
}
