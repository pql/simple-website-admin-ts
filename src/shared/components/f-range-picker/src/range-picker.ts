import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import { defineComponent } from 'vue';
import { rangePickerProps } from './props';
import { Form } from 'ant-design-vue';
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
    ...rangePickerProps,
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
        ...this.$props,
        ...this.$attrs,
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
        const { value } = this.$props;
        if (value) {
          // 判断时间是否是ISO8601格式, 统一从零时区转成当前时区
          if (
            value &&
            value[0] &&
            isISO8601Date(value[0]) &&
            value &&
            value[1] &&
            isISO8601Date(value[1])
          ) {
            if (this.getAttrs.showTime) {
              const v1 =
                value && value[0]
                  ? dateUtil(value[0]).utc().utcOffset(getOffset.value).format(DATE_TIME_FORMAT)
                  : value[0];
              const v2 =
                value && value[1]
                  ? dateUtil(value[1]).utc().utcOffset(getOffset.value).format(DATE_TIME_FORMAT)
                  : value[1];
              return [v1, v2];
            } else {
              const v1 =
                value && value[0]
                  ? dateUtil(value[0]).utc().utcOffset(getOffset.value).format(DATE_FORMAT)
                  : value[0];
              const v2 =
                value && value[1]
                  ? dateUtil(value[1]).utc().utcOffset(getOffset.value).format(DATE_FORMAT)
                  : value[1];
              return [v1, v2];
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
          if (startOfDay && endOfDay) {
            // 用户时间当天开始时间格式化成UTC零时区对应时间并格式化成ISO标准
            const utcStartOfDay =
              value && value[0]
                ? dateUtil(value[0]).startOf('day').utc().utcOffset(getOffset.value).toISOString()
                : value[0];
            // 用户时间当天结束时间格式化成UTC零时区对应时间并格式化ISO标准
            const utcEndOfDay =
              value && value[1]
                ? dateUtil(value[1]).endOf('day').utc().utcOffset(getOffset.value).toISOString()
                : value[1];
            this.innerValue = [utcStartOfDay, utcEndOfDay];
            this.$emit('update:value', this.innerValue);
          } else {
            if (this.getAttrs.showTime) {
              // 用户时间选择的时间格式化成UTC零时区对应时间并格式化成ISO标准
              const utcOffsetedDateTime0 =
                value && value[0]
                  ? dateUtil(value[0]).utc().utcOffset(getOffset.value).toISOString()
                  : value[0];

              // 用户时间选择的时间格式化成UTC零时区对应时间并格式化成ISO标准
              const utcOffsetedDateTime1 =
                value && value[1]
                  ? dateUtil(value[1]).utc().utcOffset(getOffset.value).toISOString()
                  : value[1];

              this.innerValue = [utcOffsetedDateTime0, utcOffsetedDateTime1];
              this.$emit('update:value', this.innerValue);
            } else {
              // 用户时间选择的时间格式化成UTC零时区对应时间并格式化成YYYY-MM-DD
              const utcOffsetedDate0 =
                value && value[0]
                  ? dateUtil(value[0]).utc().utcOffset(getOffset.value).format(DATE_FORMAT)
                  : value[0];

              // 用户时间选择的时间格式化成UTC零时区对应时间并格式化成YYYY-MM-DD
              const utcOffsetedDate1 =
                value && value[1]
                  ? dateUtil(value[1]).utc().utcOffset(getOffset.value).format(DATE_FORMAT)
                  : value[1];
              this.innerValue = [utcOffsetedDate0, utcOffsetedDate1];
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
