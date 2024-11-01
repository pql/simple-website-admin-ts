<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ modalTitle }}
      </div>
    </div>
    <div class="modal-body">
      <a-form class="form-container" :model="form" ref="formRef">
        <!-- 组织单元名称 -->
        <a-form-item
          :label="l('AbpIdentity.texts.DisplayName')"
          name="displayName"
          :rules="[
            { required: true, message: l('ThisFieldIsRequired') },
            { max: 128, message: l('OverMaxLength', [128]) },
          ]"
        >
          <a-input
            v-model:value="form.displayName"
          />
        </a-form-item>
      </a-form>
    </div>
    <div class="modal-footer text-right">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          :loading="saving"
          v-show="showNextStepButton"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
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
  import CreateOrEditOrganizationUnit from './create-or-edit-organization-unit';

  export default defineComponent({
    name: 'CreateOrEditOrganizationUnit',
    mixins: [CreateOrEditOrganizationUnit],
  });
</script>
<style lang="less" scoped>
  @import './create-or-edit-organization-unit.less';
</style>
