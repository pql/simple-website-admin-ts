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
        <a-tabs>
          <!-- ZoneName -->
          <a-tab-pane key="zone">
            <template #tab>
              {{ l('Unified.texts.Zone') }}
            </template>
            <a-row :gutter="16">
              <a-col :span="8">
                <!-- ZoneName -->
                <a-form-item :label="l('Unified.texts.ZoneName')" name="zoneName">
                  <a-input name="zoneName"  v-model:value="form.zoneName"
                    :autocomplete="'off'" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- Arm -->
                <a-form-item :label="l('Unified.texts.Arm')" name="arm">
                  <a-switch v-model:checked="form.arm" :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')" />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <!--Description -->
                <a-form-item :label="l('Unified.texts.Description')" name="description">
                  <a-input name="description"
                    v-model:value="form.description" :autocomplete="'off'" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- ZoneName -->
          <a-tab-pane key="deviceZone">
            <template #tab>
              {{ l('Unified.texts.DeviceZone') }}
            </template>
            <f-dynamic-table ref="table" rowKey="key" type="device-zone-model" class="table" :extra-height="180"   :fetch="fetchDataList"
              :showActionBtn="showActionBtn" @action-click="handleActionClick" @fetch-success="handleFetchSuccess" />
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
import CreateoOrEditDeviceZone from './create-or-edit-device-zone';

export default defineComponent({
  name: 'CreateoOrEditDeviceZone',
  mixins: [CreateoOrEditDeviceZone],
});
</script>

<style lang="less" scoped></style>
