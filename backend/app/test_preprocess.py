import cv2

from registration.preprocess import load_image, preprocess_image


image_path = "../data/input/source_crop.png"


# Load the OHRC crop
image = load_image(image_path)

print("✅ OHRC crop loaded")
print("Original shape:", image.shape)


# Preprocess
processed = preprocess_image(image)

print("✅ Preprocessing successful")
print("Processed shape:", processed.shape)
print("Processed dtype:", processed.dtype)


# Save preprocessed working image
output_path = "../outputs/preprocessed_source.png"

success = cv2.imwrite(
    output_path,
    processed
)

if not success:
    raise RuntimeError(
        "❌ Failed to save preprocessed image."
    )

print("✅ Preprocessed image saved to:", output_path)