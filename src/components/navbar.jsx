import React from 'react';
import { Leaf, User, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Branding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-lg shadow-sm">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                EcoLoop
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Refill. Return. Reduce. ♻️
              </p>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              aria-label="View Cart"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              className="p-2 text-gray-600 hover:text-green-600 transition-colors"
              aria-label="Your Profile"
              title="Your Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

