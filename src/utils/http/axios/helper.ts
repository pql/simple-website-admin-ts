import { isArray, isObject, isString } from '@/utils/is';
import { useTimezone } from '@/timezones/useTimezone';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat, fromUTCDateToLocalDateTime: fromUTCDateToLocalDateTime, isDateValid, dateFormat } = useTimezone();

const DATE_TIME_FORMAT = dateFormat.value + ' HH:mm:ss';

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
          /** 值类型为时间的转为带时区的时间类型 */
          params[key] = isString(value) && isDateValid(value) ? fromLocalDateToUTCDateFormat(value) : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
    if (isArray(params[key])) {
      params[key].forEach((d) => {
        formatRequestDate(d);
      });
    }
  }
}

/**
 * Format response parameter time
 * @param data
 */
export function formatResponseDate(data: Recordable) {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return;
  }

  for (const key in data) {
    if (isString(key)) {
      const value = data[key];
      if (value) {
        try {
          data[key] = isString(value) ? value.trim() : value;
          data[key] = isString(value) && isDateValid(value) ? fromUTCDateToLocalDateTime(value) : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(data[key])) {
      formatResponseDate(data[key]);
    }
    if (isArray(data[key])) {
      data[key].forEach((d) => {
        formatResponseDate(d);
      });
    }
  }
}
