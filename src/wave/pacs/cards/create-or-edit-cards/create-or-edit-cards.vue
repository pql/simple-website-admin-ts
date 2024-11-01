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
            <!-- Facility Code -->
            <a-form-item :label="l('Unified.texts.FacilityCode')" name="facilityCode">
              <a-input-number name="siteAddress" v-model:value="form.facilityCode" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Card Format -->
            <a-form-item :label="l('Unified.texts.CardFormat')" name="cardFormatId">
              <f-select
                name="cardFormatId"
                v-model:value="form.cardFormatId"
                allow-clear
                show-search
                optionFilterProp="key"
                :show-arrow="true"
                :dataSource="cardFormatDataSource"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Card Number -->
            <a-form-item :label="l('Unified.texts.CardNumber')" name="cardNumber">
              <a-input name="cardNumber" v-model:value="form.cardNumber" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Card StartTime -->
            <a-form-item :label="l('Unified.texts.StartDateTime')" name="startDateTime">
              <f-date-picker
                show-time
                style="width: 100%"
                v-model:value="form.startDateTime"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Card EndDateTime -->
            <a-form-item :label="l('Unified.texts.EndDateTime')" name="endDateTime">
              <f-date-picker
                show-time
                style="width: 100%"
                v-model:value="form.endDateTime"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Card Status -->
            <a-form-item :label="l('Unified.texts.CardStatus')" name="cardStatus">
              <f-select
                v-model:value="form.cardStatus"
                show-search
                optionFilterProp="key"
                allow-clear
                :show-arrow="true"
                :dataSource="cardStatusDataSource"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- IsVirtualCard -->
            <a-form-item :label="l('Unified.texts.IsVirtualCard')" name="isVirtualCard">
              <a-switch
                v-model:checked="form.isVirtualCard"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- Badge Template -->
            <a-form-item :label="l('Unified.texts.BadgeTemplate')" name="badgeTemplateId">
              <f-select
                v-model:value="form.badgeTemplateId"
                show-search
                optionFilterProp="key"
                allow-clear
                :show-arrow="true"
                :dataSource="badgeTemplateDataSource"
              />
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
  import CreateoOrEditCards from './create-or-edit-cards';

  export default defineComponent({
    name: 'CreateoOrEditCards',
    mixins: [CreateoOrEditCards],
  });
</script>

<style lang="less" scoped></style>
