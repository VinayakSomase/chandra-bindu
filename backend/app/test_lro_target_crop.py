import cv2
from pathlib import Path

from utils.lro_image_io import read_lro_image


image_path = (
    r"C:\Users\Pavan\Downloads\M140184301LE.IMG"
)

output_path = Path("../outputs/lro_target_test_crop.png")

image = read_lro_image(image_path)

# Diagnostic region near the upper part of the LROC strip.
y = 1500
x = 250

crop_width = 2048
crop_height = 2048

crop = image[
    y:y + crop_height,
    x:x + crop_width
]

if crop.shape != (crop_height, crop_width):
    raise RuntimeError(
        f"Unexpected crop shape: {crop.shape}"
    )

# Normalize only for visualization.
display = cv2.normalize(
    crop,
    None,
    0,
    255,
    cv2.NORM_MINMAX
)

success = cv2.imwrite(
    str(output_path),
    display
)

if not success:
    raise RuntimeError(
        "Failed to save LROC target test crop."
    )

print("✅ LROC target test crop created")
print("Crop position:", f"x={x}, y={y}")
print("Crop shape:", crop.shape)
print("Minimum:", int(crop.min()))
print("Maximum:", int(crop.max()))
print("Mean:", round(float(crop.mean()), 2))
print("Std:", round(float(crop.std()), 2))
print("Saved to:", output_path)