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
  '0': 'Smart Speaker',
  '1': 'Camera',
  '2': 'Lights',
  '3': 'Security System',
  '4': 'Thermostat',
};

const userPreferenceLabels: { [key: string]: string } = {
  '0': 'Low Preference',
  '1': 'High Preference',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      setPrediction('An error occurred while making the prediction.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Predict Smart Home Device Efficiency</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Device Type</label>
            <select
              name="DeviceType"
              className="w-full p-2 border rounded"
              value={formData.DeviceType}
              onChange={handleChange}
            >
              <option value="">Select Device Type</option>
              <option value="0">Smart Speaker</option>
              <option value="1">Camera</option>
              <option value="2">Lights</option>
              <option value="3">Security System</option>
              <option value="4">Thermostat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Usage Hours Per Day</label>
            <input
              type="number"
              name="UsageHoursPerDay"
              className="w-full p-2 border rounded"
              placeholder="e.g., 8"
              value={formData.UsageHoursPerDay}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Energy Consumption (kWh)</label>
            <input
              type="number"
              name="EnergyConsumption"
              className="w-full p-2 border rounded"
              placeholder="e.g., 12.5"
              value={formData.EnergyConsumption}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">User Preferences</label>
            <select
              name="UserPreferences"
              className="w-full p-2 border rounded"
              value={formData.UserPreferences}
              onChange={handleChange}
            >
              <option value="">Select User Preference</option>
              <option value="0">Low Preference</option>
              <option value="1">High Preference</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Malfunction Incidents</label>
            <input
              type="number"
              name="MalfunctionIncidents"
              className="w-full p-2 border rounded"
              placeholder="e.g., 2"
              value={formData.MalfunctionIncidents}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Device Age (Months)</label>
            <input
              type="number"
              name="DeviceAgeMonths"
              className="w-full p-2 border rounded"
              placeholder="e.g., 24"
              value={formData.DeviceAgeMonths}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </form>

      {prediction && (
        <div className="mt-6 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Prediction Result:</h2>
          <p className="text-lg font-bold">{prediction}</p>

          {predictionDetails && (
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Prediction Details</h3>
              <ul className="list-disc ml-5">
                <li>
                  <strong>Device Type:</strong> {deviceTypeLabels[predictionDetails.DeviceType]}
                </li>
                <li>
                  <strong>Usage Hours Per Day:</strong> {predictionDetails.UsageHoursPerDay} hours
                </li>
                <li>
                  <strong>Energy Consumption:</strong> {predictionDetails.EnergyConsumption} kWh
                </li>
                <li>
                  <strong>User Preferences:</strong> {userPreferenceLabels[predictionDetails.UserPreferences]}
                </li>
                <li>
                  <strong>Malfunction Incidents:</strong> {predictionDetails.MalfunctionIncidents}
                </li>
                <li>
                  <strong>Device Age:</strong> {predictionDetails.DeviceAgeMonths} months
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
