from pathlib import Path


image_path = Path(
    r"C:\Users\Pavan\Downloads\M144831832LE.IMG"
)


if not image_path.exists():
    raise FileNotFoundError(
        f"File not found: {image_path}"
    )


print("File found successfully.")
print("File size:", image_path.stat().st_size, "bytes")


with open(image_path, "rb") as f:
    header = f.read(8192)


text = header.decode(
    "ascii",
    errors="ignore"
)


print("\n----- PDS HEADER -----\n")


important_keys = [
    "PDS_VERSION_ID",
    "RECORD_TYPE",
    "RECORD_BYTES",
    "FILE_RECORDS",
    "LABEL_RECORDS",
    "^IMAGE",
    "DATA_SET_ID",
    "ORIGINAL_PRODUCT_ID",
    "PRODUCT_ID",
    "LINE_SAMPLES",
    "IMAGE_LINES",
    "SAMPLE_BITS",
    "SAMPLE_TYPE"
]


for line in text.splitlines():

    line = line.strip()

    if any(
        key in line
        for key in important_keys
    ):
        print(line)


print("\n----- END HEADER CHECK -----")