"""Independent numerical checks for the first three InSAR chapters.

Run from any directory: python /path/to/scripts/verify_insar.py
Requires Python 3.10+ and NumPy; no GPU, downloads, SciPy or PyTorch.
The report is relative to this script, so the same command works on Linux.
These checks validate the stated ideal models, not real mission performance.
"""

from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import sys
from typing import Any

import numpy as np


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_REPORT = ROOT / "reports" / "insar-math-verification.json"
SEED = 20261014
CHECKS: list[dict[str, Any]] = []


def plain(value: Any) -> Any:
    """Convert NumPy values without allowing NaN/Infinity in JSON."""
    if isinstance(value, np.ndarray):
        return plain(value.tolist())
    if isinstance(value, np.generic):
        return plain(value.item())
    if isinstance(value, dict):
        return {str(key): plain(item) for key, item in value.items()}
    if isinstance(value, (tuple, list)):
        return [plain(item) for item in value]
    return value


def record(check_id: str, passed: bool, model: str, metrics: dict,
           tolerance: dict | None = None) -> None:
    CHECKS.append({"id": check_id, "status": "PASS" if passed else "FAIL",
                   "model_and_scope": model, "metrics": plain(metrics),
                   "tolerance": plain(tolerance or {})})


def central_difference(function, x: float, step: float) -> float:
    return float((function(x + step) - function(x - step)) / (2 * step))


def check_geometry() -> None:
    height = 800000.0
    rows = []
    for degrees in (5, 23, 35, 45, 70):
        theta = np.deg2rad(degrees)
        x = height * np.tan(theta)
        measured = central_difference(lambda xx: np.hypot(height, xx), x, 1.0)
        expected = np.sin(theta)
        rows.append({"theta_deg": degrees, "finite_difference_dR_dx": measured,
                     "sin_theta": expected, "absolute_error": abs(measured - expected)})
    maximum_error = max(row["absolute_error"] for row in rows)
    record("flat_ground_range_projection", maximum_error < 2e-9,
           "R is one-way slant range; theta is from vertical; planar ground and local derivative.",
           {"height_m": height, "step_m": 1, "cases": rows,
            "range_resolution_to_ground": "delta_x = delta_R / sin(theta)"},
           {"max_absolute_derivative_error": 2e-9})

    theta = np.deg2rad(35)
    radar = np.array([0.0, height])
    point = np.array([height * np.tan(theta), 0.0])
    rows = []
    for slope_deg in (0, 20, 35, 45, 70):
        alpha = np.deg2rad(slope_deg)
        tangent = np.array([np.cos(alpha), np.sin(alpha)])
        distance = lambda length: np.linalg.norm(point + length * tangent - radar)
        numeric = central_difference(distance, 0.0, 1.0)
        expected = np.sin(theta - alpha)
        condition = ("foreshortening" if 0 < slope_deg < 35 else
                     "maximum_compression_boundary" if slope_deg == 35 else
                     "reversed_range_order_layover" if slope_deg > 35 else "flat")
        rows.append({"slope_deg": slope_deg, "numeric_dR_dl": numeric,
                     "sin_theta_minus_alpha": expected, "condition": condition,
                     "signed_angle_deg": 35 - slope_deg,
                     "physical_incidence_angle_deg": abs(35 - slope_deg),
                     "absolute_error": abs(numeric - expected)})
    slope_ok = all(row["absolute_error"] < 2e-9 for row in rows)
    slope_ok &= rows[1]["numeric_dR_dl"] < rows[0]["numeric_dR_dl"]
    slope_ok &= abs(rows[2]["numeric_dR_dl"]) < 2e-9
    slope_ok &= rows[3]["numeric_dR_dl"] < 0
    record("slope_projection_and_range_order", slope_ok,
           "Independent Euclidean distance on a 2D fore-slope; slope tangent rises away from radar. "
           "A negative signed projection angle is not a negative physical incidence angle.",
           {"theta_deg": 35, "cases": rows}, {"derivative_absolute_error": 2e-9})

    to_radar = np.array([-np.sin(theta), np.cos(theta)])
    rows = []
    for beta_deg in (0, 20, 55, 60):
        beta = np.deg2rad(beta_deg)
        upward_normal = np.array([np.sin(beta), np.cos(beta)])
        dot = float(upward_normal @ to_radar)
        rows.append({"backslope_deg": beta_deg, "normal_dot_toward_radar": dot,
                     "cos_theta_plus_beta": float(np.cos(theta + beta)),
                     "direct_front_face_illumination": dot > 1e-12})
    illumination_ok = all(abs(row["normal_dot_toward_radar"] -
                              row["cos_theta_plus_beta"]) < 1e-14 for row in rows)
    illumination_ok &= rows[0]["direct_front_face_illumination"]
    illumination_ok &= not rows[2]["direct_front_face_illumination"]
    illumination_ok &= rows[3]["normal_dot_toward_radar"] < 0

    # Independent line-of-sight test: a locally flat target can still be blocked.
    target_x = float(point[0])
    x = np.linspace(0, target_x, 8193)
    ray_height = height * (1 - x / target_x)
    ridge_x = target_x / 2
    ridge_height = height / 2 + 100
    terrain_clear = np.zeros_like(x)
    terrain_blocked = np.interp(x, [0, ridge_x, target_x], [0, ridge_height, 0])
    interior = (x > 0) & (x < target_x)
    clear = not bool(np.any(terrain_clear[interior] > ray_height[interior]))
    blocked = bool(np.any(terrain_blocked[interior] > ray_height[interior]))
    illumination_ok &= clear and blocked and np.cos(theta) > 0
    record("backslope_local_normal_and_global_shadow", illumination_ok,
           "Local normal cosine detects a grazing/back-facing surface; positive cosine alone "
           "does not exclude an intervening ridge. This is a 2D visibility example, not a 3D DEM algorithm.",
           {"local_cases": rows, "flat_target_normal_cosine": float(np.cos(theta)),
            "flat_terrain_ray_clear": clear, "positive_local_cosine_but_ridge_blocks": blocked,
            "ridge_above_ray_m": 100, "grazing_boundary_deg": 55},
           {"normal_dot_identity_absolute_error": 1e-14})

    object_height = 40.0
    direction = np.array([np.sin(theta), -np.cos(theta)])
    hit_ground = np.array([0.0, object_height]) + object_height / np.cos(theta) * direction
    expected_shadow = object_height * np.tan(theta)
    record("distant_parallel_ray_shadow_length", abs(hit_ground[0] - expected_shadow) < 1e-12,
           "Vertical object on level ground, distant parallel rays; not general mountain geometry.",
           {"ray_ground_intersection_x_m": float(hit_ground[0]),
            "height_times_tan_theta_m": float(expected_shadow)}, {"absolute_error_m": 1e-12})


def chirp_integral(delay: float, duration: float, rate: float) -> complex:
    """Integrate two actual finite, shifted chirps; no closed-form response here."""
    left = max(-duration / 2, delay - duration / 2)
    right = min(duration / 2, delay + duration / 2)
    if right <= left:
        return 0j
    t = np.linspace(left, right, 8193)
    transmitted = np.exp(1j * np.pi * rate * t ** 2)
    shifted_template = np.exp(1j * np.pi * rate * (t - delay) ** 2)
    integrand = transmitted * np.conjugate(shifted_template)
    # Explicit trapezoidal quadrature supports older as well as current NumPy.
    return complex(np.sum((integrand[1:] + integrand[:-1]) * np.diff(t) / 2))


def check_chirp() -> None:
    duration = 20e-6
    rows = []
    for bt in (16, 64, 256):
        bandwidth = bt / duration
        rate = bandwidth / duration
        peak = chirp_integral(0.0, duration, rate)
        low, high = 0.7 / bandwidth, 1.4 / bandwidth
        initial_bracket = (chirp_integral(low, duration, rate).real > 0 and
                           chirp_integral(high, duration, rate).real < 0)
        for _ in range(48):
            middle = (low + high) / 2
            if chirp_integral(middle, duration, rate).real > 0:
                low = middle
            else:
                high = middle
        first_null = (low + high) / 2
        response_at_null = abs(chirp_integral(first_null, duration, rate)) / duration
        # Closed form is a secondary comparison, after measuring the response.
        errors = []
        for delay in (0.0, 0.4 / bandwidth, 0.9 / bandwidth, 1.5 / bandwidth,
                      -0.8 / bandwidth, 1.05 * duration):
            numeric = chirp_integral(delay, duration, rate)
            expected = ((duration - abs(delay)) *
                        np.sinc(rate * delay * (duration - abs(delay)))
                        if abs(delay) < duration else 0.0)
            errors.append(abs(numeric - expected) / duration)
        rows.append({"time_bandwidth_product": bt, "bandwidth_Hz": bandwidth,
                     "duration_s": duration, "integrated_peak_over_T": abs(peak) / duration,
                     "numeric_first_null_delay_s": first_null,
                     "B_times_numeric_first_null": bandwidth * first_null,
                     "null_response_over_peak": response_at_null,
                     "relative_error_of_1_over_B_scale": abs(bandwidth * first_null - 1),
                     "max_normalized_quadrature_error_against_exact_autocorrelation": max(errors),
                     "initial_root_bracket_has_sign_change": initial_bracket})
    passed = all(row["initial_root_bracket_has_sign_change"] and
                 row["null_response_over_peak"] < 1e-10 and
                 row["max_normalized_quadrature_error_against_exact_autocorrelation"] < 2e-7
                 for row in rows)
    passed &= all(rows[index + 1]["relative_error_of_1_over_B_scale"] <
                  rows[index]["relative_error_of_1_over_B_scale"] for index in (0, 1))
    passed &= rows[-1]["relative_error_of_1_over_B_scale"] < 0.005
    record("finite_chirp_matched_filter_and_measured_mainlobe", passed,
           "Finite centered rectangular LFM pulse; quadrature of p(t)conj(p(t-q)); first null found "
           "by root search on that integral. 1/B is a high-BT scale, not an exact finite-pulse null.",
           {"cases": rows, "quadrature_points": 8193,
            "sinc_definition": "sin(pi*x)/(pi*x)",
            "range_null_scale": "c * measured_delay / 2"},
           {"normalized_null_response": 1e-10, "normalized_quadrature_error": 2e-7,
            "first_null_approx_relative_error_at_BT256": 0.005})


def check_motion() -> None:
    r0, speed, wavelength, antenna = 853000.0, 7500.0, 0.0566, 10.0
    aperture = r0 * wavelength / antenna
    offsets = np.linspace(-aperture / 2, aperture / 2, 1001, dtype=np.longdouble)
    exact = np.sqrt(np.longdouble(r0) ** 2 + offsets ** 2)
    quadratic = np.longdouble(r0) + offsets ** 2 / (2 * r0)
    errors = np.asarray(quadratic - exact, dtype=float)
    maximum_error = float(np.max(np.abs(errors)))
    phase_error = 4 * np.pi * maximum_error / wavelength
    ratios = []
    for ratio in (0.001, 0.01, 0.05, 0.1):
        x = np.longdouble(r0) * ratio
        exact_r = np.sqrt(np.longdouble(r0) ** 2 + x ** 2)
        approximate_r = np.longdouble(r0) + x ** 2 / (2 * r0)
        residual = float(approximate_r - exact_r)
        ratios.append({"offset_over_R0": ratio, "range_error_m": residual,
                       "propagation_phase_error_rad": 4 * np.pi * residual / wavelength})
    record("exact_range_history_and_quadratic_approximation",
           maximum_error < 1e-5 and phase_error < 0.003 and bool(np.all(errors >= -1e-9)),
           "Straight constant-speed broadside, stationary point; long-double Euclidean range "
           "compared with its second-order approximation. Small relative range error alone "
           "does not ensure small SAR phase error.",
           {"R0_m": r0, "speed_m_s": speed, "wavelength_m": wavelength,
            "ideal_stripmap_aperture_m": aperture, "max_range_error_m": maximum_error,
            "max_propagation_phase_error_rad": phase_error,
            "larger_offset_examples": ratios},
           {"ideal_aperture_range_error_m": 1e-5, "ideal_aperture_phase_error_rad": 0.003})

    # Remove the common phase constant to avoid differencing phases of order 1e8.
    relative_phase = lambda eta: -4 * np.pi * (np.hypot(r0, speed * eta) - r0) / wavelength
    distance = lambda eta: np.hypot(r0, speed * eta)
    rows = []
    for eta in (-0.3, -0.1, 0.0, 0.1, 0.3):
        step = 2e-5
        from_phase = central_difference(relative_phase, eta, step) / (2 * np.pi)
        from_range = -2 / wavelength * central_difference(distance, eta, step)
        exact_doppler = -2 * speed ** 2 * eta / (wavelength * distance(eta))
        rows.append({"eta_s": eta, "phase_derivative_Hz": from_phase,
                     "range_derivative_Hz": from_range, "exact_doppler_Hz": exact_doppler,
                     "quadratic_doppler_Hz": -2 * speed ** 2 * eta / (wavelength * r0),
                     "derivative_error_Hz": abs(from_phase - exact_doppler)})
    record("doppler_from_phase_and_two_way_range_rate",
           all(row["derivative_error_Hz"] < 0.001 and
               abs(row["phase_derivative_Hz"] - row["range_derivative_Hz"]) < 1e-8
               for row in rows),
           "f_D=(1/2pi)dphi/deta=-2/lambda*dR/deta with phi=-4pi*R/lambda; "
           "approach positive, recession negative for this convention.",
           {"cases": rows}, {"finite_difference_error_Hz": 0.001,
                                "phase_vs_range_identity_error_Hz": 1e-8})


def check_interference_and_coherence(rng: np.random.Generator) -> None:
    wavelength, r1, scatter = 0.0555, 853000.0, 0.7
    rows = []
    for delta in (-0.001, 0.001, wavelength / 2):
        s1 = 2 * np.exp(1j * (-4 * np.pi * r1 / wavelength + scatter))
        s2 = 3 * np.exp(1j * (-4 * np.pi * (r1 + delta) / wavelength + scatter))
        unit_product = s1 * np.conjugate(s2) / 6
        expected = np.exp(1j * 4 * np.pi * delta / wavelength)
        reverse = s2 * np.conjugate(s1) / 6
        rows.append({"R2_minus_R1_m": delta, "measured_wrapped_phase_rad": float(np.angle(unit_product)),
                     "unwrapped_ideal_phase_rad": 4 * np.pi * delta / wavelength,
                     "complex_unit_phase_error": float(abs(unit_product - expected)),
                     "reversing_conjugate_reverses_phase_error": float(abs(reverse - np.conjugate(unit_product)))})
    # Radial motion toward the sensor has R2-R1=-d_LOS, for d_LOS positive toward radar.
    point, radar = np.array([100.0, 0.0]), np.array([0.0, 800.0])
    u = (radar - point) / np.linalg.norm(radar - point)
    displacement = 0.001
    range_change = np.linalg.norm(radar - (point + displacement * u)) - np.linalg.norm(radar - point)
    passed = all(row["complex_unit_phase_error"] < 1e-7 and
                 row["reversing_conjugate_reverses_phase_error"] < 1e-14 for row in rows)
    passed &= abs(range_change + displacement) < 1e-12
    record("same_scatter_interferogram_sign_and_LOS", passed,
           "Same scattering phase; s=A*exp(i*phi), phi=-4piR/lambda+phi_scat; "
           "I12=s1*conj(s2) has +4pi(R2-R1)/lambda. LOS positive toward radar has opposite range sign.",
           {"cases": rows, "positive_toward_radar_displacement_m": displacement,
            "Euclidean_range_change_m": float(range_change)},
           {"complex_phase_error": 1e-7, "LOS_range_error_m": 1e-12})

    a = rng.normal(size=(2000, 32)) + 1j * rng.normal(size=(2000, 32))
    b = rng.normal(size=(2000, 32)) + 1j * rng.normal(size=(2000, 32))
    numerator = np.sum(a * np.conjugate(b), axis=1)
    denominator = np.sqrt(np.sum(abs(a) ** 2, axis=1) * np.sum(abs(b) ** 2, axis=1))
    measured = abs(numerator) / denominator
    scale = 2.3 * np.exp(1j * 0.41)
    scaled_b = scale * a
    equality = abs(np.sum(a * np.conjugate(scaled_b), axis=1)) / np.sqrt(
        np.sum(abs(a) ** 2, axis=1) * np.sum(abs(scaled_b) ** 2, axis=1))
    alternating = np.array([1, -1, 1, -1], dtype=complex)
    sum_then_abs = abs(np.sum(alternating)) / 4
    abs_then_sum = np.sum(abs(alternating)) / 4
    record("window_coherence_Cauchy_Schwarz_and_order_of_operations",
           bool(np.all(measured <= 1 + 1e-12)) and
           float(np.max(abs(equality - 1))) < 1e-12 and sum_then_abs == 0 and abs_then_sum == 1,
           "Complex window inner product normalized by both energies. Nonzero denominator required; "
           "zero-energy windows must be masked. Scaled vectors attain equality; alternating phase cancels.",
           {"random_windows": 2000, "samples_per_window": 32,
            "max_independent_window_coherence": float(np.max(measured)),
            "max_scaled_vector_deviation_from_one": float(np.max(abs(equality - 1))),
            "correct_sum_then_modulus": float(sum_then_abs),
            "incorrect_modulus_then_sum": float(abs_then_sum)}, {"Cauchy_Schwarz_roundoff": 1e-12})

    phase_differences = np.linspace(-np.pi, np.pi, 101)
    a1, a2 = 1.7, 0.9
    numeric = abs(a1 + a2 * np.exp(1j * phase_differences)) ** 2
    expanded = a1 ** 2 + a2 ** 2 + 2 * a1 * a2 * np.cos(phase_differences)
    opposing = abs(1 + np.exp(1j * np.pi)) ** 2
    record("field_sum_vs_power_sum", float(np.max(abs(numeric - expanded))) < 1e-13 and opposing < 1e-28,
           "Fields sum before detection. Equal opposing fields have zero coherent intensity "
           "although separate detected powers sum to two.",
           {"interference_identity_max_error": float(np.max(abs(numeric - expanded))),
            "opposing_field_detected_after_sum": float(opposing),
            "opposing_separate_power_sum": 2}, {"identity_absolute_error": 1e-13})


def check_speckle(rng: np.random.Generator, samples: int) -> None:
    mu, max_looks = 2.5, 8
    real = rng.standard_normal((samples, max_looks))
    imag = rng.standard_normal((samples, max_looks))
    intensity = mu / 2 * (real ** 2 + imag ** 2)
    del real, imag
    single = intensity[:, 0]
    ordered = np.sort(single / mu)
    cdf = -np.expm1(-ordered)
    empirical_upper = np.arange(1, samples + 1) / samples
    empirical_lower = np.arange(samples) / samples
    ks_statistic = float(max(np.max(empirical_upper - cdf), np.max(cdf - empirical_lower)))
    # Dvoretzky-Kiefer-Wolfowitz bound, distribution-free under independent samples.
    alpha = 1e-6
    dkw_limit = float(np.sqrt(np.log(2 / alpha) / (2 * samples)))
    record("circular_complex_Gaussian_intensity_exponential_CDF", ks_statistic < dkw_limit,
           "Independent real/imag Gaussian with variance mu/2; zero mean and circular symmetry. "
           "Intensity computed from both components and compared with exponential CDF, not generated "
           "from an exponential RNG. This excludes deterministic point targets and textured mixtures.",
           {"independent_samples": samples, "mu": mu, "empirical_CDF_max_error": ks_statistic,
            "DKW_CDF_threshold": dkw_limit, "DKW_false_failure_bound": alpha},
           {"CDF_max_error": dkw_limit})

    rows = []
    for looks in (1, 2, 4, 8):
        averaged = intensity[:, :looks].mean(axis=1)
        mean = float(averaged.mean())
        variance = float(averaged.var(ddof=1))
        expected_variance = mu ** 2 / looks
        enl = mean ** 2 / variance
        mean_error = abs(mean / mu - 1)
        variance_error = abs(variance / expected_variance - 1)
        enl_error = abs(enl / looks - 1)
        # Six asymptotic standard errors from gamma moments; generous but explicit.
        mean_limit = float(6 / np.sqrt(samples * looks))
        variance_limit = float(6 * np.sqrt((2 + 6 / looks) / samples))
        enl_limit = float(6 * np.sqrt((2 + 2 / looks) / samples))
        rows.append({"independent_looks": looks, "estimated_mean": mean, "expected_mean": mu,
                     "estimated_variance_ddof1": variance, "expected_variance": expected_variance,
                     "estimated_ENL": enl, "expected_ENL": looks,
                     "relative_mean_error": mean_error, "relative_variance_error": variance_error,
                     "relative_ENL_error": enl_error,
                     "relative_mean_tolerance": mean_limit,
                     "relative_variance_tolerance": variance_limit,
                     "relative_ENL_tolerance": enl_limit,
                     "passed": mean_error < mean_limit and variance_error < variance_limit and enl_error < enl_limit})
    record("independent_multilook_mean_variance_and_ENL", all(row["passed"] for row in rows),
           "Independent equal-mean looks from circular complex Gaussian; linear intensities averaged. "
           "Sample variance uses ddof=1. Spatial correlation, texture and filtering change ENL interpretation.",
           {"seed": SEED, "samples_per_look_setting": samples, "cases": rows},
           {"rule": "six asymptotic standard errors from gamma moments; case-specific tolerances shown"})


def check_db_and_basic_physics() -> None:
    amplitudes = np.logspace(-4, 3, 101)
    db_from_power = 10 * np.log10(amplitudes ** 2)
    db_from_amplitude = 20 * np.log10(amplitudes)
    powers = amplitudes ** 2
    recovered = 10 ** (db_from_power / 10)
    linear_mean_db = float(10 * np.log10(np.mean([0.01, 0.1])))
    direct_db_average = float(np.mean(10 * np.log10([0.01, 0.1])))
    record("dB_amplitude_power_and_averaging", np.allclose(db_from_power, db_from_amplitude, atol=1e-12)
           and np.allclose(recovered, powers, rtol=1e-12) and abs(linear_mean_db - direct_db_average) > 2,
           "Same reference, positive amplitude A and power A^2. Mean power is formed in the linear domain.",
           {"max_power_vs_amplitude_db_error": float(np.max(abs(db_from_power - db_from_amplitude))),
            "linear_mean_of_0_01_and_0_1_to_dB": linear_mean_db,
            "arithmetic_average_of_minus20_and_minus10_dB": direct_db_average,
            "minus30_dB_to_power": 10 ** (-30 / 10)},
           {"db_absolute_error": 1e-12, "roundtrip_power_relative_error": 1e-12})

    alpha, amplitude0 = 0.2, 3.0
    amplitude_at_skin_depth = amplitude0 * np.exp(-alpha * (1 / alpha)) / amplitude0
    power_at_power_depth = (amplitude0 * np.exp(-alpha * (1 / (2 * alpha)))) ** 2 / amplitude0 ** 2
    theta, wavelength = np.deg2rad(35), 0.0555
    roughness_limit = wavelength / (8 * np.cos(theta))
    threshold_phase = 4 * np.pi * roughness_limit * np.cos(theta) / wavelength
    record("attenuation_depth_and_roughness_phase_scale",
           abs(amplitude_at_skin_depth - np.exp(-1)) < 1e-14 and
           abs(power_at_power_depth - np.exp(-1)) < 1e-14 and abs(threshold_phase - np.pi / 2) < 1e-14,
           "Uniform exponential field attenuation; power is field modulus squared. "
           "Roughness phase relation is a local-plane far-field approximation, not a universal classification.",
           {"field_depth_1_over_alpha_m": 1 / alpha, "power_depth_1_over_2alpha_m": 1 / (2 * alpha),
            "field_fraction_at_field_depth": amplitude_at_skin_depth,
            "power_fraction_at_power_depth": power_at_power_depth,
            "Rayleigh_limit_phase_rad": threshold_phase}, {"absolute_identity_error": 1e-14})

    pt, gt, gr, sigma, distance = 1500.0, 1000.0, 1200.0, 10.0, 853000.0
    def staged_power(r):
        incoming = pt * gt / (4 * np.pi * r ** 2)
        returning = incoming * sigma / (4 * np.pi * r ** 2)
        effective_area = gr * wavelength ** 2 / (4 * np.pi)
        return returning * effective_area
    direct = pt * gt * gr * wavelength ** 2 * sigma / ((4 * np.pi) ** 3 * distance ** 4)
    record("point_target_radar_energy_chain",
           np.isclose(staged_power(distance), direct, rtol=1e-13) and
           abs(staged_power(2 * distance) / staged_power(distance) - 1 / 16) < 1e-14,
           "Specified far-field point-target cross section, no propagation losses; not an image brightness correction.",
           {"staged_received_power_W": staged_power(distance), "direct_radar_equation_W": direct,
            "distance_doubled_power_ratio": staged_power(2 * distance) / staged_power(distance)},
           {"power_relative_error": 1e-13})


def read_claim(block: str, pattern: str, label: str) -> float:
    match = re.search(pattern, block, re.S)
    if not match:
        raise ValueError(f"Cannot locate current numerical claim: {label}")
    return float(match.group(1))


def chapter_section(text: str, anchor: str) -> str:
    start = text.index("{#" + anchor + "}")
    return text[start:start + 2600]


def check_current_text_examples(documents: dict[str, str]) -> None:
    ch1, ch2, ch3 = (documents[name] for name in
                      ("insar-microwave.md", "insar-imaging.md", "insar-interpretation.md"))
    rows = []
    def claim(label: str, block: str, pattern: str, calculated: float,
              rounding_tolerance: float, unit: str) -> None:
        shown = read_claim(block, pattern, label)
        rows.append({"example": label, "displayed_value": shown, "computed_value": calculated,
                     "unit": unit, "rounding_absolute_tolerance": rounding_tolerance,
                     "absolute_error": abs(shown - calculated),
                     "passed": abs(shown - calculated) <= rounding_tolerance})
    claim("chapter1_5_405GHz_wavelength", ch1,
          r"f=5\.405.*?\\lambda\\approx([\d.]+)\\ \\mathrm\{cm\}",
          2.998e8 / 5.405e9 * 100, 0.005, "cm")
    phase = chapter_section(ch1, "microwave-phase-example")
    claim("chapter1_1mm_interferogram_phase", phase,
          r"\\approx\+?([\d.]+)\\ \\mathrm\{rad\}", 4 * np.pi * 0.001 / 0.0555, 0.0005, "rad")
    claim("chapter1_1mm_phase_degrees", phase,
          r"\\approx\+?([\d.]+)\^\\circ", 720 * 0.001 / 0.0555, 0.05, "degree")
    claim("chapter1_full_range_phase_cycle", phase,
          r"距离增加约 \$([\d.]+)\\ \\mathrm\{cm\}", 0.0555 / 2 * 100, 0.0005, "cm")
    rar = chapter_section(ch2, "i2-example-rar")
    claim("chapter2_RAR_azimuth", rar, r"=([\d.]+)\\ \\mathrm\{m\}\.",
          853000 * 0.0566 / 10, 0.5, "m")
    claim("chapter2_antenna_for_20m_RAR", rar, r"\\approx([\d.]+)\\ \\mathrm\{m\}\$",
          853000 * 0.0566 / 20, 0.5, "m")
    pulse = chapter_section(ch2, "i2-example-rar")
    claim("chapter2_uncompressed_0_1us", pulse, r"斜距分辨率约 \$([\d.]+)\\ \\mathrm\{m\}",
          3e8 * 1e-7 / 2, 0.5, "m")
    claim("chapter2_45degree_ground_resolution", pulse, r"对应地距约 \$([\d.]+)\\ \\mathrm\{m\}",
          15 / np.sin(np.deg2rad(45)), 0.05, "m")
    bandwidth = chapter_section(ch2, "i2-example-bandwidth")
    claim("chapter2_15_55MHz_slant_resolution", bandwidth,
          r"\\delta R.*?\\approx([\d.]+)\\ \\mathrm\{m\}", 3e8 / (2 * 15.55e6), 0.005, "m")
    claim("chapter2_23degree_ground_resolution", bandwidth,
          r"\\delta x.*?\\approx([\d.]+)\\ \\mathrm\{m\}",
          3e8 / (2 * 15.55e6 * np.sin(np.deg2rad(23))), 0.05, "m")
    sampling = chapter_section(ch2, "i2-pixel-spacing")
    claim("chapter2_32MHz_sample_spacing", sampling,
          r"采样间距约为 \$([\d.]+)\\ \\mathrm\{m\}", 3e8 / (2 * 32e6), 0.005, "m")
    claim("chapter3_100m_20degree_foreslope_projection", ch3,
          r"100\\sin15\^\\circ=([\d.]+)\\,\\mathrm\s*m", 100 * np.sin(np.deg2rad(15)), 0.05, "m")
    claim("chapter3_linear_mean_then_dB", ch3,
          r"平均是 \$0\.055\$，约 \$(-?[\d.]+)\\,\\mathrm\{dB\}",
          10 * np.log10(0.055), 0.005, "dB")
    record("current_markdown_numerical_examples", all(row["passed"] for row in rows),
           "Displayed values read from current Markdown, checked against calculations with stated rounding precision. "
           "Missing/changed claims fail rather than silently checking an obsolete duplicate.",
           {"examples": rows}, {"rule": "half of the final displayed decimal place, per case"})


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", type=Path, default=DEFAULT_REPORT)
    parser.add_argument("--samples", type=int, default=400000,
                        help="Independent Monte Carlo samples, default 400000; minimum 50000")
    args = parser.parse_args()
    if args.samples < 50000:
        parser.error("--samples must be at least 50000")
    documents = {}
    source_records = []
    for name in ("insar-microwave.md", "insar-imaging.md", "insar-interpretation.md"):
        path = ROOT / "docs" / name
        content = path.read_bytes()
        documents[name] = content.decode("utf-8")
        source_records.append({"path": path.relative_to(ROOT).as_posix(),
                               "sha256": hashlib.sha256(content).hexdigest()})
    rng = np.random.default_rng(SEED)
    tasks = [("geometry", check_geometry), ("chirp", check_chirp), ("motion", check_motion),
             ("interference_and_coherence", lambda: check_interference_and_coherence(rng)),
             ("speckle", lambda: check_speckle(rng, args.samples)),
             ("dB_and_basic_physics", check_db_and_basic_physics),
             ("current_examples", lambda: check_current_text_examples(documents))]
    for name, task in tasks:
        try:
            task()
        except Exception as error:
            record(name + "_execution", False, "Check could not complete; this is not a passing result.",
                   {"error_type": type(error).__name__, "error": str(error)})
    failures = [check["id"] for check in CHECKS if check["status"] == "FAIL"]
    report = {"status": "PASS" if not failures else "FAIL", "schema_version": 1,
              "generated_at_UTC": datetime.now(timezone.utc).isoformat(),
              "runtime": {"python": sys.version.split()[0], "numpy": np.__version__},
              "seed": SEED, "Monte_Carlo_samples": args.samples, "sources": source_records,
              "check_count": len(CHECKS), "failed_checks": failures,
              "checks": CHECKS,
              "text_corrections_required": [] if not failures else
              ["Inspect failed checks before claiming mathematical verification; failures may be numerical, missing text or content errors."],
              "interpretation": [
                  "No result establishes real satellite resolution, measurement accuracy or current mission status.",
                  "The finite chirp first null converges to 1/B; the finite-window correction is explicitly measured.",
                  "Second-order range accuracy must also be assessed in propagation phase, not relative distance alone.",
                  "Positive local illumination cosine does not exclude global terrain obstruction.",
                  "ENL=number of looks requires independent equal-mean fully developed speckle; estimated variance uses ddof=1.",
                  "Relative paths and Path-based report output are portable; only NumPy is a third-party requirement."
              ]}
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(plain(report), ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    for check in CHECKS:
        print(f"{check['status']}: {check['id']}")
    print(f"{report['status']}: {len(CHECKS)} checks; report: {args.report}")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
