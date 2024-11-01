<template>
  <f-resize-layout leftSiderDefaultWidth="400px">
    <template #leftSider>
      <div class="tree-sider-container">
        <!-- 组织架构树 -->
        <organization-unit-tree-panel ref="treeRef" @selected-node="selectedNodeFunc" />
      </div>
    </template>
    <template #content>
      <!-- 选中节点的面包屑 -->
      <div class="breadcrumb" v-if="breadList.length">
        <a-breadcrumb>
          <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
            {{ item }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <!-- 用户和角色的主体内容 -->
      <a-tabs class="content-container" v-model:activeKey="currentTab">
        <a-tab-pane :tab="l('AbpIdentity.texts.Members')" key="1" :forceRender="false" />
        <a-tab-pane :tab="l('AbpIdentity.texts.Roles')" key="2" :forceRender="true" />
      </a-tabs>
      <organization-unit-members-panel
        v-if="!!selectedTree && currentTab == '1'"
        :selectTree="selectedTree"
      />
      <organization-unit-role-panel
        :selectTree="selectedTree"
        v-if="!!selectedTree && currentTab == '2'"
      />
      <a-empty
        v-if="!selectedTree"
        class="in-middle"
        :description="
          currentTab == '1'
            ? l('AbpIdentity.texts.SelectAnOrganizationUnitToSeeMembers')
            : l('AbpIdentity.texts.SelectAnOrganizationUnitToSeeRoles')
        "
      />
    </template>
  </f-resize-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import OrganizationUnitsMixin from './organization-units';

  export default defineComponent({
    name: 'OrganizationUnits',
    mixins: [OrganizationUnitsMixin],
  });
</script>

<style lang="less" scoped>
  @import './organization-units.less';
</style>
