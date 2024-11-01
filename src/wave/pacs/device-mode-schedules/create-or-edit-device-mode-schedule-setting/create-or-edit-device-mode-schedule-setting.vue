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
        <a-tabs>
          <!-- General -->
          <a-tab-pane key="general">
            <template #tab>
              {{ l('Unified.texts.General') }}
            </template>
            <a-form-item>
              <a-button type="dashed" block @click="addGenerals">
                <PlusOutlined />
                {{ l('Unified.texts.DeviceModeSchedule') }}
              </a-button>
            </a-form-item>
            <a-row
              :gutter="16"
              :key="index"
              v-for="(field, index) in form.pacsActionPlanGroupSettingList"
            >
              <a-col :span="8">
                <a-form-item
                  :name="['general', index, 'dayOfAccessSchedule']"
                  :rules="{
                    required: true,
                    trigger: 'change',
                    message: l('Unified.texts.PleaseSelect'),
                  }"
                >
                  <f-enum-select
                    allow-clear
                    show-search
                    optionFilterProp="displayName"
                    type="PacsDayOfDeviceModeScheduleDateTypeForGeneralEnum"
                    label-field="displayName"
                    value-field="value"
                    v-model:value="field.dayOfAccessSchedule"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="16">
                <a-form-item
                  :name="['general', index, 'time']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.PleaseSelectTime'),
                  }"
                >
                  <f-time-picker v-model:value="field.time" allowClear format="HH:mm" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- Special -->
          <a-tab-pane key="special">
            <template #tab>
              {{ l('Unified.texts.Special') }}
            </template>
            <a-form-item>
              <a-button type="dashed" block @click="addSpecials">
                <PlusOutlined />
                {{ l('Unified.texts.DeviceModeSchedule') }}
              </a-button>
            </a-form-item>
            <a-row
              :gutter="16"
              :key="index"
              v-for="(field, index) in form.pacsActionPlanGroupSettingList"
            >
              <a-col :span="8">
                <a-form-item
                  :name="['emailList', index, 'emailType']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.PleaseSelect'),
                  }"
                >
                  <f-enum-select
                    allow-clear
                    show-search
                    optionFilterProp="displayName"
                    type="PacsDayOfDeviceModeScheduleDateTypeForSpecialEnum"
                    label-field="displayName"
                    value-field="value"
                    v-model:value="field.dayOfAccessSchedule"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :name="['general', index, 'date']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.PleaseSelectDate'),
                  }"
                >
                  <f-date-picker v-model:value="field.time" allowClear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :name="['general', index, 'time']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.PleaseSelectTime'),
                  }"
                >
                  <f-time-picker v-model:value="field.time" allowClear format="HH:mm" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
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
  import CreateoOrEditDeviceModeScheduleSetting from './create-or-edit-device-mode-schedule-setting';

  export default defineComponent({
    name: 'CreateoOrEditDeviceModeScheduleSetting',
    mixins: [CreateoOrEditDeviceModeScheduleSetting],
  });
</script>

<style lang="less" scoped></style>
