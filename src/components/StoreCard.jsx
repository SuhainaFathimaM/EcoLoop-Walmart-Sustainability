import React from 'react';
import { MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { formatDistance } from '../utils/calculations';

const StoreCard = ({ store, onSelect }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onSelect(store)}
    >
      {/* Image + distance badge */}
      <div className="relative h-32 overflow-hidden">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-green-600">
          {formatDistance(store.distance)}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Title + rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{store.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{store.rating}</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center space-x-1 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{store.address}</span>
        </div>

        {/* Hours */}
        <div className="flex items-center space-x-1 text-gray-600 mb-3">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{store.hours}</span>
        </div>

        {/* Products list */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Available Products:</p>
          <div className="flex flex-wrap gap-1">
            {store.products.slice(0, 3).map((product) => (
              <span
                key={product.id}
                className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
              >
                {product.name}
              </span>
            ))}
            {store.products.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{store.products.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <button
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          onClick={() => onSelect(store)}
        >
          <span>Book Refill</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ---------- Runtime prop checks (optional but handy) ---------- */
StoreCard.propTypes = {
  store: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    hours: PropTypes.string,
    distance: PropTypes.number.isRequired,
    rating: PropTypes.number,
    image: PropTypes.string,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default StoreCard;
