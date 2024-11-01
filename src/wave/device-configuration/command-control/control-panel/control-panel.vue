<template>
  <div :class="['control-panel']">
    <f-resize-layout class="floor-plan-layouts" :draggable="false">
      <template #leftSider>
        <div class="tree-sider-container" style="width: 310px">
          <control-panel-tree
            :treeName="'Devices'"
            :isDesign="isDesign"
            v-model:activeKey="currentTab"
            v-model:isBinding="isBinding"
            v-model:bindingId="bindingId"
            v-model:bindingType="bindingType"
            @show-table="onShowTable"
          />
        </div>
      </template>
      <template #content>
        <!-- tab导航条 -->
        <div class="panel_right" v-show="updatePanle">
          <a-tabs
            v-if="panels.length"
            class="content-nav ant-tabs-full-height"
            v-model:activeKey="currentTab"
            type="editable-card"
            @edit="tabEdit"
            v-model:hideAdd="hideAdd"
          >
            <!-- style="z-index: 0;" -->
            <a-tab-pane v-for="panel in panels" :key="panel.id" :tab="panel.displayName">
              <!-- 地图 -->
              <MapPlan
                v-if="panel.graphicType == 'Map'"
                ref="map"
                :id="panel.id"
                :type="panel.type"
                :bindingId="bindingId"
                :bindingType="bindingType"
                :graphicPanelId="panel.graphicPanelId"
                :isDesign="isDesign"
                :scrollerHeight="'100%'"
                :graphicStoragePath="panel.graphicStoragePath"
                v-model:visible="visible"
                v-model:isBinding="isBinding"
              />
              <!-- 楼层 -->
              <floor-plan
                v-else-if="panel.graphicType == 'Floor'"
                ref="floorPlan"
                :id="panel.id"
                :isDesign="isDesign"
                :graphicPanelId="panel.graphicPanelId"
                :graphicStoragePath="`${panel.decompressingFileId}/${panel.graphicStoragePath}`"
                :notIframe="true"
                @load-bim-markers="loadBimMarkers"
                @bim-viewer-click="onBimViewerClick($event)"
                @mark-click="onMarkClick($event)"
              />

              <!-- 图片 -->
              <image-plan
                v-else-if="panel.graphicType == 'Image'"
                ref="image"
                :id="panel.id"
                :type="panel.type"
                :bindingId="bindingId"
                :bindingType="bindingType"
                :graphicPanelId="panel.graphicPanelId"
                :isDesign="isDesign"
                :graphicUrl="panel.graphicUrl"
                v-model:visible="visible"
                v-model:isBinding="isBinding"
              />
              <!-- Avue大屏 -->
              <iframe
                v-else-if="panel.graphicType == 'Avue'"
                id="avue"
                :src="visualViewUrl"
                width="100%"
                height="100%"
              ></iframe>
            </a-tab-pane>
          </a-tabs>
          <a-empty
            v-if="!panels.length"
            class="in-middle"
            :description="l('Unified.texts.SelectViewInTheLeftTree')"
          />
        </div>
      </template>
    </f-resize-layout>

    <!-- 右侧 message panel -->
    <!-- <right-message-panel ref="messagePanel" v-if="!isDesign"></right-message-panel> -->

    <!-- 默认视图 -->
    <Modal v-model:open="visible" title="Binding" @ok="handleOk" @cancel="handleCancel">
      <div style="padding: 20px">
        <div>
          <a-checkbox v-model:checked="isDefultBoundBuilding">Default View</a-checkbox>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './control-panel';

  export default defineComponent({
    name: 'ControlPanelDesign',
    mixins: [ComponentMixin],
  });
</script>

<style lang="less" scoped>
  @import './control-panel.less';
</style>
<style lang="less">
  // .markers {
  //   z-index: 1 !important;
  // }
</style>
