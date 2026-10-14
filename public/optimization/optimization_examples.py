"""Small, independently checkable teaching examples. Requires numpy.
Run: python optimization_examples.py
All data are synthetic; these checks are not a production navigation system.
"""
import numpy as np


def main():
    A = np.array([[1., 0.], [0., 1.], [-1., 1.]])
    b = np.array([1., 2.1, 1.2])
    x = np.linalg.lstsq(A, b, rcond=None)[0]
    expected = np.array([29/30, 32/15])
    r = A @ x - b
    assert np.allclose(x, expected, atol=1e-12)
    assert np.allclose(r, [-1/30, 1/30, -1/30], atol=1e-12)
    assert np.allclose(A.T @ r, 0., atol=1e-12)
    assert abs(.5 * r @ r - 1/600) < 1e-12
    print('Least squares:', x, 'residual:', r, 'objective:', .5*r@r)

    H = A.T @ A
    for step in [.1, .5]:
        iterate = np.zeros(2)
        for _ in range(1000):
            iterate -= step * A.T @ (A @ iterate - b)
        assert np.allclose(iterate, expected, atol=1e-10)
    # Exact Newton step for a positive definite quadratic.
    start = np.array([5., -3.])
    newton = start + np.linalg.solve(H, -A.T @ (A @ start-b))
    assert np.allclose(newton, expected)

    prior, P_prior, measurement, R = 10., 4., 12., 1.
    P = 1/(1/P_prior+1/R)
    mean = P*(prior/P_prior+measurement/R)
    assert abs(mean-11.6) < 1e-12 and abs(P-.8) < 1e-12
    assert abs((mean-prior)/P_prior+(mean-measurement)/R) < 1e-12
    print('Linear Gaussian update:', mean, 'variance:', P)

    u = -1.
    constrained_u = -.5
    assert (2+u)**2+u*u == 2.
    assert (2+constrained_u)**2+constrained_u**2 == 2.5
    print('One-step control:', u, 'constrained:', constrained_u)

    for c in [0., 1., 2., 3.]:
        optimum, multiplier = min(2., c), max(0., 2.-c)
        g = (2-c)*multiplier-.5*multiplier**2
        p = .5*(optimum-2)**2
        assert optimum <= c and multiplier >= 0
        assert abs(optimum-2+multiplier) < 1e-12
        assert abs(multiplier*(optimum-c)) < 1e-12
        assert abs(p-g) < 1e-12
    print('KKT and duality checks: PASS')


if __name__ == '__main__':
    main()
