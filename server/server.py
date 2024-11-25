from flask import Flask, request, render_template
import pickle
import numpy as np

app = Flask(__name__)

# Memuat model yang sudah disimpan
model_filename = 'decision_tree_model.pkl'
with open(model_filename, 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        umur_bulan = float(request.form['umur_bulan'])
        tinggi_badan = float(request.form['tinggi_badan'])
        jenis_kelamin = int(request.form['jenis_kelamin'])

        input_data = np.array([[umur_bulan, tinggi_badan, jenis_kelamin]])

        prediction = model.predict(input_data)
        status_gizi = ['Normal', 'Severely Stunted', 'Stunted', 'Tinggi'][prediction[0]]
        
        return render_template('index.html', prediction=status_gizi)

if __name__ == '__main__':
    app.run(debug=True)
