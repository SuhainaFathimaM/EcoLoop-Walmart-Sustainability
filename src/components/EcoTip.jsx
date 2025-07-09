import React from 'react';
import { Lightbulb, Leaf, Award } from 'lucide-react';

const EcoTip = ({ selectedType, emissions }) => {
  const standardEmissions = 2.5;
  const savings = standardEmissions - emissions;
  const savingsPercentage = ((savings / standardEmissions) * 100).toFixed(1);

  const tips = {
    standard: {
      icon: Lightbulb,
      title: "You Can Do Even Better 💡",
      message: "Try switching to minimal or grouped packaging — it's a simple step that cuts emissions by up to 40%",
      color: "blue"
    },
    minimal: {
      icon: Leaf,
      title: "Nice pick! 🌿",
      message: `Minimal packaging reduces your CO₂ by ₹{savingsPercentage}%. Small choices, big change.`,
      color: "green"
    },
    tote: {
      icon: Award,
      title: "Reusable Wins 🛍️",
      message: `Tote packaging saves ₹{savingsPercentage}% of CO₂ and skips plastic completely.`,
      color: "green"
    },
    grouped: {
      icon: Award,
      title: "Greenest of All ♻️",
      message: `Grouped delivery saves ₹{savingsPercentage}% — the most sustainable choice on the list!`,
      color: "emerald"
    }
  };

  const tip = tips[selectedType];
  const Icon = tip.icon;

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-800"
  };

  return (
    <div className={`p-4 rounded-xl border ₹{colorClasses[tip.color]} shadow-sm transition-all`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-semibold mb-1">{tip.title}</h4>
          <p className="text-sm">{tip.message}</p>

          {savings > 0 && (
            <div className="mt-2 text-xs opacity-80">
              <span className="font-medium">🌍 Impact: </span>
              You’re saving <strong>{savings.toFixed(1)}kg</strong> of CO₂ per order.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EcoTip;

