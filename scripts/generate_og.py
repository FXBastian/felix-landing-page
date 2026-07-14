from PIL import Image
from pathlib import Path

src = Path('assets/banner-social.png')
if not src.exists():
    print('Source image not found:', src)
    raise SystemExit(1)

out_png = Path('assets/og-image-1200x630.jpg')

# Open and convert to RGB
img = Image.open(src).convert('RGB')
# Target size
TW, TH = 1200, 630
W, H = img.size

# Resize preserving aspect ratio, then center-crop to target
scale = max(TW / W, TH / H)
new_size = (int(W * scale), int(H * scale))
img = img.resize(new_size, Image.LANCZOS)
# center crop
left = (img.width - TW) // 2
top = (img.height - TH) // 2
img = img.crop((left, top, left + TW, top + TH))

# Save as JPEG optimized
img.save(out_png, format='JPEG', quality=85, optimize=True)
print('Saved', out_png, 'size=', out_png.stat().st_size)
