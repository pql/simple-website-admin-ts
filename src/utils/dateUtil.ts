/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { computed } from 'vue';
import { TimezoneStore } from '@/store/modules/timezone';
import { DateFormatStore } from '@/store/modules/dateFormat';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const timezoneStore = TimezoneStore.useStoreWithOut();

export const dateFormatStore = DateFormatStore.useStoreWithOut();
export const dateFormat = computed(() => dateFormatStore.getDateFormat);
export const getOffset = computed(() => timezoneStore.getOffset);

/**
 * 连接符
 */
export const CONNECTOR = {
  HORIZONTAL_BAR: '-',
  SLASH_BAR: '/',
  COLON: ':',
  SPACE: ' ',
};

export const FORMATS = {
  YYYY: 'YYYY',
  MM: 'MM',
  DD: 'DD',
  HH: 'HH',
  mm: 'mm',
  ss: 'ss',
};

// date_format: 'YYYY-MM-DD'
export const DATE_FORMAT = `${FORMATS.YYYY}${CONNECTOR.HORIZONTAL_BAR}${FORMATS.MM}${CONNECTOR.HORIZONTAL_BAR}${FORMATS.DD}`;

// date_time_format: 'YYYY-MM-DD HH:mm:ss'
export const DATE_TIME_FORMAT = `${FORMATS.YYYY}${CONNECTOR.HORIZONTAL_BAR}${FORMATS.MM}${CONNECTOR.HORIZONTAL_BAR}${FORMATS.DD}${CONNECTOR.SPACE}${FORMATS.HH}${CONNECTOR.COLON}${FORMATS.mm}${CONNECTOR.COLON}${FORMATS.ss}`;

// time_format: 'HH:mm:ss'
export const TIME_FORMAT = `${FORMATS.HH}${CONNECTOR.COLON}${FORMATS.mm}${CONNECTOR.COLON}${FORMATS.ss}`;

/**
 * 格式化成 年月日时分秒
 * @param {dayjs.ConfigType} date
 * @param {string} format
 * @returns
 */
export function formatToDateTime(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * 格式化成 年月日
 * @param {dayjs.ConfigType} date
 * @param {string} format
 * @returns
 */
export function formatToDate(date?: dayjs.ConfigType, format = DATE_FORMAT): string {
  return dayjs(date).format(format);
}

/**
 * 格式化成 时分秒
 * @param {dayjs.ConfigType} date
 * @param {string} format
 * @returns
 */
export function formatToTime(date?: dayjs.ConfigType, format = TIME_FORMAT) {
  return dayjs(date).format(format);
}

/**
 * 校验是值是否是日期类型
 * @param {dayjs.ConfigType} date
 * @param {string} format
 * @returns
 */
export function isDateValid(date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): boolean {
  if (typeof date === 'boolean' || !date) {
    return false;
  }
  return dayjs(date, format, true).isValid();
}

/**
 * 如果你需要判断一个日期字符串是否包含"T"和"Z"，这通常意味着该字符串可能是一个ISO 8601格式的日期时间字符串，这种格式通常包含"T"来分隔日期和时间，以及"Z"来表示UTC时区。
 * @param {string} dateString
 * @returns {boolean}
 */
export function isISO8601Date(dateString) {
  if (!dateString) return false;
  if (typeof dateString === 'string') {
    return dateString.includes('T') && dateString.includes('Z');
  } else {
    return false;
  }
}

export const dateUtil = dayjs;
