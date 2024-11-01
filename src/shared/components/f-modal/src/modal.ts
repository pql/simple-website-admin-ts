import { defineComponent, toRefs } from 'vue';
import { modalProps } from './props';
import { useModalDragMove } from './useModalDrag';
import { ModalClose } from '../modal-close';
import SampleComponentBase from '@/shared/component-base/sample-component-base';

export default defineComponent({
  components: {
    ModalClose,
  },
  mixins: [SampleComponentBase],
  props: {
    ...modalProps,
  },
  emits: ['save', 'close', 'getPageData'],
  data() {
    return {
      isShowForm: false,
      fullScreen: false,
      current: 1,
    };
  },
  computed: {
    isNeedFullClass() {
      return this.fullScreen ? 'fullscreen-modal' : '';
    },
  },
  watch: {
    isShowForm(show) {
      // 打开的时候显示第一页 请求数据
      if (show) {
        this.handlePageChange(1);
      } else {
        this.reset();
      }
    },
  },
  mounted() {
    const { isShowForm } = toRefs(this);
    useModalDragMove({
      open: isShowForm,
    });
  },
  methods: {
    handlePageChange(page: number, pageSize: number = 10) {
      this.current = page;
      this.$emit('getPageData', this.pageDataList[page - 1], pageSize);
    },
    handleFullScreen() {
      this.fullScreen = !this.fullScreen;
    },
    open() {
      this.isShowForm = true;
    },
    close(args?: any) {
      this.$emit('close', this.pageDataList ? this.pageDataList[this.current - 1] : null);
      this.isShowForm = false;
    },
    reset() {
      this.fullScreen = false;
      this.current = 1;
    },
    handleSave() {
      this.$emit('save', this.pageDataList ? this.pageDataList[this.current - 1] : null);
    },
    handleSaveAndClose() {
      this.$emit(
        'save',
        () => {
          this.close();
        },
        this.pageDataList ? this.pageDataList[this.current - 1] : null,
      );
    },
    success(result: any = true) {
      if (result) {
        this.close(result);
      } else {
        this.close();
      }
    },
  },
});
