import os
import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.vgg16 import preprocess_input  # VGG16 preprocessing
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical

# Define dataset paths
TRAIN_PATH = 'F:/Major project/Brain-tumor-dataset/Training'
TEST_PATH = 'F:/Major project/Brain-tumor-dataset/Testing'
IMAGE_SIZE = 224  # VGG16 expects 224x224 images

# Define class labels
class_labels = ['glioma', 'meningioma', 'notumor', 'pituitary']

# Load and preprocess images
def load_and_preprocess_images(folder_path):
    X = []
    y = []

    for label in class_labels:
        label_path = os.path.join(folder_path, label)
        for filename in os.listdir(label_path):
            img_path = os.path.join(label_path, filename)
            img = load_img(img_path, target_size=(IMAGE_SIZE, IMAGE_SIZE))  # Resize to 224x224
            img_array = img_to_array(img)
            img_array = preprocess_input(img_array)  # Preprocess for VGG16
            X.append(img_array)
            y.append(class_labels.index(label))

    X = np.array(X, dtype='float32')
    y = np.array(y, dtype='int32')
    return X, y

# Load training and testing data
X_train, y_train = load_and_preprocess_images(TRAIN_PATH)
X_test, y_test = load_and_preprocess_images(TEST_PATH)

# Convert labels to one-hot encoding
y_train = to_categorical(y_train, num_classes=len(class_labels))
y_test = to_categorical(y_test, num_classes=len(class_labels))

# Split training data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)

print(f"Training data shape: {X_train.shape}")
print(f"Validation data shape: {X_val.shape}")
print(f"Test data shape: {X_test.shape}")

# Save the preprocessed data as numpy arrays for faster access
np.save('X_train.npy', X_train)
np.save('X_val.npy', X_val)
np.save('X_test.npy', X_test)
np.save('y_train.npy', y_train)
np.save('y_val.npy', y_val)
np.save('y_test.npy', y_test)

print("✅ Data preprocessed and saved successfully!")