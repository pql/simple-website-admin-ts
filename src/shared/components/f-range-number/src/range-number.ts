import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import { defineComponent } from 'vue';
import { Form } from 'ant-design-vue';
import { rangeNumberProps } from './props';
import { gt, toNumber, isString } from 'lodash-es';

export default defineComponent({
  mixins: [PageFilterComponentBase],
  props: {
    ...rangeNumberProps,
  },
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
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val ?? [];
      },
      immediate: true,
    },
  },
  methods: {
    isString,
    /** 值发生改变 */
    handleChange() {
      this.innerValueChange();
      this.formItemContext && this.formItemContext.onFieldBlur();
      this.formItemContext && this.formItemContext.onFieldChange();
    },
    handleBlur(e) {
      // 获取输入框的值,这里转成 number 类型
      let result = e.target.value !== '' ? toNumber(e.target.value) : undefined;
      // 判断输入范围最值
      if (result && result > this.$props.max) result = this.$props.max;
      if (result && result < this.$props.min) result = this.$props.min;

      // 解构获取最值
      const [min, max] = this.innerValue as Array<number>;
      // 判断最小值是否大于最大值，为真就调换位置
      if (result && result > max) {
        this.innerValue = gt(result, max) ? [max, result] : [result, max];
      }

      // 判断最大值是否小于最小值，为真就调换位置
      if (result && result < min) {
        this.innerValue = gt(min, result) ? [result, min] : [min, result];
      }
      this.handleChange();
    },
    /** 外部组件触发change事件，联动本组件 */
    handleExtraChangeEvent(data) {
      console.log('handleExtraChangeEvent', data);
    },
    handleExternalTriggerChangeEvent(data) {
      console.log('handleExternalTriggerChangeEvent', data);
    },
  },
});
