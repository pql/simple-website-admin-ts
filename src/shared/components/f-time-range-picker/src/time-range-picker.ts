import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import { defineComponent } from 'vue';
import { timeRangePickerProps } from './props';
import { Form, TimeRangePicker } from 'ant-design-vue';

export default defineComponent({
  components: {
    ATimeRangePicker: TimeRangePicker,
  },
  mixins: [PageFilterComponentBase],
  props: {
    ...timeRangePickerProps,
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
    cvalue: {
      get() {
        return this.$props.value;
      },
      set(value) {
        this.innerValue = value;
        this.$emit('update:value', this.innerValue);
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
