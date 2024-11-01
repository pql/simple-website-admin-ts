<template>
  <f-dynamic-table
    ref="table"
    type="entityChanges"
    :show-filter="true"
    :extra-height="62"
    :fetch="fetchDataList"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <!-- 是否已激活 -->
      <template v-if="column.key === 'changeType'">
        {{
          record.changeType == 0
            ? l('AbpAuditLogging.texts.Created')
            : record.changeType == 1
              ? l('AbpAuditLogging.texts.Updated')
              : l('AbpAuditLogging.texts.Deleted')
        }}
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Entities from './entities';

  export default defineComponent({
    name: 'Entities',
    mixins: [Entities],
  });
</script>

<style lang="less" scoped>
  @import './entities.less';
</style>
