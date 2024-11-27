from flask import Flask, request, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Memuat model dari file
model_path = 'models/decision_tree_model.joblib'
dtr_model = joblib.load(model_path)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Ambil data input dari form HTML
        umur = int(request.form['umur'])
        jenis_kelamin = int(request.form['jenis_kelamin'])
        tinggi_badan = float(request.form['tinggi_badan'])

        # Masukkan data ke dalam array untuk prediksi
        input_data = np.array([[umur, jenis_kelamin, tinggi_badan]])

        # Lakukan prediksi
        prediction = dtr_model.predict(input_data)[0]

        # Mapping hasil prediksi ke label
        status_gizi_mapping = {0: 'Normal', 1: 'Severely Stunted', 2: 'Stunted', 3: 'Tinggi'}
        result = status_gizi_mapping[prediction]

        return render_template('index.html', prediction_text=f'Status Gizi: {result}')
    except Exception as e:
        return render_template('index.html', prediction_text=f"Error: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)
