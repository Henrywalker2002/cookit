from flask import Flask, request
import os
from ultralytics import YOLO
import yaml
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

app = Flask(__name__)

media_root = os.path.join(BASE_DIR, 'media')

class ObjectDetection:
    def __init__(self):
        self.model = self.load_model()
    def validation(self):
        l_model = YOLO("runs\\detect\\train4\\weights\\best.pt")
        metrics = l_model.val()
        metrics.box.map    # map50-95
        metrics.box.map50  # map50
        metrics.box.map75  # map75
        metrics.box.maps   # a list contains map50-95 of each category
    def load_model(self):
        model = YOLO("ingredient.pt")
        model.fuse()
        return model
    def predict(self, image_path):
        l_model = YOLO('ingredient.pt')
        #if do not want to save the resutl, set the save arg to False
        results = l_model.predict(source=image_path, show= True, conf = 0.4, save = True)
        return results
    def inffer_result(self, results, labels):
        detected_lb_ls = []
        for result in results:
            boxes = result.boxes.cpu().numpy()
            class_name_index = boxes.cls
            confidence = boxes.conf
            class_name_index_set = set(class_name_index)
            # print("class name set:", class_name_index_set)
            for index in class_name_index_set:
                detected_lb_ls.append(labels[int(index)])
        # print(detected_lb_ls)
        return detected_lb_ls
    def read_labels_from_yaml(self, yaml_file_path):
        with open(yaml_file_path,'r') as f:
             output = yaml.safe_load(f)
        return output  


#load model
obj_detection = ObjectDetection()    
y_op = obj_detection.read_labels_from_yaml('data.yaml')
labels = y_op['names']

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/predict', methods=['GET'])
def predict():
    global obj_detection, labels
    image_name = request.args.get('image_name')
    image_path = os.path.join(media_root, image_name)
    results = obj_detection.predict(image_path=image_path)
    detected_ingredient_ls = obj_detection.inffer_result(results, labels)
    return {"ingredient": detected_ingredient_ls}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

    