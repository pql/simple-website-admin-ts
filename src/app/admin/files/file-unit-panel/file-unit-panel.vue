<template>
  <f-dynamic-table
    type="fmFileDescriptors"
    ref="table"
    class="dynamic-table"
    :extra-height="70"
    :showToolbar="false"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <!-- 文件名 -->
      <span class="cursor-pointer" v-if="column.key === 'name'" @click="handleNameSelect(record)">
        <template v-if="record.isDirectory">
          <FolderOpenOutlined />
          <span class="ml-1">{{ record.name }}</span>
        </template>
        <template v-else>
          <!-- 0标识图标来自于FontAwesome图标库 -->
          <template v-if="record.iconInfo?.type === 0">
            <i :class="record.iconInfo?.icon"></i>
          </template>
          <!-- 1则是从url的具体图标地址 -->
          <template v-if="record.iconInfo?.type === 1">
            <img :src="record.iconInfo?.icon" class="icon" />
          </template>
          <span class="ml-1">
            {{ record.name }}
          </span>
        </template>
      </span>
      <!-- 文件尺寸 -->
      <span v-if="column.key === 'size'"> {{ (record.size / 1024).toFixed(2) }} KB </span>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import FileUnitPanel from './file-unit-panel';

  export default defineComponent({
    name: 'FileUnitPanel',
    mixins: [FileUnitPanel],
  });
</script>

<style lang="less" scoped>
  @import './file-unit-panel.less';
</style>
