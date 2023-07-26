from PIL import Image
import numpy as np
from sklearn.cluster import KMeans
import os


def get_dominant_color(image_path, num_clusters=3):
    # Step 1: Load the image and convert it to a numpy array
    image = Image.open(image_path)
    image_array = np.array(image)

    # Step 2: Reshape the image to a 2D array of pixels (width * height, channels)
    pixels = image_array.reshape(-1, 3)

    # Step 3: Use KMeans clustering to group similar colors
    kmeans = KMeans(n_clusters=num_clusters)
    kmeans.fit(pixels)

    # Step 4: Find the cluster with the largest number of pixels (dominant color)
    cluster_centers = kmeans.cluster_centers_.astype(int)
    labels = kmeans.labels_
    dominant_color = cluster_centers[np.argmax(np.bincount(labels))]

    # Calculate brightness of the dominant color
    brightness = 0.2126 * \
        dominant_color[0] + 0.7152 * \
        dominant_color[1] + 0.0722 * dominant_color[2]

    # Check if the color is dark (adjust the threshold as needed)
    if brightness < 140:
        # Lighten the dominant color
        dominant_color = tuple(
            map(lambda x: min(x + 100, 255), dominant_color))

    return tuple(dominant_color)


# Example usage:
image_path = input("Enter the path of the image: ")
if not os.path.exists(image_path):
    print("The path does not exist")
    exit()
dominant_color = get_dominant_color(image_path)
print("Dominant color:", dominant_color)

# Convert the RGB color to HEX
hex_color = '#%02x%02x%02x' % dominant_color
print("HEX color:", hex_color)
