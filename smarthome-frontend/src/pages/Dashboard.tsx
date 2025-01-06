import '../tailwind.css'; // Import the Tailwind CSS

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-mono font-bold mb-8">SmartHome  Predict</h1>
      
      <div className="rounded-lg p-6 mb-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">APA ITU SMARTHOME?</h2>
            <p className="text-gray-600">
              Smart Home adalah sistem otomatisasi rumah yang mengintegrasikan 
              berbagai perangkat untuk kontrol dan pemantauan jarak jauh. 
              Sistem ini memungkinkan penghematan energi dan peningkatan kenyamanan.
            </p>
          </div>
         
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">PEMANFAATAN SMARTHOME TANPA KERUGIAN</h2>
        <div className="flex gap-8">
          <img 
            src="/api/placeholder/400/300" 
            alt="Smart Home Benefits" 
            className="w-1/2 rounded-lg"
          />
          <div className="flex-1">
            <p className="text-gray-600">
              Dengan manajemen yang tepat, Smart Home dapat memberikan 
              keuntungan maksimal tanpa pemborosan energi. Sistem prediksi 
              kami membantu mengoptimalkan penggunaan perangkat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;