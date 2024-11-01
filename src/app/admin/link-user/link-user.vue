<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title"> {{ l('AbpAccount.texts.LinkedAccounts') }} </div>
    </div>
    <div class="modal-body">
      <f-dynamic-table
        ref="table"
        type="link-user"
        class="table"
        :fetch="fetchDataList"
        :showActionBtn="showActionBtn"
        :showFilter="false"
        @action-click="handleActionClick"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'directlyLinked'">
            <span v-if="record.directlyLinked">
              <CheckOutlined />
            </span>
          </template>
        </template>
      </f-dynamic-table>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import LinkUser from './link-user';

  export default defineComponent({
    name: 'LinkUser',
    mixins: [LinkUser],
  });
</script>

<style lang="less" scoped></style>
