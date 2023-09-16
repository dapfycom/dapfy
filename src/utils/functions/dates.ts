import moment from "moment";

// convert seconds into a readable hour:minute:second format

export const secondsToHms = (seconds?: number) => {
  if (!seconds) return "0s";
  const duration = moment.duration(seconds, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  const secs = duration.seconds();

  let timeString = "";

  if (hours > 0) {
    timeString += `${hours}h `;
  }

  if (minutes > 0) {
    timeString += `${minutes}m `;
  }

  if (secs > 0) {
    timeString += `${secs}s`;
  }

  return timeString.trim();
};
