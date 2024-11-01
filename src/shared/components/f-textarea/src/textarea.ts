import { defineComponent } from 'vue';
import { textareaProps } from './props';
import { Form, Textarea } from 'ant-design-vue';
import sanitizeHtml from 'sanitize-html';
import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
import { isNull } from 'lodash-es';

export default defineComponent({
  components: {
    ATextarea: Textarea,
  },
  mixins: [PageFilterComponentBase],
  props: {
    ...textareaProps,
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
        const { sanitize, value } = this.$props;
        if (isNull(value)) return undefined;
        return sanitize ? sanitizeHtml(`${value}`) : value;
      },
      set(value) {
        const { sanitize } = this.$props;
        if (sanitize) {
          value = sanitizeHtml(`${value}`);
          this.$emit('update:value', value);
        }
        this.$emit('update:value', value);
      },
    },
  },
  methods: {
    /** 选中值发生改变 */
    handleChange(e) {
      const value = e.target.value;
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
