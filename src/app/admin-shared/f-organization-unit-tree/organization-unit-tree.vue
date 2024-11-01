<template>
  <div id="organization-unit-tree">
    <p v-if="data?.isSearch != false">
      <!-- :placeholder="l('InXSearchPlaceHolder', l('OrganizationUnitName'))" -->
      <a-input
        :placeholder="l('AbpIdentity.texts.OrganizationUnits')"
        @change="onSearch"
        size="default"
      >
        <template #addonAfter>
          <reload-outlined @click.prevent="reload()" />
        </template>
      </a-input>
    </p>
    <a-tree
      v-if="treeData.length"
      :disabled="data?.isDisabled"
      checkable
      checkStrictly
      defaultExpandAll
      v-model:checkedKeys="selectedKeys"
      @check="onCheck"
      :tree-data="treeData"
    />
  </div>
</template>

<script lang="ts">
  import AppComponentBase from '@/shared/component-base/app-component-base';
  import arrayService from '@/shared/utils/array/array.service';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FOrganizationUnitTree',
    mixins: [AppComponentBase],
    props: {
      data: Object,
    },
    data() {
      return {
        // permissionService: new PermissionServiceProxy(),
        permissions: [],
        treeData: new Array<any>(),
        treeDataOrigin: new Array<any>(),
        selectedPermissionVal: new Array<any>(),
        selectedKeys: new Array<any>(),
      };
    },
    mounted() {
      this.arrToTreeNode();
    },
    methods: {
      arrToTreeNode() {
        let treeData = arrayService.arrToTreeNode(this.data?.allOrganizationUnits, {
          idMapName: 'id',
          parentIdMapName: 'parentId',
          titleMapName: 'displayName',
        });
        this.treeData = treeData;
        this.getTreeSelected();
        this.treeDataOrigin = [...this.treeData];
      },
      /**
       * 选中
       */
      onCheck(val) {
        this.selectedPermissionVal = val;
        this.$emit('selectedUnitChange', val);
      },
      /**
       * 格式化数据 模糊匹配
       */
      getParentKey(key, tree) {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {
          const node = tree[i];
          if (node.children) {
            if (node.children.some((item) => item.title === key)) {
              parentKey = node.title;
            } else if (this.getParentKey(key, node.children)) {
              parentKey = this.getParentKey(key, node.children);
            }
          }
        }
        return parentKey;
      },
      /**
       * 搜索
       */
      onSearch(e) {
        const value = e.target.value;
        this.treeData = this.rebuildData(value, this.treeDataOrigin);
      },
      /** 递归生成所需数据 */
      rebuildData(value, arr) {
        let newarr: Array<any> = new Array<any>();
        arr.forEach((element) => {
          if (element.title.indexOf(value) > -1) {
            newarr.push(element);
          } else {
            if (element.children && element.children.length > 0) {
              const children = this.rebuildData(value, element.children);
              const obj = {
                ...element,
                children,
              };
              if (children && children.length > 0) {
                newarr.push(obj);
              }
            }
          }
        });
        return newarr;
      },
      /**
       * 刷新
       */
      reload() {
        this.treeData = this.treeDataOrigin;
      },
      getTreeSelected() {
        let memberedOrganizationUnits = this.data?.memberedOrganizationUnits;
        let allOrganizationUnits = this.data?.allOrganizationUnits;
        for (const item of memberedOrganizationUnits) {
          const foundUnit = allOrganizationUnits.find((p) => p.code === item);
          if (foundUnit) {
            this.selectedKeys.push(foundUnit.key);
          }
        }
      },
    },
  });
</script>
