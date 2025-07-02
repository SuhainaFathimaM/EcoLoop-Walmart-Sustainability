import React, { useState } from "react";
import QRCode from "qrcode.react";

const mockStations = [
  { name: "Walmart Hyderabad", products: ["rice", "soap"], lat: 17.385, lng: 78.4867 },
  { name: "Walmart Bengaluru", products: ["oil", "detergent"], lat: 12.9716, lng: 77.5946 }
];

function RefillFinder() {
  const [selected, setSelected] = useState(null);

  const generateQR = (station, product) => {
    const timestamp = Date.now();
    return `${station.name}_${product}_${timestamp}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Refill Station Finder</h2>
      {mockStations.map((station, idx) => (
        <div key={idx} className="border p-4 mb-4 shadow rounded bg-white">
          <h3 className="font-semibold">{station.name}</h3>
          <p>Products: {station.products.join(", ")}</p>
          <button
            onClick={() => setSelected(station)}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >
            Generate Refill QR
          </button>
        </div>
      ))}

      {selected && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Your Refill QR:</h4>
          <QRCode value={generateQR(selected, selected.products[0])} />
        </div>
      )}
    </div>
  );
}

export default RefillFinder;
