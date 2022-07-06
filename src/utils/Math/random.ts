export function getRandomNumberBetween(
  min: number,
  max: number,
  floor: boolean,
) {
  if (floor) return Math.floor(Math.random() * (max - min + 1) + min);
  return Math.random() * (max - min + 1) + min;
}
