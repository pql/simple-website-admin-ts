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
            <!-- ServiceName -->
            <a-form-item :label="l('Unified.texts.ServiceName')" name="serviceName">
              <a-input name="serviceName" v-model:value="form.serviceName" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- ServiceIp -->
            <a-form-item :label="l('Unified.texts.ServiceIp')" name="serviceIp">
              <a-input name="serviceIp" v-model:value="form.serviceIp" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- ServicePort -->
            <a-form-item :label="l('Unified.texts.ServicePort')" name="servicePort">
              <a-input name="servicePort" v-model:value="form.servicePort" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- ServiceId -->
            <a-form-item :label="l('Unified.texts.ServiceId')" name="serviceId">
              <a-input name="serviceId" v-model:value="form.serviceId" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- ServicePassword -->
            <a-form-item :label="l('Unified.texts.ServicePassword')" name="servicePassword">
              <a-input
                name="servicePassword"
                v-model:value="form.servicePassword"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <!-- InterfaceBrand -->
            <a-form-item :label="l('Unified.texts.InterfaceBrand')" name="interfaceBrandId">
              <f-select
                name="interfaceBrandId"
                v-model:value="form.interfaceBrandId"
                allow-clear
                show-search
                optionFilterProp="name"
                :show-arrow="true"
                :dataSource="interfaceBrandDataSource"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- EnableSSL -->
            <a-form-item :label="l('Unified.texts.EnableSSL')" name="isEnableSSL">
              <a-switch
                v-model:checked="form.isEnableSSL"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-textarea v-model:value="form.description" :rows="3" />
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
  import CreateoOrEditInterfaceService from './create-or-edit-interface-service';

  export default defineComponent({
    name: 'CreateoOrEditInterfaceService',
    mixins: [CreateoOrEditInterfaceService],
  });
</script>

<style lang="less" scoped></style>
