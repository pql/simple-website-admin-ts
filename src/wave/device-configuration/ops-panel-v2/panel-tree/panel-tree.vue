<template>
  <div class="panel-tree-wrapper h-screen">
    <f-select-tree
      ref="tree"
      key="nodeId"
      :expandedKey="expandedKeys"
      :autoExpandParent="false"
      v-model:selectedKeys="selectedKeys"
      v-model:loadedKeys="loadedKeys"
      :fetch="fetch"
      @fetch-success="fetchSuccess"
      @select="onSelect"
      @expand="onExpand"
      @right-click="onRightClick"
    >
      <template #headerTitle><span></span> </template>
      <template #headerSearch>
        <a-input-search
          class="w-full"
          allow-clear
          v-model:value="form.searchValue"
          @search="handleSearch"
        />
      </template>
      <template #icon="{ dto }">
        <img v-if="dto.icon" style="width: 16px; height: 16px" :src="dto.icon" />
      </template>
      <template #switcherIcon="{ expanded }">
        <CaretRightOutlined style="width: 12px; height: 12px" v-if="!expanded" />
        <CaretDownOutlined style="width: 12px; height: 12px" v-else />
      </template>
      <!-- <template #title="{ title }">

            <a-dropdown :trigger="['contextmenu']">
              <span style="margin-left: 5px">{{ title }}</span>
            </a-dropdown>
          </template> -->

      <template #title="{ title, key, isLeaf, dto }">
        <a-dropdown :trigger="['contextmenu']">
          <span style="margin-left: 5px">{{ title }}</span>
          <template #overlay>
            <a-menu v-if="!isLeaf" @click="({ key: menuKey }) => onContextMenuClick(menuKey)">
              <a-menu-item key="UnfoldSubUnit">
                <Icon icon="ant-design:fall-outlined" />
                {{ l('Unified.texts.ExpandAll') }}
              </a-menu-item>
              <a-menu-item key="RefreshSubUnit">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#yo-icon-shuaxin3" />
                </svg>
                {{ l('Unified.texts.common:redo') }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </f-select-tree>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PanelTree from './panel-tree';

  export default defineComponent({
    name: 'CommandControlPanelTree',
    mixins: [PanelTree],
  });
</script>

<style lang="less" scoped>
  @import './panel-tree.less';
</style>
