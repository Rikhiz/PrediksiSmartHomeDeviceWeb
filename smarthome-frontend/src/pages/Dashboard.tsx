import '../tailwind.css'; // Import the Tailwind CSS
import g1 from '../gambar/g1.png'
import g2 from '../gambar/g2.png'
import gambar from '../gambar/cek.png'
import { ArrowDownCircleIcon, ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { ArrowUpIcon } from 'lucide-react';
const features = [
  {
    name: 'Problem Definition',
    description:
      'Menentukan masalah yang akan diselesaikan dalam konteks smart home, seperti optimalisasi penggunaan energi dan identifikasi pola penggunaan perangkat untuk meningkatkan efisiensi.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Data Collection',
    description:
      'Mengumpulkan data dari berbagai perangkat smart home termasuk pola penggunaan, konsumsi energi, dan preferensi pengguna untuk analisis lebih lanjut.',
    icon: LockClosedIcon,
  },
  {
    name: 'Data Preprocessing',
    description:
      'Membersihkan dan mempersiapkan data, termasuk penanganan missing values, normalisasi data, dan encoding fitur kategorikal untuk digunakan dalam model.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Model Training',
    description:
      'Melatih model machine learning menggunakan algoritma yang sesuai untuk memprediksi dan mengoptimalkan penggunaan perangkat smart home secara efisien.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Random Forest',
    description:
      'Berdasarkan hasil eksperimen yang telah dilakukan, Random Forest dipilih sebagai model terbaik untuk memprediksi efisiensi perangkat rumah pintar karena beberapa alasan utama. Pertama, model ini mampu memberikan akurasi tinggi sebesar 95%, yang menunjukkan kemampuannya dalam mengklasifikasikan data dengan tepat',
    icon: ArrowDownCircleIcon,
  },
  {
    name: 'Evaluasi Model',
    description:
      'Model Random Forest yang digunakan untuk memprediksi efisiensi perangkat rumah pintar dievaluasi melalui berbagai metrik, seperti akurasi, precision, recall, F1-score, dan confusion matrix.',
    icon: ArrowDownCircleIcon,
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <h1 className="text-5xl text-center font-Serif font-bold mb-8">SmartHome</h1>
      
      <div className="rounded-lg p-6 mb-8 bg-white">
        <div className="flex gap-8">
        <img 
            src={g1} 
            alt="Smart Home Benefits" 
            className="w-1/2 rounded-lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4">APA ITU SMARTHOME?</h2>
            <p className="text-gray-600">
            Smart home (rumah pintar) adalah sebuah konsep modern dalam desain dan pengelolaan rumah yang mengintegrasikan berbagai perangkat teknologi canggih, sehingga memungkinkan berbagai elemen dalam rumah untuk saling terhubung dan berkomunikasi melalui jaringan internet. Perangkat-perangkat ini dapat dikendalikan secara otomatis, sesuai dengan preferensi penghuninya, atau secara jarak jauh menggunakan aplikasi di smartphone, tablet, atau bahkan perintah suara melalui asisten virtual seperti Amazon Alexa, Google Assistant, atau Apple Siri.
            </p>
          </div>
       
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
      
        <div className="flex gap-8">
          <img 
            src={g2} 
            alt="Smart Home Benefits" 
            className="w-1/2 rounded-lg"
          />
          
          <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">PEMANFAATAN SMARTHOME TANPA MERUSAK LINGKUNGAN</h2>
            <p className="text-gray-600">
            Untuk memanfaatkan smart home tanpa merusak lingkungan, fokuslah pada penggunaan perangkat yang efisien energi dan ramah lingkungan. Pilih lampu pintar dengan teknologi LED yang lebih hemat energi, serta thermostat pintar yang dapat mengatur suhu rumah secara otomatis, mengurangi pemborosan energi saat rumah kosong. Gunakan sensor gerak untuk menyalakan lampu hanya saat dibutuhkan dan matikan perangkat secara otomatis ketika tidak digunakan. Selain itu, pastikan perangkat elektronik yang digunakan memiliki label efisiensi energi, seperti Energy Star. Dengan memanfaatkan otomatisasi dan pengendalian jarak jauh, Anda bisa mengoptimalkan penggunaan energi, mengurangi jejak karbon, dan membantu menciptakan rumah yang lebih berkelanjutan.
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className=" rounded-lg  py-24 sm:py-32">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className=" mx-auto max-w-2xl lg:text-center">
        
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Menggunakan Teknologi Machine Learning
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
          Machine learning adalah cabang dari kecerdasan buatan (Artificial Intelligence) yang berfokus pada pengembangan sistem yang dapat belajar dan membuat prediksi berdasarkan data. Sistem ini memanfaatkan algoritma untuk menganalisis, mempelajari pola, dan membuat keputusan tanpa harus diprogram secara eksplisit untuk setiap tugas tertentu. Inti dari machine learning adalah kemampuan untuk meningkatkan performa berdasarkan pengalaman yang diperoleh dari data.

          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    </div>

    
  );
};

export default Dashboard;