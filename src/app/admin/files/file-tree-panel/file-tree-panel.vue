<template>
  <f-select-tree
    ref="tree"
    :fetch="fetch"
    @fetch-success="fetchSuccess"
    :isShowHeader="false"
    showIcon
    draggable
    block-node
    :multiple="false"
    @expand="onExpand"
    @select="onSelect"
    @right-click="onRightClick"
    @dragstart="DragStart"
    @drop="DragEnd"
  >
    <template #title="{ title, key }">
      <a-dropdown :trigger="['contextmenu']">
        <span>{{ title }}</span>
        <template #overlay>
          <a-menu @click="({ key: menuKey }) => onContextMenuClick(key, menuKey)">
            <template v-if="key === 'root'">
              <a-menu-item key="CreateFolder">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#yo-icon-xinjian" />
                </svg>
                {{ l('FileManagement.texts.CreateFolder') }}
              </a-menu-item>
            </template>
            <template v-else>
              <a-menu-item key="CreateFolder">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#yo-icon-xinjian" />
                </svg>
                {{ l('FileManagement.texts.CreateFolder') }}
              </a-menu-item>
              <a-menu-item key="Rename">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#yo-icon-bianji" />
                </svg>
                {{ l('FileManagement.texts.Rename') }}
              </a-menu-item>
              <a-menu-item key="Delete">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#yo-icon-shanchu3" />
                </svg>
                {{ l('Unified.texts.Delete') }}
              </a-menu-item>
            </template>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <template #icon="{ isLeaf }">
      <FolderOutlined v-if="!isLeaf" />
    </template>
    <template #switcherIcon="{ expanded }">
      <CaretRightOutlined v-if="!expanded" />
      <CaretDownOutlined v-else />
    </template>
  </f-select-tree>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import FileTreePanel from './file-tree-panel';

  export default defineComponent({
    name: 'FileTreePanel',
    mixins: [FileTreePanel],
  });
</script>

<style lang="less" scoped>
  @import './file-tree-panel.less';
</style>
