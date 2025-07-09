import React from 'react';
import { ShoppingCart, Leaf, Award, ArrowRight } from 'lucide-react';

const CheckoutSummary = ({
  orderTotal,
  selectedPackaging,
  emissions,
  onCheckout,
}) => {
  const standardEmissions = 2.5;
  const savings = standardEmissions - emissions;
  const savingsPercentage = ((savings / standardEmissions) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-5 h-5 text-gray-600" />
        <h3 className="text-xl font-semibold text-gray-900">Your Order</h3>
      </div>

      <div className="space-y-3 mb-6 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Items Total</span>
          <span>₹{orderTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>₹50</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (8%)</span>
          <span>₹{(orderTotal * 0.08).toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 flex justify-between font-semibold text-base text-gray-900">
          <span>Total</span>
          <span>₹{(orderTotal + 50 + orderTotal * 0.08).toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-800">Your Eco Impact 🌱</span>
        </div>
        <div className="text-sm text-green-700 space-y-1">
          <p><strong>Packaging:</strong> {selectedPackaging}</p>
          <p><strong>CO₂ Emissions:</strong> {emissions} kg</p>
          {savings > 0 && (
            <p className="font-medium text-green-800">
              ✅ You reduced emissions by {savingsPercentage}% – amazing!
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <span>Place Eco-Friendly Order</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="mt-4 text-center text-sm text-gray-600">
        <div className="flex items-center justify-center gap-2">
          <Award className="w-4 h-4" />
          <span>
            +{Math.round(savings * 10)} LoopPoints earned for your green choice 💚
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;


