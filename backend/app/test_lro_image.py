from pathlib import Path


image_path = Path(
    r"C:\Users\Pavan\Downloads\M143264605LE.IMG"
)

if not image_path.exists():
    raise FileNotFoundError(
        f"❌ LRO image not found:\n{image_path}"
    )


with open(image_path, "rb") as file:
    header = file.read(65536)


text = header.decode(
    "ascii",
    errors="ignore"
)


keywords = [
    "PDS_VERSION_ID",
    "RECORD_TYPE",
    "RECORD_BYTES",
    "FILE_RECORDS",
    "LABEL_RECORDS",
    "^IMAGE",
    "IMAGE_LINES",
    "LINE_SAMPLES",
    "SAMPLE_BITS",
    "SAMPLE_TYPE",

    "DATA_SET_ID",
    "PRODUCT_ID",
    "ORIGINAL_PRODUCT_ID",

    "START_TIME",
    "STOP_TIME",

    "SPACECRAFT",
    "INSTRUMENT",
    "MISSION",

    "COORDINATE",
    "PROJECTION",
    "MAP_PROJECTION",

    "CENTER",
    "LATITUDE",
    "LONGITUDE",

    "RESOLUTION",
    "INCIDENCE",
    "EMISSION",
    "PHASE",

    "SUB_SOLAR",
    "SUB_SPACECRAFT",

    "SOFTWARE",
    "PROCESSING",
    "GEOMETRY",
]


print("✅ LRO PDS label loaded")
print()
print("Searching complete relevant metadata...")
print()


lines = text.splitlines()

found = []


for line in lines:
    stripped = line.strip()

    if not stripped:
        continue

    upper_line = stripped.upper()

    if any(keyword in upper_line for keyword in keywords):
        found.append(stripped)


# Remove duplicate lines while preserving order
unique_found = []

for line in found:
    if line not in unique_found:
        unique_found.append(line)


for line in unique_found:
    print(line)


print()
print("=" * 70)
print(f"✅ Found {len(unique_found)} relevant metadata entries")
print("=" * 70)