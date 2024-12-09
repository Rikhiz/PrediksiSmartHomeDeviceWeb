import React, { useState } from 'react';
import axios from 'axios';

const PredictForm: React.FC = () => {
  const [formData, setFormData] = useState({
    DeviceType: '',
    UsageHoursPerDay: '',
    EnergyConsumption: '',
    UserPreferences: '',
    MalfunctionIncidents: '',
    DeviceAgeMonths: ''
  });

  const [prediction, setPrediction] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (error) {
      setPrediction('Error occurred while making prediction.');
    }
  };
  
  return (
    <div>
      <h1>Smart Home Device Efficiency Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="DeviceType"
          placeholder="Device Type"
          onChange={handleChange}
        />
        <input
          type="text"
          name="UsageHoursPerDay"
          placeholder="Usage Hours Per Day"
          onChange={handleChange}
        />
        <input
          type="text"
          name="EnergyConsumption"
          placeholder="Energy Consumption"
          onChange={handleChange}
        />
        <input
          type="text"
          name="UserPreferences"
          placeholder="User Preferences"
          onChange={handleChange}
        />
        <input
          type="text"
          name="MalfunctionIncidents"
          placeholder="Malfunction Incidents"
          onChange={handleChange}
        />
        <input
          type="text"
          name="DeviceAgeMonths"
          placeholder="Device Age (Months)"
          onChange={handleChange}
        />
        <button type="submit">Predict</button>
      </form>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default PredictForm;
