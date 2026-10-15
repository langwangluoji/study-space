"""Reproduce symbolic and finite-difference checks for the Chapter 5 supplement.

Run with the local environment containing SymPy and NumPy:
  D:/anaconda3-2025.12-2/python.exe scripts/verify-photo-adjustment-derivations.py

No lecture content is modified. The JSON report records exact identities, nonzero
orientation finite differences, source hashes, and SVG/section structure checks.
"""
from pathlib import Path
import hashlib
import json
import re
import xml.etree.ElementTree as ET
import numpy as np
import sympy as sp

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/_fragments/photogrammetry-derivations-5.md"
REPORT = ROOT / "reports/photogrammetry-adjustment-derivations-math.json"
checks = []


def check(name, passed, **evidence):
    checks.append({"name": name, "passed": bool(passed), **evidence})
    if not passed:
        raise AssertionError(name)


def skew(v):
    x, y, z = v
    return np.array([[0, -z, y], [z, 0, -x], [-y, x, 0.]])


def expso(w):
    angle = np.linalg.norm(w)
    k = skew(w)
    aa = np.sin(angle) / angle if angle else 1.
    bb = (1 - np.cos(angle)) / angle**2 if angle else .5
    return np.eye(3) + aa * k + bb * (k @ k)


def difference(fun, n, step=1e-6):
    basis = np.eye(n)
    return np.column_stack([
        (fun(basis[j] * step) - fun(-basis[j] * step)) / (2 * step)
        for j in range(n)
    ])


def numerical_check(name, analytical, numerical, tolerance=1e-6, **evidence):
    error = float(np.max(np.abs(analytical - numerical)))
    check(name, error < tolerance, maxAbsoluteError=error,
          tolerance=tolerance, **evidence)


def run_checks():
    # Exact symbolic algebra, not comparison with hand-rounded decimal outputs.
    c, d, e = sp.symbols("c d e", real=True)
    solution = sp.Matrix([[1, -c], [-c, 1]]).inv() * sp.Matrix([d, -e])
    check("closest-ray two-parameter solution",
          sp.simplify(solution[0] - (d-c*e)/(1-c*c)) == 0 and
          sp.simplify(solution[1] - (c*d-e)/(1-c*c)) == 0,
          assumptions="unit ray directions; c^2 != 1")

    baseline = sp.Matrix(sp.symbols("b0:3"))
    u = sp.Matrix(sp.symbols("u0:3"))
    v = sp.Matrix(sp.symbols("v0:3"))
    eta = sp.Matrix(sp.symbols("e0:3"))
    derivative = baseline.dot(u.cross(eta.cross(v)))
    expected = ((u.dot(v))*baseline-(baseline.dot(v))*u).dot(eta)
    check("relative-orientation scalar triple-product differential",
          sp.expand(derivative-expected) == 0,
          rotation="left increment in the common auxiliary/object axes")

    focal, ground_x, height = sp.symbols("f X H", nonzero=True, real=True)
    image_x = focal*ground_x/height
    check("focal-length and height exact degeneracy",
          sp.simplify(sp.diff(image_x, height) +
                      (focal/height)*sp.diff(image_x, focal)) == 0,
          assumptions="vertical camera; all controls on one horizontal plane")

    aa, bb, cc = sp.symbols("A B C", nonzero=True, real=True)
    normal = sp.Matrix([[aa, bb], [bb, cc]])
    schur = aa-bb**2/cc
    marginal = 1/cc+(1/cc)*bb*(1/schur)*bb*(1/cc)
    check("marginal point cofactor block inverse",
          sp.simplify(normal.inv()[1, 1]-marginal) == 0,
          assumptions="required blocks invertible and datum handled")

    radius, distance = sp.symbols("R D", positive=True, real=True)
    sag = radius-sp.sqrt(radius**2-distance**2)
    check("sphere sag second-order limit",
          sp.simplify(sp.limit(sag/distance**2, distance, 0)
                      -1/(2*radius)) == 0,
          assumptions="D/R tends to zero")

    # All geometric finite differences below use a nonzero base orientation.
    rotation = expso(np.array([.08, -.04, .12]))
    centre = np.array([5., -3., 1000.])
    point = np.array([100., 50., 70.])
    focal_mm = 150.

    def project(rot, ctr, pnt):
        qq = rot.T @ (pnt-ctr)
        return -focal_mm*qq[:2]/qq[2]

    delta = point-centre
    qq = rotation.T @ delta
    dpi = np.array([
        [-focal_mm/qq[2], 0, focal_mm*qq[0]/qq[2]**2],
        [0, -focal_mm/qq[2], focal_mm*qq[1]/qq[2]**2]
    ])
    analytic = np.column_stack([
        -dpi @ rotation.T,
        dpi @ rotation.T @ skew(delta),
        dpi @ rotation.T
    ])
    numeric = difference(
        lambda h: project(expso(h[3:6]) @ rotation,
                          centre+h[:3], point+h[6:]), 9
    )
    numerical_check("bundle single-observation 2x9 Jacobian",
                    analytic, numeric,
                    units="image mm; world m; rotation rad")

    left = np.array([.03, .07, -1.])
    left /= np.linalg.norm(left)
    right = rotation @ np.array([-.05, .04, -1.])
    right /= np.linalg.norm(right)
    base = np.array([100., 2., -1.])
    jac = np.r_[
        np.cross(left, right)[1:3],
        np.dot(left, right)*base-np.dot(base, right)*left
    ]

    def coplanarity(h):
        base_new = base+np.array([0., h[0], h[1]])
        right_new = expso(h[2:5]) @ right
        return np.array([np.dot(base_new, np.cross(left, right_new))])

    numerical_check("relative-orientation five-parameter Jacobian",
                    jac, difference(coplanarity, 5).ravel(),
                    units="baseline m; unit rays; rotation rad")

    model = np.array([3., -4., 8.])
    scale = 2.3
    shift = np.array([10., 20., 30.])
    rotated_model = rotation @ model
    jac7 = np.column_stack([
        np.eye(3), scale*rotated_model, -scale*skew(rotated_model)
    ])
    num7 = difference(
        lambda h: shift+h[:3]+scale*np.exp(h[3]) *
        (expso(h[4:7]) @ rotation @ model), 7
    )
    numerical_check("seven-parameter similarity local Jacobian",
                    jac7, num7,
                    scaleUpdate="multiplicative exp(log-scale increment)")

    lever = np.array([.3, -.5, .8])
    nav_jac = np.column_stack([
        np.eye(3), -skew(rotation @ lever), rotation
    ])
    nav_num = difference(
        lambda h: centre+h[:3]+expso(h[3:6]) @ rotation @ (lever+h[6:]),
        9
    )
    numerical_check("navigation lever-arm Jacobian", nav_jac, nav_num,
                    leverFrame="camera; R camera to parallel object axes")

    velocity = np.array([50., 3., -1.])
    angular_rate = np.array([.02, -.01, .03])
    timing = velocity+np.cross(angular_rate, rotation @ lever)
    h = 1e-5
    timing_num = (
        centre+velocity*h+expso(angular_rate*h) @ rotation @ lever
        -(centre-velocity*h+expso(-angular_rate*h) @ rotation @ lever)
    )/(2*h)
    numerical_check("navigation model-time derivative", timing, timing_num,
                    parameterDefinition="evaluate prediction at t+tau")

    rng = np.random.default_rng(20261015)
    design = rng.normal(size=(8, 4))
    weight = np.diag(np.arange(1., 9.))
    weight_inv = np.linalg.inv(weight)
    normal_inv = np.linalg.inv(design.T @ weight @ design)
    hat = design @ normal_inv @ design.T @ weight
    computed = (hat-np.eye(8)) @ weight_inv @ (hat-np.eye(8)).T
    expected_cov = weight_inv-design @ normal_inv @ design.T
    numerical_check("weighted residual covariance identity",
                    computed, expected_cov, tolerance=1e-12)
    check("residual redundancy trace",
          abs(np.trace(np.eye(8)-hat)-4) < 1e-12,
          observations=8, independentParameters=4)

    # Explicit hand-check examples quoted in the teaching supplement.
    root101 = np.sqrt(101.)
    ray1 = np.array([1., 0., -10.])/root101
    ray2 = np.array([-1., 0., -10.])/root101
    origin1 = np.array([0., 0., 10.])
    origin2 = np.array([2., 0., 10.])
    check("closest-ray example point",
          np.allclose(origin1+root101*ray1, [1, 0, 0]) and
          np.allclose(origin2+root101*ray2, [1, 0, 0]))
    check("conditional versus marginal scalar cofactor example",
          sp.Matrix([[2, 1], [1, 2]]).inv()[1, 1] == sp.Rational(2, 3) and
          sp.Rational(1, 2)+sp.Rational(1, 6) == sp.Rational(2, 3))
    check("RMS bias variance decomposition",
          abs(np.mean(np.array([1., 2., 3.])**2) -
              (2.**2+np.mean(np.array([-1., 0., 1.])**2))) < 1e-12)

    text = SOURCE.read_text(encoding="utf-8")
    expected_ids = [f"derive-5-{n}" for n in range(1, 13)]
    ids = re.findall(r"\{#(derive-5-\d+)\}", text)
    check("12 section anchors present once", ids == expected_ids)
    figure_tags = re.findall(r"<SourceFigure\b[^>]+/>", text)
    check("SourceFigure required page attributes",
          len(figure_tags) == 2 and
          all('page="第5讲推导"' in tag for tag in figure_tags))
    for name in ("derivation-5-rays.svg", "derivation-5-block.svg"):
        path = ROOT/"public/photogrammetry/figures"/name
        element = ET.parse(path).getroot()
        check(f"valid SVG: {name}",
              element.tag == "{http://www.w3.org/2000/svg}svg" and
              path.stat().st_size > 1000)

    return text


status = "passed"
failure = None
try:
    text = run_checks()
except Exception as exc:
    status = "failed"
    failure = f"{type(exc).__name__}: {exc}"
    text = SOURCE.read_text(encoding="utf-8") if SOURCE.exists() else ""

REPORT.parent.mkdir(parents=True, exist_ok=True)
report = {
    "status": status,
    "source": str(SOURCE.relative_to(ROOT)).replace("\\", "/"),
    "sourceSha256": hashlib.sha256(text.encode("utf-8")).hexdigest(),
    "script": "scripts/verify-photo-adjustment-derivations.py",
    "runtime": {"sympy": sp.__version__, "numpy": np.__version__},
    "convention": {
        "R": "camera -> auxiliary; auxiliary axes parallel to object axes",
        "imageRay": "(x,y,-f)",
        "residual": "prediction minus observation",
        "J": "derivative of prediction",
        "localRotation": "left increment expressed in common auxiliary/object axes"
    },
    "testGroups": len(checks),
    "passedGroups": sum(c["passed"] for c in checks),
    "checks": checks,
    "chineseCharacters": len(re.findall(r"[\u4e00-\u9fff]", text)),
    "failure": failure,
    "limits": [
        "Exact identities and local finite differences verify stated algebra.",
        "They do not establish real-data accuracy or global convergence.",
        "Euler-angle columns and the new local-rotation columns are different parameterizations.",
        "No atmospheric empirical coefficients are derived from these geometry checks.",
        "Site rendering/build and visual figure review are separate checks."
    ]
}
REPORT.write_text(json.dumps(report, ensure_ascii=False, indent=2)+"\n",
                  encoding="utf-8")
print(json.dumps({"status": status, "passed": report["passedGroups"],
                  "total": report["testGroups"], "report": str(REPORT),
                  "failure": failure}, ensure_ascii=False))
if status != "passed":
    raise SystemExit(1)

