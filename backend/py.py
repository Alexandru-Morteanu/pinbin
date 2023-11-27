# from PIL import Image
# import numpy as np
# import io
# import sys

# data_from_node = sys.stdin.read().strip()
# received_array = list(map(int, data_from_node.split(',')))

# img = Image.open(io.BytesIO(bytearray(received_array)), 'r')
# img.show()
# # print("hello")
# import tensorflow as tf
# from tensorflow.keras.preprocessing import image
# from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
# import numpy as np
# # Load the MobileNetV2 model pre-trained on ImageNet data
# model = MobileNetV2(weights='imagenet')

# def classify_image(image_path):
#     # Load and preprocess the image
#     img = image.load_img(image_path, target_size=(224, 224))
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array = preprocess_input(img_array)

#     # Make predictions
#     predictions = model.predict(img_array)
#     decoded_predictions = decode_predictions(predictions, top=1)[0]

#     return decoded_predictions

# # Example usage
# image_path = '/Users/morteanualexandru/Downloads/cat.webp'
# predictions = classify_image(image_path)

# # Display the result
# if 'cat' in predictions[0][1].lower():
#     print(f"The image contains a cat with confidence: {predictions[0][2]:.2%}")
# else:
#     print("The image does not contain a cat.")
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
import numpy as np
import io
from PIL import Image
import sys

# Load the MobileNetV2 model pre-trained on ImageNet data
model = MobileNetV2(weights='imagenet')

def classify_image(img_data):
    # Convert the received array data to bytes
    img_bytes = bytearray(img_data)
    
    # Use PIL to open the image
    img = Image.open(io.BytesIO(img_bytes))
   
    # Ensure that the image has a recognized mode (e.g., 'RGB')
    img = img.convert('RGB')

    # Resize to match the input size expected by MobileNetV2
    img = img.resize((224, 224))
    
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)

    # Make predictions
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions, top=1)[0]

    return decoded_predictions

# Read array data from stdin
data_from_node = sys.stdin.read().strip()
received_array = list(map(int, data_from_node.split(',')))

# Example usage
predictions = classify_image(received_array)

# Display the result
if 'trash' in predictions[0][1].lower():
    print(False)
else:
    if(predictions[0][2] > 0.35):
        print(f"True")
    else:
        print(f"False")
    
        
    
