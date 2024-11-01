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
            <!-- DeviceCategoryName -->
            <a-form-item :label="l('Unified.texts.DeviceCategoryName')" name="deviceCategoryName">
              <a-input
                :disabled="_types == 'disabled'"
                name="deviceCategoryName"
                v-model:value="form.deviceCategoryName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- DeviceType -->
            <a-form-item :label="l('Unified.texts.DeviceType')" name="deviceTypeId">
              <f-select
                name="deviceTypeId"
                v-model:value="form.deviceTypeId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="deviceTypeDataSource"
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
  import CreateOrEditDeviceCategory from './create-or-edit-device-category';

  export default defineComponent({
    name: 'CreateOrEditDeviceCategory',
    mixins: [CreateOrEditDeviceCategory],
  });
</script>

<style lang="less" scoped></style>
