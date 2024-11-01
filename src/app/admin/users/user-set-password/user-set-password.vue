<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpIdentity.texts.SetPassword') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        :rules="rules"
        @submit="handleSubmit"
      >
        <a-row>
          <a-col :span="18">
            <!-- 新密码 -->
            <a-form-item :label="l('AbpIdentity.texts.Password')" name="newPassword">
              <a-input-password
                v-model:value="form.newPassword"
                type="password"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-button
              style="width: 80px; margin-top: 30px; margin-left: 5px"
              type="primary"
              block
              @click="randomPassword()"
            >
              <ReloadOutlined />
            </a-button>
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
  import UserSetPassword from './user-set-password';

  export default defineComponent({
    name: 'UserSetPassword',
    mixins: [UserSetPassword],
  });
</script>

<style lang="less" scoped>
  @import './user-set-password.less';
</style>
