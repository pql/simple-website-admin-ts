<template>
  <div
    class="floor-plan"
    ref="myPlan"
    :style="{ height: mapHeight == 0 ? '100%' : mapHeight + 'px' }"
  >
    <a-button
      class="save_degree_button"
      type="primary"
      :style="{ display: isDesign ? 'block' : 'none' }"
      @click="saveDegree"
      >Save Degree</a-button
    >
    <div ref="myExplorer" class="myExplorer" v-show="showExplorer"></div>
    <div ref="myToolbar" class="myToolbar" v-show="showToolbar" :style="[toolbarStyle]"> </div>
    <div ref="myInspector" class="myInspector"></div>
    <div ref="myViewer" :class="showExplorer ? 'myViewer_gp' : ''" class="myViewer">
      <canvas ref="myCanvas" class="myCanvas"></canvas>
      <canvas ref="myNavCubeCanvas" style="width: 0; height: 0" class="myNavCubeCanvas"></canvas>
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
    <Toolbar v-show="showToolbar" :isDesign="isDesign" :tablePanelInfo="tablePanelInfo" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './floor-plan';

  export default defineComponent({
    name: 'FloorPlan',
    mixins: [ComponentMixin],
  });
</script>

<style lang="less">
  @import './floor-plan.less';
</style>
