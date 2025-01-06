import React, { useState, useEffect } from "react";
import axios from "axios";

interface PredictionRecord {
  id: number;
  timestamp: string;
  deviceType: string;
  usageHoursPerDay: string;
  energyConsumption: string;
  userPreferences: string;
  malfunctionIncidents: number;
  deviceAgeMonths: number;
  prediction: string;
}
const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [stats, setStats] = useState({ efficient: 0, inefficient: 0 });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/prediction-history"
        );
        setRecords(response.data.records);

        // Calculate statistics
        const efficient = response.data.records.filter(
          (r: PredictionRecord) => r.prediction === "Efficient"
        ).length;
        const total = response.data.records.length;
        setStats({
          efficient: (efficient / total) * 100,
          inefficient: ((total - efficient) / total) * 100,
        });
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const deviceTypeLabels: { [key: string]: string } = {
    "0": "Lampu",
    "1": "Termostat",
    "2": "Speaker Pintar",
    "3": "Kamera",
    "4": "Sistem Keamanan",
  };
  const userPreferenceLabels: { [key: string]: string } = {
    "0": "Rendah",
    "1": "Tinggi",
  };

  return (
    <div className="min-h-screen ">
      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          SmartHome Predict
        </h1>
        
        <h2 className="text-xl font-semibold text-center mb-6">HISTORY DATA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-medium">DATA INEFICIENT</h3>
            <p className="text-4xl font-bold">{stats.inefficient}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h3 className="text-lg font-medium">DATA EFFICIENT</h3>
            <p className="text-4xl font-bold">{stats.efficient}%</p>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="hidden md:table w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">WAKTU PEMBUATAN</th>
                <th className="px-4 py-2">TIPE DEVICE</th>
                <th className="px-4 py-2">PENGGUNAAN (JAM)</th>
                <th className="px-4 py-2">KONSUMSI ENERGI</th>
                <th className="px-4 py-2">KESERINGAN PENGGUNAAN</th>
                <th className="px-4 py-2">KEJADIAN MALFUNGSI</th>
                <th className="px-4 py-2">UMUR PERANGKAT (BULAN)</th>
                <th className="px-4 py-2">HASIL</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{record.timestamp}</td>
                  <td className="px-4 py-2">
                    {deviceTypeLabels[record.deviceType]}
                  </td>
                  <td className="px-4 py-2">{record.usageHoursPerDay}</td>
                  <td className="px-4 py-2">{record.energyConsumption}</td>
                  <td className="px-4 py-2">
                    {userPreferenceLabels[record.userPreferences]}
                  </td>
                  <td className="px-4 py-2">{record.malfunctionIncidents}</td>
                  <td className="px-4 py-2">{record.deviceAgeMonths}</td>
                  <td className="px-4 py-2">{record.prediction}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card Style for Smaller Screens */}
          <div className="md:hidden space-y-4">
            {records.map((record, index) => (
              <div
                key={record.id}
                className="border border-gray-200 rounded-lg p-4 shadow"
              >
                <p>
                  <strong>Waktu Pembuatan:</strong> {record.timestamp}
                </p>
                <p>
                  <strong>Tipe Device:</strong>{" "}
                  {deviceTypeLabels[record.deviceType]}
                </p>
                <p>
                  <strong>Penggunaan (Jam):</strong> {record.usageHoursPerDay}
                </p>
                <p>
                  <strong>Konsumsi Energi:</strong> {record.energyConsumption}
                </p>
                <p>
                  <strong>Keseringan Penggunaan:</strong>{" "}
                  {userPreferenceLabels[record.userPreferences]}
                </p>
                <p>
                  <strong>Kejadian Malfungsi:</strong>{" "}
                  {record.malfunctionIncidents}
                </p>
                <p>
                  <strong>Umur Perangkat (Bulan):</strong>{" "}
                  {record.deviceAgeMonths}
                </p>
                <p>
                  <strong>Hasil:</strong> {record.prediction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
