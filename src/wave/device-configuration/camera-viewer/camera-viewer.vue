<template>
  <div class="camera-viewer">
    <f-resize-layout class="floor-plan-layouts" :draggable="false">
      <template #leftSider>
        <!-- 右侧 -->
        <div class="tree-sider-container">
          <control-panel-tree
            :treeName="'Cameras'"
            isCamera
            @select-node-change="onSelectNodeChange($event)"
          />
        </div>
      </template>

      <template #content>
        <div class="panel_right">
          <!-- 顶部操作栏 -->
          <a-row class="my-[10px] ml-2">
            <a-col>
              <a-radio-group
                v-model:value="viewMode"
                button-style="solid"
                @change="viewModeChanged"
                class="mr-[20px]"
              >
                <a-radio-button value="live">{{ l('Unified.texts.LiveMode') }}</a-radio-button>
                <a-radio-button value="playback">{{
                  l('Unified.texts.PlayBackMode')
                }}</a-radio-button>
              </a-radio-group>
              <!-- <a-tabs
                class="content-nav"
                v-model:activeKey="viewMode"
                @change="viewModeChanged($event)"
              >
                <a-tab-pane key="live" tab="Live Mode" />
                <a-tab-pane key="playback" tab="PlayBack Mode" />
              </a-tabs> -->
            </a-col>
            <!-- 布局选择器 -->
            <a-col>
              <div>
                Layout :
                <a-select
                  v-model:value="viewLayout"
                  style="width: 80px"
                  @change="viewLayoutChanged($event)"
                >
                  <a-select-option
                    v-for="(item, index) in viewLayoutOptions"
                    :key="index"
                    :value="item"
                  >
                    {{ item }}
                  </a-select-option>
                </a-select>
              </div>
            </a-col>
            <!-- 回放时间选择器 -->
            <a-col>
              <div v-show="viewMode === 'playback'" class="ml-[10px]">
                {{ l('Unified.texts.PlaybackDateRange') }} :
                <f-range-picker
                  style="width: 340px"
                  v-model:value="dateRange"
                  :allow-clear="false"
                  showTime
                  @change="playbackRangeChanged($event)"
                />
                <!-- <a-range-picker
                  style="width: 340px"
                  v-model:value="dateRange"
                  :allowClear="false"
                  :placeholder="[]"
                  @change="playbackRangeChanged($event)"
                  showTime
                /> -->
              </div>
            </a-col>
          </a-row>

          <a-dropdown :trigger="['contextmenu']">
            <!-- 布局 -->
            <div class="camera-viewer-container">
              <div class="camera-grid">
                <draggable
                  class="camera-row"
                  :style="{ height: rowHeightOrColWidth }"
                  v-model="cameraPlayOptionList"
                  @start="drag = true"
                  @end="drag = false"
                  item-key="id"
                >
                  <template #item="{ element, index }">
                    <div
                      class="camera-col"
                      :style="{ width: rowHeightOrColWidth }"
                      @contextmenu="openMenu($event, index)"
                    >
                      <camera-item-view
                        :config="element"
                        :isToggleZoom="true"
                        class="camera-item"
                      />
                    </div>
                  </template>
                </draggable>
              </div>
            </div>
            <!-- 右键菜单 -->
            <template #overlay>
              <a-menu>
                <a-menu-item key="1" @click="cameraReload()">{{
                  l('Unified.texts.Reload')
                }}</a-menu-item>
                <a-menu-item key="2" @click="cameraClear()">{{
                  l('Unified.texts.Remove')
                }}</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </f-resize-layout>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './camera-viewer';

  export default defineComponent({
    name: 'CameraViewer',
    mixins: [ComponentMixin],
  });
</script>

<style lang="less" scoped>
  @import './camera-viewer.less';
</style>
