import cv2

from registration.features import detect_sift_features


image_path = "../outputs/preprocessed_source.png"
output_path = "../outputs/sift_keypoints.png"


# Load as grayscale
image = cv2.imread(
    image_path,
    cv2.IMREAD_GRAYSCALE
)

if image is None:
    raise FileNotFoundError(
        f"Could not load image: {image_path}"
    )


print("✅ Preprocessed OHRC image loaded")
print("Image shape:", image.shape)
print("Image dtype:", image.dtype)


# Detect SIFT features
keypoints, descriptors = detect_sift_features(image)


print("✅ SIFT feature detection successful")
print("Number of keypoints:", len(keypoints))
print("Descriptor shape:", descriptors.shape)


# Draw keypoints for visualization
visualization = cv2.drawKeypoints(
    image,
    keypoints,
    None,
    flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS
)


# Save visualization
success = cv2.imwrite(
    output_path,
    visualization
)

if not success:
    raise RuntimeError(
        "❌ Failed to save SIFT visualization."
    )


print("✅ SIFT visualization saved to:", output_path)


# Print first 10 keypoints
print("\nFirst 10 keypoints:")

for i, keypoint in enumerate(keypoints[:10]):

    x, y = keypoint.pt

    print(
        f"{i + 1}: "
        f"x={x:.2f}, "
        f"y={y:.2f}, "
        f"size={keypoint.size:.2f}, "
        f"angle={keypoint.angle:.2f}"
    )