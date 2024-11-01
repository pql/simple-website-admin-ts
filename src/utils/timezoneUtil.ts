import moment from 'moment-timezone';

// 转换为区域
export const tz: moment.MomentTimezone = moment.tz;

// 获取所有区域
export const timezoneNames: string[] = tz.names();

// 猜测用户区域
export const guessTimezoneName = (ignoreCache?: boolean) => {
  return tz.guess(ignoreCache);
};
