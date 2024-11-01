<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <!-- 工具条 -->
      <a-button class="mb-4" type="primary" @click="createOrEdit">
        <plus-outlined />
        <span>{{ l('Unified.texts.Create') }}</span>
      </a-button>
      <span style="margin-left: 20px">
      {{l('Unified.texts.Permission:Copy')}}：
        <f-select
          style="width: 200px"
          v-model:value="copyCardId"
          allow-clear
          show-search
          optionFilterProp="cardNumber"
          :show-arrow="true"
          :dataSource="copyCardDataSource"
        />
      </span>

      <f-dynamic-table
        ref="table"
        type="pacs-card-holder-card-select"
        class="table"
        :extra-height="10"
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
  import Cards from './select-card-table';

  export default defineComponent({
    name: 'Cards',
    mixins: [Cards],
  });
</script>

<style lang="less" scoped></style>
