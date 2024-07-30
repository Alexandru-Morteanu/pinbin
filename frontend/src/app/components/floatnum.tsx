export function floatToFixedPoint(number: number, decimalBits: number): number {
  const scale = Math.pow(2, decimalBits);
  return Math.floor(number * scale);
}

// Convert fixed-point to float notation
export function fixedPointToFloat(number: number, decimalBits: number): number {
  const scale = Math.pow(2, -decimalBits);
  return number * scale;
}
