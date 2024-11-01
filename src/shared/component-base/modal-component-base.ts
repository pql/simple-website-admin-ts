import { defineComponent } from 'vue';
import AppComponentBase from './app-component-base';
import { ComponentModalSettingStore } from '@/store/modules/componentModalSetting';

const modalSettingStore = ComponentModalSettingStore.useStoreWithOut();

const ModalComponentBase = defineComponent({
  mixins: [AppComponentBase],
  props: {
    /** 模态框引用 */
    modalRef: Object,
    /** 输入的数据 */
    modalData: Object,
  },
  data() {
    return {
      title: '',
    };
  },
  computed: {
    showCancelButton() {
      return modalSettingStore.getShowCancelButton;
    },
    showNextStepButton() {
      return modalSettingStore.getShowNextStepButton;
    },
  },
  beforeMount() {
    if (this.modalRef) {
      this.modalRef!.onChange = (pageIndex: number) => {
        (this as any).getPageData(this.modalRef!.pageDataList[pageIndex - 1]);
      };
    }
  },
  methods: {
    /**
     * 带参数回传关闭
     * @param result 回传参数
     */
    success(result: any = true) {
      if (result) {
        this.modalRef!.close(result);
      } else {
        this.close();
      }
    },
    /**
     * 保存不关闭
     * 带参数回传关闭
     */
    saveNotClose(result: any = true) {
      this.modalRef!.unClose(result);
    },
    /**
     * 关闭模态框
     * @param event 事件
     */
    close(event?: MouseEvent) {
      this.modalRef!.close(false);
    },
  },
});

export default ModalComponentBase;
