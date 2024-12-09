from flask import Flask, request, render_template
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)

# Enable CORS
CORS(app)

# Load the scaler and model
scaler_path = 'models/scaler.joblib'
sc = joblib.load(scaler_path)
model_path = 'models/random_forest_model.joblib'
rf = joblib.load(model_path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from request
        data = request.json
        input_data = np.array([[data['DeviceType'], data['UsageHoursPerDay'], data['EnergyConsumption'], 
                                data['UserPreferences'], data['MalfunctionIncidents'], data['DeviceAgeMonths']]])
        # Standardize the input data
        input_data_scaled = sc.transform(input_data)
        # Predict
        prediction = rf.predict(input_data_scaled)[0]
        # Map prediction to label
        efficiency_mapping = {0: 'Inefficient', 1: 'Efficient'}
        result = efficiency_mapping[prediction]
        return {'prediction': result}
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)
