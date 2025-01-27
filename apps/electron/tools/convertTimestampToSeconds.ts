export const convertTimestampToSeconds = (timestamp: string) => {
  timestamp = timestamp.slice(0, timestamp.lastIndexOf('.'));
  let seconds = 0;

  let multiplier = 1;
  for (const timeElement of timestamp.split(':').reverse()) {
    seconds += Number.parseInt(timeElement) * multiplier;
    multiplier *= 60;
  }
  return seconds;
};
