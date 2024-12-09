from flask import Flask, request, render_template
import joblib
import numpy as np

app = Flask(__name__)
# Load the scaler and model
scaler_path = 'models/scaler.joblib'
sc = joblib.load(scaler_path)
# Memuat model dari file
model_path = 'models/random_forest_model.joblib'
rf = joblib.load(model_path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data input dari form HTML
        DeviceType = int(request.form['DeviceType'])
        UsageHoursPerDay = float(request.form['UsageHoursPerDay'])
        EnergyConsumption = float(request.form['EnergyConsumption'])
        UserPreferences = int(request.form['UserPreferences'])
        MalfunctionIncidents = int(request.form['MalfunctionIncidents'])
        DeviceAgeMonths = int(request.form['DeviceAgeMonths'])

        # Masukkan data ke dalam array untuk prediksi
        input_data = np.array([[DeviceType, UsageHoursPerDay, EnergyConsumption, UserPreferences, MalfunctionIncidents, DeviceAgeMonths]])

        # Standardisasi data menggunakan scaler yang sudah dilatih
        input_data_scaled = sc.transform(input_data)

        # Lakukan prediksi
        prediction = rf.predict(input_data_scaled)[0]

        # Mapping hasil prediksi ke label
        efficiency_mapping = {0: 'Inefficient', 1: 'Efficient'}
        result = efficiency_mapping[prediction]

        return render_template('index.html', prediction_text=f'Smart Home Efficiency: {result}')
    except Exception as e:
        return render_template('index.html', prediction_text=f"Error: {str(e)}")


if __name__ == '__main__':
    app.run(debug=True)
