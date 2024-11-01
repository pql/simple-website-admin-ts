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
          <a-col :span="24" v-if="_types == 'copy'">
            <!-- ActionPlanGroup -->
            <a-form-item :label="l('Unified.texts.ActionPlanGroup')" name="copyId">
              <f-select
                v-model:value="form.copyId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="groupDataSource"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- ActionPlanGroup -->
            <a-form-item :label="l('Unified.texts.ActionPlanGroup')" name="name">
              <a-input name="name" v-model:value="form.name" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Descriptions -->
            <a-form-item :label="l('Unified.texts.Description')" name="descriptions">
              <a-textarea name="descriptions" v-model:value="form.descriptions" allow-clear />
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
  import CreateoOrEditDeviceModeScheduleGroup from './create-or-edit-device-mode-schedule-group';

  export default defineComponent({
    name: 'CreateoOrEditDeviceModeScheduleGroup',
    mixins: [CreateoOrEditDeviceModeScheduleGroup],
  });
</script>

<style lang="less" scoped></style>
