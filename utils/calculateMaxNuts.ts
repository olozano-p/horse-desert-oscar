export function calculateMaxNuts(D: number, N: number, F: number, C: number): number {
  if (N <= 0 || D <= 0 || F <= 0 || C <= 0) return 0;
  if (F * D >= N) return 0;
  let currentPosition = 0, nutsRemaining = N;
  while (currentPosition < D && nutsRemaining > 0) {
    const tripsNeeded = Math.ceil(nutsRemaining / C);
    if (tripsNeeded === 1) {
      const remainingDistance = D - currentPosition;
      const fuelNeeded = F * remainingDistance;
      return Math.max(0, nutsRemaining - fuelNeeded);
    }
    const fuelRate = F * (2 * tripsNeeded - 1);
    const targetNuts = (tripsNeeded - 1) * C;
    const nutsToConsume = nutsRemaining - targetNuts;
    const depotDistance = nutsToConsume / fuelRate;
    const remainingDistance = D - currentPosition;
    if (depotDistance >= remainingDistance) {
      const totalFuelNeeded = fuelRate * remainingDistance;
      nutsRemaining -= totalFuelNeeded;
      currentPosition = D;
    } else {
      currentPosition += depotDistance;
      nutsRemaining = targetNuts;
    }
  }
  return Math.max(0, nutsRemaining);
}
