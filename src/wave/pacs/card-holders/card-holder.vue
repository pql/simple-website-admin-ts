<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="pacs-card-holder"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    >
      <template #bodyCell="{ column, record }">
        <!-- <template v-if="column.key === 'joinedDate'">
          {{ dateUtil.fromUTCDateToLocalDate(record.joinedDate) }}
        </template>
        <template v-if="column.key === 'dateOfBirth'">
          {{ dateUtil.fromUTCDateToLocalDate(record.dateOfBirth) }}
        </template> -->
      </template>
    </f-dynamic-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CardHolder from './card-holder';

  export default defineComponent({
    name: 'PacsCardHolder',
    mixins: [CardHolder],
  });
</script>

<style lang="less" scoped></style>
