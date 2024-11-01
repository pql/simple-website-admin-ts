<template>
  <f-resize-layout
    class="floor-plan-layout"
    :draggable="false"
    :isShowLeftSider="false"
    :isShowRightSider="true"
  >
    <template #content>
      <div class="h-full contentSider">
        <!-- 楼层 -->
        <div style="position: relative">
          <div class="floor-select flex">
            <span class="select-talle">Over View</span>
            <a-select
              class="mt-3"
              v-model:value="floorValue"
              :options="resultData"
              style="width: 220px"
              @change="floorHandle"
            />
          </div>
        </div>
        <floor-plan
          v-if="floorShow"
          ref="floorPlan"
          :id="floorlItem.id"
          :isDesign="false"
          :graphicPanelId="floorlItem.graphicPanelId"
          :graphicStoragePath="`${floorlItem.decompressingFileId}/${floorlItem.graphicStoragePath}`"
          :notIframe="true"
          @load-bim-markers="loadBimMarkers"
          @normal-click="onNormalClick($event)"
        />
      </div>
      <!-- 文件详情的主体内容 -->
    </template>
    <template #rightSider>
      <Transition name="sidebar-fade">
        <div class="rightSider flex w-full h-full">
          <a-divider class="mx-0 h-full" type="vertical" />
          <div class="w-full">
            <device-tabs ref="DeviceTabs" />
            <alert-list ref="AlertList" />
          </div>
        </div>
      </Transition>
    </template>
  </f-resize-layout>
</template>
<script lang="ts">
  import { defineComponent, Transition } from 'vue';
  import ComponentMixin from './ops-panel';

  export default defineComponent({
    name: 'OpsPanel',
    mixins: [ComponentMixin],
  });
</script>
<style scoped lang="less">
  @import './ops-panel.less';
</style>
