<template>
  <f-select-tree
    ref="tree"
    :fetch="fetch"
    @fetch-success="fetchSuccess"
    showIcon
    draggable
    block-node
    :multiple="false"
    @select="onSelect"
    @right-click="onRightClick"
    @dragstart="DragStart"
    @drop="DragEnd"
  >
    <template #headerTitle>{{ l('AbpIdentity.texts.OrganizationTree') }}</template>
    <template #headerExtra>
      <a-space>
        <a @click="handleAddClick">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#yo-icon-xinjian" />
          </svg>
          {{ l('AbpIdentity.texts.AddRootUnit') }}
        </a>
        <a @click="reload()">
          <slot name="reload-extra">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#yo-icon-shuaxin3" />
            </svg>
          </slot>
        </a>
      </a-space>
    </template>
    <template #title="{ title, key }">
      <a-dropdown :trigger="['contextmenu']">
        <span>{{ title }}</span>
        <template #overlay>
          <a-menu @click="({ key: menuKey }) => onContextMenuClick(key, menuKey)">
            <a-menu-item key="Edit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#yo-icon-bianji" />
              </svg>
              {{ l('AbpIdentity.texts.Permission:Edit') }}
            </a-menu-item>
            <a-menu-item key="AddSubUnit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#yo-icon-xinjian" />
              </svg>
              {{ l('AbpIdentity.texts.AddSubUnit') }}
            </a-menu-item>
            <a-menu-item key="Delete">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#yo-icon-shanchu3" />
              </svg>
              {{ l('AbpIdentity.texts.Permission:Delete') }}
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
    <template #switcherIcon="{ expanded }">
      <CaretRightOutlined v-if="!expanded" />
      <CaretDownOutlined v-else />
    </template>
  </f-select-tree>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import OrganizationUnitTreePanel from './organization-unit-tree-panel';

  export default defineComponent({
    name: 'OrganizationUnitTreePanel',
    mixins: [OrganizationUnitTreePanel],
  });
</script>
<style lang="less" scoped>
  @import './organization-unit-tree-panel.less';
</style>
