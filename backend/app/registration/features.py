import cv2
import numpy as np


def detect_sift_features(image: np.ndarray):
    """
    Detect SIFT keypoints and compute descriptors.

    Args:
        image: Grayscale/preprocessed image.

    Returns:
        keypoints: List of SIFT keypoints.
        descriptors: SIFT descriptor array.
    """

    sift = cv2.SIFT_create()

    keypoints, descriptors = sift.detectAndCompute(
        image,
        None
    )

    if descriptors is None or len(keypoints) == 0:
        raise RuntimeError("No SIFT features detected.")

    return keypoints, descriptors