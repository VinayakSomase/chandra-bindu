from utils.lro_image_io import read_lro_image


image_path = (
    r"C:\Users\Pavan\Downloads\M144831832LE.IMG"
)


image = read_lro_image(image_path)


print("✅ LROC image read successfully")

print("Shape:", image.shape)
print("Dtype:", image.dtype)

print("Minimum pixel:", int(image.min()))
print("Maximum pixel:", int(image.max()))

print(
    "Mean pixel:",
    round(float(image.mean()), 2)
)

print(
    "Standard deviation:",
    round(float(image.std()), 2)
)