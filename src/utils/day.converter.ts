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
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const namaBulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli ",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${day} ${namaBulan[month - 1]} ${year}`;
}

export function formatIndonesianTime(date: string) {
  const myDate = new Date(date);
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const dateFormatter = new Intl.DateTimeFormat("id-ID", option);
  return dateFormatter.format(myDate);
}

export function formatTimeAgo(milliseconds: number): string {
  const intervals = [
    { label: "year", milliseconds: 31536000000 },
    { label: "month", milliseconds: 2592000000 },
    { label: "day", milliseconds: 86400000 },
    { label: "hour", milliseconds: 3600000 },
    { label: "minute", milliseconds: 60000 },
    { label: "second", milliseconds: 1000 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(milliseconds / interval.milliseconds);

    if (count >= 1) {
      return count === 1
        ? `${count} ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return "Just now";
}
