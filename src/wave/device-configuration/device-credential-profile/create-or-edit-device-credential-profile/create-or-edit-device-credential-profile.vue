<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body modal-body-extra">
      <!-- 表单 -->
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :rules="rules"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        @submit="handleSubmit"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <!-- CredentialProfileName -->
            <a-form-item
              :label="l('Unified.texts.CredentialProfileName')"
              name="credentialProfileName"
            >
              <a-input
                name="credentialProfileName"
                v-model:value="form.credentialProfileName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- DeviceLoginId -->
            <a-form-item :label="l('Unified.texts.DeviceLoginId')" name="deviceLoginId">
              <a-input
                name="deviceLoginId"
                v-model:value="form.deviceLoginId"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- DeviceLoginPassword -->
            <a-form-item :label="l('Unified.texts.DeviceLoginPassword')" name="deviceLoginPassword">
              <a-input-password
                type="password"
                name="deviceLoginPassword"
                v-model:value="form.deviceLoginPassword"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input name="description" v-model:value="form.description" :autocomplete="'off'" />
            </a-form-item>
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
  import CreateOrEditDeviceCredentialProfile from './create-or-edit-device-credential-profile';

  export default defineComponent({
    name: 'CreateOrEditDeviceCredentialProfile',
    mixins: [CreateOrEditDeviceCredentialProfile],
  });
</script>

<style lang="less" scoped></style>
