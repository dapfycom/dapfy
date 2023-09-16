import moment from "moment";

// convert seconds into a readable hour:minute:second format

export const secondsToHms = (seconds: number) => {
  if (!seconds) return "00:00:00";
  const duration = moment.duration(seconds, "seconds");
  const hours = duration.hours();
  const minutes = duration.minutes();
  const secs = duration.seconds();
  return `${hours}:${minutes}:${secs}`;
};
