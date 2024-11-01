<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpAccount.texts.LinkedAccounts') }}
      </div>
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
          <a-col :span="24">
            {{ l('AbpAccount.texts.UserName') }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <f-select
              class="w-full"
              allow-clear
              show-search
              optionFilterProp="name"
              :show-arrow="true"
              :dataSource="userDataSource"
              @change="userChange"
            />
          </a-col>
        </a-row>
        <a-row style="margin-top: 30px">
          <a-col :span="24">
            {{ l('AbpAccount.texts.Password') }}
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-input-password
              name="password"
              v-model:value="userPassword"
              type="password"
              :autocomplete="'off'"
            />
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
  import CreateLinkUser from './create-link-user';

  export default defineComponent({
    name: 'CreateLinkUser',
    mixins: [CreateLinkUser],
  });
</script>

<style lang="less" scoped>
  .a-property {
    width: 250px;
  }
</style>
