import { defineComponent } from 'vue';
import DragResizeMixin from './mixins/drag-resize-mixin';
import { resizeLayoutProps } from './props';

export default defineComponent({
  components: {},
  mixins: [DragResizeMixin],
  props: {
    ...resizeLayoutProps,
  },
  computed: {
    /** 计算content margin */
    contentMargin() {
      let margin = '0';
      if (this.isShowLeftSider) {
        margin = !this.draggable ? '0 0 0 16px' : '0';
      }
      if (this.isShowRightSider) {
        margin = !this.draggable ? '0 16px 0 0 ' : '0';
      }
      if (this.isShowLeftSider && this.isShowRightSider) {
        margin = '0 6px';
      }
      return margin;
    },
  },
  mounted() {
    this.dragControllerDiv(
      this.$refs.resizeLeft as HTMLDivElement,
      this.$refs.leftSider as HTMLDivElement,
      this.$refs.content as HTMLDivElement,
      this.$refs.container as HTMLDivElement,
    );
    this.dragControllerDiv(
      this.$refs.resizeRight as HTMLDivElement,
      this.$refs.content as HTMLDivElement,
      this.$refs.rightSider as HTMLDivElement,
      this.$refs.container as HTMLDivElement,
    );
  },
});
