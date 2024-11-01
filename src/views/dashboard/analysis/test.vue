<template>
  <a-button type="primary" class="m-4" @click="onExportExcel">导出excel</a-button>
  <f-dynamic-table
    ref="table"
    type="test"
    class="table"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'roleNames'">
        <template v-if="record[column.field].length > 0">
          <a-tooltip :title="rolesEllipsis(record.roleNames)">
            <a-tag v-for="item in record.roleNames" :key="item" color="blue" round>{{
              item
            }}</a-tag>
          </a-tooltip>
        </template>
        <span v-else></span>
      </template>
      <!-- 是否已激活 -->
      <template v-if="column.key === 'isActive'">
        <Icon v-show="record.isActive" icon="icon-f-Success" :size="19" class="text-[#3DCF36]" />
        <Icon v-show="!record.isActive" icon="icon-f-Wrong" :size="19" class="text-[#EE3131]" />
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import User from '@/app/admin/users/user';
  import { exportAsExcel } from '@/utils/file/exportFile';

  export default defineComponent({
    name: 'Users',
    mixins: [User],
    methods: {
      onExportExcel() {
        const exportParams = {
          sorting: undefined,
          skipCount: 0,
          maxResultCount: 10,
        };
        exportAsExcel(exportParams);
      },
    },
  });
</script>
