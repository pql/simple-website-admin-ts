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
          <a-col :span="8">
            <!-- BrandName -->
            <a-form-item :label="l('Unified.texts.BrandName')" name="brandName">
              <a-input
                name="brandName"
                v-model:value="form.brandName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- BrandIcon -->
            <a-form-item :label="l('Unified.texts.BrandIcon')" name="brandIcon">
              <a-input
                name="brandIcon"
                v-model:value="form.brandIcon"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input
                name="description"
                v-model:value="form.description"
                :autocomplete="'off'"
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
  import CreateOrEditDeviceBrand from './create-or-edit-device-brand';

  export default defineComponent({
    name: 'CreateOrEditDeviceBrand',
    mixins: [CreateOrEditDeviceBrand],
  });
</script>

<style lang="less" scoped></style>
