import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Home, BarChart2, History } from "lucide-react";
import gambar from "../gambar/lampu.png";
import logo from "../gambar/cek.png";


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

const Head2: React.FC = () => {
  
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/prediction-history"
        );
        const fetchedRecords: PredictionRecord[] = response.data.records;
        
        // Calculate statistics
        const efficientCount = fetchedRecords.filter(
          (record) => record.prediction === "Efficient"
        ).length;
        const totalCount = fetchedRecords.length;
        const inefficientCount = totalCount - efficientCount;

        setStats([
          { name: "Total Perangkat", value: totalCount },
          { name: "Efficient Perangkat", value: efficientCount },
          { name: "Inefficient Perangkat", value: inefficientCount },
        ]);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/predict", icon: BarChart2, label: "Predict" },
    { path: "/history", icon: History, label: "History" },
  ];

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <h2 className="font-bold text-5xl font-serif tracking-tight text-black sm:text-7xl">
            Smart Home Predict
          </h2>
          <p className="mt-8 text-pretty text-lg font-semibold font-serif text-white sm:text-xl/8">
            
Prediksikan penggunaan energi rumah pintar Anda di sini!
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold font-serif text-black sm:grid-cols-2 md:flex lg:gap-x-10">
            {navItems.map((item) => (
              <Link key={item.label} to={item.path}>
                {item.label} <span aria-hidden="true">&rarr;</span>
              </Link>
            ))}
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse gap-1">
                <dt className="text-base/7 text-black font-semibold">{stat.name}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
            <div className="w-20">
            <img
  src={gambar}
  alt="Lampu"
  className="absolute top-60 right-15 lg:w-1/5 -mt-20 mr-10"
/>

            </div>
           
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Head2;
