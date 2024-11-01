<template>
  <a-spin :spinning="loading">
    <div>
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
        <a-row>
          <a-col :span="24">
            <!-- 当前密码 * -->
            <a-form-item
              :label="l('AbpAccount.texts.DisplayName:CurrentPassword')"
              prop="currentPassword"
            >
              <a-input-password
                name="currentPassword"
                size="large"
                v-model:value="form.currentPassword"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 新密码 -->
            <a-form-item :label="l('AbpAccount.texts.DisplayName:NewPassword')" prop="newPassword">
              <a-input-password
                name="newPassword"
                size="large"
                @change="passwordChange"
                v-model:value="form.newPassword"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 确认新密码 * -->
            <a-form-item
              :label="l('AbpAccount.texts.DisplayName:NewPasswordConfirm')"
              :required="true"
              prop="confirmNewPassword"
            >
              <a-input-password
                name="confirmNewPassword"
                size="large"
                v-model:value="form.confirmNewPassword"
                :autocomplete="'off'"
                @change="passwordChange"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-button :loading="saving" :type="'primary'" @click="handleSubmit">
        <save-outlined />
        {{ l('Unified.texts.common:saveText') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ChangePasswordMixin from './changePassword';

  export default defineComponent({
    name: 'Account',
    mixins: [ChangePasswordMixin],
  });
</script>
<style scoped lang="less">
  @import './changePassword.less';
</style>
