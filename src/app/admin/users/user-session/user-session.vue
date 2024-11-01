<template>
  <div class="modal-header">
    <div class="modal-title">
      {{ l('AbpIdentity.texts.Sessions') }}
    </div>
  </div>
  <div class="modal-body">
    <f-dynamic-table ref="table" type="user-session" class="table" :fetch="fetchDataList" :showActionBtn="showActionBtn"
      :showToolbar="false" :showFilter="false" :extraHeight="100" @action-click="handleActionClick">
      <template #bodyCell="{ column, record }">
        <!-- 是否当前 -->
        <template v-if="column.key === 'device'">
          {{ record.device }}
          <a-tag v-if="record.isCurrent" :color="'#4fbf67'">{{
            l('Unified.texts.CurrentSession')
          }}</a-tag>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserSession from './user-session';

export default defineComponent({
  name: 'UserSession',
  mixins: [UserSession],
});
</script>

<style lang="less" scoped>
.modal-body {
  padding: 0 10px !important;
}
</style>
