import { useState, useEffect } from 'react';
import axios from 'axios';

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

const deviceTypeLabels: { [key: string]: string } = {
  '0': 'Lampu',
  '1': 'Termostat',
  '2': 'Speaker Pintar',
  '3': 'Kamera',
  '4': 'Sistem Keamanan'
};

const userPreferenceLabels: { [key: string]: string } = {
  '0': 'Rendah',
  '1': 'Tinggi'
};

const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<PredictionRecord[]>([]);
  const [stats, setStats] = useState({ efficient: 0, inefficient: 0 });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/prediction-history');
        setRecords(response.data.records);

        // Calculate statistics
        const efficient = response.data.records.filter(
          (r: PredictionRecord) => r.prediction === 'Efficient'
        ).length;
        const total = response.data.records.length;
        setStats({
          efficient: (efficient / total) * 100,
          inefficient: ((total - efficient) / total) * 100
        });
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Riwayat Data</h1>

      {/* Statistik */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Data Efisien</h2>
          <p className="text-4xl font-bold text-blue-700">{stats.efficient.toFixed(1)}%</p>
        </div>
        <div className="bg-red-100 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Data Tidak Efisien</h2>
          <p className="text-4xl font-bold text-red-700">{stats.inefficient.toFixed(1)}%</p>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Riwayat Prediksi</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3 border border-gray-300">Timestamp</th>
              <th className="text-left p-3 border border-gray-300">Tipe Perangkat</th>
              <th className="text-left p-3 border border-gray-300">Jam Penggunaan/Hari</th>
              <th className="text-left p-3 border border-gray-300">Konsumsi Energi</th>
              <th className="text-left p-3 border border-gray-300">Preferensi Pengguna</th>
              <th className="text-left p-3 border border-gray-300">Insiden Kerusakan</th>
              <th className="text-left p-3 border border-gray-300">Usia Perangkat (Bulan)</th>
              <th className="text-left p-3 border border-gray-300">Prediksi</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="p-3 border border-gray-300">
                  {new Date(record.timestamp).toLocaleString()}
                </td>
                <td className="p-3 border border-gray-300">
                  {deviceTypeLabels[record.deviceType] || 'Tidak Diketahui'}
                </td>
                <td className="p-3 border border-gray-300">{record.usageHoursPerDay}</td>
                <td className="p-3 border border-gray-300">{record.energyConsumption} kWh</td>
                <td className="p-3 border border-gray-300">
                  {userPreferenceLabels[record.userPreferences] || 'Tidak Diketahui'}
                </td>
                <td className="p-3 border border-gray-300">{record.malfunctionIncidents}</td>
                <td className="p-3 border border-gray-300">{record.deviceAgeMonths} bulan</td>
                <td
                  className={`p-3 border border-gray-300 font-bold ${
                    record.prediction === 'Efficient'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {record.prediction}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Tidak ada data tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
