import React from 'react';
import { Package, PackageOpen, ShoppingBag, Truck, Info } from 'lucide-react';

const iconMap = {
  standard: Package,
  minimal: PackageOpen,
  tote: ShoppingBag,
  grouped: Truck,
};

const PackagingOption = ({
  type,
  name,
  emissions,
  description,
  impact,
  isSelected,
  isRecommended,
  onSelect,
}) => {
  const Icon = iconMap[type];

  return (
    <div
      onClick={onSelect}
      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? 'border-green-600 bg-green-50 shadow-md'
          : 'border-gray-200 hover:border-green-300'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
          💚 Best Choice
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${isSelected ? 'bg-green-600' : 'bg-gray-100'}`}>
          <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-green-600">{emissions}kg</span>
              <span className="text-xs text-gray-500 mb-0.5">CO₂</span>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-3">
            {description}
          </p>

          <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <Info className="w-4 h-4 text-blue-500 mt-0.5" />
            <span className="text-sm text-gray-700 leading-snug">
              {impact}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagingOption;

