import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
  DeviceType: string;
  UsageHoursPerDay: string;
  EnergyConsumption: string;
  UserPreferences: string;
  MalfunctionIncidents: string;
  DeviceAgeMonths: string;
}

const deviceTypeLabels: { [key: string]: string } = {
  '0': 'Speaker Pintar',
  '1': 'Kamera',
  '2': 'Lampu',
  '3': 'Sistem Keamanan',
  '4': 'Termostat',
};

const userPreferenceLabels: { [key: string]: string } = {
  '0': 'Rendah',
  '1': 'Tinggi',
};

const PredictionPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    DeviceType: '',
    UsageHoursPerDay: '',
    EnergyConsumption: '',
    UserPreferences: '',
    MalfunctionIncidents: '',
    DeviceAgeMonths: '',
  });

  const [prediction, setPrediction] = useState<string>('');
  const [predictionDetails, setPredictionDetails] = useState<FormData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Validasi input berdasarkan field
    let validatedValue = value;
    if (name === 'UsageHoursPerDay') {
      const hours = parseFloat(value);
      if (hours > 24) validatedValue = '24';
      else if (hours < 0) validatedValue = '0';
    } else if (name === 'EnergyConsumption') {
      const kwh = parseFloat(value);
      if (kwh > 10) validatedValue = '10';
      else if (kwh < 0) validatedValue = '0';
    } else if (name === 'MalfunctionIncidents') {
      const incidents = parseFloat(value);
      if (incidents > 4) validatedValue = '4';
      else if (incidents < 0) validatedValue = '0';
    }

    setFormData({ ...formData, [name]: validatedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setPrediction(response.data.prediction);

      // Save the prediction to the database
      const predictionData = {
        ...formData,
        prediction: response.data.prediction,
        timestamp: new Date().toISOString(),
      };
      await axios.post('http://127.0.0.1:5000/save-prediction', predictionData);

      setPredictionDetails(predictionData);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('Terjadi kesalahan saat membuat prediksi.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-5xl text-center font-Serif font-bold mb-8">Prediksi Efisiensi Perangkat Smart Home</h1>
      <form onSubmit={handleSubmit} className="rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-6 gap-7 col-span-3">
          <div className='col-start-1 col-end-4'>
            <label className="block text-sm font-medium mb-1">Jenis Perangkat</label>
            <select
              name="DeviceType"
              className="w-full p-2 border rounded"
              value={formData.DeviceType}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Jenis Perangkat</option>
              <option value="0">Speaker Pintar</option>
              <option value="1">Kamera</option>
              <option value="2">Lampu</option>
              <option value="3">Sistem Keamanan</option>
              <option value="4">Termostat</option>
            </select>
          </div>

          <div className='col-start-4 col-end-8 col-span-2'>
            <label className="block text-sm font-medium mb-1">Penggunaan Per Hari (Jam)</label>
            <input
              type="number"
              name="UsageHoursPerDay"
              className="w-full p-2 border rounded"
              placeholder="Contoh: 8"
              value={formData.UsageHoursPerDay}
              onChange={handleChange}
              min="0"
              max="24"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 24 jam</p>
          </div>

          <div className='col-start-1 col-end-4'>
            <label className="block text-sm font-medium mb-1">Konsumsi Energi (kWh)</label>
            <input
              type="number"
              name="EnergyConsumption"
              className="w-full p-2 border rounded"
              placeholder="Contoh: 5.5"
              value={formData.EnergyConsumption}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 10 kWh</p>
          </div>

          <div className='col-start-4 col-end-8 col-span-2'>
            <label className="block text-sm font-medium mb-1">Intensitas Penggunaan</label>
            <select
              name="UserPreferences"
              className="w-full p-2 border rounded"
              value={formData.UserPreferences}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Intensitas</option>
              <option value="0">Rendah</option>
              <option value="1">Tinggi</option>
            </select>
          </div>

          <div className='col-start-1 col-end-4'>
            <label className="block text-sm font-medium mb-1">Jumlah Kejadian Malfungsi</label>
            <input
              type="number"
              name="MalfunctionIncidents"
              className="w-full p-2 border rounded"
              placeholder="Contoh: 2"
              value={formData.MalfunctionIncidents}
              onChange={handleChange}
              min="0"
              max="4"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Maksimal 4 kejadian</p>
          </div>

          <div className='col-start-4 col-end-8 col-span-2'>
            <label className="block text-sm font-medium mb-1">Usia Perangkat (Bulan)</label>
            <input
              type="number"
              name="DeviceAgeMonths"
              className="w-full p-2 border rounded"
              placeholder="Contoh: 24"
              value={formData.DeviceAgeMonths}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-white text-blue py-2 rounded hover:bg-blue-700 hover:text-white transition-colors"
          >
            Prediksi
          </button>
        </div>
      </form>

      {prediction && (
        <div className="mt-6 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Hasil Prediksi:</h2>
          <p className="text-lg font-bold">{prediction}</p>

          {predictionDetails && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Detail Prediksi</h3>
              <ul className="list-disc ml-5 space-y-2">
                <li>
                  <strong>Jenis Perangkat:</strong> {deviceTypeLabels[predictionDetails.DeviceType]}
                </li>
                <li>
                  <strong>Penggunaan Per Hari:</strong> {predictionDetails.UsageHoursPerDay} jam
                </li>
                <li>
                  <strong>Konsumsi Energi:</strong> {predictionDetails.EnergyConsumption} kWh
                </li>
                <li>
                  <strong>Intensitas Penggunaan:</strong> {userPreferenceLabels[predictionDetails.UserPreferences]}
                </li>
                <li>
                  <strong>Jumlah Kejadian Malfungsi:</strong> {predictionDetails.MalfunctionIncidents}
                </li>
                <li>
                  <strong>Usia Perangkat:</strong> {predictionDetails.DeviceAgeMonths} bulan
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictionPage;