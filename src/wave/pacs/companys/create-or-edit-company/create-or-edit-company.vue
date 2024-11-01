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
      <a-form ref="formRef" labelAlign="right" layout="vertical" :autocomplete="'off'" :rules="rules"
        :label-col="{ style: { width: '200px' } }" :model="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <!-- CompanyName -->
            <a-form-item :label="l('Unified.texts.CompanyName')" name="companyName">
              <a-input name="companyName"  v-model:value="form.companyName"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- Address1 -->
            <a-form-item :label="l('Unified.texts.Address1')" name="address1">
              <a-input name="address1"  v-model:value="form.address1"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- Address2 -->
            <a-form-item :label="l('Unified.texts.Address2')" name="address2">
              <a-input name="address2"  v-model:value="form.address2"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- City -->
            <a-form-item :label="l('Unified.texts.City')" name="city">
              <a-input name="city"  v-model:value="form.city"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- State -->
            <a-form-item :label="l('Unified.texts.State')" name="state">
              <a-input name="state"  v-model:value="form.state"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- Zip -->
            <a-form-item :label="l('Unified.texts.Zip')" name="zip">
              <a-input name="zip"  v-model:value="form.zip"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Descriptions -->
            <a-form-item :label="l('Unified.texts.Description')" name="descriptions">
              <a-textarea name="descriptions" v-model:value="form.description"
                 allow-clear />
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
        <a-button :loading="saving" v-show="showNextStepButton" :type="'primary'" @click="handleSubmit(false)">
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
import CreateoOrEditCompany from './create-or-edit-company';

export default defineComponent({
  name: 'CreateoOrEditCompany',
  mixins: [CreateoOrEditCompany],
});
</script>

<style lang="less" scoped></style>
