export const checkIfItemExists = (item?: any): boolean =>
  item ||
  // if item equals 0 for some reason
  (typeof item === 'number' && item === 0) ||
  // if item equals '' for some reason
  (typeof item === 'string' && item === '')
