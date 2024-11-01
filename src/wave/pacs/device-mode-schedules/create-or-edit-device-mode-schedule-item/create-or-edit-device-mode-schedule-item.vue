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
            <!-- Device -->
            <a-form-item :label="l('Unified.texts.Device')" name="deviceId">
              <f-select
                style="width: 100%"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                v-model:value="form.deviceId"
                :dataSource="deviceDataSource"
                @change="selecthandle"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- DeviceType -->
            <a-form-item :label="l('Unified.texts.DeviceType')" name="deviceTypeId">
              <f-select
                :disabled="true"
                style="width: 100%"
                v-model:value="form.deviceTypeId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="deviceTypeDataSource"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- DeviceTypeFunction -->
            <a-form-item :label="l('Unified.texts.DeviceTypeFunction')" name="deviceTypeFunctionId">
              <f-select
                ref="deviceTypeFunction"
                style="width: 100%"
                v-model:value="form.deviceTypeFunctionId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="deviceTypeFunctionSource"
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
  import CreateoOrEditDeviceModeScheduleItem from './create-or-edit-device-mode-schedule-item';

  export default defineComponent({
    name: 'CreateoOrEditDeviceModeScheduleItem',
    mixins: [CreateoOrEditDeviceModeScheduleItem],
  });
</script>

<style lang="less" scoped></style>
