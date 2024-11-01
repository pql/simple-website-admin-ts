import { defineComponent } from 'vue';
import { datePickerProps } from './props';
import { Form } from 'ant-design-vue';
import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import {
  TIME_FORMAT,
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  dateUtil,
  isISO8601Date,
  dateFormat,
  getOffset,
  dateFormatStore,
} from '@/utils/dateUtil';
import _ from 'lodash-es';

export default defineComponent({
  mixins: [PageFilterComponentBase],
  props: {
    ...datePickerProps,
  },
  emits: ['change', 'update:value'],
  setup() {
    const formItemContext = Form.useInjectFormItemContext();
    return {
      formItemContext,
    };
  },
  data() {
    return {};
  },
  computed: {
    getAttrs() {
      return {
        ...this.$attrs,
        ...this.$props,
      };
    },
    getShowTime() {
      if (_.isBoolean(this.getAttrs.showTime)) {
        if (this.getAttrs.showTime) {
          if (dateFormatStore.getUse12Hours) {
            return { use12Hours: true };
          } else {
            return this.getAttrs.showTime;
          }
        } else {
          return this.getAttrs.showTime;
        }
      } else {
        return this.getAttrs.showTime;
      }
    },
    getDateFormat() {
      return this.getAttrs.showTime ? `${dateFormat.value} ${TIME_FORMAT}` : dateFormat.value;
    },
    getDateValueFormat() {
      return this.getAttrs.showTime ? DATE_TIME_FORMAT : DATE_FORMAT;
    },
    cvalue: {
      get() {
        // 不论数据如何，都得显示成年月日或年月日时分秒格式，这样数据才能正常给后台
        const value = this.$props.value;
        if (value) {
          // 判断时间是否是ISO8601格式, 统一从零时区转成当前时区
          if (isISO8601Date(value)) {
            if (this.getAttrs.showTime) {
              return dateUtil(value).utc().utcOffset(getOffset.value).format(DATE_TIME_FORMAT);
            } else {
              return dateUtil(value).utc().utcOffset(getOffset.value).format(DATE_FORMAT);
            }
          } else {
            return value;
          }
        } else {
          return value;
        }
      },
      set(value) {
        if (value) {
          const { startOfDay, endOfDay } = this.$props;
          if (startOfDay) {
            // 用户时间当天开始时间格式化成UTC零时区对应时间并格式化成ISO标准
            const utcStartOfDay = dateUtil(value)
              .startOf('day')
              .utc()
              .utcOffset(getOffset.value)
              .toISOString();
            this.innerValue = value ? utcStartOfDay : value;
            this.$emit('update:value', this.innerValue);
          } else if (endOfDay) {
            // 用户时间当天结束时间格式化成UTC零时区对应时间并格式化ISO标准
            const utcEndOfDay = dateUtil(value)
              .endOf('day')
              .utc()
              .utcOffset(getOffset.value)
              .toISOString();
            this.innerValue = value ? utcEndOfDay : value;
            this.$emit('update:value', this.innerValue);
          } else {
            if (this.getAttrs.showTime) {
              // 用户时间选择的时间格式化成UTC零时区对应时间并格式化成ISO标准
              const utcOffsetedDateTime = dateUtil(value)
                .utc()
                .utcOffset(getOffset.value)
                .toISOString();
              this.innerValue = utcOffsetedDateTime;
              this.$emit('update:value', this.innerValue);
            } else {
              // 用户时间选择的时间格式化成UTC零时区对应时间并格式化成YYYY-MM-DD
              const utcOffsetedDate = dateUtil(value)
                .utc()
                .utcOffset(getOffset.value)
                .format(DATE_FORMAT);
              this.innerValue = utcOffsetedDate;
              this.$emit('update:value', this.innerValue);
            }
          }
        } else {
          this.innerValue = value;
          this.$emit('update:value', this.innerValue);
        }
      },
    },
  },
  methods: {
    /** 选中值发生改变 */
    handleChange() {
      this.innerValueChange();
      this.formItemContext && this.formItemContext.onFieldChange();
    },
    /** 外部组件触发change事件，联动本组件 */
    handleExtraChangeEvent(fieldValue) {
      // console.log(this.dataSource);
      console.log('handleExtraChangeEvent', fieldValue);
    },
  },
});
