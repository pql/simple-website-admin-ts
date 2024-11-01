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
        <a-row :gutter="24">
          <a-col :span="24">
            <!-- Card Format -->
            <a-form-item :label="l('Unified.texts.Name')" name="name">
              <a-input name="name" v-model:value="form.name" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Descriptions -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-textarea name="description" v-model:value="form.description" allow-clear />
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
  import CreateoOrEditCardLabel from './create-or-edit-card-label';

  export default defineComponent({
    name: 'CreateoOrEditCardLabel',
    mixins: [CreateoOrEditCardLabel],
  });
</script>

<style lang="less" scoped></style>
