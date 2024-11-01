<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Saas.texts.MoveAllTenants') }}
      </div>
    </div>
    <div class="modal-body">
      <a-row>
        <a-col :span="24">
          <h3>
            {{ l('Unified.texts.MoveAllTenantsWithEditionTo') }}
          </h3>
        </a-col>
      </a-row>
      <div v-if="tenantCount > 0">
        <a-row>
          <a-col :span="24">
            <f-select
              class="a-property"
              v-model:value="allocationId"
              allow-clear
              show-search
              optionFilterProp="displayName"
              :show-arrow="true"
              :dataSource="versionDataSource"
            />
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button :loading="saving" :type="'primary'" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MoveAllTenants from './move-all-tenants';

  export default defineComponent({
    name: 'MoveAllTenants',
    mixins: [MoveAllTenants],
  });
</script>

<style lang="less" scoped>
  @import './move-all-tenants.less';
</style>
