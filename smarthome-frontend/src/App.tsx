import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PredictionPage from './pages/PredictionPage';
import HistoryPage from './pages/HistoryPage';
import Navigation from './components/Navigation';
import Head2 from './components/Head2';
import './App.css';
import gambar from './gambar/lampu.png'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f5e6d3]">
        <Navigation />
        <Head2 />
        <div className="">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/predict" element={<PredictionPage />} />
            <Route path="/history" element={<HistoryPage />} />
            
          </Routes>
         
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;