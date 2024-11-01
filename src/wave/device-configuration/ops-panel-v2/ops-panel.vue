<template>
  <div
    :class="['w-full h-full overflow-hidden ops-panel', { fullscreen: isFullscreen }]"
    ref="OpsPanel"
  >
    <div class="relative"> <LeftSider @select-node-change="onSelectNode" /> </div>
    <div class="relative"> <RightSider ref="rightSiderRef" /></div>
    <div class="relative"> <passport-kiosk-panel /> </div>
    <!-- 楼层 -->
    <div v-show="updatePanle" class="w-full h-full overflow-hidden">
      <FloorPlan
        v-if="tablePanelInfo && tablePanelInfo.graphicType === 'Floor'"
        ref="floorPlan"
        :id="tablePanelInfo.id"
        :isDesign="false"
        :graphicPanelId="tablePanelInfo.graphicPanelId"
        :graphicStoragePath="`${tablePanelInfo.decompressingFileId}/${tablePanelInfo.graphicStoragePath}`"
        :notIframe="true"
        :tablePanelInfo="tablePanelInfo"
        @load-bim-markers="loadBimMarkers"
        @normal-click="onNormalClick($event)"
      />
      <!-- 地图 -->
      <MapPlan
        class="z-0"
        v-else-if="tablePanelInfo && tablePanelInfo.graphicType === 'Map'"
        ref="map"
        :id="tablePanelInfo.id"
        :type="tablePanelInfo.type"
        :graphicPanelId="tablePanelInfo.graphicPanelId"
        :mapHeight="'100%'"
        :graphicStoragePath="tablePanelInfo.graphicStoragePath"
        @normal-click="onNormalClick($event)"
      />
      <!-- 图片 -->
      <ImagePlan
        v-else-if="tablePanelInfo && tablePanelInfo.graphicType === 'Image'"
        ref="image"
        :id="tablePanelInfo.id"
        :type="tablePanelInfo.type"
        :graphicPanelId="tablePanelInfo.graphicPanelId"
        :graphicUrl="tablePanelInfo.graphicUrl"
        @normal-click="onNormalClick($event)"
      />
      <!-- Avue大屏 -->
      <iframe
        v-else-if="tablePanelInfo && tablePanelInfo.graphicType === 'Avue'"
        id="avue"
        :src="visualViewUrl"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import OpsPanel from './ops-panel';

  export default defineComponent({
    name: 'ControlPanel',
    mixins: [OpsPanel],
  });
</script>

<style lang="less" scoped>
  @import './ops-panel.less';
</style>
<style lang="less">
  .ops-full-screen {
    .markers {
      z-index: 1000 !important;
    }
  }
</style>
