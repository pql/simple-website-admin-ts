import { defineComponent } from 'vue';
import SampleComponentBase from './sample-component-base';
import { useMessage } from '@/hooks/web/useMessage';
import BasicConfigInstance from '../config/basic-config';
import { ModalHelper } from '../helpers/modal';
import { useTimezone } from '@/timezones/useTimezone';

const { createMessage, createConfirm, notification } = useMessage();

const {
  fromUTCDateToLocalDateTime,
  fromUTCDateToLocalDateTimeWithA,
  fromUTCDateToLocalDate,
  fromUTCDateToLocalDateFormat,
  fromUTCDateToLocalDateHorizontalSymbol,
  fromUTCDateToLocalDateTimeHorizontalSymbol,
  fromLocalDateToUTCDateFormat,
  isISO8601Date,
  isDateValid,
  fromUse12HoursToLocalDateTime,
} = useTimezone();

const dateUtil = {
  /**
   * 根据用户配置自定义显示规则，格式化日期
   * @param fieldValue
   * @returns {string}
   */
  fromUse12HoursToLocalDateTime,
  /**
   * 判断日期是否有效
   * @param {string} dateTimeString
   * @returns {boolean}
   */
  isDateValid,
  /**
   * 如果你需要判断一个日期字符串是否包含"T"和"Z"，这通常意味着该字符串可能是一个ISO 8601格式的日期时间字符串，这种格式通常包含"T"来分隔日期和时间，以及"Z"来表示UTC时区。
   * @param {string} dateString
   * @returns {boolean}
   */
  isISO8601Date,
  /**
   * @description 零时区日期格式化成用户所在地日期
   * @param {dayjs.ConfigType} time
   * @param {string} format 格式请参考 moment-timezone 文档 https://momentjs.cn/timezone/docs/?spm=a2c6h.12873639.article-detail.8.54b03a8aTpDEGA#/using-timezones/converting-to-zone/
   * @returns {string}
   */
  fromUTCDateToLocalDateFormat,
  /**
   * @description 用户所在地日期 格式化成UTC(零时区)日期。后端接口需要的日期格式都是UTC格式(零时区)
   * 后端返回的时间都是UTC(零时区的时间)，前端在使用时需要先将UTC时间格式化成本地时间；
   * 同时，在传值给后端的时候也得将本地时间（带时区）转成UTC时间(零时区)后提交
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  fromLocalDateToUTCDateFormat,

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
  fromUTCDateToLocalDateTime,

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
  fromUTCDateToLocalDateTimeWithA,

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
  fromUTCDateToLocalDate,

  /**
   * 零时区日期格式化成用户所在地日期 YYYY-MM-DD
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  fromUTCDateToLocalDateHorizontalSymbol,

  /**
   * 零时区日期格式化成用户所在地日期 YYYY-MM-DD HH:mm:ss
   * @param {dayjs.ConfigType} time
   * @param {string} format
   * @returns {string}
   */
  fromUTCDateToLocalDateTimeHorizontalSymbol,
};

/** 组件基类 */
const AppComponentBase = defineComponent({
  mixins: [SampleComponentBase],
  data() {
    return {
      /** 保存状态 */
      saving: false,
      /** 日期工具库 */
      dateUtil,
    };
  },
  computed: {
    /** 模态框服务 */
    modalHelper() {
      return ModalHelper.getModalService();
    },
    /** 功能服务 */
    feature() {
      return this.abp.features;
    },
    /** 通知服务 */
    notify() {
      return notification;
    },
    /** 配置服务 */
    setting() {
      return this.abp.setting;
    },
    /** 消息服务 */
    message() {
      return createMessage;
    },
    /** 确认服务 */
    confirm() {
      return createConfirm;
    },
    /** 多租户服务 */
    multiTenancy() {
      return this.abp.multiTenancy;
    },
    /** 通知数量 */
    $notificationCount() {
      return BasicConfigInstance.notificationCount;
    },
  },
  methods: {},
});

export default AppComponentBase;
