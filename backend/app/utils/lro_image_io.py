from pathlib import Path
import numpy as np


LRO_RECORD_BYTES = 2532
LRO_LABEL_RECORDS = 2
LRO_IMAGE_LINES = 52224
LRO_LINE_SAMPLES = 2532


def read_lro_image(
    image_path: str,
    lines: int = LRO_IMAGE_LINES,
    samples: int = LRO_LINE_SAMPLES
):
    """
    Read a Chandrayaan/LROC PDS3 EDR .IMG file
    using memory mapping.

    The first two records contain the PDS label.
    The image begins at record 3.
    """

    image_path = Path(image_path)

    if not image_path.exists():
        raise FileNotFoundError(
            f"LROC image not found: {image_path}"
        )

    expected_image_bytes = lines * samples
    header_bytes = LRO_LABEL_RECORDS * LRO_RECORD_BYTES
    expected_file_size = header_bytes + expected_image_bytes

    actual_file_size = image_path.stat().st_size

    if actual_file_size != expected_file_size:
        raise ValueError(
            f"Unexpected LROC file size.\n"
            f"Expected: {expected_file_size} bytes\n"
            f"Found: {actual_file_size} bytes"
        )

    image = np.memmap(
        image_path,
        dtype=np.uint8,
        mode="r",
        offset=header_bytes,
        shape=(lines, samples),
        order="C"
    )

    return image