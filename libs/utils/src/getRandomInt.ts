export const getRandomInt = (min: number, max: number, inclusive?: boolean) => {
  const maxFloor = Math.floor(max);
  const minCeil = Math.ceil(min);

  if (inclusive) {
    return Math.floor(Math.random() * (maxFloor - minCeil + 1) + minCeil);
  } else {
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
  }
};