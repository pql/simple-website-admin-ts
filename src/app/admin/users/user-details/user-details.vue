<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpIdentity.texts.ViewDetails') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <!-- tab切换 -->
      <a-tabs defaultActiveKey="1">
        <!-- 用户信息 -->
        <a-tab-pane key="1">
          <template #tab>
            {{ l('AbpIdentity.texts.UserInformations') }}
          </template>
          <a-table
            :showHeader="false"
            :dataSource="dataList"
            :columns="columns"
            :pagination="false"
          />
        </a-tab-pane>
        <!-- 组织机构 -->
        <a-tab-pane key="2">
          <template #tab>
            {{ l('AbpIdentity.texts.OrganizationUnits') }}
          </template>
          <f-organization-unit-tree
            :multiple="true"
            :dropDownStyle="{ 'max-height': '500px' }"
            :data="organizationData"
          />
        </a-tab-pane>
        <!-- 常规 -->
        <a-tab-pane key="3">
          <template #tab>
            {{ l('AbpIdentity.texts.General') }}
          </template>
          <a-table
            :showHeader="false"
            :dataSource="dataConventionList"
            :columns="columns"
            :pagination="false"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="modal-footer" v-if="showCancelButton">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import UserDetails from './user-details';

  export default defineComponent({
    name: 'UserDetails',
    mixins: [UserDetails],
  });
</script>

<style lang="less" scoped>
  @import './user-details.less';
</style>
