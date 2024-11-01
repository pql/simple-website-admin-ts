<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !!!id ? l('Unified.texts.NewEditions') : l('Saas.texts.Permission:Edit') }}
      </div>
    </div>
    <div class="modal-body">
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
        <a-row class="space-between">
          <a-col :span="24">
            <!-- 版本名称 -->
            <a-form-item :label="l('Saas.texts.EditionName')" name="displayName">
              <a-input
                name="displayName"
                v-model:value="form.displayName"
                autocomplete="off"
              />
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
  import CreateOrEditVersion from './create-or-edit-version';

  export default defineComponent({
    name: 'CreateOrEditVersion',
    mixins: [CreateOrEditVersion],
  });
</script>

<style lang="less" scoped>
  @import './create-or-edit-version.less';
</style>
