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
          <!-- DeviceType -->
          <a-tab-pane key="deviceType">
            <template #tab>
              {{ l('Unified.texts.DeviceType') }}
            </template>
            <a-row :gutter="16">
              <a-col :span="24">
                <a-row>
                  <a-col :span="8">
                    <!-- DeviceTypeIcon -->
                    <a-form-item :label="l('Unified.texts.DeviceTypeIcon')" name="deviceTypeIcon">
                      <f-image-upload
                        v-model:value="form.deviceTypeIcon"
                        :maxSize="20"
                        :maxNumber="1"
                        :uploadParams="uploadParams"
                        :api="fileDescriptorUpload"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :span="16">
                    <a-row :gutter="16">
                      <a-col :span="12">
                        <!-- DeviceTypeName -->
                        <a-form-item
                          :label="l('Unified.texts.DeviceTypeName')"
                          name="deviceTypeName"
                        >
                          <a-input
                            name="deviceTypeName"
                            v-model:value="form.deviceTypeName"
                            :autocomplete="'off'"
                            :disabled="form.isSysteam"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <!-- Brand -->
                        <a-form-item :label="l('Unified.texts.Brand')" name="brandId">
                          <f-select
                            name="brandId"
                            v-model:value="form.brandId"
                            allow-clear
                            show-search
                            optionFilterProp="name"
                            :show-arrow="true"
                            :dataSource="deviceBrandDataSource"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <!-- ReleaseNote -->
                        <a-form-item :label="l('Unified.texts.ReleaseNote')" name="releaseNote">
                          <a-input
                            name="releaseNote"
                            v-model:value="form.releaseNote"
                            :autocomplete="'off'"
                          />
                        </a-form-item>
                      </a-col>
                      <a-col :span="12">
                        <!-- DeviceTypeRole -->
                        <a-form-item
                          :label="l('Unified.texts.DeviceTypeRole')"
                          name="deviceTypeRole"
                        >
                          <f-enum-select
                            allow-clear
                            show-search
                            optionFilterProp="displayName"
                            :type="'DeviceTypeEnum'"
                            label-field="displayName"
                            value-field="displayName"
                            v-model:value="form.deviceTypeRole"
                          />
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
              <a-col :span="8"></a-col>
              <a-col :span="8">
                <!-- VendorSoftwareNote -->
                <a-form-item
                  :label="l('Unified.texts.VendorSoftwareNote')"
                  name="vendorSoftwareNote"
                >
                  <a-input
                    name="vendorSoftwareNote"
                    v-model:value="form.vendorSoftwareNote"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- DisplayOrder -->
                <a-form-item :label="l('Unified.texts.DisplayOrder')" name="displayOrder">
                  <a-input-number
                    name="displayOrder"
                    v-model:value="form.displayOrder"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <!-- Description -->
                <a-form-item :label="l('Unified.texts.Description')" name="description">
                  <a-textarea v-model:value="form.description" :rows="2" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-tab-pane>

          <!-- CustomFields -->
          <a-tab-pane key="customFields">
            <template #tab>
              {{ l('Unified.texts.CustomFields') }}
            </template>
            <a-row :gutter="16" :key="index" v-for="(field, index) in form.customFields">
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.FieIdName')"
                  :name="['customFields', index, 'fieldName']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                    trigger: 'blur',
                  }"
                >
                  <a-input v-model:value="field.fieldName" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.FieldPlaceholder')"
                  :name="['customFields', index, 'fieldPlaceholder']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                    trigger: 'blur',
                  }"
                >
                  <a-input v-model:value="field.fieldPlaceholder" />
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item
                  :label="l('Unified.texts.FieldType')"
                  :name="['customFields', index, 'fieldType']"
                  :rules="{
                    required: true,
                    message: l('Unified.texts.CustomFieldsTypePrompt'),
                    trigger: 'blur',
                  }"
                >
                  <f-enum-select
                    allow-clear
                    show-search
                    optionFilterProp="displayName"
                    :type="'InputFieldTypeEnum'"
                    label-field="displayName"
                    value-field="displayName"
                    v-model:value="field.fieldType"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="1">
                <MinusCircleOutlined style="margin-top: 35px;" class="removeOut" @click="removeField(field)" />
              </a-col>
            </a-row>
            <a-form-item>
              <a-button type="dashed" block @click="addFields">
                <PlusOutlined />
                {{ l('Unified.texts.AddFields') }}
              </a-button>
            </a-form-item>
          </a-tab-pane>

          <!-- Configuration -->
          <a-tab-pane key="configuration">
            <template #tab>
              {{ l('Unified.texts.Configuration') }}
            </template>
            <a-row :gutter="16">
              <a-col :span="8">
                <!-- IsShowMapViewer -->
                <a-form-item :label="l('Unified.texts.IsShowMapViewer')" name="isShowMapViewer">
                  <a-switch
                    v-model:checked="form.isShowMapViewer"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- CommandGroup -->
                <a-form-item
                  :label="l('Unified.texts.DeviceBroadcast')"
                  name="isSettingDeviceGroup"
                >
                  <a-switch
                    v-model:checked="form.isSettingDeviceGroup"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- AssociateCamera -->
                <a-form-item :label="l('Unified.texts.AssociateCamera')" name="isSettingCamera">
                  <a-switch
                    v-model:checked="form.isSettingCamera"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- RedundantServer -->
                <a-form-item :label="l('Unified.texts.RedundantServer')" name="redundantServer">
                  <a-switch
                    v-model:checked="form.redundantServer"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <!-- ReaundantInterfaceService -->
                <a-form-item
                  :label="l('Unified.texts.ReaundantInterfaceService')"
                  name="redundantInterfaceService"
                >
                  <a-switch
                    v-model:checked="form.redundantInterfaceService"
                    :checkedChildren="l('Unified.texts.Yes')"
                    :unCheckedChildren="l('Unified.texts.No')"
                  />
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
  import CreateoOrEditSite from './create-or-edit-device-type';

  export default defineComponent({
    name: 'CreateoOrEditSite',
    mixins: [CreateoOrEditSite],
  });
</script>

<style lang="less" scoped></style>
