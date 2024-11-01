<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{
          !id
            ? l('Unified.texts.CreateNewDeviceConfiguration')
            : l('Unified.texts.EditDeviceConfiguration')
        }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form
        :form="entity"
        :model="entity"
        ref="formRef"
        :layout="'vertical'"
        @submit="handleSubmit"
        autocomplete="off"
      >
        <a-form-item
          :label="l('	Unified.texts.DeviceName')"
          name="deviceName"
          :rules="[
            { required: true, message: l('Unified.texts.ThisFieldIsRequired'), trigger: 'blur' },
            { validator: nameVerify },
          ]"
        >
          <a-input v-model:value="entity.deviceName" type="text" />
        </a-form-item>
        <a-form-item
          :label="l('Unified.texts.Table:DeviceType')"
          name="deviceTypeId"
          :rules="[
            { required: true, message: l('Unified.texts.ThisFieldIsRequired'), trigger: 'blur' },
          ]"
        >
          <f-select
            name="deviceTypeId"
            v-model:value="entity.deviceTypeId"
            :disabled="isDesign"
            allow-clear
            show-search
            optionFilterProp="name"
            :show-arrow="true"
            :dataSource="deviceTypeDataSource"
            @change="deviceTypeSelectChange"
          />
          <!-- <device-type-select-combox
            :disabled="isDesign"
            name="deviceTypeId"
            v-model:value="entity.deviceTypeId"
          /> -->
        </a-form-item>
        <a-form-item
          :label="l('Unified.texts.Table:DeviceCategory')"
          name="deviceCategoryId"
          :rules="[
            { required: true, message: l('Unified.texts.ThisFieldIsRequired'), trigger: 'blur' },
          ]"
        >
          <f-select
            name="deviceCategoryId"
            :disabled="
              (isDesign && entity.deviceTypeId && entity.deviceCategoryId) ||
              (!entity.deviceTypeId && !entity.deviceCategoryId)
            "
            ref="deviceCategory"
            v-model:value="entity.deviceCategoryId"
            allow-clear
            show-search
            optionFilterProp="name"
            :show-arrow="true"
            :dataSource="deviceCategoryDataSource"
             @change="deviceCategorySelectChange"
          />
          <!-- <device-category-select
            name="deviceCategoryId"
            :disabled="
              (isDesign && entity.deviceTypeId && entity.deviceCategoryId) ||
              (!entity.deviceTypeId && !entity.deviceCategoryId)
            "
            v-model:value="entity.deviceCategoryId"
            :customQuery="{ deviceTypeId: entity.deviceTypeId }"
          /> -->
        </a-form-item>
        <a-form-item
          :label="l('Interface Service')"
          name="interfaceServiceId"
          :rules="[
            { required: true, message: l('Unified.texts.ThisFieldIsRequired'), trigger: 'blur' },
          ]"
        >
          <f-select
            name="interfaceServiceId"
            :disabled="false"
            v-model:value="entity.interfaceServiceId"
            allow-clear
            show-search
            optionFilterProp="name"
            :show-arrow="true"
            :dataSource="interfaceServiceDataSource"
          />
          <!-- <interface-service-select
            :disabled="false"
            name="interfaceServiceId"
            v-model:value="entity.interfaceServiceId"
          /> -->
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
  import { defineComponent } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    FireBytes_Unified_Wave_Devices_Dtos_CreateOrUpdateDeviceInput as CreateOrUpdateDeviceInput,
    FireBytes_Unified_Wave_Devices_Dtos_DeviceEditDto as DeviceEditDto,
    FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForEditOutput as GetDeviceForEditOutput,
    DeviceService,
    FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
  } from '/@/apis';
  import DeviceTypeSelectCombox from '/@/wave/component/select/device-type-select-combox.vue';
  import DeviceCategorySelect from '/@/wave/component/select/device-category-select.vue';
  import InterfaceServiceSelect from '/@/wave/component/select/interface-service-select.vue';

  export default defineComponent({
    name: 'CreateDevice',
    components: {
      DeviceTypeSelectCombox,
      DeviceCategorySelect,
      InterfaceServiceSelect,
    },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array,
        required: true,
      },
      deviceTypeRole: {
        type: String,
      },
      masterDeviceId: {
        type: String,
      },
      parameters: {
        type: Object,
      },
      isDesign: {
        type: Boolean,
        default: false,
      },
      continuousNewData: {
        type: Array,
        required: false,
      },
    },
    data() {
      return {
        selectDeviceTypeId: '',
        id: '',
        editData: {} as GetDeviceForEditOutput,
        entity: {
          deviceTypeId: '',
        } as DeviceEditDto,
        entity_s_deviceTypeId: '',
        entity_s_categoryId: '',
        deviceTypeDataSource: {
          service: 'DeviceTypeService.getApiAppDeviceTypeNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
        deviceCategoryDataSource: {
          service: 'DeviceCategoryService.getApiAppDeviceCategoryNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: { deviceTypeId: this.entity?.deviceTypeId ?? '' },
        },
        interfaceServiceDataSource: {
          service: 'InterfaceServiceService.getApiAppInterfaceServiceNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
      };
    },
    computed: {},
    watch: {
      'entity.deviceTypeId': {
        handler(id) {
          //如果id是默认默认选中的类型赋值默认的类型分组
          if (this.continuousNewData) return;
          if (this.selectDeviceTypeId == id) {
            this.entity.deviceCategoryId = this.parameters?.deviceCategoryId;
          } else {
            this.entity.deviceCategoryId = null;
            this.entity.deviceStatusId = null;
          }
        },
        immediate: true,
        deep: true,
      },
    },
    mounted() {
      // this.id = this.pageDataList[0] as string;
      // this.getPageData(this.id);\
      if (this.continuousNewData) this.entity = this.continuousNewData;
      this.$nextTick(() => {
        if (this.parameters != undefined && this.parameters != null) {
          this.entity.deviceTypeId = this.parameters.deviceTypeId;
          this.selectDeviceTypeId = this.parameters.deviceTypeId;
          this.entity.deviceCategoryId = this.parameters.deviceCategoryId;
          this.entity.buildingFloorId = this.parameters.floorId;
          this.entity.masterDeviceId = this.masterDeviceId;
        }
      });
    },
    methods: {
      // /**
      //  * 获取数据
      //  */
      // getPageData(id) {
      //   this.id = id;
      //   this.loading = true;
      //   this.deviceService
      //     .getForEdit(id)
      //     .finally(() => {
      //       this.loading = false;
      //     })
      //     .then((result) => {
      //       this.entity = result.device;
      //       if (!this.id) {
      //         this.entity.buildingFloorId = this.parameters.parentId;
      //       }
      //     });
      // },
      deviceTypeSelectChange(value) {
        this.entity.deviceTypeId = value;
        this.entity_s_deviceTypeId = value;
        this.refreshDeviceCategorySelect();
      },
      refreshDeviceCategorySelect() {
        const ref = this.$refs.deviceCategory as any;
        ref.refresh({ deviceTypeId: this.entity.deviceTypeId });
      },
      deviceCategorySelectChange(value) {
        this.entity.deviceCategoryId = value;
        this.entity_s_categoryId = value;
      },
      handleClose() {
        (this.$refs.formRef as any).resetFields();
      },
      handleSubmit(closeFlag = true) {
        (this.$refs.formRef as any).validate().then(() => {
          // const input = new CreateOrUpdateDeviceInput();
          //  input.device = this.entity;
          this.success(this.entity);
          //         } else {
          // this.saving = true;
          // this.deviceService
          //     .createOrUpdate(input)
          //     .finally(() => {
          //         this.saving = false;
          //     })
          //     .then((res) => {
          //         this.notify.success(this.l('Unified.texts.SavedSuccessfully'));
          //         if (closeFlag) {
          //             this.success(res);
          //         } else {
          //             this.saveNotClose();
          //         }
          //     });
        });
      },
      nameVerify(rule, value, callback) {
        if (!this.entity.deviceName) return Promise.resolve();
        var verifyInput = {} as NameVerifyInput;
        verifyInput.name = this.entity.deviceName;
        verifyInput.id = this.id;
        DeviceService.postApiAppDeviceNameRepeatVerify({
          isStitchingViewCamera: false,
          requestBody: verifyInput,
        }).then((res) => {
          if (!res) {
            callback(this.l('Unified.texts.NameRepetition'));
            return;
          }
          callback();
        });
      },
      deviceVendorSystemVerify(rule, value, callback) {
        if (!this.entity.deviceVendorSystemId) return Promise.resolve();
        var verifyInput = {} as NameVerifyInput;
        verifyInput.name = this.entity.deviceVendorSystemId;
        verifyInput.id = this.id;
        DeviceService.postApiAppDeviceDeviceVendorSystemIdVerify({
          isStitchingViewCamera: false,
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

<style lang="less" scoped>
  .number-width {
    width: 100%;
  }
</style>
