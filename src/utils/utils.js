import moment from "moment";

/**
 * 时间消耗：毫秒转为字符串
 * @param {Number} duration 时间消耗：毫秒
 */
export const durationToString = (duration) => {
  const dur = moment.duration(duration),
    milliseconds = dur.milliseconds(),
    seconds = dur.seconds(),
    minutes = dur.minutes(),
    hours = dur.hours(),
    days = dur.days(),
    months = dur.months(),
    years = dur.years();
  return `
      ${years ? years + "Y" : ""}
      ${months ? months + "M" : ""}
      ${days ? days + "d" : ""}
      ${hours ? hours + "h" : ""}
      ${minutes ? minutes + "m" : ""}
      ${seconds ? seconds + "s" : ""}
      ${milliseconds ? milliseconds + "ms" : ""}
  `;
};
