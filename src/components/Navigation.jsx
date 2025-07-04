import React from 'react';
import { Recycle, RotateCcw, BarChart3 } from 'lucide-react';
import PropTypes from 'prop-types';

const Navigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'refill', label: 'Refill', icon: Recycle },
    { id: 'return', label: 'Return', icon: RotateCcw },
    { id: 'dashboard', label: 'Impact', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Eco Loop</h1>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

/* ---------- Runtime prop‑checking (optional but helpful) ---------- */
Navigation.propTypes = {
  activeTab: PropTypes.oneOf(['refill', 'return', 'dashboard']).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default Navigation;
