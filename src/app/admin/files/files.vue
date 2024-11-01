<template>
  <f-resize-layout :draggable="false" leftSiderDefaultWidth="400px">
    <template #leftSider>
      <div class="w-60 flex items-center flex-col p-4">
        <!-- 上传文件-->
        <f-basic-upload
          :emptyHidePreview="true"
          :maxSize="20"
          :maxNumber="10"
          :uploadParams="uploadParams"
          :api="fileDescriptorUpload"
          @before-upload="handleBeforeUpload"
          @change="handleUploadChange"
        />
        <!-- 创建文件夹 -->
        <f-btn
          type="primary"
          class="my-4"
          block
          ghost
          :text="l('FileManagement.texts.CreateFolder')"
          @click="handleCreateFolder"
        >
          <template #icon>
            <FolderAddOutlined />
          </template>
        </f-btn>
        <!-- 所有文件树 -->
        <file-tree-panel
          ref="treeRef"
          @update:name="handleTreeRenameSuccess"
          @selected-node="selectedNodeFunc"
        />
      </div>
    </template>

    <template #content>
      <div>
        <!-- 选中节点的面包屑 -->
        <div class="breadcrumb p-2" v-if="breadList.length">
          <a-breadcrumb>
            <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
              {{ item }}
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <!-- 文件详情的主体内容 -->
        <file-unit-panel
          ref="fileUnitRef"
          v-if="selectedTree"
          :selectedTree="selectedTree"
          @select-directory="handleSelectDirectory"
          @update:name="handleUpdateName"
          @update:directory="handleUpdateDirectory"
        />
        <a-empty
          v-else
          class="in-middle"
          :description="l('Unified.texts.SelectAnFolderUnitToSeeFiles')"
        />
      </div>
    </template>
  </f-resize-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Files from './files';

  export default defineComponent({
    name: 'Files',
    mixins: [Files],
  });
</script>

<style lang="less" scoped>
  @import './files.less';
</style>
