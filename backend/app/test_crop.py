from utils.image_io import read_ohrc_crop
import cv2


# Path to the original calibrated OHRC image
image_path = (
    r"C:\Users\Pavan\Downloads"
    r"\ch2_ohr_ncp_20211228T2209123959_d_img_d18"
    r"\data\calibrated\20211228"
    r"\ch2_ohr_ncp_20211228T2209123959_d_img_d18.img"
)


# Selected crop location
# Based on the scan results
x = 4000
y = 35000

crop_width = 2048
crop_height = 2048


# Read only the selected region from the large OHRC image
crop = read_ohrc_crop(
    image_path=image_path,
    x=x,
    y=y,
    crop_width=crop_width,
    crop_height=crop_height
)


# Display information about the crop
print("✅ OHRC crop extracted successfully")
print("Crop position:", f"x={x}, y={y}")
print("Crop shape:", crop.shape)
print("Crop dtype:", crop.dtype)
print("Minimum pixel:", int(crop.min()))
print("Maximum pixel:", int(crop.max()))
print("Mean pixel:", round(float(crop.mean()), 2))
print("Standard deviation:", round(float(crop.std()), 2))


# Save the crop as a working PNG
output_path = "../data/input/source_crop.png"

success = cv2.imwrite(
    output_path,
    crop
)

if not success:
    raise RuntimeError("❌ Failed to save crop.")

print("✅ Crop saved to:", output_path)