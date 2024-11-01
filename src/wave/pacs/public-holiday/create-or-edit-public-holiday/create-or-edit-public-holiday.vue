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
          <a-col :span="12">
            <!-- Holiday -->
            <a-form-item :label="l('Unified.texts.HolidayName')" name="holidayName">
              <a-input
                name="holidayName"
                v-model:value="form.holidayName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- IsEveOfHoliday -->
            <a-form-item :label="l('Unified.texts.IsEveOfHoliday')" name="isEveOfHoliday">
              <a-switch
                v-model:checked="form.isEveOfHoliday"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- StartDate -->
            <a-form-item :label="l('Unified.texts.StartDate')" name="startDate">
              <f-date-picker style="width: 100%" v-model:value="form.startDate" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- EndDate -->
            <a-form-item :label="l('Unified.texts.EndDate')" name="endDate">
              <f-date-picker style="width: 100%" v-model:value="form.endDate" allow-clear />
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
  import CreateoOrEditpublicHoliday from './create-or-edit-public-holiday';

  export default defineComponent({
    name: 'CreateoOrEditpublicHoliday',
    mixins: [CreateoOrEditpublicHoliday],
  });
</script>

<style lang="less" scoped></style>
