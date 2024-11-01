import { defineComponent } from 'vue';

export default defineComponent({
  computed: {},
  methods: {
    /**
     *  初始化拖拽
     * @param dom 当前拖拽组件dom
     * @param leftDom 当前拖拽组件左侧dom
     * @param rightDom 当前拖拽组件右侧dom
     * @param parentDom 当前拖拽组件父级dom
     */
    dragControllerDiv(
      dom: HTMLDivElement,
      leftDom: HTMLDivElement,
      rightDom: HTMLDivElement,
      parentDom: HTMLDivElement,
    ) {
      if (!(this as any).draggable || !dom || !leftDom || !rightDom || !parentDom) return;
      // 鼠标按下事件
      dom.onmousedown = function (e) {
        //颜色改变提醒
        dom.style.background = '#818181';
        /** 距离左侧宽度 */
        const startX = e.clientX;
        (dom as any).left = dom.offsetLeft;
        // 鼠标拖动事件
        document.onmousemove = function (e) {
          /** 移动后距离左侧宽度 */
          const endX = e.clientX;
          let moveLen = (dom as any).left + (endX - startX);
          // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
          const maxT = parentDom.clientWidth - dom.offsetWidth;
          // 左边区域的最小宽度为32px
          if (moveLen < 32) moveLen = 32;
          //右边区域最小宽度为150px
          if (moveLen > maxT - 150) moveLen = maxT - 150;
          // 设置左侧区域的宽度
          dom.style.left = moveLen;
          leftDom.style.width = moveLen + 'px';
          rightDom.style.width = parentDom.clientWidth - moveLen - 10 + 'px';
        };
        // 鼠标松开事件: 恢复
        document.onmouseup = function () {
          //颜色恢复
          dom.style.background = '#d6d6d6';
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    },
  },
});
