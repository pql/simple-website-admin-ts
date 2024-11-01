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
            <a-form-item :label="l('Unified.texts.ContactType')" name="contactTypeName">
              <a-input
                name="contactTypeName"
                
                v-model:value="form.contactTypeName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Descriptions -->
            <a-form-item :label="l('Unified.texts.Description')" name="descriptions">
              <!-- <f-textarea
                name="descriptions"
               
                v-model:value="form.descriptions"
                :autocomplete="'off'"
              /> -->
              <a-textarea
                name="descriptions"
                v-model:value="form.descriptions"
              
                allow-clear
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
  import CreateoOrEditContactType from './create-or-edit-contact-type';

  export default defineComponent({
    name: 'CreateoOrEditContactType',
    mixins: [CreateoOrEditContactType],
  });
</script>

<style lang="less" scoped></style>
