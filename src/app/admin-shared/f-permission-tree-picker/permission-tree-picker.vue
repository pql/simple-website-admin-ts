<template>
  <a-tree-select
    :dropdownStyle="{ maxHeight: '80vh', overflow: 'auto' }"
    :multiple="multiple"
    :placeholder="l('FilterByPermission')"
    v-model:value="innerValue"
    :treeData="treeData"
    @change="innerValueChange"
    allowClear
    showSearch
    style="width: 100%"
    treeDefaultExpandAll
    :maxTagCount="3"
  />
</template>

<script lang="ts">
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import arrayService from '@/shared/utils/array/array.service';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FPermissionTreePicker',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
    },
    data() {
      return {
        permissions: new Array<any>(),
        treeData: new Array<any>(),
      };
    },
    mounted() {},
    methods: {
      arrToTreeNode() {
        this.loading = true;
        arrayService.arrToTreeNode(this.permissions, {
          idMapName: 'name',
          parentIdMapName: 'parentName',
          titleMapName: 'displayName',
        });

        // 延时设置子父节点checkbox关联状态，否则有父节点选中则全部选中了
        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
    },
  });
</script>
