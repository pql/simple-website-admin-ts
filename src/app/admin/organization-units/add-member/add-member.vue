<template>
  <div class="modal-header">
    <div class="modal-title">
      <!-- <team-outlined /> -->
      {{ l('AbpIdentity.texts.SelectUsers') }}
    </div>
  </div>
  <div class="modal-body">
    <f-dynamic-table
      type="organization-unit-add-members"
      ref="table"
      class="dynamic-table"
      :fetch="fetchDataList"
      :extra-height="190"
      :showToolbar="false"
      @fetch-success="handleFetchSuccess"
    />
  </div>
  <!-- 按钮 -->
  <div class="modal-footer">
    <a-space>
      <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
        <close-circle-outlined />
        {{ l('Unified.texts.Cancel') }}
      </a-button>
      <a-button :loading="saving" type="primary" @click="handleSubmit()">
        <save-outlined />
        {{ l('Unified.texts.Save') }}
      </a-button>
    </a-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import AddMember from './add-member';

  export default defineComponent({
    name: 'AddMember',
    mixins: [AddMember],
  });
</script>

<style lang="less" scoped>
  @import './add-member.less';
</style>
