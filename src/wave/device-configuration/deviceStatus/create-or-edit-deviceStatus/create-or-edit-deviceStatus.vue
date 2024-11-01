<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        <span v-if="isCopy">{{ l('Unified.texts.Copy') }}</span>
        <span v-else>
          {{
            !id ? l('Unified.texts.CreateNewDeviceStatus') : l('Unified.texts.EditDeviceStatus')
          }}</span
        >
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form
        :form="entity"
        @submit="handleSubmit"
        :model="entity"
        :layout="'vertical'"
        ref="formRef"
        autocomplete="off"
      >
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.Table:StatusName')"
              name="statusName"
              :rules="[
                { required: true, message: l('Unified.texts.ThisFieldIsRequired') },
                { validator: nameVerify },
              ]"
            >
              <a-input v-model:value="entity.statusName" :disabled="entity.isDefault" type="text" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.Table:MessagePriority')"
              name="messagePriority"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <a-input
                v-model:value="entity.messagePriority"
                :disabled="entity.isDefault"
                type="text"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.Table:StatusCode')"
              name="statusCode"
              :rules="[
                { required: true, message: l('Unified.texts.ThisFieldIsRequired') },
                { validator: statusCodeVerify },
              ]"
            >
              <a-input v-model:value="entity.statusCode" :disabled="entity.isDefault" type="text" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input v-model:value="entity.description" type="text" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :label="l('Device Type')"
              name="deviceTypeId"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <!-- <y-combox-page
                name="deviceTypeId"
                v-model:value="entity.deviceTypeId"
                :disabled="entity.isDefault"
                dataSource="Firebytes.AMS.DeviceTypes.DeviceType"
              >
              </y-combox-page> -->
              <f-select-picker
                show-search
                optionFilterProp="deviceTypeName"
                name="deviceTypeId"
                v-model:value="entity.deviceTypeId"
                :dataSource="deviceTypeDataSource"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :label="l('	Unified.texts.VendorStatusCode')"
              name="vendorStatusCode"
              :rules="[
                { required: true, message: l('Unified.texts.ThisFieldIsRequired') },
                { validator: vendorStatusCodeVerify },
              ]"
            >
              <a-input
                v-model:value="entity.vendorStatusCode"
                :disabled="entity.isDefault"
                type="text"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.StatusIconFont')"
              name="statusIconFont"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <!-- <y-image-upload name="deviceTypeIcon" v-model:value="entity.statusIconFont"></y-image-upload> -->
              <f-image-upload
                v-model:value="entity.statusIconFont"
                :maxSize="20"
                :maxNumber="1"
                :uploadParams="uploadParams"
                :api="fileDescriptorUpload"
                @before-upload="handleBeforeUpload"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.Table:MessageBackgroundColorCode')"
              name="messageBackgroundColorCode"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <input
                type="color"
                v-model="entity.messageBackgroundColorCode"
                style="height: 32px"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-collapse v-model:activeKey="activeKey" accordion>
          <a-collapse-panel key="1" :header="l('Unified.texts.Moresettings')">
            <a-row :gutter="16">
              <!-- <a-col :span="8">
                <a-form-item :label="l('Workflow')" name="workflowId">
                  <y-combox-page
                    name="workflowId"
                    v-model:value="entity.workflowId"
                    :disabled="entity.isDefault"
                    dataSource="Firebytes.WorkflowModule.WorkflowDef.Entity.Workflow"
                  >
                  </y-combox-page>
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item name="requireAlertAcknowledgement">
                  <template #label>
                    {{ l('Unified.texts.Table:RequireAlertAcknowledgement') }}
                    <a-tooltip>
                      <template #title>{{
                        l('Unified.texts.Table:RequireAlertAcknowledgement')
                      }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="entity.requireAlertAcknowledgement"
                    :disabled="entity.isDefault"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item name="associateMasterDeviceStatus">
                  <template #label>
                    {{ l('Unified.texts.AssociateMasterDeviceStatus') }}
                    <a-tooltip>
                      <template #title>{{
                        l('Unified.texts.AssociateMasterDeviceStatus')
                      }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="entity.associateMasterDeviceStatus"
                    :disabled="entity.isDefault || !entity.deviceTypeId"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.AssociateMasterDeviceStatus')"
                  name="masterDeviceStatus"
                  :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
                  v-if="entity.associateMasterDeviceStatus && entity.deviceTypeId"
                >
                  <!-- <y-combox-page
                  name="deviceStatusId"
                  v-model:value="entity.masterDeviceStatus"
                  :params="{ customData: { deviceTypeId: entity.deviceTypeId, associateMasterDeviceStatus: entity.associateMasterDeviceStatus } }"
                  :reloadTag="entity.deviceTypeId"
                  dataSource="Firebytes.AMS.DeviceStatuss.DeviceStatus"
                >
                </y-combox-page> -->

                  <f-select-picker
                    show-search
                    optionFilterProp="statusName"
                    name="deviceStatusId"
                    v-model:value="entity.masterDeviceStatus"
                    :dataSource="deviceStatusDataSource"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item name="enableDisplayControlPanel">
                  <template #label>
                    {{ l('Unified.texts.EnableDisplayControlPanel') }}
                    <a-tooltip>
                      <template #title>{{ l('Unified.texts.EnableDisplayControlPanel') }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="entity.enableDisplayControlPanel"
                    :disabled="entity.isDefault"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item name="enableDeviceStatusIdCache">
                  <template #label>
                    {{ l('Unified.texts.EnableDeviceStatusIdCache') }}
                    <a-tooltip>
                      <template #title>{{ l('Unified.texts.EnableDeviceStatusIdCache') }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="entity.enableDeviceStatusIdCache"
                    :disabled="entity.isDefault"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item name="triggerDeviceStatusIdCache">
                  <template #label>
                    {{ l('Unified.texts.TriggerDeviceStatusIdCache') }}
                    <a-tooltip>
                      <template #title>{{
                        l('Unified.texts.TriggerDeviceStatusIdCache')
                      }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch
                    v-model:checked="entity.triggerDeviceStatusIdCache"
                    :disabled="entity.isDefault"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item name="isAlert">
                  <template #label>
                    {{ l('Unified.texts.IsAlert') }}
                    <a-tooltip>
                      <template #title>{{ l('Unified.texts.IsAlert') }}</template>
                      <question-circle-outlined class="question-icon" />
                    </a-tooltip>
                  </template>
                  <a-switch v-model:checked="entity.isAlert" :disabled="entity.isDefault" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="loading" v-show="showCancelButton" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Cancel') }}
        </a-button>
        <a-button
          :loading="loading"
          v-show="showNextStepButton"
          :type="'primary'"
          @click="handleSubmit(false)"
        >
          <save-outlined />
          {{ l('Unified.texts.SaveAndContinue') }}
        </a-button>
        <a-button :loading="loading" :type="'primary'" @click="handleSubmit()">
          <save-outlined />
          {{ l('Unified.texts.Save') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    // CreateOrUpdateDeviceStatusInput,
    // DeviceStatusEditDto,
    // DeviceStatusServiceProxy,
    // GetDeviceStatusForEditOutput,
    // StatusCodeVerifyInput,
    // NameVerifyInput
    FireBytes_Unified_Wave_DeviceStatuss_Dtos_CreateOrUpdateDeviceStatusInput as CreateOrUpdateDeviceStatusInput,
    FireBytes_Unified_Wave_DeviceStatuss_Dtos_DeviceStatusEditDto as DeviceStatusEditDto,
    DeviceStatusService,
    FireBytes_Unified_Wave_DeviceStatuss_Dtos_GetDeviceStatusForEditOutput as GetDeviceStatusForEditOutput,
    FireBytes_Unified_Wave_DeviceStatuss_Dtos_StatusCodeVerifyInput as StatusCodeVerifyInput,
    FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
  } from '/@/apis';
  import { FSelectPicker } from '/@/app/admin-shared/index';
  import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';

  export default defineComponent({
    name: 'CreateOrEditDeviceStatus',
    components: {
      FSelectPicker,
    },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array,
        required: true,
      },
      isCopy: {
        type: Boolean,
        required: false,
      },
    },
    data() {
      return {
        id: '',
        editData: {} as GetDeviceStatusForEditOutput,
        entity: {} as DeviceStatusEditDto,
        deviceTypeDataSource: {
          service: 'DeviceTypeService.getApiAppDeviceTypePaged',
          labelField: 'deviceTypeName',
          valueField: 'id',
          multiple: false,
        },
        deviceStatusDataSource: {
          service: 'DeviceStatusService.getApiAppDeviceStatusPaged',
          labelField: 'statusName',
          valueField: 'id',
          multiple: false,
        },
        activeKey: ['1'],
        uploadParams: {} as {
          name?: string;
          directoryId?: string;
          overrideExisting?: false;
          extraProperties?: Record<string, any>;
        },
      };
    },
    computed: {},
    mounted() {
      this.id = this.pageDataList[0] as string;
      this.getPageData(this.id);
    },
    methods: {
      fileDescriptorUpload: fileDescriptorUpload,
      async handleBeforeUpload(file) {},
      /**
       * 获取数据
       */
      getPageData(id) {
        this.id = id;
        this.loading = true;
        DeviceStatusService.getApiAppDeviceStatusForEdit({
          id: id == undefined ? null : id,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((result) => {
            if (
              result.deviceStatus.messageBackgroundColorCode == null ||
              result.deviceStatus.messageBackgroundColorCode == ''
            ) {
              result.deviceStatus.messageBackgroundColorCode = '#66ccff';
            }
            this.entity = result.deviceStatus;
            if (!this.entity.id) {
              this.entity.enableDisplayControlPanel = true;
              this.entity.enableDeviceStatusIdCache = true;
            }

            if (this.isCopy) {
              this.entity.id = null;
              this.id = null;
            }
          });
      },
      handleClose() {
        (this.$refs.formRef as any).resetFields();
      },
      statusCodeVerify(rule, value, callback) {
        // 如果没有输入值，直接返回通过（因为必填校验已经在前面做了）
        if (!value) {
          return Promise.resolve();
        }
        //保存前验证statuscode是否通过校验
        var verifyInput = {} as StatusCodeVerifyInput;
        verifyInput.statusCode = this.entity.statusCode;
        verifyInput.deviceStatusId = this.id;
        verifyInput.deviceTypeId = this.entity.deviceTypeId as string;

        DeviceStatusService.postApiAppDeviceStatusStatusCodeVerify({
          requestBody: verifyInput,
        }).then((res) => {
          if (!res) {
            callback(this.l('Unified.texts.NameRepetition'));
            return;
          }
          callback();
        });
      },
      handleSubmit(closeFlag = true) {
        (this.$refs.formRef as any).validate().then((vse) => {
          const input = {} as CreateOrUpdateDeviceStatusInput;
          input.deviceStatus = this.entity;
          this.saving = true;
          DeviceStatusService.postApiAppDeviceStatusOrUpdate({
            requestBody: input,
          })
            .finally(() => {
              this.saving = false;
            })
            .then(() => {
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
              if (closeFlag) {
                this.success();
              } else {
                this.saveNotClose();
              }
            });
        });
      },
      nameVerify(rule, value, callback) {
        // 如果没有输入值，直接返回通过（因为必填校验已经在前面做了）
        if (!value) {
          return Promise.resolve();
        }
        //没选择设备类型先不验证
        if (this.entity.deviceTypeId == null || this.entity.deviceTypeId == undefined) {
          callback();
          return;
        }
        var verifyInput = {} as NameVerifyInput;
        verifyInput.name = this.entity.statusName;
        verifyInput.id = this.id;
        verifyInput.deviceTypeId = this.entity.deviceTypeId as string;
        DeviceStatusService.postApiAppDeviceStatusNameRepeatVerify({
          requestBody: verifyInput,
        }).then((res) => {
          if (!res) {
            callback(this.l('Unified.texts.NameRepetition'));
            return;
          }
          callback();
        });
      },
      vendorStatusCodeVerify(rule, value, callback) {
        // 如果没有输入值，直接返回通过（因为必填校验已经在前面做了）
        if (!value) {
          return Promise.resolve();
        }
        var verifyInput = {} as NameVerifyInput;
        verifyInput.name = this.entity.vendorStatusCode;
        verifyInput.id = this.id;
        verifyInput.deviceTypeId = this.entity.deviceTypeId as string;
        DeviceStatusService.postApiAppDeviceStatusVendorStatusCodeVerify({
          requestBody: verifyInput,
        }).then((res) => {
          if (!res) {
            callback(this.l('Unified.texts.NameRepetition'));
            return;
          }
          callback();
        });
      },
    },
  });
</script>
