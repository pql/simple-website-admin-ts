<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <div class="modal-body modal-body-extra">
      <f-dynamic-table
        ref="table"
        type="pacs-card-holder-device-select"
        class="table"
         :extra-height="125"
        :fetch="fetchCardsDataList"
        :showActionBtn="showActionBtn"
        @action-click="handleActionClick"
        @fetch-success="handleFetchSuccess"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'validTillDate'">
            <template v-if="record[column.field] && record[column.field].length > 0">
              {{ fromUTCDateToLocalDateTimeHorizontalSymbol(record[column.field]) }}
            </template>
            <span v-else></span>
          </template>
        </template>
      </f-dynamic-table>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button :loading="saving" :type="'primary'" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Comfirm') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Device from './select-device-table';

  export default defineComponent({
    name: 'Device',
    mixins: [Device],
  });
</script>

<style lang="less" scoped></style>
