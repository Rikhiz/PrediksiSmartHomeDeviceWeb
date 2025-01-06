from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
from database import init_db, save_prediction, get_predictions

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()

# Load the scaler and model
scaler_path = 'models/scaler.joblib'
model_path = 'models/random_forest_model.joblib'

try:
    sc = joblib.load(scaler_path)
    rf = joblib.load(model_path)
except Exception as e:
    print(f"Error loading models: {e}")
    sc = None
    rf = None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if sc is None or rf is None:
            return {'error': 'Models not loaded properly'}, 500

        data = request.json
        input_data = np.array([[
            float(data['DeviceType']),
            float(data['UsageHoursPerDay']),
            float(data['EnergyConsumption']),
            float(data['UserPreferences']),
            float(data['MalfunctionIncidents']),
            float(data['DeviceAgeMonths'])
        ]])

        input_data_scaled = sc.transform(input_data)
        prediction = rf.predict(input_data_scaled)[0]
        efficiency_mapping = {0: 'Inefficient', 1: 'Efficient'}
        result = efficiency_mapping[prediction]
        
        return {'prediction': result}
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/save-prediction', methods=['POST'])
def save_prediction_route():
    try:
        data = request.json
        save_prediction(data)
        return {'message': 'Prediction saved successfully'}, 200
    except Exception as e:
        return {'error': str(e)}, 500

@app.route('/prediction-history', methods=['GET'])
def get_prediction_history():
    try:
        predictions = get_predictions()
        return {'records': predictions}, 200
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True)