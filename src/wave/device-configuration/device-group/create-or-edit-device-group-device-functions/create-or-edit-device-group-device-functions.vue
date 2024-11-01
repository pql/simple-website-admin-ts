<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{
          !id
            ? l('Unified.texts.CreateNewDeviceBroadcastFunction')
            : l('Unified.texts.EditDeviceBroadcastFunction')
        }}
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
        <a-form-item
          :label="l('Unified.texts.Device')"
          name="deviceId"
          :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
        >
          <!-- <y-combox-page
            name="deviceId"
            v-model:value="entity.deviceId"
            dataSource="Firebytes.AMS.Devices.Device"
          >
          </y-combox-page> -->
          <f-select
            ref="deviceId"
            name="deviceId"
            :form-model="entity"
            :parent-instance="vm"
            show-search
            optionFilterProp="name"
            v-model:value="entity.deviceId"
            :dataSource="{
              service: 'DeviceService.getApiAppDeviceComboxNdo',
              labelField: 'name',
              valueField: 'id',
              valueChange: ['deviceTypeFunctionId'],
            }"
          />
        </a-form-item>
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
            :disabled="true"
            v-model:value="entity.deviceTypeId"
            :dataSource="{
              service: 'DeviceTypeService.getApiAppDeviceTypeNdoList',
              labelField: 'name',
              valueField: 'id',
              valueChange: [],
            }"
          />
        </a-form-item>
        <a-form-item
          :label="l('Unified.texts.DeviceTypeFunction2')"
          name="deviceTypeFunctionId"
          :rules="[{ required: true, message: l('Unified.texts.ThisFieldIsRequired') }]"
        >
          <f-select
            ref="deviceTypeFunctionId"
            name="deviceTypeFunctionId"
            show-search
            optionFilterProp="name"
            :form-model="entity"
            :parent-instance="vm"
            :disabled="entity.deviceTypeId == '' || entity.deviceTypeId == null"
            v-model:value="entity.deviceTypeFunctionId"
            :dataSource="{
              service: 'DeviceTypeFunctionService.getApiAppDeviceTypeFunctionComboxNdo',
              labelField: 'name',
              valueField: 'id',
              valueChange: [],
              params: {
                customData: entity.deviceTypeId,
              },
            }"
          />
        </a-form-item>
      </a-form>
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()" type="button">
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
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    // DeviceGroupDeviceFunctionsServiceProxy,
    // DeviceGroupDeviceFunctionsEditDto,
    // CreateOrUpdateDeviceGroupDeviceFunctionsInput,
    // DeviceServiceProxy
    DeviceGroupDeviceFunctionsService,
    FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsEditDto as DeviceGroupDeviceFunctionsEditDto,
    FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_CreateOrUpdateDeviceGroupDeviceFunctionsInput as CreateOrUpdateDeviceGroupDeviceFunctionsInput,
    DeviceService,
  } from '/@/apis';
  import { defineComponent, getCurrentInstance, ref } from 'vue';
  import DeviceSelectCombox from '/@/wave/component/select/device-select-combox.vue';

  export default defineComponent({
    name: 'CreateOrEditDeviceGroupDeviceFunctions',
    components: {
      DeviceSelectCombox,
    },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array,
        required: true,
      },
      deviceGroupId: {
        type: String,
      },
    },
    setup() {
      const vm = getCurrentInstance();
      return { vm };
    },
    data() {
      return {
        id: '',
        entity: ref<DeviceGroupDeviceFunctionsEditDto>({}),
      };
    },
    computed: {},
    watch: {
      'entity.deviceId'(n, l) {
        this.settingDeviceType(n);
      },
    },
    mounted() {
      this.id = this.pageDataList[0] as string;
      this.getPageData(this.id);
    },

    methods: {
      settingDeviceType(deviceId) {
        if (
          deviceId == undefined ||
          deviceId == null ||
          deviceId == '00000000-0000-0000-0000-000000000000'
        ) {
          this.entity.deviceTypeId = undefined;
          return;
        }
        DeviceService.getApiAppDeviceDeviceTypeIdByDeviceId({
          id: deviceId,
        }).then((res) => {
          //设备类型发生改变 清空已选择的devicetype funciton
          if (this.entity.deviceTypeId != res) {
            this.entity.deviceTypeFunctionId = undefined;
          }
          this.entity.deviceTypeId = res;
        });
      },

      /**
       * 获取数据
       */
      getPageData(id) {
        this.id = id;
        this.loading = true;
        DeviceGroupDeviceFunctionsService.getApiAppDeviceGroupDeviceFunctionsForEdit({
          id: id,
        })
          .finally(() => {
            this.loading = false;
          })
          .then((result) => {
            this.entity = result.deviceGroupDeviceFunctions as DeviceGroupDeviceFunctionsEditDto;
          });
      },
      handleClose() {},
      handleSubmit(closeFlag = true) {
        (this.$refs.formRef as any).validate().then((vse) => {
          const input = {} as CreateOrUpdateDeviceGroupDeviceFunctionsInput;
          if (this.deviceGroupId != undefined) {
            this.entity.deviceGroupId = this.deviceGroupId;
          }
          input.deviceGroupDeviceFunctions = this.entity;
          this.saving = true;
          DeviceGroupDeviceFunctionsService.postApiAppDeviceGroupDeviceFunctionsOrUpdate({
            requestBody: input,
          })
            .finally(() => {
              this.saving = false;
            })
            .then((res) => {
              if (res) {
                this.notify.success({
                  message: this.l('Unified.texts.SavedSuccessfully'),
                });
                if (closeFlag) {
                  this.success();
                } else {
                  this.saveNotClose();
                }
              } else {
                this.notify.warn({
                  message: this.l('Unified.texts.DeviceAdded'),
                });
              }
            });
        });
      },
    },
  });
</script>
