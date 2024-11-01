import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { pageToolbarButtonProps } from './props';

const FONT_STARTS_WITH_FLAG = 'icon-f-';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    ...pageToolbarButtonProps,
  },
  computed: {
    /** 按钮class */
    formatClass() {
      return (className?: string | null) => {
        return className === 'primary' ? '' : className;
      };
    },
    /** 按钮属性 */
    buttonAttributes() {
      return {
        type: this.config?.type,
        size: this.config?.size,
        disabled: this.config?.disable,
        shape: this.config?.shape,
      };
    },
    /** 按钮样式 */
    buttonStyle() {
      return {
        width: this.config?.width ? this.config?.width + 'px' : 'auto',
        borderRadius: '4px',
        borderWidth: '1px',
      };
    },
    isIconFont() {
      return this.config?.icon && this.config?.icon.startsWith(FONT_STARTS_WITH_FLAG);
    },
  },
});
