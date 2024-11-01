<template>
  <div class="resize-layout">
    <slot name="layout">
      <!-- 头部 -->
      <div class="resize-layout-header" v-if="isShowHeader">
        <slot name="header"></slot>
      </div>
      <div ref="container" class="resize-layout-container">
        <!-- 左侧 -->
        <div v-if="isShowLeftSider" ref="leftSider" class="resize-layout-sider left-sider">
          <slot name="leftSider"></slot>
        </div>
        <!-- 可拖动图标 -->
        <div v-if="isShowLeftSider && draggable" ref="resizeLeft" class="resize" title="收缩侧边栏">
          ⋮
        </div>
        <!-- 中间 -->
        <div
          v-if="isShowContent"
          class="resize-layout-content"
          ref="content"
          :style="{ margin: contentMargin }"
        >
          <slot name="content"></slot>
        </div>
        <div
          v-if="isShowRightSider && draggable"
          ref="resizeRight"
          class="resize"
          title="收缩侧边栏"
        >
          ⋮
        </div>
        <!-- 右侧 -->
        <div v-if="isShowRightSider" ref="rightSider" class="resize-layout-sider right-sider">
          <slot name="rightSider"></slot>
        </div>
      </div>
      <div class="resize-layout-footer" v-if="isShowFooter">
        <slot name="footer"></slot>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ResizeLayout from './resize-layout';

  export default defineComponent({
    name: 'FResizeLayout',
    mixins: [ResizeLayout],
  });
</script>
<style lang="less" scoped>
  @import './resize-layout.less';
</style>
