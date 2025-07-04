import React, { useState } from 'react';
import { generateBarcode } from '../utils/calculations';
import {
  Scan as Scanner,
  Truck,
  MapPin,
  Award,
  ArrowLeft,
} from 'lucide-react';
import { format, addDays } from 'date-fns';
import PropTypes from 'prop-types';

const ReturnPage = ({ onShowToast }) => {
  const [barcode, setBarcode] = useState('');
  const [returnItems, setReturnItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [step, setStep] = useState('scan'); // 'scan' | 'schedule' | 'confirmation'

  /* ---------- mock container types ---------- */
  const containerTypes = [
    { id: 'detergent', name: 'Detergent Bottle', plasticSaved: 0.8, points: 80 },
    { id: 'shampoo', name: 'Shampoo Bottle', plasticSaved: 0.6, points: 60 },
    { id: 'dish-soap', name: 'Dish Soap Container', plasticSaved: 0.5, points: 50 },
    { id: 'body-wash', name: 'Body Wash Bottle', plasticSaved: 0.7, points: 70 },
  ];

  /* ----------------------------------------------------------------
   * BARCODE SCAN
   * --------------------------------------------------------------- */
  const handleScanBarcode = () => {
    if (!barcode.trim()) {
      onShowToast('Please enter a barcode', 'error');
      return;
    }

    const randomType =
      containerTypes[Math.floor(Math.random() * containerTypes.length)];

    const newItem = {
      id: Date.now().toString(),
      barcode: barcode,
      type: randomType.name,
      plasticSaved: randomType.plasticSaved,
      pointsEarned: randomType.points,
      method: 'dropoff',
    };

    setCurrentItem(newItem);
    setStep('schedule');
    setBarcode('');
  };

  const handleGenerateBarcode = () => {
    const newBarcode = generateBarcode();
    setBarcode(newBarcode);
    onShowToast('Demo barcode generated!', 'info');
  };

  /* ----------------------------------------------------------------
   * SCHEDULING
   * --------------------------------------------------------------- */
  const handleScheduleReturn = (method, date, time) => {
    if (!currentItem) return;

    const updatedItem = {
      ...currentItem,
      method,
      scheduledDate: date,
      scheduledTime: time,
    };

    setReturnItems([...returnItems, updatedItem]);
    setCurrentItem(null);
    setStep('confirmation');

    const msg = method === 'pickup' ? 'Pickup scheduled successfully!' : 'Drop-off confirmed!';
    onShowToast(msg, 'success');
  };

  const handleNewReturn = () => {
    setStep('scan');
    setCurrentItem(null);
  };

  const totalPoints = returnItems.reduce((sum, item) => sum + item.pointsEarned, 0);
  const totalPlasticSaved = returnItems.reduce((sum, item) => sum + item.plasticSaved, 0);

  /* ----------------------------------------------------------------
   * 1) CONFIRMATION SCREEN
   * --------------------------------------------------------------- */
  if (step === 'confirmation') {
    const latestItem = returnItems[returnItems.length - 1];

    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">You Earned LoopPoints!</h2>
              <p className="text-gray-600">
                Thanks for returning your container and helping the environment
              </p>
            </div>

            {/* impact strip */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    +{latestItem.pointsEarned}
                  </div>
                  <div className="text-sm text-gray-600">LoopPoints Earned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {latestItem.plasticSaved} kg
                  </div>
                  <div className="text-sm text-gray-600">Plastic Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {(latestItem.plasticSaved * 0.42).toFixed(1)} kg
                  </div>
                  <div className="text-sm text-gray-600">CO₂ Avoided</div>
                </div>
              </div>
            </div>

            {/* details */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Return Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Container Type:</span>
                  <span className="font-medium">{latestItem.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Barcode:</span>
                  <span className="font-mono text-sm">{latestItem.barcode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium capitalize">{latestItem.method}</span>
                </div>
                {latestItem.scheduledDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scheduled:</span>
                    <span className="font-medium">
                      {format(new Date(latestItem.scheduledDate), 'MMM d, yyyy')} at{' '}
                      {latestItem.scheduledTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* running totals */}
            {returnItems.length > 1 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Your Total Impact</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{totalPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {totalPlasticSaved.toFixed(1)} kg
                    </div>
                    <div className="text-sm text-gray-600">Total Plastic Saved</div>
                  </div>
                </div>
              </div>
            )}

            {/* actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleNewReturn}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Return Another Container
              </button>
              <button
                onClick={() => onShowToast('Feature coming soon!', 'info')}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                View All Returns
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------------------
   * 2) SCHEDULE SCREEN
   * --------------------------------------------------------------- */
  if (step === 'schedule' && currentItem) {
    return (
      <div className="min-h-screen bg-green-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* back button */}
          <div className="mb-6">
            <button
              onClick={() => setStep('scan')}
              className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Scanning</span>
            </button>
          </div>

          {/* card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Return</h2>
              <p className="text-gray-600">Choose how you'd like to return your container</p>
            </div>

            {/* container summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Container Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{currentItem.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Barcode:</span>
                  <span className="ml-2 font-mono text-sm">{currentItem.barcode}</span>
                </div>
              </div>
            </div>

            {/* options */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* drop‑off */}
              <div
                className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => handleScheduleReturn('dropoff')}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop‑off</h3>
                  <p className="text-gray-600 mb-4">
                    Take your container to any Loop station
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>• Immediate processing</p>
                    <p>• Available 24/7</p>
                    <p>• No scheduling needed</p>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                    Choose Drop‑off
                  </button>
                </div>
              </div>

              {/* pickup */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule Pickup</h3>
                  <p className="text-gray-600 mb-4">
                    We'll collect your container from your location
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p>• Convenient home pickup</p>
                    <p>• Next available: Tomorrow</p>
                    <p>• Free for 3+ containers</p>
                  </div>

                  {/* simple selects (static) */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>{format(addDays(new Date(), 1), 'MMM d')}</option>
                        <option>{format(addDays(new Date(), 2), 'MMM d')}</option>
                        <option>{format(addDays(new Date(), 3), 'MMM d')}</option>
                      </select>
                      <select className="px-3 py-2 border border-gray-300 rounded text-sm">
                        <option>10:00 AM</option>
                        <option>2:00 PM</option>
                        <option>4:00 PM</option>
                      </select>
                    </div>
                    <button
                      onClick={() =>
                        handleScheduleReturn(
                          'pickup',
                          format(addDays(new Date(), 1), 'yyyy-MM-dd'),
                          '10:00'
                        )
                      }
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Schedule Pickup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------------------
   * 3) SCAN SCREEN (default)
   * --------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Return Container</h1>
          <p className="text-gray-600">
            Scan your container barcode to start the return process
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="max-w-md mx-auto">
            {/* header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scanner className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Scan Container Barcode
              </h2>
              <p className="text-gray-600">Enter or scan the barcode on your container</p>
            </div>

            {/* input */}
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="barcode"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Container Barcode
                </label>
                <input
                  type="text"
                  id="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 font-mono text-center text-lg"
                  placeholder="Enter barcode here"
                />
              </div>

              {/* actions */}
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateBarcode}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Generate Demo Barcode
                </button>
                <button
                  onClick={handleScanBarcode}
                  disabled={!barcode.trim()}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Process Return
                </button>
              </div>
            </div>

            {/* recent returns */}
            {returnItems.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Recent Returns</h3>
                <div className="space-y-2">
                  {returnItems.slice(-3).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{item.type}</p>
                        <p className="text-xs text-gray-600">{item.barcode}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">
                          +{item.pointsEarned} points
                        </p>
                        <p className="text-xs text-gray-600">{item.plasticSaved} kg saved</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- runtime prop validation (optional) ---------- */
ReturnPage.propTypes = {
  onShowToast: PropTypes.func.isRequired,
};

export default ReturnPage;
