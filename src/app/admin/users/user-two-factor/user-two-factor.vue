<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title"> {{ l('AbpIdentity.texts.TwoFactor') }} - {{ _userName }} </div>
    </div>
    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="18">
            <a-checkbox v-model:checked="isTwoFactor">
              {{ l('AbpIdentity.texts.DisplayName:TwoFactorEnabled') }}
            </a-checkbox>
          </a-col>
        </a-row>
      </a-form>
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
  import UserTwoFactor from './user-two-factor';

  export default defineComponent({
    name: 'UserTwoFactor',
    mixins: [UserTwoFactor],
  });
</script>

<style lang="less" scoped></style>
