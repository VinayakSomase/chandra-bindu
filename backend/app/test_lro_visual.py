from pathlib import Path

import cv2
import numpy as np

from utils.lro_image_io import read_lro_image


image_path = (
    r"C:\Users\Pavan\Downloads\M140184301LE.IMG"
)

output_path = Path("../outputs/lro_full_preview.png")

image = read_lro_image(image_path)

# Convert the large image to a manageable preview.
preview_width = 1000
scale = preview_width / image.shape[1]

preview_height = int(image.shape[0] * scale)

preview = cv2.resize(
    image,
    (preview_width, preview_height),
    interpolation=cv2.INTER_AREA
)

# Improve visibility only for the preview.
preview_display = cv2.normalize(
    preview,
    None,
    0,
    255,
    cv2.NORM_MINMAX
)

success = cv2.imwrite(
    str(output_path),
    preview_display
)

if not success:
    raise RuntimeError(
        "Failed to save LROC preview."
    )

print("✅ LROC preview created")
print("Original shape:", image.shape)
print("Preview shape:", preview_display.shape)
print("Saved to:", output_path)