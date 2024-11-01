<template>
  <div>
    <a-spin :spinning="loading">
      <div class="flex px-2 py-1.5 items-center">
        <div class="headerTitle">Device Group </div>
        <div class="headerExtra" style="position: absolute; right: 20px">
          <a-space>
            <a @click="handleAddClick">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#yo-icon-xinjian" />
              </svg>
              Add Device Group
            </a>
            <a @click="reload()">
              <slot name="reload-extra">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#yo-icon-shuaxin3" />
                </svg>
              </slot>
            </a>
          </a-space>
        </div>
      </div>
      <a-divider style="margin: 0; margin-bottom: 10px" />
      <a-input-search v-model:value="searchValue" style="margin-bottom: 8px"
        @search="innerLoadData" />
      <a-tree v-model="checkedKeys" blockNode="true" :tree-data="treeData" @select="onSelect">
        <template #icon="{ key, selected }">
          <template>
            <pic-center-outlined />
          </template>
        </template>

        <template #title="{ key: treeKey, title, childrenType }">
          <a-dropdown :trigger="['contextmenu']">
            <span>{{ title }}</span>
            <template #overlay>
              <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
                <a-menu-item key="Edit">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#yo-icon-bianji" />
                  </svg>
                  {{ l('Unified.texts.Edit') }}
                </a-menu-item>
                <a-menu-item key="Delete">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#yo-icon-shanchu3" />
                  </svg>
                  {{ l('Unified.texts.Delete') }}
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tree>
    </a-spin>
  </div>
</template>
<script>
import { PicCenterOutlined } from '@ant-design/icons-vue';
import CreateOrEditDeviceGroup from '../create-or-edit-device-group/create-or-edit-device-group.vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { DeviceGroupService } from '/@/apis';

export default {
  components: {
    PicCenterOutlined,
    CreateOrEditDeviceGroup,
  },
  mixins: [DynamicTableComponentBase],
  data() {
    return {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData: [],
      searchValue: '',
      loadData: (e) => {
        return this.innerLoadData(e);
      },
    };
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val);
    },
  },
  created() {
    this.innerLoadData();
  },

  methods: {
    innerLoadData() {
      this.loading = true;
      DeviceGroupService.getApiAppDeviceGroupDeviceGroupTree({
        filter: this.searchValue,
      }).then((res) => {
        //遍历数据title和key
        const resultTreeData = [];
        for (const item of res) {
          var treeItem = {};
          treeItem.title = item.groupName;
          treeItem.key = item.id;
          resultTreeData.push(treeItem);
        }
        this.treeData = resultTreeData;
        this.loading = false;
      });
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log('onSelect', info);
      this.selectedKeys = selectedKeys;
      if (info.event == 'select') {
        this.$emit('selectedNode', info.node);
      }
    },
    handleAddClick() {
      this.modalHelper.create(CreateOrEditDeviceGroup, { pageDataList: [] }).subscribe((res) => {
        if (res) {
          this.reload();
        }
      });
    },
    reload() {
      this.searchValue = '';
      this.innerLoadData();
    },
    /**
     * 用于点击空白处隐藏增删改菜单
     */
    clearMenu() {
      this.NodeTreeItem = null;
    },
    onContextMenuClick(treeKey, action) {
      switch (action) {
        case 'Delete':
          this.deleteItem(treeKey);
          break;
        case 'Edit':
          this.EditItem(treeKey);
          break;
        default:
          break;
      }
    },
    EditItem(key) {
      this.modalHelper
        .create(CreateOrEditDeviceGroup, { pageDataList: [key] })
        .subscribe((res) => {
          if (res) {
            this.reload();
          }
        });
    },
    /**
     * 单个删除
     */
    deleteItem(key) {
      this.loading = true;

      DeviceGroupService.deleteApiAppDeviceGroup({
        id: key,
      })
        .finally(() => {
          this.reload();
        })
        .then((res) => {
          if (res) {
            this.notify.success(this.l('Unified.texts.SavedSuccessfully'));
            this.reload();
          } else {
            this.notify.error(this.l('Unified.texts.Faildeleted:Thedevicegrouphasbeenbound'));
          }
        });
    },
  },
};
</script>

<style scoped>
.headerTitle {
  font-size: 16px;
}

.ant-tree-switcher {
  display: none !important;
}
</style>
