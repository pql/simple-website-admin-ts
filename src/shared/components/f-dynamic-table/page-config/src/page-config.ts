import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { pageConfigProps } from './props';
import { PageConfigFilter } from '../../page-config-filter';
import { PageConfigColumn } from '../../page-config-column';
import { PageConfigColumnColor } from '../../page-config-column-color';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    ...pageConfigProps,
  },
  emits: ['actionClick', 'configChange'],
  methods: {
    /**
     * toolbar 按钮点击事件
     */
    handleClick(type: string) {
      switch (type) {
        case 'QueryConfig':
        case 'FilterConfig':
          this.handleOpenPageConfigFilter();
          break;
        case 'ListConfig':
        case 'TableConfig':
          this.handleOpenPageConfigColumn();
          break;
        case 'ColumnColorConfig':
        case 'TableColorConfig':
          this.handleOpenPageConfigColumnColor();
          break;
        default:
          this.$nextTick(() => {
            this.$emit('actionClick', type);
          });
          break;
      }
    },
    /** 打开筛选条件配置器 */
    handleOpenPageConfigFilter() {
      this.modalHelper.create(PageConfigFilter, { type: this.type }).subscribe((res) => {
        if (res) {
          this.$emit('configChange', 'filter');
        }
      });
    },
    /** 打开列表配置器 */
    handleOpenPageConfigColumn() {
      this.modalHelper.create(PageConfigColumn, { type: this.type }).subscribe((res) => {
        if (res) {
          this.$emit('configChange', 'table');
        }
      });
    },
    /** 打开列表颜色配置器 */
    handleOpenPageConfigColumnColor() {
      this.modalHelper.create(PageConfigColumnColor, { type: this.type }).subscribe((res) => {
        if (res) {
          this.$emit('configChange', 'table');
        }
      });
    },
  },
});
