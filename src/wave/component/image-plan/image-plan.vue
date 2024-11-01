<template>
  <a-button
    class="save_degree_button"
    type="primary"
    :style="{ display: isDesign ? 'block' : 'none' }"
    @click="saveDegree"
    >Save Degree</a-button
  >
  <div class="canvas-box" style="position: relative" ref="canvasBox">
    <img ref="bitmap" :src="srcImg" style="display: none" />
    <canvas
      ref="mycanvas"
      :width="canvaswidth"
      :height="canvasheight"
      style="transition: all 0.3s"
      @mousedown="onmousedown"
      @mouseup="onmouseup"
      @mousemove="onmousemove"
      @mousewheel="onmousewheel"
      @contextmenu="contextmenu($event)"
      @click="clickMarkPoint($event)"
    ></canvas>
    <div
      class="context-menu"
      v-show="isMenuVisible"
      :style="{ top: `${top}px`, left: `${left}px` }"
    >
      <ul>
        <li v-for="item in menuItems" :key="item.id" @click="handleMenuItemClick(item)">{{
          item.label
        }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './image-plan';

  export default defineComponent({
    name: 'ImagePlan',
    mixins: [ComponentMixin],
  });
</script>

<style lang="less" scoped>
  @import './image-plan.less';
</style>
