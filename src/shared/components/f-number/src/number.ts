import { defineComponent } from 'vue';
import { numberProps } from './props';
import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import { InputNumber, Form } from 'ant-design-vue';

export default defineComponent({
  components: {
    AInputNumber: InputNumber,
  },
  mixins: [PageFilterComponentBase],
  props: {
    ...numberProps,
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
  },
  methods: {
    /** 选中值发生改变 */
    handleChange(value: number | string) {
      this.$emit('update:value', value);
      this.$emit('change', value);
      this.formItemContext && this.formItemContext.onFieldBlur();
      this.formItemContext && this.formItemContext.onFieldChange();
    },
    /** 外部组件触发change事件，联动本组件 */
    handleExtraChangeEvent(fieldValue) {
      // console.log(this.dataSource);
      console.log('handleExtraChangeEvent', fieldValue);
    },
  },
});
