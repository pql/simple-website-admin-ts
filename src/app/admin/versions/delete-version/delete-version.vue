<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.AreYouSure') }}
      </div>
    </div>
    <div class="modal-body">
      <!-- 表单 -->
      <a-row>
        <a-col :span="24">
          <h3>
            {{ l('Unified.texts.Versions') }}{{ displayName }}
            {{ l('Unified.texts.Versions:ConfirmationReminder') }}
          </h3>
        </a-col>
      </a-row>
      <div v-if="tenantCount > 0">
        <a-row>
          <a-col :span="24">
            <a-radio-group v-model:value="radioModel">
              <a-radio :value="1">{{ l('Unified.texts.Versions:RelieveAllocation') }}</a-radio>
              <a-radio :value="2">{{ l('Unified.texts.Versions:AllocationToOther') }}</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
        <a-row v-if="radioModel == 2">
          <a-col :span="24">
            <Select
              class="a-property"
              :value="allocationId"
              :options="selectVersionsOptions"
              @change="selectChange"
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
  import DeleteVersion from './delete-version';

  export default defineComponent({
    name: 'DeleteVersion',
    mixins: [DeleteVersion],
  });
</script>

<style lang="less" scoped>
  @import './delete-version.less';
</style>
