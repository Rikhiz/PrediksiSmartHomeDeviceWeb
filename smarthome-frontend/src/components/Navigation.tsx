import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, History } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/predict', icon: BarChart2, label: 'Predict' },
    { path: '/history', icon: History, label: 'History' }
  ];

  return (
    <div className="flex justify-center gap-4 py-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-3 rounded-full ${
              isActive ? 'bg-white shadow-md' : 'hover:bg-white/50'
            }`}
          >
            <Icon size={24} />
            
            <span className="text-sm mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;