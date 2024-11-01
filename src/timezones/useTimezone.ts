import { computed, unref } from 'vue';
import { TimezoneStore } from '@/store/modules/timezone';
import { dateUtil, DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from '@/utils/dateUtil';
import { DateFormatStore } from '@/store/modules/dateFormat';
import { isString } from 'lodash-es';

export function useTimezone() {
  const timezoneStore = TimezoneStore.useStoreWithOut();
  const dateFormatStore = DateFormatStore.useStoreWithOut();
  const dateFormat = computed(() => dateFormatStore.getDateFormat);
  const getOffset = computed(() => timezoneStore.getOffset);
  const getZone = computed(() => timezoneStore.getZone);
  const getNames = computed(() => timezoneStore.getNames);
  const getShowTimezonePicker = computed(() => timezoneStore.getShowTimezonePicker);
  const changeOffset = (offset: string) => timezoneStore.setOffset(offset);
  const changeZone = (zone: string) => timezoneStore.setZone(zone);

  const getDateOptions = (value: string) => {
    if (isString(value)) {
      const format = unref(dateFormat) + ` ${TIME_FORMAT}`;
      const yearIndex = format.indexOf('Y');
      const yearLastIndex = format.lastIndexOf('Y');
      const year = value.slice(yearIndex, yearLastIndex + 1);

      const monthIndex = format.indexOf('M');
      const monthLastIndex = format.lastIndexOf('M');
      const month = value.slice(monthIndex, monthLastIndex + 1);

      const dayIndex = format.indexOf('D');
      const dayLastIndex = format.lastIndexOf('D');
      const day = value.slice(dayIndex, dayLastIndex + 1);

      const hourIndex = format.indexOf('H');
      const hourLastIndex = format.lastIndexOf('H');
      const hour = value.slice(hourIndex, hourLastIndex + 1) ?? '00';

      const minuteIndex = format.indexOf('m');
      const minuteLastIndex = format.lastIndexOf('m');
      const minute = value.slice(minuteIndex, minuteLastIndex + 1) ?? '00';

      const secondIndex = format.indexOf('s');
      const secondLastIndex = format.lastIndexOf('s');
      const second = value.slice(secondIndex, secondLastIndex + 1) ?? '00';

      return {
        year,
        month,
        day,
        hour,
        minute,
        second,
      };
    } else {
      return value;
    }
  };

  /**
   * 根据用户配置自定义显示规则，格式化日期
   * @param {dayjs.ConfigType} fieldValue
   * @returns {string}
   */
  const fromUse12HoursToLocalDateTime = (fieldValue) => {
    if (dateFormatStore.getUse12Hours) {
      return fromUTCDateToLocalDateTimeWithA(fieldValue);
    } else {
      return fromUTCDateToLocalDateTime(fieldValue);
    }
  };

  /**
   * @description 零时区日期格式化成用户所在地日期 Local DateTime
   * ${YYYY}[-/]${MM}[-/]${DD} HH:mm:ss
   * ${YYYY}[-/]${DD}[-/]${MM} HH:mm:ss
   * ${MM}[-/]${YYYY}[-/]${DD} HH:mm:ss
   * ${MM}[-/]${DD}[-/]${YYYY} HH:mm:ss
   * ${DD}[-/]${YYYY}[-/]${MM} HH:mm:ss
   * ${DD}[-/]${MM}[-/]${YYYY} HH:mm:ss
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  const fromUTCDateToLocalDateTime = (time, format = `${dateFormat.value} ${TIME_FORMAT}`) => {
    if (!time) return time;
    if (isValid(time)) {
      const localDateTime = dateUtil(time).utc().utcOffset(getOffset.value).format(format);
      return localDateTime || '';
    } else {
      return time;
    }
  };

  /**
   * @description 零时区日期格式化成用户所在地日期 Local DateTime 12小时制
   * ${YYYY}[-/]${MM}[-/]${DD} hh:mm:ss a
   * ${YYYY}[-/]${DD}[-/]${MM} hh:mm:ss a
   * ${MM}[-/]${YYYY}[-/]${DD} hh:mm:ss a
   * ${MM}[-/]${DD}[-/]${YYYY} hh:mm:ss a
   * ${DD}[-/]${YYYY}[-/]${MM} hh:mm:ss a
   * ${DD}[-/]${MM}[-/]${YYYY} hh:mm:ss a
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {String}
   */
  const fromUTCDateToLocalDateTimeWithA = (time, format = `${unref(dateFormat)} hh:mm:ss A`) => {
    if (!time) return time;
    if (isValid(time)) {
      const localDateTime12 = dateUtil(time).utc().utcOffset(getOffset.value).format(format);
      return localDateTime12 || '';
    } else {
      return time;
    }
  };
  /**
   * @description 零时区日期格式化成用户所在地日期 Local Date
   * ${YYYY}[-/]${MM}[-/]${DD}
   * ${YYYY}[-/]${DD}[-/]${MM}
   * ${MM}[-/]${YYYY}[-/]${DD}
   * ${MM}[-/]${DD}[-/]${YYYY}
   * ${DD}[-/]${YYYY}[-/]${MM}
   * ${DD}[-/]${MM}[-/]${YYYY}
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  const fromUTCDateToLocalDate = (time, format = `${unref(dateFormat)}`): string => {
    if (!time) return time;
    if (isValid(time)) {
      const localeDate = dateUtil(time).utc().utcOffset(getOffset.value).format(format);
      return localeDate || '';
    } else {
      return time;
    }
  };
  /**
   * @description 零时区日期格式化成用户所在地日期
   * @param {dayjs.ConfigType} time
   * @param {string} format 格式请参考 moment-timezone 文档 https://momentjs.cn/timezone/docs/?spm=a2c6h.12873639.article-detail.8.54b03a8aTpDEGA#/using-timezones/converting-to-zone/
   * @returns {string}
   */
  const fromUTCDateToLocalDateFormat = (time, format?: string): string => {
    if (!time) return time;
    if (isValid(time)) {
      const localeDateFormated = dateUtil(time).utc().utcOffset(getOffset.value).format(format);
      return localeDateFormated || '';
    } else {
      return time;
    }
  };
  /**
   * 零时区日期格式化成用户所在地日期 YYYY-MM-DD
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  const fromUTCDateToLocalDateHorizontalSymbol = (time, format = DATE_FORMAT): string => {
    if (!time) return time;
    if (isValid(time)) {
      const localeDateHorizontalSymbol = dateUtil(time)
        .utc()
        .utcOffset(getOffset.value)
        .format(format);
      return localeDateHorizontalSymbol || '';
    } else {
      return time;
    }
  };
  /**
   * 零时区日期格式化成用户所在地日期 YYYY-MM-DD HH:mm:ss
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  const fromUTCDateToLocalDateTimeHorizontalSymbol = (time, format = DATE_TIME_FORMAT): string => {
    if (!time) return time;
    if (isValid(time)) {
      const localeDateTimeHorizontalSymbol = dateUtil(time)
        .utc()
        .utcOffset(getOffset.value)
        .format(format);
      return localeDateTimeHorizontalSymbol || '';
    } else {
      return time;
    }
  };
  /**
   * @description 用户所在地日期 格式化成UTC(零时区)日期。后端接口需要的日期格式都是UTC格式(零时区)
   * 后端返回的时间都是UTC(零时区的时间)，前端在使用时需要先将UTC时间格式化成本地时间；
   * 同时，在传值给后端的时候也得将本地时间（带时区）转成UTC时间(零时区)后提交
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  const fromLocalDateToUTCDateFormat = (time, format?): string => {
    if (!time) return time;
    if (isValid(time)) {
      const utcISO8601Date = dateUtil(time).utc().format(format);
      return utcISO8601Date;
    } else {
      return time;
    }
  };

  /**
   * 如果你需要判断一个日期字符串是否包含"T"和"Z"，这通常意味着该字符串可能是一个ISO 8601格式的日期时间字符串，这种格式通常包含"T"来分隔日期和时间，以及"Z"来表示UTC时区。
   * @param {string} dateString
   * @returns {boolean}
   */
  function isISO8601Date(dateString) {
    if (!dateString) return false;
    if (isString(dateString)) {
      return dateString.includes('T') && dateString.includes('Z');
    } else {
      return false;
    }
  }

  /**
   * 判断是否是有效日期
   * @param {dayjs.ConfigType} date
   * @returns {boolean}
   */
  function isValid(date) {
    return dateUtil(date).isValid();
  }

  /**
   * 判断日期是否有效
   * @param {string} dateTimeString
   * @returns {boolean}
   */
  function isDateValid(dateTimeString) {
    return isISO8601Date(dateTimeString) && isValid(dateTimeString);
  }

  /**
   * @description 格式化日期成 年-月-日
   * ${YYYY}[-/]${MM}[-/]${DD} HH:mm:ss
   * ${YYYY}[-/]${DD}[-/]${MM} HH:mm:ss
   * ${MM}[-/]${YYYY}[-/]${DD} HH:mm:ss
   * ${MM}[-/]${DD}[-/]${YYYY} HH:mm:ss
   * ${DD}[-/]${YYYY}[-/]${MM} HH:mm:ss
   * ${DD}[-/]${MM}[-/]${YYYY} HH:mm:ss
   * @param {string} dateTimeString
   * @returns {string}
   */
  function transformToNormalDate(dateTimeString) {
    const { year, month, day } = getDateOptions(dateTimeString);
    const v = `${year}-${month}-${day}`;
    return v;
  }

  /**
   * @description 格式化日期成 年-月-日 时:分:秒
   * ${YYYY}[-/]${MM}[-/]${DD} HH:mm:ss
   * ${YYYY}[-/]${DD}[-/]${MM} HH:mm:ss
   * ${MM}[-/]${YYYY}[-/]${DD} HH:mm:ss
   * ${MM}[-/]${DD}[-/]${YYYY} HH:mm:ss
   * ${DD}[-/]${YYYY}[-/]${MM} HH:mm:ss
   * ${DD}[-/]${MM}[-/]${YYYY} HH:mm:ss
   * @param {string} dateTimeString
   * @returns {string}
   */
  function transformToNormalDateTime(dateTimeString) {
    const { year, month, day, hour, minute, second } = getDateOptions(dateTimeString);
    const v = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return v;
  }

  return {
    dateFormat,
    getOffset,
    getZone,
    getNames,
    getShowTimezonePicker,
    changeOffset,
    changeZone,
    fromUTCDateToLocalDateTime,
    fromUTCDateToLocalDateTimeWithA,
    fromUTCDateToLocalDate,
    fromUTCDateToLocalDateFormat,
    fromUTCDateToLocalDateHorizontalSymbol,
    fromUTCDateToLocalDateTimeHorizontalSymbol,
    fromLocalDateToUTCDateFormat,
    isISO8601Date,
    isDateValid,
    transformToNormalDate,
    transformToNormalDateTime,
    fromUse12HoursToLocalDateTime,
  };
}
