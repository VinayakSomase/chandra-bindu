import cv2

image = cv2.imread("data/input/source.png")

if image is None:
    print("❌ Image could not be loaded")
else:
    print("✅ Image loaded successfully!")
    print("Image shape:", image.shape)