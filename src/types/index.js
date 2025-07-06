/**
 * @typedef {Object} ProductType
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} icon
 * @property {boolean} available
 */

/**
 * @typedef {Object} Store
 * @property {string} id
 * @property {string} name
 * @property {string} address
 * @property {number} lat
 * @property {number} lng
 * @property {number} distance
 * @property {number} rating
 * @property {ProductType[]} products
 * @property {string} hours
 * @property {string} image
 */

/**
 * @typedef {Object} RefillAppointment
 * @property {string} id
 * @property {string} storeId
 * @property {string} storeName
 * @property {string} date
 * @property {string} time
 * @property {string[]} products
 * @property {string} qrCode
 */

/**
 * @typedef {Object} ReturnItem
 * @property {string} id
 * @property {string} barcode
 * @property {string} type
 * @property {number} plasticSaved
 * @property {number} pointsEarned
 * @property {string=} scheduledDate
 * @property {string=} scheduledTime
 * @property {'pickup'|'dropoff'} method
 */

/**
 * @typedef {Object} UserStats
 * @property {number} totalRefills
 * @property {number} totalReturns
 * @property {number} plasticSaved
 * @property {number} loopPoints
 * @property {number} co2Saved
 */
