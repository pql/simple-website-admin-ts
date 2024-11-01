<template>
  <f-dynamic-table
    ref="table"
    type="user"
    class="table"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'roleNames'">
        <template v-if="record[column.field].length > 0">
          <a-tooltip :title="rolesEllipsis(record.roleNames)">
            <a-tag
              v-for="item in record.roleNames"
              style="border: 1px solid #ff6e00; color: #ffffffd9"
              :key="item"
              round
              >{{ item }}</a-tag
            >
          </a-tooltip>
        </template>
        <span v-else></span>
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import User from './user';

  export default defineComponent({
    name: 'Users',
    mixins: [User],
  });
</script>

<style lang="less" scoped>
  @import './user.less';
</style>
