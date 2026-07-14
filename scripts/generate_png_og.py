from PIL import Image
from pathlib import Path

src = Path('assets/banner-social.png')
out = Path('assets/og-image.png')

if not src.exists():
    raise SystemExit(f'Missing source image: {src}')

img = Image.open(src).convert('RGB')
TW, TH = 1200, 630
W, H = img.size

scale = max(TW / W, TH / H)
img = img.resize((int(W * scale), int(H * scale)), Image.LANCZOS)
left = (img.width - TW) // 2
upper = (img.height - TH) // 2
img = img.crop((left, upper, left + TW, upper + TH))
img.save(out, format='PNG', optimize=True)
print('Saved', out, img.size, out.stat().st_size)
