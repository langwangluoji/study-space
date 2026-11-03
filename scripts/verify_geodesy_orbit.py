"""Verify the canonical orbital supplement's coverage, links and worked numbers.

Run from any directory: python scripts/verify_geodesy_orbit.py
Uses only the Python standard library. Does not read or publish the local PPTX.
"""
from pathlib import Path
import json
import math
import re

ROOT = Path(__file__).resolve().parents[1]
LESSONS = ROOT / "knowledge/geodesy/lessons"
MAPPING = ROOT / "knowledge/geodesy/orbit-source-map.json"


def close(actual, expected, tolerance):
    assert abs(actual - expected) <= tolerance, (actual, expected, tolerance)


def matvec(matrix, vector):
    return [sum(a * b for a, b in zip(row, vector)) for row in matrix]


def transpose(matrix):
    return list(zip(*matrix))


def cross(a, b):
    return [a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]]


def main():
    mapping = json.loads(MAPPING.read_text(encoding="utf-8"))
    slides = mapping["slides"]
    assert [item["slide"] for item in slides] == list(range(1, 85))
    assert mapping["slide_count"] == 84
    assert sum(item["classification"] == "teaching" for item in slides) == 70
    assert sum(item["classification"] == "structural" for item in slides) == 14
    assert all(item["topics"] and item["evidence"] for item in slides)
    paths = sorted(LESSONS.glob("geodesy-orbit-*.md"))
    assert len(paths) == 7, paths
    for item in slides:
        assert (LESSONS / (item["lesson"] + ".md")).is_file()
    details_count = 0
    for path in paths:
        text = path.read_text(encoding="utf-8")
        frontmatter = text.split("---", 2)[1]
        assert "chapter: 7" in frontmatter and "sources: [S6]" in frontmatter
        assert f"slug: {path.stem}" in frontmatter
        assert re.search(r"^order: \d+$", frontmatter, re.M)
        assert "title:" in frontmatter
        assert text.count("$$") % 2 == 0, path.name
        html_count = text.count("<details>")
        callout_count = len(re.findall(r"^> \[!\w+\]- ", text, re.M))
        count = html_count + callout_count
        assert 2 <= count <= 3, (path.name, count)
        assert html_count == text.count("</details>")
        assert "例" in text, path.name
        details_count += count
        for link in re.findall(r"!?\[[^\]]*\]\(([^)]+)\)", text):
            if re.match(r"(?:https?:|#)", link):
                continue
            target = link.split("#")[0]
            assert (path.parent / target).is_file(), (path.name, target)
        assert not re.search(r"<(?:script|SourceFigure|[A-Z]\w*)\b", text), path.name
    print(f"PASS coverage: 84 slides, 70 teaching + 14 structural; 7 lessons; {details_count} folded answers")

    mu, a, radius = 3.986004418e14, 6378137.0, 6778137.0
    close(mu / radius, 5.88068e7, 20)
    close(mu / radius**2, 8.67595, 0.000005)
    close(0.5 * 1.08263e-3 * (a / radius)**2, 4.79311e-4, 0.0000000005)
    # Finite-difference the positive potential to independently check the sign.
    gradient = ((mu / (radius + 1)) - (mu / (radius - 1))) / 2
    close(gradient, -mu / radius**2, 0.000001)
    print("PASS gravity potential, gradient sign and J2 correction")

    rad = math.radians
    phi, dec, hour_angle = rad(30), rad(20), rad(22.5)
    sine_altitude = (math.sin(phi) * math.sin(dec) +
                    math.cos(phi) * math.cos(dec) * math.cos(hour_angle))
    close(sine_altitude, 0.92286, 0.000005)
    close(math.degrees(math.asin(sine_altitude)), 67.35, 0.005)
    close(6371000 * rad(0.2 / 3600), 6.1775, 0.00005)
    close(20 * 50.37 / 3600, 0.279833, 0.0000005)
    print("PASS celestial altitude, polar-motion arc and lecture precession estimate")

    # Use integer milliseconds for civil-label arithmetic across midnight.
    utc_ms = (23 * 3600 + 59 * 60 + 20) * 1000
    tai_ms = utc_ms + 37000
    tt_ms = tai_ms + 32184
    assert divmod(tt_ms, 86400000) == (1, 29184)
    assert tai_ms == (23 * 3600 + 59 * 60 + 57) * 1000
    close(32.184 + 37 - 0.200, 68.984, 1e-10)
    close(32.184 + 36 - (-0.4), 68.584, 1e-10)
    close(121.5 / 15, 8.1, 1e-12)
    print("PASS assumed UTC/TAI/TT/UT1 values and local-time conversion")

    c = [[0, 1, 0], [-1, 0, 0], [0, 0, 1]]
    original = [1, 2, 3]
    rotated = matvec(c, original)
    assert rotated == [2, -1, 3]
    assert matvec(transpose(c), rotated) == original
    assert sum(x*x for x in rotated) == sum(x*x for x in original)
    assert math.degrees(math.atan2(1, -1)) == 135.0

    f = 1 / 298.257223563
    e2, lon, height = f * (2-f), rad(120), 100.0
    n = a / math.sqrt(1 - e2 * math.sin(phi)**2)
    xyz = [(n+height) * math.cos(phi) * math.cos(lon),
           (n+height) * math.cos(phi) * math.sin(lon),
           (n*(1-e2)+height) * math.sin(phi)]
    expected = [-2764171.621, 4787685.688, 3170423.735]
    for got, want in zip(xyz, expected):
        close(got, want, 0.0005)
    rho = math.hypot(xyz[0], xyz[1])
    recovered_lat = math.atan2(xyz[2], rho * (1-e2))
    for _ in range(15):
        nr = a / math.sqrt(1-e2 * math.sin(recovered_lat)**2)
        recovered_lat = math.atan2(xyz[2] + e2 * nr * math.sin(recovered_lat), rho)
    nr = a / math.sqrt(1-e2 * math.sin(recovered_lat)**2)
    close(recovered_lat, phi, 1e-12)
    close(rho / math.cos(recovered_lat) - nr, height, 1e-7)
    close(math.atan2(xyz[1], xyz[0]), lon, 1e-12)
    celestial = matvec(transpose(c), xyz)
    for got, want in zip(celestial, [-4787685.688, -2764171.621, 3170423.735]):
        close(got, want, 0.0005)
    print("PASS passive rotation, inverse, norm, quadrant and geodetic round trip")

    omega = 7.292115e-5
    position = [a, 0, 0]
    velocity = cross([0, 0, omega], position)
    acceleration = cross([0, 0, omega], velocity)
    close(velocity[1], 465.1011, 0.00005)
    close(acceleration[0], -0.0339157, 0.00000005)
    close(omega * a / math.sqrt(2), 328.8761, 0.00005)
    # Differentiate an actively rotating fixed-Q position, independent of cross().
    dt = 0.01
    forward = [a * math.cos(omega * dt), a * math.sin(omega * dt), 0]
    backward = [a * math.cos(-omega * dt), a * math.sin(-omega * dt), 0]
    numerical_velocity = [(x-y)/(2*dt) for x,y in zip(forward, backward)]
    for got, want in zip(numerical_velocity, velocity):
        close(got, want, 0.000001)
    print("PASS transport theorem, direction, centripetal acceleration and finite difference")
    print("All orbital supplement checks passed.")


if __name__ == "__main__":
    main()
