/**
 * Format price with KES currency symbol
 * @param {number} price - Price to format
 * @returns {string} Formatted price with KES
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) return 'KES 0';
  
  const formatted = new Intl.NumberFormat('en-KE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true
  }).format(Math.round(price));
  
  return `KES ${formatted}`;
};

export default formatPrice;