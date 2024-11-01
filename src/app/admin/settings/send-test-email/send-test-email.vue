<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpSettingManagement.texts.SendTestEmail') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-row>
        <a-col :span="24">
          <h5>{{ l('AbpSettingManagement.texts.SenderEmailAddress') }}</h5>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-input
            class="a-property"
            v-model:value="sendTestEmailDto.senderEmailAddress"
            :autocomplete="'off'"
          />
        </a-col>
      </a-row>
      <a-row class="space-between">
        <a-col :span="24">
          <h5>{{ l('AbpSettingManagement.texts.TargetEmailAddress') }}</h5>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-input
            name="targetEmailAddress"
            class="a-property"
            v-model:value="sendTestEmailDto.targetEmailAddress"
            :autocomplete="'off'"
          />
        </a-col>
      </a-row>
      <a-row class="space-between">
        <a-col :span="24">
          <h5>{{ l('AbpSettingManagement.texts.Subject') }}</h5>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-input
            name="subject"
            class="a-property"
            v-model:value="sendTestEmailDto.subject"
            :autocomplete="'off'"
          />
        </a-col>
      </a-row>
      <a-row class="space-between">
        <a-col :span="24">
          <h5>{{ l('AbpSettingManagement.texts.Body') }}</h5>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-textarea
            class="a-property"
            v-model:value="sendTestEmailDto.body"
            showCount
            :maxlength="100"
          />
        </a-col>
      </a-row>
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
  import SendTestEmail from './send-test-email';

  export default defineComponent({
    name: 'SendTestEmail',
    mixins: [SendTestEmail],
  });
</script>

<style lang="less">
  @import './send-test-email.less';
</style>
