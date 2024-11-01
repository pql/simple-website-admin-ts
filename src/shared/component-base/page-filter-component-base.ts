import { defineComponent } from 'vue';
import ControlComponentBase from './control-component-base';

const PageFilterComponentBase = defineComponent({
  mixins: [ControlComponentBase],
  emits: ['onReady'],
  mounted() {
    this.handleData();
  },
  methods: {
    handleData(params?: any) {
      console.log(params);
      // 空实现，可重写处理业务特色情况
      this.imReady();
    },
    /** 组件已加载完毕 */
    imReady() {
      this.$emit('onReady', this.innerValue);
    },
  },
});

export default PageFilterComponentBase;
