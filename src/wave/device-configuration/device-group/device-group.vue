<template>
  <f-resize-layout :draggable="false">
    <template #leftSider>
      <div class="tree-sider-container table-width" style="width: 300px">
        <device-group-table @selected-node="selectedNodeFunc" />
      </div>
    </template>
    <template #content v-if="selectedTree != null">
      <!-- 选中节点的面包屑 -->
      <div class="breadcrumb"> {{ selectedTree.groupName }} -- Device & Functions </div>
      <!-- 主体内容 -->
      <div v-if="selectedTree != null">
        <f-dynamic-table
          type="device-group-device-functions"
          ref="table"
          :extra-height="40"
          :fetch="fetchDataList"
          :loading="tableLoading"
          :showFilter="false"
          @action-click="handleActionClick"
        >
          <template #headerCell="{ column }">
            <template v-if="column.field == 'No'">
              {{ column.title }}
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'deviceTypeFunctionId'">
              <!-- <y-combox-page
                name="deviceTypeFunctionId"
                v-model:value="record.deviceTypeFunctionId"
                :params="{customData:record.deviceTypeId}"
                dataSource="Firebytes.AMS.DeviceTypeFunctions.DeviceTypeFunction"
                @change="changeDeviceFunction($event, record)"
              >
              </y-combox-page> -->
              <f-select
                :disabled="!isGrantedAny('Unified.CommandGroup.Edit')"
                name="deviceTypeFunctionId"
                style="width: 200px"
                show-search
                optionFilterProp="name"
                v-model:value="record.deviceTypeFunctionId"
                :dataSource="{
                  service: 'DeviceTypeFunctionService.getApiAppDeviceTypeFunctionComboxNdo',
                  labelField: 'name',
                  valueField: 'id',
                  valueChange: [],
                  params: { customData: record.deviceTypeId },
                }"
                @change="changeDeviceFunction($event, record)"
              />
            </template>
          </template>
        </f-dynamic-table>
      </div>
    </template>
  </f-resize-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceGroupMixin from './device-group';

  export default defineComponent({
    name: 'SiteConfigurationDeviceCommandgroup',
    mixins: [DeviceGroupMixin],
  });
</script>

<style lang="less" scoped>
  @import './device-group.less';
</style>
