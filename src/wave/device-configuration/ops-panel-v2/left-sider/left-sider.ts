import { defineComponent } from 'vue';
import PanelTree from '../panel-tree/panel-tree.vue';
import MessagePanel from '../message-panel/message-panel.vue';
import AppComponentBase from '@/shared/component-base/app-component-base';

export default defineComponent({
  components: {
    PanelTree,
    MessagePanel,
  },
  mixins: [AppComponentBase],
  // provide() {
  //   return {
  //     showChange: this.showChange,
  //   };
  // },
  data() {
    return {
      isUnfold: true as Boolean,
      isShow: true as Boolean,
      showWarp: true as Boolean,
    };
  },
  methods: {
    componentSwitch() {
      this.isShow = !this.isShow;
    },
    /* 打开/收起面板 */
    unfoldClick() {
      this.isUnfold = !this.isUnfold;
      this.$nextTick(() => {
        this.showWarp = this.isUnfold;
      });
    },
  },
});
