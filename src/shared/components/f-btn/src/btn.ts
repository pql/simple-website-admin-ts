import { defineComponent } from 'vue';
import { btnProps } from './props';

export default defineComponent({
  props: {
    ...btnProps,
  },
  emits: ['callback'],
  computed: {
    /** 按钮class */
    formatClass() {
      return (className?: string | null) => {
        return className === 'primary' ? '' : className;
      };
    },
    /** 按钮样式 */
    buttonStyle() {
      return {
        width: 'auto',
        borderRadius: '4px',
        borderWidth: '1px',
      };
    },
  },
  methods: {
    clickCallback(e) {
      this.$emit('callback', this.eventName);
      // 阻止form提交
      e.preventDefault();
      e.stopPropagation();
      return false;
    },
  },
});
