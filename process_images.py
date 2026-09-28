import os
import sys
import json
import cv2
import numpy as np
from PIL import Image

# Ensure stdout uses UTF-8
sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = os.path.abspath('processed_assets')
os.makedirs(OUT_DIR, exist_ok=True)

def remove_bg(img_path):
    img = Image.open(img_path).convert('RGBA')
    arr = np.array(img)
    h, w = arr.shape[:2]

    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]

    # White / Light gray background pixels
    white_mask = (r > 235) & (g > 235) & (b > 235)
    # Checkerboard gray pixels (~195 to 225)
    checker_gray = (r >= 190) & (r <= 230) & (g >= 190) & (g <= 230) & (b >= 190) & (b <= 230)

    # Edge seeds for flood fill
    cand_bg = (white_mask | checker_gray).astype(np.uint8)
    ff_img = cand_bg.copy()

    seeds = []
    # Add border coordinates
    for x in range(0, w, max(1, w // 20)):
        seeds.extend([(x, 0), (x, h - 1)])
    for y in range(0, h, max(1, h // 20)):
        seeds.extend([(0, y), (w - 1, y)])

    mask = np.zeros((h + 2, w + 2), np.uint8)
    for sx, sy in seeds:
        if ff_img[sy, sx] == 1:
            cv2.floodFill(ff_img, mask, (sx, sy), 2)

    bg_region = (ff_img == 2)

    # Soft feather / anti-alias the alpha channel on edges
    arr[bg_region, 3] = 0

    # Also clean up any lingering single pure white pixels near edges
    # For pixels where neighbor is transparent and pixel is near white
    kernel = np.ones((3,3), np.uint8)
    bg_dilated = cv2.dilate(bg_region.astype(np.uint8), kernel, iterations=1)
    near_white_edge = (bg_dilated == 1) & (r > 220) & (g > 220) & (b > 220)
    arr[near_white_edge, 3] = 0

    return Image.fromarray(arr)

mappings = {}

# Process stickers
sticker_files = os.listdir('stickers')
for i, filename in enumerate(sticker_files):
    if filename.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        src = os.path.join('stickers', filename)
        clean_name = f"sticker_{i+1}.png"
        dest = os.path.join(OUT_DIR, clean_name)
        try:
            processed = remove_bg(src)
            processed.save(dest, 'PNG')
            mappings[filename] = clean_name
            print(f"OK: {clean_name} <= {filename[:30]}")
        except Exception as e:
            print(f"ERR: {filename[:30]} - {e}")

# Process cover images
covers = [
    ("cover image for photobooth section.jpeg", "photobooth_cover.png"),
    ("Tape Recorder section cover image.jpg", "cassette_cover.png"),
    ("envelope letter cover image.png", "envelope_cover.png")
]

for src_file, out_file in covers:
    if os.path.exists(src_file):
        dest = os.path.join(OUT_DIR, out_file)
        try:
            processed = remove_bg(src_file)
            processed.save(dest, 'PNG')
            mappings[src_file] = out_file
            print(f"COVER OK: {out_file}")
        except Exception as e:
            print(f"COVER ERR: {src_file} - {e}")

with open(os.path.join(OUT_DIR, 'manifest.json'), 'w', encoding='utf-8') as f:
    json.dump(mappings, f, indent=2)

print("Processing complete!")
