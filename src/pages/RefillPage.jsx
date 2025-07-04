import React, { useState, useEffect } from 'react';
import { mockStores } from '../data/mockData.js';
import MapView from '../components/MapView.jsx';
import QRCodeGenerator from '../components/QRCodeGenerator.jsx';
import {
  getCurrentLocation,
  calculateDistance,
} from '../utils/geolocation';
import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  ArrowLeft,
  Download,
} from 'lucide-react';
import { addDays, addHours, format } from 'date-fns';
import PropTypes from 'prop-types';

/* ------------------------------------------------------------------ */
/* Helper component: store list                                        */
/* ------------------------------------------------------------------ */
const StoreList = ({ stores, onSelect }) => (
  <div className="space-y-6">
    {stores.map((store) => (
      <div
        key={store.id}
        className="border rounded-xl shadow-md p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer flex items-center"
      >
        <img
          src={store.image}
          alt={store.name}
          className="w-40 h-32 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 px-6">
          <h2 className="text-xl font-semibold text-gray-900">{store.name}</h2>
          <p className="text-gray-600 mt-1">{store.address}</p>
          <p className="text-sm text-gray-500 mt-2">
            Rating: <span className="font-medium">{store.rating}</span> ⭐
          </p>
          <p className="text-sm text-gray-500">
            Distance:{' '}
            <span className="font-medium">{store.distance.toFixed(2)} miles</span>
          </p>
          <p className="mt-2 text-gray-700 font-semibold">Open Hours: {store.hours}</p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(store);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Check for Refill
          </button>
        </div>
      </div>
    ))}
  </div>
);

StoreList.propTypes = {
  stores: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

/* ------------------------------------------------------------------ */
/* Main page component                                                 */
/* ------------------------------------------------------------------ */
const RefillPage = ({ onShowToast }) => {
  const [storeList, setStoreList] = useState(mockStores);
  const [userCoords, setUserCoords] = useState(null);
  const [chosenStore, setChosenStore] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [displayMode, setDisplayMode] = useState('list'); // 'list' | 'map'
  const [manualLocation, setManualLocation] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  /* ---------- detect user location on mount ---------- */
  useEffect(() => {
    fetchUserLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserLocation = async () => {
    setLoadingLocation(true);
    try {
      const location = await getCurrentLocation();
      setUserCoords(location);
      refreshStoreDistances(location);
      onShowToast('Location detected successfully!', 'success');
    } catch {
      onShowToast('Could not detect location, showing default stores.', 'info');
    } finally {
      setLoadingLocation(false);
    }
  };

  const refreshStoreDistances = (location) => {
    const updated = storeList
      .map((store) => ({
        ...store,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          store.lat,
          store.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
    setStoreList(updated);
  };

  /* ---------- manual location entry ---------- */
  const handleManualLocationSubmit = () => {
    if (manualLocation.trim()) {
      onShowToast('Location updated successfully!', 'success');
      setShowManualInput(false);
      setManualLocation('');
    }
  };

  /* ---------- appointment booking ---------- */
  const bookRefillAppointment = () => {
    if (!chosenStore) return;

    const appointmentDay = addDays(new Date(), 1);
    const appointmentTime = addHours(appointmentDay, 10);

    const newAppointment = {
      id: Date.now().toString(),
      storeId: chosenStore.id,
      storeName: chosenStore.name,
      date: format(appointmentDay, 'yyyy-MM-dd'),
      time: format(appointmentTime, 'HH:mm'),
      products: chosenStore.products
        .filter((p) => p.available)
        .map((p) => p.name),
      qrCode: `LOOP-${chosenStore.id}-${Date.now()}`,
    };

    setAppointment(newAppointment);
    onShowToast('Refill appointment booked successfully!', 'success');
  };

  const downloadQRCode = () => {
    if (appointment) {
      onShowToast('QR code saved to downloads!', 'success');
      // Implement actual download logic if needed
    }
  };

  /* ---------------------------------------------------------------- */
  /* RENDERING                                                        */
  /* ---------------------------------------------------------------- */

  /* ---------- appointment confirmation screen ---------- */
  if (appointment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
            <p className="text-gray-600">Your refill appointment is scheduled</p>
          </div>

          {/* details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* left: appointment details */}
            <section>
              <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{appointment.storeName}</p>
                    <p className="text-sm text-gray-600">{chosenStore?.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Products to Refill:</h4>
                <div className="flex flex-wrap gap-2">
                  {appointment.products.map((product, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* right: QR code */}
            <section>
              <h3 className="font-semibold text-gray-900 mb-4">
                Present this QR Code at the store
              </h3>
              <QRCodeGenerator value={appointment.qrCode} size={200} className="mb-4" />
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Appointment ID: {appointment.qrCode}
                </p>
                <button
                  onClick={downloadQRCode}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Save QR Code</span>
                </button>
              </div>
            </section>
          </div>

          {/* footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                setAppointment(null);
                setChosenStore(null);
              }}
              className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Book Another Appointment</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- single‑store view ---------- */
  if (chosenStore) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <button
            onClick={() => setChosenStore(null)}
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back to Stores</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* store hero */}
          <div className="relative h-48">
            <img
              src={chosenStore.image}
              alt={chosenStore.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-2xl font-bold">{chosenStore.name}</h1>
              <p className="opacity-90">{chosenStore.address}</p>
            </div>
          </div>

          {/* details */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* products */}
              <section>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Available Products Information
                </h3>
                <div className="space-y-3">
                  {chosenStore.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 text-sm">✓</span>
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          product.available
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.available ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* store info + CTA */}
              <section>
                <h3 className="font-semibold text-gray-900 mb-4">Store Information</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>{chosenStore.hours}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>{chosenStore.address}</span>
                  </div>
                </div>

                <button
                  onClick={bookRefillAppointment}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Book Refill Appointment
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- store list / map selector ---------- */
  return (
    <div className="min-h-screen bg-[#f0fff4]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* page header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nearby Refill Spots</h1>
          <p className="text-gray-600">
            Find nearby spots to refill your reusable containers
          </p>
        </header>

        {/* location + view toggle */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={fetchUserLocation}
              disabled={loadingLocation}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Navigation className="w-4 h-4" />
              <span>{loadingLocation ? 'Getting Location...' : 'Use My Location'}</span>
            </button>

            {/* manual entry */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">or</span>
              {!showManualInput ? (
                <button
                  onClick={() => setShowManualInput(true)}
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  Enter Location Manually
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={manualLocation}
                    onChange={(e) => setManualLocation(e.target.value)}
                    placeholder="Enter address or zip code"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleManualLocationSubmit}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>

            {/* list / map toggle */}
            <div className="flex items-center space-x-2 ml-auto">
              <button
                onClick={() => setDisplayMode('list')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  displayMode === 'list'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setDisplayMode('map')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  displayMode === 'map'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </section>

        {/* list or map */}
        {displayMode === 'map' ? (
          <MapView
            stores={storeList}
            userLocation={userCoords ?? undefined}
            onStoreSelect={setChosenStore}
            className="h-[600px]"
          />
        ) : (
          <StoreList stores={storeList} onSelect={setChosenStore} />
        )}
      </div>
    </div>
  );
};

RefillPage.propTypes = {
  onShowToast: PropTypes.func.isRequired,
};

export default RefillPage;
