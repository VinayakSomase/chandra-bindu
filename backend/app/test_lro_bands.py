from pathlib import Path

import cv2
import numpy as np

from utils.lro_image_io import read_lro_image


image_path = (
    r"C:\Users\Pavan\Downloads\M140184301LE.IMG"
)

output_path = Path("../outputs/lro_terrain_bands.png")

image = read_lro_image(image_path)

band_height = 1024

scores = []

for y in range(0, image.shape[0], band_height):

    band = image[
        y:min(y + band_height, image.shape[0]),
        :
    ]

    mean_value = float(band.mean())
    std_value = float(band.std())

    scores.append(
        (y, mean_value, std_value)
    )


# Rank bands primarily by texture (standard deviation).
scores_sorted = sorted(
    scores,
    key=lambda item: item[2],
    reverse=True
)

print("\nTop terrain-rich bands:\n")

for y, mean_value, std_value in scores_sorted[:10]:
    print(
        f"Y={y:5d} | "
        f"mean={mean_value:6.2f} | "
        f"std={std_value:6.2f}"
    )


# Create a contact sheet of the top 6 bands.
selected = scores_sorted[:6]

thumbs = []

for y, _, _ in selected:

    band = image[
        y:min(y + band_height, image.shape[0]),
        :
    ]

    # Normalize only for visualization.
    display = cv2.normalize(
        band,
        None,
        0,
        255,
        cv2.NORM_MINMAX
    )

    display = cv2.resize(
        display,
        (800, 300),
        interpolation=cv2.INTER_AREA
    )

    cv2.putText(
        display,
        f"Y = {y}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        255,
        2
    )

    thumbs.append(display)


contact_sheet = np.vstack(thumbs)

success = cv2.imwrite(
    str(output_path),
    contact_sheet
)

if not success:
    raise RuntimeError(
        "Failed to save terrain-band preview."
    )

print("\n✅ Terrain-band preview created")
print("Saved to:", output_path)