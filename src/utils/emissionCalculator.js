// 🌍 Estimated CO₂ emissions per packaging type (in kilograms)
export const EMISSION_RATES = {
  standard: 2.5, // Regular packaging
  minimal: 1.5,  // Less material
  tote: 1.2,     // Reusable bag
  grouped: 0.8,  // Consolidated delivery
};

/**
 * 🚀 Calculates how much CO₂ is saved when choosing a greener option.
 * @param {string} selectedType - The chosen packaging type
 * @param {string} baselineType - The default comparison type (default: "standard")
 * @returns {object} { savings, percentage }
 */
export const calculateEmissionSavings = (selectedType, baselineType = 'standard') => {
  const selected = EMISSION_RATES[selectedType];
  const baseline = EMISSION_RATES[baselineType];

  const rawSavings = baseline - selected;
  const percentage = (rawSavings / baseline) * 100;

  return {
    savings: Math.max(0, rawSavings),         // in kg
    percentage: Math.max(0, percentage),      // in %
  };
};

/**
 * 🥇 Finds the packaging type with the lowest CO₂ emissions.
 * @returns {string} - The most eco-friendly option
 */
export const getBestPackagingOption = () => {
  return Object.keys(EMISSION_RATES).reduce((best, current) =>
    EMISSION_RATES[current] < EMISSION_RATES[best] ? current : best
  );
};

/**
 * 🧠 Suggests a packaging type based on cart size and total value.
 * @param {number} orderValue - Total order amount in ₹
 * @param {number} itemCount - Number of items in the cart
 * @returns {string} - Recommended packaging option
 */
export const getPackagingRecommendation = (orderValue, itemCount) => {
  if (itemCount >= 5 || orderValue >= 100) {
    return 'grouped';   // Most efficient for large orders
  } else if (itemCount >= 2) {
    return 'tote';      // Great for medium orders
  } else {
    return 'minimal';   // Ideal for small/compact orders
  }
};

/**
 * 🎯 Calculates LoopPoints (rewards) earned for eco-friendly choices.
 * Base: 1 point per ₹1 spent
 * Bonus: 10 points per kg of CO₂ saved
 *
 * @param {string} selectedType - The packaging type chosen
 * @param {number} orderValue - Total order value in ₹
 * @returns {number} - Total LoopPoints earned
 */
export const calculateLoopPoints = (selectedType, orderValue) => {
  const { savings } = calculateEmissionSavings(selectedType);
  const base = Math.floor(orderValue);       // 1 point per dollar
  const bonus = Math.floor(savings * 10);    // 10 points per kg saved

  return base + bonus;
};

