import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PredictionPage from './pages/PredictionPage';
import HistoryPage from './pages/HistoryPage';
import Navigation from './components/Navigation';
import Head2 from './components/Head2';
import Footer from './components/Footer';
import './App.css';
import gambar from './gambar/lampu.png'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#dbb584 ] flex flex-col justify-between">
        <Navigation />
        <br /><br /><br />
        <div className="flex-grow">
          <Head2 />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predict" element={<PredictionPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </div>
        </div>
        <br />
        <br />

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;