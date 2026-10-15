"""Re-run: python scripts/verify-photo-elementary-derivations.py (requires SymPy)."""
from pathlib import Path
import json
import math
import re
import sympy as sp

ROOT = Path(__file__).resolve().parents[1]
checks = []


def symbolic(name, residual):
    reduced = sp.simplify(sp.trigsimp(residual))
    checks.append({"name": name, "passed": reduced == 0, "residual": str(reduced)})


def numerical(name, actual, expected, tolerance=1e-9):
    actual, expected = float(actual), float(expected)
    checks.append({"name": name, "passed": abs(actual - expected) <= tolerance,
                   "actual": actual, "expected": expected, "tolerance": tolerance})


f, D, X, Y, a = sp.symbols('f D X Y a', positive=True, real=True)
c, s = sp.cos(a), sp.sin(a)
R = sp.Matrix([[1, 0, 0], [0, c, -s], [0, s, c]])
q = R.T * sp.Matrix([X, Y, -D])
symbolic('camera_to_aux_rotation_is_orthogonal', (R.T * R - sp.eye(3)).norm()**2)
symbolic('tilted_q_y', q[1] - (Y*c-D*s))
symbolic('tilted_q_z', q[2] - (-Y*s-D*c))
xp, yp = -f*q[0]/q[2], -f*q[1]/q[2]
symbolic('tilted_local_y_scale', sp.diff(yp, Y)-f*D/(Y*s+D*c)**2)
symbolic('tilted_local_x_scale', sp.diff(xp, X)-f/(Y*s+D*c))
symbolic('vertical_scale_limit_x', sp.limit(sp.diff(xp, X), a, 0)-f/D)
symbolic('vertical_scale_limit_y', sp.limit(sp.diff(yp, Y), a, 0)-f/D)
numerical('projection_sign_Z_up', -100*200/-1000, 20)

H, h, G = sp.symbols('H h G', positive=True)
r = f*G/(H-h)
r0 = f*G/H
symbolic('relief_image_difference', r-r0-r*h/H)
symbolic('relief_false_plane_ground_difference', H*r/f-G-G*h/(H-h))
numerical('top_radius_height', 500*4/80, 25)
numerical('base_radius_height', 4*500/(80+4), 23.80952380952381)

# Use sin(a)/(1+cos(a)) for tan(a/2), making the half-angle identity explicit.
yc, xc = sp.symbols('yc xc', real=True)
tc = f*s/(1+c)
k = f/(f-yc*s)
symbolic('tilted_planes_equal_principal_distance', tc*s+f*c-f)
symbolic('isocenter_projection_y_common_scale', k*(tc+yc*c)-tc-k*yc)
rc, th = sp.symbols('rc th', real=True)
delta = rc*(1-f/(f-rc*sp.sin(th)*s))
symbolic('exact_tilt_displacement', delta+rc**2*sp.sin(th)*s/(f-rc*sp.sin(th)*s))
e = sp.symbols('e', real=True)
symbolic('tilt_first_order_series', sp.limit((-rc*e/(1-e))/e, e, 0)+rc)
numerical('tilt_exact_mm', -2500*math.sin(math.radians(2))/(100-50*math.sin(math.radians(2))), -0.8879824885, 1e-10)
numerical('tilt_approx_mm', -25*math.sin(math.radians(2)), -0.8724874176, 1e-10)

B, p, pb, dp, Db = sp.symbols('B p pb dp Db', positive=True)
exact = Db*dp/(pb+dp)
linear = Db*dp/pb
symbolic('height_difference_from_two_disparities', Db*pb*(1/pb-1/(pb+dp))-exact)
symbolic('relative_error_of_linear_height', (linear-exact)/exact-dp/pb)
symbolic('height_disparity_sensitivity', sp.diff(H-f*B/p, p)-f*B/p**2)
be, L = sp.symbols('be L', positive=True)
symbolic('eye_exact_convergence_derivative', sp.diff(2*sp.atan(be/(2*L)), L)+be/(L**2+be**2/4))
numerical('stereo_self_check_exact_height', 1000*10/110, 90.9090909090909)

o, w = sp.symbols('o w', real=True)
symbolic('triple_overlap_before_clipping', L-2*L*(1-o)-(2*o-1)*L)
symbolic('baseline_height_ratio', ((H*w/f)*(1-o))/H-(1-o)*w/f)
bv = sp.Matrix([B, 0, 0])
xl, yl, xr, yr = sp.symbols('xl yl xr yr', real=True)
q1, q2 = sp.Matrix([xl, yl, -f]), sp.Matrix([xr, yr, -f])
symbolic('epipolar_scalar_triple_identity', bv.cross(q1).dot(q2)-bv.dot(q1.cross(q2)))
symbolic('parallel_stereo_equal_rows', bv.cross(q1).dot(q2)-B*f*(yr-yl))

theta, phi = sp.symbols('theta phi', real=True)
hemisphere = sp.integrate(sp.cos(theta)*sp.sin(theta), (theta, 0, sp.pi/2))*sp.integrate(1, (phi, 0, 2*sp.pi))
symbolic('lambert_hemisphere_projected_integral', hemisphere-sp.pi)
u, vs, fo = sp.symbols('u vs fo', positive=True)
symbolic('thin_lens_from_two_ray_triangles', (vs/u-(vs-fo)/fo)-(fo*vs-u*vs+u*fo)/(u*fo))
numerical('finite_focus_image_distance_mm', 50*10000/(10000-50), 50.25125628140704)
uf, sf, N = sp.symbols('uf sf N', positive=True)
image_difference = fo*sf/(sf-fo)-fo*uf/(uf-fo)
symbolic('focus_distance_difference', image_difference-fo**2*(uf-sf)/((sf-fo)*(uf-fo)))
# Squared form verifies the absolute-value blur expression without assuming u>s.
blur_squared = (fo/N)**2*image_difference**2/(fo*uf/(uf-fo))**2
symbolic('blur_circle_squared', blur_squared-fo**4*(uf-sf)**2/(N**2*uf**2*(sf-fo)**2))
numerical('H_D_transmission_ratio', 10**(-0.8), 0.15848931924611134)
numerical('CTE_repeated_transfer', 0.99999**10000, 0.9048369656147593)
numerical('GSD_halving_quadruples_samples', (100/0.25**2)/(100/0.5**2), 4)
numerical('motion_velocity_mm_s', 152/500000*(300/3.6*1000), 25.33333333333333)
numerical('motion_blur_micrometers', (152/500000*(300/3.6*1000))/500*1000, 50.66666666666666)
numerical('two_microsecond_range_m', 299792458*2e-6/2, 299.792458)
rr, hh = sp.symbols('rr hh', positive=True)
symbolic('slant_to_ground_range_sensitivity', sp.diff(sp.sqrt(rr**2-hh**2), rr)-rr/sp.sqrt(rr**2-hh**2))
numerical('UAV_corrected_height_m', 24*0.2/0.0064, 750)

fragment = (ROOT/'docs/_fragments/photogrammetry-derivations-23.md').read_text(encoding='utf8')
actual = re.findall(r'^## .*?\{#(derive-[^}]+)\}', fragment, re.M)
expected = [f'derive-2-{i}' for i in range(1, 9)] + [f'derive-3-{i}' for i in range(1, 11)]
checks.append({'name': 'all_18_unique_section_anchors_in_order', 'passed': actual == expected})
checks.append({'name': 'display_math_delimiters_paired', 'passed': fragment.count('$$') % 2 == 0})
report = {'scope': 'Independent symbolic/numerical verification of supplementary derivations; not a proof of optical, quantum, detector or empirical models.',
          'sympyVersion': sp.__version__, 'checks': len(checks),
          'passed': sum(x['passed'] for x in checks), 'results': checks}
out = ROOT/'reports/photogrammetry-derivations-23-verification.json'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
print(json.dumps({'checks': report['checks'], 'passed': report['passed'], 'report': str(out)}, ensure_ascii=False))
if report['passed'] != report['checks']:
    print(json.dumps([x for x in checks if not x['passed']], ensure_ascii=False, indent=2))
    raise SystemExit(1)
