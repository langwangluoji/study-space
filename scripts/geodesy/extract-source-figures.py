"""Extract only selected teaching figures; originals stay outside the repository."""
import argparse
import hashlib
import io
import json
from pathlib import Path

import fitz
from PIL import Image, ImageDraw
from pptx import Presentation

parser = argparse.ArgumentParser()
parser.add_argument('--source-root', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[2]
out = root / 'knowledge/geodesy/assets/figures'
records = []
pdfs = [
    ('S10', '4大地坐标与地心坐标之间转.pdf', 3, (.55, .18, .99, .714), 'source-blh-normal.png'),
    ('S11', '5三维直角坐标系之间转换.pdf', 3, (.52, .25, .97, .94), 'source-euler-zxz.png'),
    ('S11', '5三维直角坐标系之间转换.pdf', 6, (.52, .25, .97, .94), 'source-euler-xyz.png'),
    ('S11', '5三维直角坐标系之间转换.pdf', 12, (.56, .28, .98, .91), 'source-station-neu.png'),
    ('S11', '5三维直角坐标系之间转换.pdf', 16, (.64, .29, .98, .88), 'source-station-polar.png'),
    ('S11', '5三维直角坐标系之间转换.pdf', 26, (.025, .11, .98, .91), 'source-pivot-two-frames.png'),
]
for source, name, page, rect, asset in pdfs:
    path = args.source_root / '课件' / name
    with fitz.open(path) as doc:
        p = doc[page - 1]
        clip = fitz.Rect(*(v * (p.rect.width if i % 2 == 0 else p.rect.height) for i, v in enumerate(rect)))
        pix = p.get_pixmap(matrix=fitz.Matrix(3, 3), clip=clip, alpha=False)
        if asset in ('source-station-neu.png', 'source-blh-normal.png'):
            image = Image.frombytes('RGB', (pix.width, pix.height), pix.samples)
            if asset == 'source-station-neu.png':
                # The explanatory sentence at the left is outside the diagram.
                ImageDraw.Draw(image).rectangle((0, 0, round((566-clip.x0)*3), round((210-clip.y0)*3)), fill='white')
            else:
                # Remove the unrelated formula box corner, leaving the X label at x=600.2.
                ImageDraw.Draw(image).rectangle((0, round((370-clip.y0)*3), round((599.5-clip.x0)*3), pix.height), fill='white')
            image.save(out / asset)
        else:
            pix.save(out / asset)
    records.append(dict(asset=asset, source=source, file=name, file_page=page,
                        crop_normalized=rect, scale=3, treatment='裁去页眉、正文和页脚，保留图内原符号'))
    if asset == 'source-station-neu.png':
        records[-1]['cleared_pdf_rectangle'] = [clip.x0, clip.y0, 566, 210]
        records[-1]['treatment'] += '；清除左上角裁切边缘的无关正文，未覆盖图内对象'
    if asset == 'source-blh-normal.png':
        records[-1]['cleared_pdf_rectangle'] = [clip.x0, 370, 599.5, clip.y1]
        records[-1]['treatment'] += '；清除左下角无关公式框边角，保留 X 轴标签'

name = '轨道力学基础（4学时）(1).pptx'
deck = Presentation(args.source_root / name)
for slide, shape_index, asset in [(19, 2, 'source-earth-spin.png'), (19, 3, 'source-earth-orbit.png'),
                                  (37, 5, 'source-precession.png'), (40, 1, 'source-polar-motion-2001-2005.png')]:
    shape = deck.slides[slide - 1].shapes[shape_index]
    image = Image.open(io.BytesIO(shape.image.blob)).convert('RGB')
    image.save(out / asset)
    records.append(dict(asset=asset, source='S6', file=name, slide=slide, shape_index=shape_index,
                        crop_pixels=[0, 0, image.width, image.height], treatment='提取幻灯片内嵌原图，保持原分辨率与符号'))
for item in records:
    item['sha256'] = hashlib.sha256((out / item['asset']).read_bytes()).hexdigest()
(root / 'knowledge/geodesy/data/figure-source-crops.json').write_text(
    json.dumps(dict(date='2026-11-04', page_numbering='1-based PDF file page / slide order', figures=records),
               ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Extracted {len(records)} selected figures; no complete originals copied.')
