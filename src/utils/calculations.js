/* -----------------------------------------------------------
 * Utility functions for plastic, CO₂, points, distance, etc.
 * ---------------------------------------------------------- */

/**
 * @param {number} refills
 * @param {number} returns
 * @returns {number}
 */
export const calculatePlasticSaved = (refills, returns) => {
  return refills * 0.5 + returns * 1.0;
};

/**
 * @param {number} plasticSaved
 * @returns {number}
 */
export const calculateCO2Saved = (plasticSaved) => {
  // Assuming 1 kg plastic = ~0.42 kg CO₂ equivalent saved
  return plasticSaved * 0.42;
};

/**
 * @param {number} refills
 * @param {number} returns
 * @returns {number}
 */
export const calculatePoints = (refills, returns) => {
  return refills * 50 + returns * 100;
};

/**
 * @param {number} distance
 * @returns {string}
 */
export const formatDistance = (distance) => {
  return distance < 1
    ? `${(distance * 1000).toFixed(0)}m`
    : `${distance.toFixed(1)}km`;
};

/** @returns {string} */
export const generateBarcode = () => {
  return Math.random().toString(36).substr(2, 12).toUpperCase();
};
