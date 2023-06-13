export const getTime = (timestamp: string): string => {
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;

  const timestampDate = new Date(timestamp);
  const currentTime = new Date();
  const timeDiff = currentTime.getTime() - timestampDate.getTime();

  let result: string;

  switch (true) {
    case timeDiff < MINUTE:
      result = `${Math.floor(timeDiff / 1000)} seconds ago`;
      break;
    case timeDiff < HOUR:
      result = `${Math.floor(timeDiff / MINUTE)} minutes ago`;
      break;
    case timeDiff < DAY:
      result = `${Math.floor(timeDiff / HOUR)} hours ago`;
      break;
    default:
      result = `${Math.floor(timeDiff / DAY)} days ago`;
      break;
  }

  return result;
};

export function formatUnixTimestamp(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  const formattedDate = date.toISOString().slice(0, 10);
  return `${formattedDate}`;
}

const unixTimestamp = 1686593838;
const formattedDateTime = formatUnixTimestamp(unixTimestamp);
console.log(`Formatted date and time: ${formattedDateTime}`);
