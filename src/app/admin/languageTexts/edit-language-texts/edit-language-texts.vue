<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">{{ l('Unified.texts.Edit') }}</div>
    </div>

    <div class="modal-body">
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        @submit="handleSubmit"
      >
        <!-- 键值 -->
        <a-form-item :label="l('LanguageManagement.texts.Key')">
          {{ form?.name }}
        </a-form-item>
        <!-- 源语言 -->
        <a-form-item :label="l('LanguageManagement.texts.BaseValue')">
          <a-textarea
            :disabled="true"
            :rows="4"
            v-model:value="formattedBaseValue"
          />
        </a-form-item>
        <!-- 目标语言 -->
        <a-form-item :label="l('LanguageManagement.texts.TargetValue')">
          <a-textarea
            :rows="4"
            v-model:value="formattedUpdateValue"
          />
        </a-form-item>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button type="primary" :loading="saving" ghost @click="restoreDefaultValue()">
          <check-outlined />
          {{ l('LanguageManagement.texts.RestoreToDefault') }}
        </a-button>
        <a-button type="primary" :loading="saving" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
        <a-button type="primary" :loading="saving" @click="handleSubmitAndNext()">
          <save-outlined />
          {{ l('LanguageManagement.texts.SaveAndNext') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import EditLanguageTextsMixin from './edit-language-texts';

  export default defineComponent({
    name: 'EditLanguageTexts',
    mixins: [EditLanguageTextsMixin],
  });
</script>

<style scoped lang="less"></style>
