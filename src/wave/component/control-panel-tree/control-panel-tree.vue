<template>
  <div>
    <a-spin :spinning="loading">
      <div class="flex px-2 py-1.5 items-center">
        <slot name="headerTitle"></slot>
        <BasicTitle> {{ l(treeName || '') }} </BasicTitle>
        <div class="headerExtra" style="position: absolute; right: 20px" v-if="!isOpsPanel">
          <a-space>
            <a v-if="isDesign" @click="addSiteSubUnit()">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#yo-icon-xinjian" />
              </svg>
              {{ l('Unified.texts.AddRootSite') }}
            </a>
            <a @click="reload()">
              <a-tooltip title="Refresh">
                <slot name="reload-extra">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#yo-icon-shuaxin3" />
                  </svg>
                </slot>
              </a-tooltip>
            </a>
            <a
              @click="nodeDataSynchronous(0)"
              v-if="isDesign && isGrantedAny('AbpIdentity.Roles.Update')"
            >
              <!-- 按钮权限同角色行内按钮 Control Panel Permissions -->
              <a-tooltip title="Synchronous Data">
                <slot name="reload-extra">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#yo-icon-duiqi" />
                  </svg>
                </slot>
              </a-tooltip>
            </a>
          </a-space>
        </div>
      </div>
      <a-divider style="margin: 12px 0" />
      <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" @search="onSearch" />
      <div :class="isOpsPanel ? 'treeheight' : 'treeheight-control-panel-tree'">
        <div style="margin-top: 10px">
          <a-tree
            :tree-data="treeData"
            :load-data="loadData"
            show-icon
            ref="tree"
            v-model:expandedKeys="expandedKeys"
            :autoExpandParent="false"
            v-model:selectedKeys="selectedKeys"
            v-model:loadedKeys="loadedKeys"
            @select="onSelect"
            @right-click="onRightClick"
          >
            <template #title="{ key: key, title, isLeaf, type, graphicType, isHaveSlave, iconUrl }">
              <a-dropdown :trigger="['contextmenu']">
                <div>
                  <img style="width: 16px; height: 16px" v-if="iconUrl" :src="iconUrl" />
                  <span style="margin-left: 5px">{{ title }}</span>
                </div>
                <template #overlay>
                  <a-menu
                    @click="({ key: menuKey }) => onContextMenuClick(menuKey)"
                    v-if="!isLeaf || isDesign || isMapViewer || isOpsPanel"
                  >
                    <a-menu-item key="AddSubUnit" v-if="(!isLeaf || isHaveSlave) && isDesign">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#yo-icon-xinjian" />
                      </svg>
                      {{
                        l(
                          type == 'site' || type == 'building'
                            ? l('Unified.texts.Add')
                            : l('Unified.texts.AddDevice'),
                        )
                      }}
                    </a-menu-item>
                    <a-menu-item key="Edit" v-if="isDesign">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#yo-icon-bianji" />
                      </svg>

                      {{ l('Unified.texts.Edit') }}
                    </a-menu-item>
                    <a-menu-item key="Build" v-if="isDesign && graphicType=='avue'">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#yo-icon-bianji" />
                      </svg>

                      {{ l('Unified.texts.ScreenDesign') }}
                    </a-menu-item>
                    <a-menu-item
                      key="Delete"
                      v-if="type != 'deviceCategory' && type != 'deviceType' && isDesign"
                    >
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#yo-icon-shanchu3" />
                      </svg>
                      {{ l('Unified.texts.Delete') }}
                    </a-menu-item>
                    <a-menu-item key="View" v-if="isMapViewer || (isOpsPanel && isLeaf)">
                      <fund-view-outlined />
                      {{ l('Unified.texts.View') }}
                    </a-menu-item>
                    <a-menu-item key="UnfoldSubUnit" v-if="!isLeaf">
                      <Icon icon="ant-design:fall-outlined" />
                      {{ l('Unified.texts.ExpandAll') }}
                    </a-menu-item>
                    <a-menu-item key="RefreshSubUnit" v-if="!isLeaf">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#yo-icon-shuaxin3" />
                      </svg>
                      {{ l('Unified.texts.common:redo') }}
                    </a-menu-item>
                    <a-menu-item
                      key="Binding"
                      v-if="
                        !['deviceCategory', 'deviceType'].includes(type) &&
                        !['floor', 'image'].includes(graphicType) &&
                        isDesign
                      "
                    >
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#yo-icon-xinjian" />
                      </svg>
                      {{ l('Unified.texts.Binding') }}
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
          </a-tree>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTitle } from '/@/components/Basic';
  import ComponentMixin from './control-panel-tree';

  export default defineComponent({
    components: { BasicTitle },
    mixins: [ComponentMixin],
  });
</script>
<style lang="less">
  @import './control-panel-tree.less';

  .ant-tree .ant-tree-node-content-wrapper {
    white-space: nowrap;
  }
</style>
