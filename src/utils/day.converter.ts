export const getTime = (timestamp: string) => {
  // Given timestamp
  // Convert the timestamp string to a Date object
  const timestampDate = new Date(timestamp);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = currentTime.getTime() - timestampDate.getTime();

  // Calculate the time difference in minutes
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));

  let result: string; // Declare the result variable

  // Check if the time difference is within an hour
  if (minutesDiff < 60) {
    result = `${minutesDiff} ${minutesDiff === 1 ? "minute" : "minutes"} ago`;
  } else {
    // Calculate the time difference in hours
    const hoursDiff = Math.floor(minutesDiff / 60);

    // Check if the time difference is within a day
    if (hoursDiff < 24) {
      result = `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
    } else {
      // Calculate the time difference in days
      const daysDiff = Math.floor(hoursDiff / 24);
      result = `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
    }
  }

  return result;
};
