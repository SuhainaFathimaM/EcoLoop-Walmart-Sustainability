import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

import PackagingOption from '../components/PackagingOption';
import EmissionChart from '../components/emissionChart';
import EcoTip from '../components/EcoTip';
import CheckoutSummary from '../components/CheckOutSummary';

import emissionsData from '../data/emissions.json';
import mockProducts from '../data/mockProducts.json';

const PackLite = () => {
  const [selectedPackaging, setSelectedPackaging] = useState('standard');

  const packagingOptions = emissionsData.packagingTypes;
  const bestOption = 'grouped'; // Eco-friendliest

  const chartData = Object.entries(packagingOptions).map(([key, option]) => ({
    name: option.name.replace(' Packaging', '').replace(' Delivery', ''),
    emissions: option.emissions,
    selected: key === selectedPackaging,
  }));

  const handleCheckout = () => {
    alert('🎉 Your eco-conscious order has been placed. Thanks for making a green choice!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Header */}
        <div className="flex items-center space-x-3 mb-8">
          <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors" title="Go Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">PackLite Checkout</h1>
            <p className="text-sm text-gray-600">Choose a packaging style that’s better for the planet 🌎</p>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Options + Visuals */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. Packaging Options */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Step 1: Select Your Packaging</h2>
              <div className="space-y-4">
                {Object.entries(packagingOptions).map(([key, option]) => (
                  <PackagingOption
                    key={key}
                    type={key}
                    name={option.name}
                    emissions={option.emissions}
                    description={option.description}
                    impact={option.impact}
                    isSelected={selectedPackaging === key}
                    isRecommended={key === bestOption}
                    onSelect={() => setSelectedPackaging(key)}
                  />
                ))}
              </div>
            </div>

            {/* 2. Emissions Chart */}
            <EmissionChart data={chartData} />

            {/* 3. Eco Tip */}
            <EcoTip
              selectedType={selectedPackaging}
              emissions={packagingOptions[selectedPackaging].emissions}
            />

            {/* 4. Order Items */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Step 2: Review Your Items ({mockProducts.cartItems.length})
              </h3>
              <div className="space-y-3">
                {mockProducts.cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <CheckoutSummary
              orderTotal={mockProducts.orderTotal}
              selectedPackaging={packagingOptions[selectedPackaging].name}
              emissions={packagingOptions[selectedPackaging].emissions}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackLite;
