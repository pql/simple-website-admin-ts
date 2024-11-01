<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        <span v-if="isCopy">{{ l('Unified.texts.Copy') }}</span>
        <span v-else>
          {{
            !id
              ? l('Unified.texts.CreateNewDeviceFunctions')
              : l('Unified.texts.EditDeviceFunctions')
          }}</span
        >
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form
        :form="entity"
        :layout="'vertical'"
        :model="entity"
        ref="formRef"
        @submit="handleSubmit"
        autocomplete="off"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              :label="l('Unified.texts.DeviceFunction')"
              name="deviceFunction"
              :rules="[
                { required: true, message: l('Unified.texts.ThisFieldIsRequired') },
                { validator: nameVerify },
              ]"
            >
              <a-input v-model:value="entity.deviceFunction" type="text" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label="l('Unified.texts.Table:DeviceTypeFunctionCode')"
              name="deviceTypeFunctionCode"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <a-input v-model:value="entity.deviceTypeFunctionCode" type="text" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label="l('Unified.texts.Table:VendorFunctionCode')"
              name="vendorFunctionCode"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <a-input v-model:value="entity.vendorFunctionCode" type="text" />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              :label="l('Unified.texts.Table:DeviceType')"
              name="deviceTypeId"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <f-select
                ref="deviceTypeId"
                name="deviceTypeId"
                show-search
                optionFilterProp="name"
                :form-model="entity"
                :parent-instance="vm"
                v-model:value="entity.deviceTypeId"
                :dataSource="{
                  service: 'DeviceTypeService.getApiAppDeviceTypeNdoList',
                  labelField: 'name',
                  valueField: 'id',
                  valueChange: ['deviceStatusId'],
                }"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              :label="l('Unified.texts.DeviceStatus')"
              name="deviceStatusId"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <f-select
                :disabled="deviceStatusDisabled"
                ref="deviceStatusId"
                name="deviceStatusId"
                show-search
                optionFilterProp="name"
                :form-model="entity"
                :parent-instance="vm"
                v-model:value="entity.deviceStatusId"
                :dataSource="{
                  service: 'DeviceStatusService.getApiAppDeviceStatusNdoList',
                  labelField: 'name',
                  valueField: 'id',
                  params: {
                    filter: undefined,
                    typeId: entity.deviceTypeId,
                  },
                  valueChange: [],
                }"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item
              :label="l('Unified.texts.ButtonAction')"
              name="buttonAction"
              :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
            >
              <f-enum-select
                allow-clear
                show-search
                optionFilterProp="displayName"
                :type="'DeviceTypeFunctionEnum'"
                label-field="displayName"
                value-field="value"
                v-model:value="entity.buttonAction"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <!-- 启用 -->
            <a-form-item>
              <template #label>
                {{ l('Unified.texts.ChangeDeviceStatus') }}
              </template>
              <a-switch
                v-model:checked="entity.isChangeDeviceStatus"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- 启用 -->
            <a-form-item>
              <template #label>
                {{ l('Unified.texts.SystemFunction') }}
              </template>
              <a-switch
                v-model:checked="entity.isSystemFunction"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item :label="l('Unified.texts.Description')" name="description">
          <a-input v-model:value="entity.description" type="text" />
        </a-form-item>
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
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    FireBytes_Unified_Wave_DeviceTypeFunctions_Dtos_CreateOrUpdateDeviceTypeFunctionInput as CreateOrUpdateDeviceTypeFunctionInput,
    FireBytes_Unified_Wave_DeviceTypeFunctions_Dtos_DeviceTypeFunctionEditDto as DeviceTypeFunctionEditDto,
    DeviceTypeFunctionService,
    DeviceTypeService,
    FireBytes_Unified_Wave_DeviceTypeFunctions_Dtos_GetDeviceTypeFunctionForEditOutput as GetDeviceTypeFunctionForEditOutput,
    FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
  } from '/@/apis';
  import { defineComponent, getCurrentInstance } from 'vue';
  import { FSelectPicker } from '/@/app/admin-shared/index';

  export default defineComponent({
    name: 'CreateOrEditDeviceTypeFunction',
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
    setup() {
      const vm = getCurrentInstance();
      return { vm };
    },
    data() {
      return {
        id: '',
        editData: {} as GetDeviceTypeFunctionForEditOutput,
        entity: {} as DeviceTypeFunctionEditDto,
        //品牌名
        brandName: '',
        actionOptions: [
          { value: 'None' },
          { value: 'Camera View' },
          { value: 'Send Command' },
          { value: 'Status View' },
          { value: 'People Nearby View' },
        ],
        //响应返回的设备类型id
        responseDeviceTypeId: '',
        deviceTypeDataSource: {
          service: 'DeviceTypeService.getApiAppDeviceTypePaged',
          labelField: 'deviceTypeName',
          valueField: 'id',
          multiple: false,
        },
        deviceStatusDataSource: {
          service: 'DeviceStatusService.getApiAppDeviceStatusComboxNdo',
          labelField: 'name',
          valueField: 'id',
          multiple: false,
        },
        deviceStatusDisabled: false,
      };
    },
    computed: {},
    watch: {
      'entity.deviceTypeId'(deviceTypeId) {
        if (this.responseDeviceTypeId != deviceTypeId) {
          this.entity.deviceStatusId = null;
        }
        //
        if (deviceTypeId != null && deviceTypeId != undefined) {
          this.getBrandName(deviceTypeId);
        } else {
          this.brandName = '';
        }
      },
    },
    mounted() {
      this.id = this.pageDataList[0] as string;
      this.getPageData(this.id);
    },
    methods: {
      getBrandName(deviceTypeId) {
        this.deviceStatusDisabled = true;
        DeviceTypeService.getApiAppDeviceTypeDeviceBrand({
          id: deviceTypeId,
        })
          .then((res) => {
            this.brandName = res;
          })
          .finally(() => {
            this.deviceStatusDisabled = false;
          });
      },
      /**
       * 获取数据
       */
      getPageData(id) {
        this.id = id;
        this.loading = true;
        DeviceTypeFunctionService.getApiAppDeviceTypeFunctionForEdit({
          id: id == undefined ? null : id,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((result) => {
            this.entity = result.deviceTypeFunction;
            this.responseDeviceTypeId = result.deviceTypeFunction.deviceTypeId as string;

            if (this.isCopy) {
              this.entity.id = null;
              this.id = null;
            }
          });
      },
      handleClose() {
        (this.$refs.formRef as any).resetFields();
      },
      handleSubmit(closeFlag = true) {
        (this.$refs.formRef as any).validate().then(() => {
          const input = {} as CreateOrUpdateDeviceTypeFunctionInput;
          input.deviceTypeFunction = this.entity;
          this.loading = true;
          DeviceTypeFunctionService.postApiAppDeviceTypeFunctionOrUpdate({
            requestBody: input,
          })
            .finally(() => {
              this.loading = false;
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
        //没选择设备类型先不验证
        if (this.entity.deviceTypeId == null || this.entity.deviceTypeId == undefined) {
          callback();
          return;
        }
        var verifyInput = {} as NameVerifyInput;
        verifyInput.name = this.entity.deviceFunction;
        verifyInput.id = this.id;
        DeviceTypeFunctionService.postApiAppDeviceTypeFunctionNameRepeatVerify({
          deviceTypeId: this.entity.deviceTypeId,
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
