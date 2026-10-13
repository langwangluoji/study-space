"""Render original textbook pages with Poppler, then crop unchanged figure regions.

Run with --render-only to inspect complete pages before extracting figures.
Coordinates are pixels in the 150 dpi original-page rendering; no redraw or relabel.
"""
from pathlib import Path
import argparse
import hashlib
import json
import shutil
import subprocess
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BOOKS = ROOT.parents[1] / "资料"
RESEARCH = ROOT / "reports" / "textbook-pages"
OUTPUT = ROOT / "public" / "remote-sensing" / "textbook-figures"
PDFS = {"campbell": next(BOOKS.glob("Introduction*pdf")), "ccrs": next(BOOKS.glob("Fundamentals*pdf"))}
PAGES = {"campbell": [77, 84, 87, 102, 104, 156, 157, 250], "ccrs": [5, 110]}
FIGURES = [
    {"id": "book-ccrs-information-chain", "book_id": "ccrs", "title_zh": "遥感的七环节信息链", "title_en": "The seven-element remote sensing process", "page": 5, "printed_page": "5", "figure_number": "Section 1.1, unnumbered figure", "credit": "© CCRS / CCT · Canada Centre for Remote Sensing", "crop_px": [172, 962, 640, 1342], "target_anchor": "rs1-information-chain", "note_zh": "按A–G追踪能源/照明、大气、目标、传感器记录、传输与处理、解释与分析、应用。B在下行与上行路径均出现；这是典型反射成像链，热发射观测与非成像探测也属于遥感。", "note_en": "Follow A–G through illumination, atmosphere, target, recording, transmission and processing, interpretation and analysis, and application. B occurs on both downward and upward paths. This is a typical reflected-energy imaging chain; emitted-energy observations and non-imaging sensing also belong to remote sensing."},
    {"id": "book-campbell-atmospheric-paths", "book_id": "campbell", "title_zh": "到达传感器的辐射有哪些路径", "title_en": "Components of radiation reaching the sensor", "page": 77, "printed_page": "38", "figure_number": "2.9", "credit": "Based on Campbell and Ran (1993). Image by Susmita Sen.", "crop_px": [116, 142, 937, 680], "target_anchor": "rs2-atmosphere", "note_zh": "Iₛ是地表反射路径，Iₒ是直接到达传感器的大气路径辐射，Iᴅ表示包含天空漫射照明的路径。这里讨论可见光及邻近波段；像元亮度不能直接视为目标自身反射率。先看本图路径，再联系地物光谱图中的反射。", "note_en": "Iₛ follows surface reflection, Iₒ is atmospheric path radiance directly reaching the sensor, and Iᴅ includes diffuse sky illumination. The diagram concerns visible and nearby wavelengths. Pixel brightness is not directly the target's reflectance; relate these paths to the surface spectral-response diagram."},
    {"id": "book-campbell-brdf", "book_id": "campbell", "title_zh": "反射的方向性与照明角度", "title_en": "Directional reflectance and illumination angles", "page": 84, "printed_page": "45", "figure_number": "2.16", "credit": "Calculated by Pierre Villeneuve. Image by Susmita Sen.", "crop_px": [112, 137, 936, 858], "target_anchor": "rs2-reflectance-brdf", "note_zh": "Incident zenith angle意为入射天顶角；两幅半球上的色标展示不同观察方向的反射方向性。照明和观察方向都应记录，不能把半球色值当作波长光谱。原图展示方向变化，不定义BRDF与BRF的量纲关系；二者仍按正文公式区分。", "note_en": "Incident zenith angle describes the illumination direction; the hemispherical color scales show directional variation with viewing direction. Record both illumination and viewing geometry. These colors are not a wavelength spectrum. The figure illustrates angular variation, while the text separately defines BRDF and BRF and their units."},
    {"id": "book-campbell-surface-spectra", "book_id": "campbell", "title_zh": "植被与清水的光谱响应和能量分配", "title_en": "Vegetation and clear-water spectral response and energy partition", "page": 87, "printed_page": "48", "figure_number": "2.19", "credit": "Image by Susmita Sen.", "crop_px": [116, 631, 937, 1349], "target_anchor": "rs2-spectral-signatures", "note_zh": "Reflectance为反射率，NIR为近红外；入射能量分为反射、吸收和透射。活叶近红外反射增大，清静水体的近红外反射较弱。曲线是示意，不是固定的类别指纹；浑水、叶片结构、背景混合与观察条件会改变像元光谱。", "note_en": "Reflectance and NIR (near infrared) label the response curves; incident energy is reflected, absorbed, or transmitted. Living leaves show stronger NIR reflection, while clear, calm water has weak NIR reflectance. These are schematic patterns rather than fixed class fingerprints: turbidity, leaf structure, mixed backgrounds, and observation conditions change pixel spectra."},
    {"id": "book-campbell-orbital-inclination", "book_id": "campbell", "title_zh": "轨道倾角和地球自转方向", "title_en": "Orbital inclination and Earth's rotation", "page": 102, "printed_page": "63", "figure_number": "3.9", "credit": "From NASA.", "crop_px": [112, 145, 934, 465], "target_anchor": "rs3-elements", "note_zh": "Orbital inclination为轨道倾角，Earth’s rotation为地球自转。轨道倾角由赤道平面量至轨道平面，与卫星当前纬度、姿态或传感器侧摆角不同；再结合轨道类型图讨论顺行、逆行和近极轨道。", "note_en": "Orbital inclination is measured from the equatorial plane to the orbital plane. It differs from current satellite latitude, attitude, and sensor off-nadir angle. Use this geometry with the orbit-family figure to discuss prograde, retrograde, and near-polar orbits."},
    {"id": "book-campbell-orbit-families", "book_id": "campbell", "title_zh": "轨道高度分类与太阳同步、地球静止轨道", "title_en": "Orbit altitude classes, sun-synchronous and geostationary orbits", "page": 102, "printed_page": "63", "figure_number": "3.10", "credit": "Campbell, Wynne and Thomas (2023), Introduction to Remote Sensing, Sixth Edition, Figure 3.10.", "crop_px": [112, 926, 936, 1349], "target_anchor": "rs3-orbits", "note_zh": "LEO/MEO表示高度范围，SSO表示轨道平面相对太阳的进动条件，GEO在图中表示地球静止轨道；这些类别的划分维度不同。GTO是地球静止转移轨道。此图非比例绘制，不能据图估算高度，近极轨道也不自动满足太阳同步。", "note_en": "LEO/MEO classify altitude, SSO describes orbital-plane precession relative to the Sun, and GEO here labels the geostationary orbit. These categories use different criteria. GTO is a geostationary transfer orbit. The sketch is not to scale: do not estimate altitudes from it or assume that every near-polar orbit is sun-synchronous."},
    {"id": "book-campbell-ground-tracks", "book_id": "campbell", "title_zh": "Landsat轨迹、幅宽与影像条带", "title_en": "Landsat tracks, swath width and image strips", "page": 104, "printed_page": "65", "figure_number": "3.11", "credit": "From NASA.", "crop_px": [112, 727, 935, 1373], "target_anchor": "rs3-timing", "note_zh": "条带显示降轨观测在地表的方向与横向覆盖宽度，帮助区分卫星地面轨迹和具有宽度的成像条带。拼接图来自多个轨道或影像，不能解释成一次过境覆盖美国，也不能从静态拼图推断重访周期。", "note_en": "The strips show descending-track orientation and cross-track coverage width. Distinguish the satellite ground track from a finite-width image swath. This composite combines multiple tracks or scenes; it is not coverage from a single pass and does not by itself establish revisit time."},
    {"id": "book-campbell-pushbroom-whiskbroom", "book_id": "campbell", "title_zh": "推扫线阵与摆扫扫描镜对照", "title_en": "Pushbroom linear array and whiskbroom scan mirror", "page": 156, "printed_page": "117", "figure_number": "5.1", "credit": "Image by Susmita Sen.", "crop_px": [112, 136, 936, 646], "target_anchor": "rs4-scanning", "note_zh": "(a) Linear array（线阵）同时接收一行，依靠Forward motion（平台前进）形成沿轨方向；(b) Scan mirror（扫描镜）跨轨扫描，逐像元形成一行。横向扫描与平台前进是两个不同动作。再看IFOV图辨认单个探测器足迹；长驻留时间还受像元尺度、速度和信噪比要求约束。", "note_en": "(a) A linear array receives a line simultaneously; forward platform motion builds the along-track dimension. (b) A scan mirror sweeps across track and samples the line pixel by pixel. Cross-track scanning and forward motion are distinct. Relate this to the IFOV footprint; dwell time also depends on sampling scale, speed, and signal-to-noise requirements."},
    {"id": "book-campbell-ifov", "book_id": "campbell", "title_zh": "瞬时视场与地面足迹", "title_en": "Instantaneous field of view and ground footprint", "page": 157, "printed_page": "118", "figure_number": "5.3", "credit": "Image by Susmita Sen.", "crop_px": [115, 950, 938, 1349], "target_anchor": "rs4-ifov", "note_zh": "锥体显示某一瞬时观测方向对应的地面足迹。正文用IFOV表示角宽，用GIFOV表示地面投影尺度；教材图把地面区域也称为IFOV。垂直观测、小角度近似下GIFOV≈H×IFOV；倾斜观测和起伏地形需要更完整的几何。GSD是采样间距，GRD还受模糊和噪声影响。", "note_en": "The cone illustrates the ground footprint of an instantaneous observation. This course uses IFOV for angular width and GIFOV for the projected ground dimension; the textbook also calls the ground area IFOV. At nadir and small angles, GIFOV ≈ H × IFOV. Oblique views and terrain need fuller geometry. GSD is sampling spacing; GRD also depends on blur and noise."},
    {"id": "book-campbell-sar-geometry", "book_id": "campbell", "title_zh": "侧视雷达的斜距、角度与距离向", "title_en": "Side-looking radar: slant range, angles and range direction", "page": 250, "printed_page": "211", "figure_number": "8.7", "credit": "Image by Susmita Sen.", "crop_px": [112, 729, 937, 1349], "target_anchor": "rs4-radar", "note_zh": "Slant range为斜距，Along-track为沿轨/方位向，Across-track为跨轨/距离向。Look angle在平台处相对垂直方向定义，Incidence angle在目标处相对垂直方向定义，Local incidence angle相对局部法线；Depression angle相对平台水平线定义。斜坡使局部入射角改变，并可能产生阴影；平地近似下的角度关系不能直接套给斜坡。", "note_en": "Slant range is antenna-to-target distance; along track is the azimuth dimension, and across track is the range dimension. Look angle is measured at the platform from vertical, incidence angle at the target from vertical, local incidence angle from the local normal, and depression angle from the platform's horizontal. Slopes change local incidence and may produce shadow; flat-ground angle relations do not directly apply to slopes."},
    {"id": "book-ccrs-speckle", "book_id": "ccrs", "title_zh": "均匀目标也会出现相干斑", "title_en": "Speckle can occur over a homogeneous target", "page": 110, "printed_page": "110", "figure_number": "Section 3.6, unnumbered A/B comparison", "credit": "© CCRS / CCT · Canada Centre for Remote Sensing", "crop_px": [446, 844, 839, 1243], "target_anchor": "rs4-radar", "note_zh": "A表示没有相干斑影响时均匀区域的理想平均色调，B表示分辨单元内散射波相干叠加后亮暗波动。相干斑不等于地物类别变化，也不能仅由单像元亮度推断目标属性。多视与空间滤波都可降低波动，但对空间细节和统计估计有不同影响。", "note_en": "A represents the ideal uniform mean tone without speckle; B shows bright and dark fluctuations from coherent interference of scattering returns within resolution cells. Speckle does not imply changing land-cover classes, and one pixel's brightness alone does not establish target properties. Multilooking and spatial filtering reduce fluctuations with different effects on spatial detail and statistical estimation."},
]

def render_pages():
    RESEARCH.mkdir(parents=True, exist_ok=True)
    renderer = shutil.which("pdftoppm")
    if not renderer:
        raise RuntimeError("pdftoppm is required for original-page renderings")
    for book, pages in PAGES.items():
        for page in pages:
            target = RESEARCH / f"{book}-{page:03d}.png"
            if not target.exists():
                subprocess.run([renderer, "-f", str(page), "-l", str(page), "-singlefile", "-r", "150", "-png", str(PDFS[book]), str(target.with_suffix(""))], check=True)

def main():
    args = argparse.ArgumentParser()
    args.add_argument("--render-only", action="store_true")
    options = args.parse_args()
    render_pages()
    if options.render_only:
        return
    OUTPUT.mkdir(parents=True, exist_ok=True)
    existing = OUTPUT / "manifest.json"
    reviewed_notes = {item["id"]: item for item in json.loads(existing.read_text(encoding="utf-8"))["figures"]} if existing.exists() else {}
    sha = {book: hashlib.sha256(path.read_bytes()).hexdigest() for book, path in PDFS.items()}
    result = []
    for spec in FIGURES:
        item = dict(spec)
        if item["id"] in reviewed_notes:
            for field in ("note_zh", "note_en"):
                item[field] = reviewed_notes[item["id"]][field]
        book, page = item["book_id"], item["page"]
        with Image.open(RESEARCH / f"{book}-{page:03d}.png") as original:
            crop = original.crop(item["crop_px"]).convert("RGB")
            name = item["id"] + ".webp"
            crop.save(OUTPUT / name, quality=94, method=6)
            item["dimensions"] = {"width": crop.width, "height": crop.height}
        source_title = "Campbell, Wynne and Thomas (2023), Introduction to Remote Sensing, Sixth Edition" if book == "campbell" else "Canada Centre for Remote Sensing, Fundamentals of Remote Sensing"
        item.update(kind="textbook", src="/remote-sensing/textbook-figures/" + name, source=source_title, source_file=PDFS[book].name, source_sha256=sha[book], dpi=150)
        result.append(item)
    manifest = {"policy": {"method": "Original PDF page rendered by pdftoppm at 150 dpi and cropped without redrawing, relabeling or removing figure captions and original credits.", "context": "Selected figures for bilingual course study; source PDF books remain local references.", "coordinates": "crop_px uses [left, top, right, bottom] in the full-page 150 dpi rendering."}, "figures": result}
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"figures": len(result), "bytes": sum(p.stat().st_size for p in OUTPUT.glob("*.webp"))}))

if __name__ == "__main__":
    main()
