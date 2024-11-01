<template>
  <div class="modal-header">
    <div class="modal-title">{{ l('AbpIdentity.texts.SelectRoles') }} </div>
  </div>
  <div class="modal-body">
    <f-dynamic-table
      type="organization-unit-add-role"
      ref="table"
      class="dynamic-table"
      :fetch="fetchDataList"
      :showToolbar="false"
      :extra-height="190"
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
  import AddRole from './add-role';

  export default defineComponent({
    name: 'AddRole',
    mixins: [AddRole],
  });
</script>

<style scoped lang="less">
  @import './add-role.less';
</style>
