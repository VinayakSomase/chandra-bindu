import cv2
import numpy as np


def load_image(image_path: str):
    """
    Load an image from disk.

    Returns:
        image: Original image, unchanged.
    """
    image = cv2.imread(image_path)

    if image is None:
        raise FileNotFoundError(f"Could not load image: {image_path}")

    return image


def preprocess_image(image: np.ndarray):
    """
    Preprocess an image for feature detection.

    Steps:
    1. Convert to grayscale
    2. Normalize intensity
    3. Apply CLAHE for local contrast enhancement

    The original image is never modified.
    """

    # Create a working copy
    working_image = image.copy()

    # Convert to grayscale
    if len(working_image.shape) == 3:
        gray = cv2.cvtColor(working_image, cv2.COLOR_BGR2GRAY)
    else:
        gray = working_image.copy()

    # Normalize intensity to 0-255
    normalized = cv2.normalize(
        gray,
        None,
        0,
        255,
        cv2.NORM_MINMAX
    )

    # Local contrast enhancement
    clahe = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8)
    )

    enhanced = clahe.apply(normalized)

    return enhanced