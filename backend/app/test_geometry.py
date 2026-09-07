import csv
from pathlib import Path


geometry_folder = Path(
    r"C:\Users\Pavan\Downloads"
    r"\ch2_ohr_ncp_20211228T2209123959_d_img_d18"
    r"\geometry\calibrated\20211228"
)

csv_files = list(geometry_folder.glob("*.csv"))

if not csv_files:
    raise FileNotFoundError(
        "❌ No geometry CSV file found."
    )

csv_path = csv_files[0]

print("✅ Geometry CSV found:")
print(csv_path)
print()


target_pixel = 6047
target_scan = 37047

print("Target point:")
print("Pixel =", target_pixel)
print("Scan  =", target_scan)
print()


closest_row = None
smallest_distance = float("inf")


with open(
    csv_path,
    "r",
    newline="",
    encoding="utf-8-sig"
) as file:

    reader = csv.DictReader(file)

    for row in reader:

        try:
            pixel = float(row["Pixel"])
            scan = float(row["Scan"])
            longitude = float(row["Longitude"])
            latitude = float(row["Latitude"])
        except (ValueError, TypeError, KeyError):
            continue

        distance = (
            (pixel - target_pixel) ** 2
            + (scan - target_scan) ** 2
        )

        if distance < smallest_distance:

            smallest_distance = distance

            closest_row = {
                "pixel": pixel,
                "scan": scan,
                "longitude": longitude,
                "latitude": latitude
            }


if closest_row is None:
    raise RuntimeError(
        "❌ No valid geometry points were found."
    )


print("✅ Closest geometry point found!")
print()

print(
    "Requested:"
    f" Pixel={target_pixel},"
    f" Scan={target_scan}"
)

print(
    "Actual geometry point:"
    f" Pixel={closest_row['pixel']},"
    f" Scan={closest_row['scan']}"
)

print()

print(
    "Longitude:",
    closest_row["longitude"]
)

print(
    "Latitude:",
    closest_row["latitude"]
)

print()

print(
    "Distance from requested point:",
    round(smallest_distance ** 0.5, 2),
    "pixels"
)