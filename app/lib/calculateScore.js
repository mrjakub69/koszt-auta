export function calculateScore(car) {

  let score = 100;

  score -= car.fuelConsumption * 2;

  score -= car.service / 60;

  score -= car.depreciation / 80;

  score += car.reliability * 5;

  if (score > 100) {
    score = 100;
  }

  if (score < 1) {
    score = 1;
  }

  return Math.round(score);

}