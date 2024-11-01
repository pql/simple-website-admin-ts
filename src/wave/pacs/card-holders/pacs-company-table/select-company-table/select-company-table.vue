<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body modal-body-extra">
      <f-dynamic-table
        ref="table"
        type="pacs-card-holder-company-select"
        class="table"
        :fetch="fetchCardsDataList"
        :showActionBtn="showActionBtn"
        @action-click="handleActionClick"
        @fetch-success="handleFetchSuccess"
      >
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
  import Company from './select-company-table';

  export default defineComponent({
    name: 'Company',
    mixins: [Company],
  });
</script>

<style lang="less" scoped></style>
