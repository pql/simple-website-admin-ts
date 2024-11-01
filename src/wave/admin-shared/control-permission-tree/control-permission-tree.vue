<template>
  <a-spin :spinning="loading">
    <!-- 搜索 -->
    <a-input
      v-model:value="filterText"
      size="default"
    >
      <template #addonAfter>
        <reload-outlined @click.prevent="reload()" />
      </template>
    </a-input>
    <p></p>
    <!-- 树 -->
    <div style="height: calc(50vh - 90px); overflow-y: auto">
      <a-tree
        blockNode
        checkable
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="treeData"
        v-model:checkedKeys="grantedPermissionNames"
        @expand="onExpand($event)"
        @check="onCheck($event)"
      >
        <template #title="{ title }">
          <span v-if="title.indexOf(filterText) > -1">
            {{ title.substr(0, title.indexOf(filterText)) }}
            <span style="color: #f50">{{ filterText }}</span>
            {{ title.substr(title.indexOf(filterText) + filterText.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SitePermissionTreeBase from './control-permission-tree';
  export default defineComponent({
    name: 'control-permission-tree',
    mixins: [SitePermissionTreeBase],
  });
</script>

<style scoped></style>
