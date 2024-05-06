import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input, decode_predictions
import numpy as np
import io
from PIL import Image
import sys

model = MobileNetV2(weights='imagenet')

def classify_image(img_data):
    img_bytes = bytearray(img_data)
    img = Image.open(io.BytesIO(img_bytes))
    img = img.convert('RGB')
    img = img.resize((224, 224))
    
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    predictions = model.predict(img_array)
    decoded_predictions = decode_predictions(predictions, top=1)[0]

    return decoded_predictions

data_from_node = sys.stdin.read().strip()
received_array = list(map(int, data_from_node.split(',')))

predictions = classify_image(received_array)

if 'trash' in predictions[0][1].lower():
    print(False)
else:
    if(predictions[0][2] > 0.35):
        print(f"True")
    else:
        print(f"False")
    
        
    
