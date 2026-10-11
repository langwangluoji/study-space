"""Check the newly displayed component expansions against matrix operations."""
import json
from pathlib import Path
import numpy as np

rng = np.random.default_rng(20261011)
checks = []
def check(name, expanded, compact):
    a, b = np.asarray(expanded), np.asarray(compact)
    assert a.shape == b.shape, name
    error = float(np.max(np.abs(a-b)))
    assert np.allclose(a, b, atol=1e-12, rtol=1e-12), name
    checks.append({"name": name, "passed": True, "max_abs_error": error})

x, t = rng.normal(size=7), rng.normal(size=7)
X = np.column_stack([np.ones(len(x)), x])
w = rng.normal(size=2)
r = X @ w - t
check("prediction_rows", [w[0]+xx*w[1] for xx in x], X @ w)
check("transpose_residual", [sum(r), sum(x*r)], X.T @ r)
gram = np.array([[len(x), sum(x)], [sum(x), sum(x*x)]])
check("normal_equation_gram", gram, X.T @ X)
check("normal_equation_rhs", [sum(t), sum(x*t)], X.T @ t)
D = len(x)*sum(x*x)-sum(x)**2
assert D > 0
slope = (len(x)*sum(x*t)-sum(x)*sum(t))/D
intercept = np.mean(t)-slope*np.mean(x)
check("scalar_parameter_solution", [intercept, slope], np.linalg.lstsq(X,t,rcond=None)[0])

V, g, local = rng.normal(size=(2,2)), rng.normal(size=2), rng.normal(size=2)
s = np.array([V[0,0]*g[0]+V[1,0]*g[1], V[0,1]*g[0]+V[1,1]*g[1]])
check("successor_sum", s, V.T @ g)
check("activation_component_product", [local[0]*s[0],local[1]*s[1]], local*(V.T@g))
delta, z = rng.normal(size=2), rng.normal(size=3)
check("connection_outer_product", [[delta[j]*z[i] for i in range(3)] for j in range(2)], np.outer(delta,z))

B = 5
Delta, Z = rng.normal(size=(B,2)), rng.normal(size=(B,2))
expanded = np.array([[sum(Delta[n,j]*Z[n,i] for n in range(B))/B for i in range(2)] for j in range(2)])
check("batch_connection_average", expanded, Delta.T @ Z / B)
check("batch_bias_average", [sum(Delta[n,j] for n in range(B))/B for j in range(2)], Delta.T @ np.ones(B)/B)
report = {"passed": True, "count":len(checks), "checks":checks,
          "scope":"Numerical component checks supplement the index derivations; they are not general proofs."}
Path("reports/matrix-expansion-verification.json").write_text(json.dumps(report,indent=2),encoding="utf8")
print(json.dumps({"passed":True,"count":len(checks),"max_abs_error":max(c["max_abs_error"] for c in checks)}))
