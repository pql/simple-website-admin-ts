<template>
  <div class="select-tree" v-loading="getLoading()">
    <template v-if="isShowHeaderFlag">
      <div class="header">
        <div>
          <slot name="headerTitle">{{ l('Tree') }}</slot>
        </div>
        <div>
          <slot name="headerExtra"></slot>
        </div>
      </div>
      <a-divider style="margin: 12px 0" />
      <slot name="headerSearch"></slot>
      <div style="margin: 12px 0"></div>
    </template>
    <div clsss="tree-warp">
      <a-tree
        v-if="hasEmpty"
        v-model:expandedKeys="expandedKeys"
        v-model:selectedKeys="selectedKeys"
        v-model:checkedKeys="checkedKeys"
        :tree-data="treeDataList"
        v-bind="getProps()"
        @check="check"
        @dragend="dragend"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragover="dragover"
        @dragstart="dragstart"
        @drop="drop"
        @expand="expand"
        @load="load"
        @right-click="rightClick"
        @select="select"
      >
        <template #icon="{ children, isLeaf }">
          <slot name="icon" :children="children" :isLeaf="isLeaf">
            <svg v-if="children && children.length" class="icon" aria-hidden="true">
              <use xlink:href="#yo-icon-zuzhijiegou1" />
            </svg>
            <svg v-else class="icon" aria-hidden="true">
              <use xlink:href="#yo-icon-zuzhijiegouzicengji1" />
            </svg>
          </slot>
        </template>
        <template #title="{ title, key, isLeaf, children }">
          <slot name="title" :title="title" :key="key" :children="children" :isLeaf="isLeaf">
            {{ title }}</slot
          >
        </template>
        <template #switcherIcon="{ checked, expanded, selected, children }">
          <slot
            name="switcherIcon"
            :checked="checked"
            :expanded="expanded"
            :selected="selected"
            :children="children"
          ></slot>
        </template>
      </a-tree>
      <a-empty class="in-middle" v-else />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SelectTree from './select-tree';

  export default defineComponent({
    name: 'FSelectTree',
    mixins: [SelectTree],
  });
</script>
<style lang="less" scoped>
  @import './select-tree.less';
</style>
