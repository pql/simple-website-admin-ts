import { defineComponent } from 'vue';
import AppComponentBase from './app-component-base';

const ControlComponentBase = defineComponent({
  mixins: [AppComponentBase],
  props: {
    value: {
      type: [String, Number, Object, Boolean, Array, Date, Function, Symbol],
      required: true,
    },
  },
  emits: ['update:value', 'change'],
  data() {
    return {
      innerValue: this.value,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.innerValue = val;
        this.handleExtraChangeEvent(val);
      },
      immediate: true,
    },
  },
  methods: {
    innerValueChange() {
      this.$emit('change', this.innerValue);
      this.$emit('update:value', this.innerValue);
    },
    /** 外部组件触发change事件，联动本组件 */
    handleExtraChangeEvent(data) {
      console.log(data);
      // 如果外部组件需要联动本组件，请补充方法
    },
  },
});

export default ControlComponentBase;
