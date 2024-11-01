import { Dayjs } from 'dayjs';
import { DATE_FORMAT } from '@/utils/dateUtil';

export const datePickerProps = {
  /** 控件值 */
  value: {
    type: [String, Dayjs],
  },
  /** 值格式化格式 */
  valueFormat: {
    type: String,
    default: DATE_FORMAT,
  },
  /** [开启，关闭]用户时间当天开始时间格式化成UTC零时区对应时间并格式化成ISO标准；true 表示会将日期的格式变为'2024-08-31T16:00:00.000Z' */
  startOfDay: {
    type: Boolean,
    default: false,
  },
  /** [开启，关闭]用户时间当天结束时间格式化成UTC零时区对应时间并格式化成ISO标准；true 表示会将日期的格式变为'2024-09-02T15:59:59.999Z' */
  endOfDay: {
    type: Boolean,
    default: false,
  },
  /** 提供额外的时间选择  */
  showTime: {
    type: [Object, Boolean],
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
};
