from pathlib import Path
import numpy as np


OHRC_WIDTH = 12000
OHRC_HEIGHT = 79796


def read_ohrc_image(
    image_path: str,
    width: int = OHRC_WIDTH,
    height: int = OHRC_HEIGHT
):
    """
    Read the complete calibrated Chandrayaan-2 OHRC .img
    using memory mapping.
    """

    image_path = Path(image_path)

    if not image_path.exists():
        raise FileNotFoundError(
            f"OHRC image not found: {image_path}"
        )

    expected_size = width * height
    actual_size = image_path.stat().st_size

    if actual_size != expected_size:
        raise ValueError(
            f"Unexpected file size.\n"
            f"Expected: {expected_size} bytes\n"
            f"Found: {actual_size} bytes"
        )

    image = np.memmap(
        image_path,
        dtype=np.uint8,
        mode="r",
        shape=(height, width),
        order="C"
    )

    return image


def read_ohrc_crop(
    image_path: str,
    x: int,
    y: int,
    crop_width: int,
    crop_height: int,
    width: int = OHRC_WIDTH,
    height: int = OHRC_HEIGHT
):
    """
    Read a rectangular crop from the OHRC image.
    """

    if x < 0 or y < 0:
        raise ValueError("x and y must be non-negative.")

    if crop_width <= 0 or crop_height <= 0:
        raise ValueError(
            "crop_width and crop_height must be positive."
        )

    if x + crop_width > width:
        raise ValueError(
            "Crop extends beyond the image width."
        )

    if y + crop_height > height:
        raise ValueError(
            "Crop extends beyond the image height."
        )

    image = read_ohrc_image(
        image_path,
        width,
        height
    )

    crop = np.array(
        image[
            y:y + crop_height,
            x:x + crop_width
        ],
        copy=True
    )

    return crop