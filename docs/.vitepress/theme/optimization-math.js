// Pure functions shared by the offline experiments. No browser dependencies.
export function convexSample(a, b, theta) {
  const z = (1 - theta) * a + theta * b
  const chord = (1 - theta) * a * a + theta * b * b
  return { z, chord, value: z * z, gap: theta * (1 - theta) * (a - b) ** 2 }
}
export function ridgeSample(lambda) {
  const x = 4 / (2 + lambda)
  const residual = 0.5 * ((x - 1) ** 2 + (x - 3) ** 2)
  const penalty = 0.5 * lambda * x * x
  return { x, residual, penalty, total: residual + penalty }
}
export function kktSample(c, x = Math.min(2, c), multiplier = Math.max(0, 2 - c)) {
  const p = 0.5 * (x - 2) ** 2
  const g = x - c
  return { x, multiplier, p, g, feasibility: Math.max(0, g), dualFeasibility: Math.max(0, -multiplier), stationarity: Math.abs(x - 2 + multiplier), complementarity: Math.abs(multiplier * g) }
}
export function barrierSample(c, mu) {
  const root = Math.sqrt((c - 2) ** 2 + 4 * mu)
  const slack = c < 2 ? 2 * mu / (root + 2 - c) : (c - 2 + root) / 2
  const x = c - slack
  const multiplier=mu/slack, p=0.5*(x-2)**2, dual=(2-c)*multiplier-0.5*multiplier**2, stationarity=x-2+multiplier
  return { x, slack, multiplier, p, dual, gap:p-dual, stationarity, complementarity: mu, barrier: p - mu * Math.log(slack) }
}
export function gradientRun(kappa, initialStep, method, limit = 60) {
  let x = 3, y = 2
  const f = (a, b) => 0.5 * (a * a + kappa * b * b)
  const rows = [{ iteration: 0, x, y, f: f(x, y), norm: Math.hypot(x, kappa * y), step: null, backtracks: 0 }]
  let status = 'limit'
  for (let i = 1; i <= limit; i++) {
    const gx = x, gy = kappa * y
    if (Math.hypot(gx, gy) < 1e-6) { status = 'converged'; break }
    let step = method === 'newton' ? 1 : initialStep
    const dx = -gx, dy = method === 'newton' ? -y : -gy
    const slope = gx * dx + gy * dy
    let backtracks = 0
    if (method === 'armijo') {
      while (f(x + step * dx, y + step * dy) > f(x, y) + 0.25 * step * slope && backtracks < 50) {
        step *= 0.5; backtracks++
      }
    }
    x += step * dx; y += step * dy
    const row = { iteration: i, x, y, f: f(x, y), norm: Math.hypot(x, kappa * y), step, backtracks }
    rows.push(row)
    if (!Number.isFinite(row.f) || row.f > 1e12 || Math.abs(x) > 1e6 || Math.abs(y) > 1e6) { status = 'diverged'; break }
    if (row.norm < 1e-6) { status = 'converged'; break }
  }
  return { rows, status }
}
