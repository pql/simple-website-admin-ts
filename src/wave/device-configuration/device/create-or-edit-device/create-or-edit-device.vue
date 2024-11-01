<template>
  <a-spin :spinning="loading">
    <div class="modal-header" style="margin: 0">
      <div class="modal-title">
        <span v-if="isCopy">
          {{ l('Unified.texts.Copy') }}
        </span>
        <span v-else>
          {{
            !id
              ? l('Unified.texts.CreateNewDeviceConfiguration')
              : l('Unified.texts.EditDeviceConfiguration')
          }}
        </span>
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-tabs>
        <!--  -->
        <a-tab-pane key="1" :tab="l('Unified.texts.BasicInfomation')">
          <a-form
            :form="entity"
            :model="entity"
            ref="formRef"
            :layout="'vertical'"
            @submit="handleSubmit"
            autocomplete="off"
          >
            <a-form-item :label="l('Unified.texts.DeviceId')" name="id">
              <a-input v-model:value="entity.id" type="text" :disabled="true" />
            </a-form-item>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.DeviceName')"
                  name="deviceName"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                    { validator: nameVerify },
                  ]"
                >
                  <a-input v-model:value="entity.deviceName" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.DeviceHostNameOrIp')"
                  name="deviceHostNameOrIp"
                >
                  <a-input v-model:value="entity.deviceHostNameOrIp" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.DeviceHostPort')" name="deviceHostPort">
                  <a-input-number
                    class="number-width"
                    v-model:value="entity.deviceHostPort"
                    string-mode
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.DeviceHostWebAddress')"
                  name="deviceHostWebAddress"
                >
                  <a-input v-model:value="entity.deviceHostWebAddress" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.DeviceSlaveId')" name="deviceSlaveId">
                  <a-input v-model:value="entity.deviceSlaveId" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.DeviceMacAddress')" name="deviceMacAddress">
                  <a-input v-model:value="entity.deviceMacAddress" type="text" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.DeviceModel')" name="deviceModel">
                  <a-input v-model:value="entity.deviceModel" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.DeviceVendorSystemId')"
                  name="deviceVendorSystemId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                    // { validator: deviceVendorSystemVerify },
                  ]"
                >
                  <a-input v-model:value="entity.deviceVendorSystemId" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('	Unified.texts.Table:InterfaceService')"
                  name="interfaceServiceId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
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
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.Table:DeviceType')"
                  name="deviceTypeId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <f-select
                    :disabled="true"
                    name="deviceTypeId"
                    v-model:value="entity.deviceTypeId"
                    allow-clear
                    show-search
                    optionFilterProp="name"
                    :show-arrow="true"
                    :dataSource="deviceTypeDataSource"
                  />

                  <!-- <device-type-select-combox
                    :disabled="true"
                    name="deviceTypeId"
                    v-model:value="entity.deviceTypeId"
                  /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.Table:DeviceCategory')"
                  name="deviceCategoryId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <f-select
                    ref="deviceCategory"
                    name="deviceCategoryId"
                    :disabled="isDesign || !entity.deviceTypeId"
                    v-model:value="entity.deviceCategoryId"
                    allow-clear
                    show-search
                    optionFilterProp="name"
                    :show-arrow="true"
                    :dataSource="deviceCategoryDataSource"
                  />
                  <!-- <device-category-select
                    name="deviceCategoryId"
                    v-model:value="entity.deviceCategoryId"
                    :disabled="isDesign || !entity.deviceTypeId"
                    :customQuery="{ deviceTypeId: entity.deviceTypeId }"
                  /> -->
                </a-form-item>
              </a-col>

              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.Table:BuildingFloor')"
                  name="buildingFloorId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <f-select
                    name="buildingFloorId"
                    :disabled="isDesign"
                    v-model:value="entity.buildingFloorId"
                    allow-clear
                    show-search
                    optionFilterProp="name"
                    :show-arrow="true"
                    :dataSource="buildingFloorDataSource"
                  />

                  <!-- <building-floor-select
                    name="buildingFloorId"
                    :disabled="isDesign"
                    v-model:value="entity.buildingFloorId"
                  /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('	Unified.texts.DeviceStatus')"
                  name="deviceStatusId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <!-- <y-combox-page
                    name="deviceStatusId"
                    v-model:value="entity.deviceStatusId"
                    :params="{customData:{deviceTypeId:selectDeviceTypeId}}"
                    :disabled="true"
                    dataSource="Firebytes.AMS.DeviceStatuss.DeviceStatus"
                  >
                  </y-combox-page> -->
                  <f-select
                    :disabled="true"
                    name="deviceStatusId"
                    v-model:value="entity.deviceStatusId"
                    allow-clear
                    show-search
                    optionFilterProp="name"
                    :show-arrow="true"
                    :dataSource="deviceStatuDataSource"
                  />
                  <!-- <device-status-select
                    :disabled="true"
                    name="deviceStatusId"
                    v-model:value="entity.deviceStatusId"
                    :customQuery="{ deviceTypeId: selectDeviceTypeId }"
                  /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.Table:CredentialProfile')"
                  name="credentialProfileId"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <f-select
                    name="credentialProfileId"
                    v-model:value="entity.credentialProfileId"
                    allow-clear
                    show-search
                    optionFilterProp="name"
                    :show-arrow="true"
                    :dataSource="credentialProfileDataSource"
                  />
                  <!-- <credential-profile-select
                    name="credentialProfileId"
                    sss
                    v-model:value="entity.credentialProfileId"
                  /> -->
                </a-form-item>
              </a-col>
              <a-col v-if="loading || deviceTypeSetting.deviceTypeRole == 'Slave'" :span="8">
                <a-form-item
                  :label="l('Unified.texts.MasterDevice')"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                  name="masterDeviceId"
                >
                  <!-- <y-combox-page
                    name="masterDeviceId"
                    v-model:value="entity.masterDeviceId"
                    :params="{customData:{buildingFloorId:entity.buildingFloorId,deviceTypeId:entity.deviceTypeId}}"
                    :disabled="isDesign||!entity.buildingFloorId"
                    :reloadTag="entity.buildingFloorId"
                    dataSource="Firebytes.AMS.Devices.Device"
                  >
                  </y-combox-page> -->

                  <!-- <device-select
                    name="masterDeviceId"
                    v-model:value="entity.masterDeviceId"
                    :params="{customData:{buildingFloorId:entity.buildingFloorId,deviceTypeId:entity.deviceTypeId}}"
                    :disabled="isDesign||!entity.buildingFloorId"
                    :reloadTag="entity.buildingFloorId"
                  >
                  </device-select> -->

                  <f-select
                    ref="masterDeviceId"
                    name="masterDeviceId"
                    show-search
                    optionFilterProp="name"
                    :form-model="entity"
                    :parent-instance="vm"
                    :disabled="isDesign || !entity.buildingFloorId"
                    v-model:value="entity.masterDeviceId"
                    :dataSource="{
                      service: 'DeviceService.getApiAppDeviceNdoList',
                      labelField: 'name',
                      valueField: 'id',
                      params: {
                        customData: JSON.stringify({
                          buildingFloorId: entity.buildingFloorId,
                          deviceTypeId: entity.deviceTypeId,
                        }),
                      },
                      valueChange: [],
                    }"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.DeviceZone')" name="zoneList">
                  <f-select
                    v-model:value="entity.zoneList"
                    allow-clear
                    show-search
                    optionFilterProp="name"
                    mode="multiple"
                    :show-arrow="true"
                    :dataSource="zoneDataSource"
                  />
                  <!-- <zone-select name="zoneList" mode="multiple" v-model:value="entity.zoneList" /> -->
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  :label="l('Unified.texts.Channel')"
                  name="channel"
                  :rules="[
                    {
                      required: true,
                      message: l('Unified.texts.ThisFieldIsRequired'),
                      trigger: 'blur',
                    },
                  ]"
                >
                  <a-input v-model:value="entity.channel" type="text" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :label="l('Unified.texts.Position')" name="position">
                  <a-input v-model:value="entity.position" type="text" />
                </a-form-item>
              </a-col>
            </a-row>

            <a-form-item
              v-if="loading || deviceTypeSetting.deviceTypeRole == 'Master'"
              :label="l('Unified.texts.SlaveDevice')"
              name="slaveDeviceIdList"
            >
              <!-- <y-combox-page
                name="slaveDeviceIdList"
                v-model:value="entity.slaveDeviceIdList"
                :params="{customData:{deviceTypeRole:'Slave'}}"
                :multiple="true"
                :disabled="isDesign"
                dataSource="Firebytes.AMS.Devices.Device"
              >
              </y-combox-page> -->
              <!-- <device-select name="slaveDeviceIdList" :dataType="'Slave'" :multiple="true" :disabled="true"
                :customData="{ deviceTypeRole: 'Master', buildingFloorId: entity.buildingFloorId, excludeDeviceId: entity.id }"
                v-model:value="entity.slaveDeviceIdList"></device-select> -->

              <f-select
                ref="slaveDeviceIdList"
                name="slaveDeviceIdList"
                :form-model="entity"
                :parent-instance="vm"
                :disabled="isDesign"
                v-model:value="entity.slaveDeviceIdList"
                :dataSource="{
                  service: 'DeviceService.getApiAppDeviceNdoList',
                  labelField: 'name',
                  valueField: 'id',
                  params: { customData: JSON.stringify({ deviceTypeRole: 'Slave' }) },
                  valueChange: [],
                }"
              />
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane
          key="2"
          :tab="l('Unified.texts.CustomInfomation')"
          v-if="entity.deviceEditCustomFields && entity.deviceEditCustomFields.length > 0"
        >
          <a-row :gutter="16" :key="index" v-for="(field, index) in entity.deviceEditCustomFields">
            <a-col :span="24">
              <a-form-item
                :label="field.fieldName"
                :name="['caseEditCustomFields', index, 'fieldDetails']"
              >
                <a-input v-if="field.fieldType == 'input'" v-model:value="field.fieldDetails" />
                <a-textarea
                  v-else-if="field.fieldType == 'textarea'"
                  v-model:value="field.fieldDetails"
                  :rows="6"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane
          key="3"
          :tab="l('Unified.texts.AssociateCamera')"
          v-if="deviceTypeSetting.isSettingCamera"
          force-render
        >
          <a-from autocomplete="off" layout="vertical">
            <a-row :gutter="6">
              <a-col :span="10">
                <a-form-item :label="l('Unified.texts.Search')" name="searchDeviceName">
                  <a-input v-model:value="searchDeviceName" type="text" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-from>
          <!-- deviceTypeSetting.cameraLimitNumber -->
          <device-select-table
            ref="deviceCameraSelect"
            :numLimit="4"
            :defaultSelectDeviceList="entity.cameraIdList"
            :hideSelectAll="true"
            :deviceType="searchDeviceType"
            :deviceName="searchDeviceName"
            @selected-device-change="entity.cameraIdList = $event"
          />
        </a-tab-pane>

        <a-tab-pane
          key="4"
          :tab="l('Unified.texts.DeviceCommandGroup')"
          v-if="deviceTypeSetting.isSettingDeviceGroup"
          force-render
        >
          <command-settings ref="commandSetting" :entity="entity" />
        </a-tab-pane>
        <!-- Redundant Server -->
        <a-tab-pane
          key="5"
          :tab="l('Unified.texts.RedundantServer')"
          force-render
          v-if="deviceTypeSetting.redundantServer"
        >
          <redundant-server-table ref="redundant-server-table" :deviceId="this.entity.id" />
        </a-tab-pane>

        <!-- Redundant interface service -->
        <a-tab-pane
          key="6"
          :tab="l('Unified.texts.RedundantInterfaceService')"
          force-render
          v-if="deviceTypeSetting.redundantInterfaceService"
        >
          <redundant-interface-service-table
            ref="redundant-interface-service-table"
            :defaultSelectDeviceList="entity.redundantInterfaceServiceIdList"
            @selected-device-change="entity.redundantInterfaceServiceIdList = $event"
          />
        </a-tab-pane>
      </a-tabs>
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
  import { defineComponent, getCurrentInstance } from 'vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import { buildUUID } from '/@/utils/uuid';
  import {
    // CreateOrUpdateDeviceInput,
    // DeviceEditDto,
    // DeviceServiceProxy,
    // GetDeviceForEditOutput,
    // NameVerifyInput,
    // DeviceTypeSettingDto,
    // DeviceTypeServiceProxy

    FireBytes_Unified_Wave_Devices_Dtos_CreateOrUpdateDeviceInput as CreateOrUpdateDeviceInput,
    FireBytes_Unified_Wave_Devices_Dtos_DeviceEditDto as DeviceEditDto,
    DeviceService,
    FireBytes_Unified_Wave_Devices_Dtos_GetDeviceForEditOutput as GetDeviceForEditOutput,
    FireBytes_Unified_Shared_NameVerifyInput as NameVerifyInput,
    FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeSettingDto as DeviceTypeSettingDto,
    DeviceTypeService,
    RedundantServerService,
  } from '/@/apis';
  import DeviceSelectTable from '/@/wave/component/workflow-device/device-select-table/device-select-table.vue';
  import CommandSettings from '../command-settings/command-settings.vue';
  import redundantServerTable from '../redundant-server-table/redundant-server-table.vue';
  import redundantInterfaceServiceTable from '../redundant-interface-service-table/redundant-interface-service-table.vue';

  import InterfaceServiceSelect from '/@/wave/component/select/interface-service-select.vue';
  import DeviceTypeSelectCombox from '/@/wave/component/select/device-type-select-combox.vue';
  import DeviceCategorySelect from '/@/wave/component/select/device-category-select.vue';
  import BuildingFloorSelect from '/@/wave/component/select/building-floor-select.vue';
  import DeviceStatusSelect from '/@/wave/component/select/device-status-select.vue';
  import CredentialProfileSelect from '/@/wave/component/select/credential-profile-select.vue';
  import DeviceSelect from '/@/wave/component/select/device-select.vue';
  import ZoneSelect from '/@/wave/component/select/zone-select.vue';

  export default defineComponent({
    name: 'CreateOrEditDevice',
    components: {
      CommandSettings,
      redundantServerTable,
      redundantInterfaceServiceTable,
      InterfaceServiceSelect,
      DeviceTypeSelectCombox,
      DeviceCategorySelect,
      BuildingFloorSelect,
      DeviceStatusSelect,
      CredentialProfileSelect,
      DeviceSelect,
      ZoneSelect,
      DeviceSelectTable,
    },
    mixins: [ModalComponentBase],
    props: {
      pageDataList: {
        type: Array,
        required: true,
      },
      parameters: {
        type: Object,
      },
      entityConfig: {
        type: Object as PropType<DeviceEditDto>,
      },
      //是否是面板设计页面弹窗
      isDesign: {
        type: Boolean,
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
        selectDeviceTypeId: '',
        id: '',
        copyId: '',
        editData: {} as GetDeviceForEditOutput,
        entity: {} as DeviceEditDto,
        deviceTypeSetting: {} as DeviceTypeSettingDto,
        searchDeviceName: '',
        searchDeviceType: 'Camera',
        interfaceServiceDataSource: {
          service: 'InterfaceServiceService.getApiAppInterfaceServiceNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
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
          params: { deviceTypeId: '00000000-0000-0000-0000-000000000000' },
        },
        buildingFloorDataSource: {
          service: 'BuildingFloorService.getApiAppBuildingFloorNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
        deviceStatuDataSource: {
          service: 'DeviceStatusService.getApiAppDeviceStatusNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
        credentialProfileDataSource: {
          service: 'DeviceCredentialProfileService.getApiAppDeviceCredentialProfileNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
        zoneDataSource: {
          service: 'ZoneService.getApiAppZoneNdoList', //接口名，
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
          this.selectDeviceTypeId = id;
          if (id == null || id == undefined) {
            this.entity.deviceCategoryId = null;
          }
        },
        immediate: true,
        deep: true,
      },
      'entity.buildingFloorId': {
        handler(id, oldId) {
          if (oldId != undefined) {
            this.entity.masterDeviceId = null;
          }
        },
        immediate: true,
        deep: true,
      },
    },
    mounted() {
      if (this.entityConfig != null && this.entityConfig != undefined) {
        this.entity = this.entityConfig;
        this.entity.id = buildUUID();
        this.entity.redundantInterfaceServiceIdList = [];
        this.getDeviceTypeSetting();
      } else {
        this.id = this.pageDataList[0] as string;
        this.getPageData(this.id);
      }
    },
    methods: {
      /**获取设备类型配置 */
      getDeviceTypeSetting() {
        DeviceService.getApiAppDeviceDeviceTypeSetting({
          deviceTypeId: this.entity.deviceTypeId as string,
        }).then((res) => {
          this.deviceTypeSetting = res;
          this.entity.deviceEditCustomFields = res.deviceEditCustomFields;
        });
      },
      /**
       * 获取数据
       */
      getPageData(id) {
        this.id = id;
        this.loading = true;
        DeviceService.getApiAppDeviceForEdit({
          id: id,
        }).then((result) => {
          this.deviceTypeSetting = result.deviceType as DeviceTypeSettingDto;
          this.entity = result.device;
          if (!this.id) {
            this.entity.buildingFloorId = this.parameters?.parentId;
          }

          if (this.isCopy) {
            this.copyId = this.id;
            this.entity.id = buildUUID();
            this.id = this.entity.id;
            this.entity?.commandSettings?.forEach((item) => {
              item.id = null;
              item.deviceId = this.entity.id;
            });
            this.copyRedundantServer();
          }
          this.loading = false;
          this.refreshDeviceCategorySelect();
        });
      },
      copyRedundantServer() {
        this.loading = true;
        RedundantServerService.postApiAppRedundantServerCopy({
          requestBody: { deviceId: this.entity.id, copyDeviceId: this.copyId },
        })
          .finally(() => {
            this.loading = false;
          })
          .then((res) => {})
          .catch((error) => {});
      },
      refreshDeviceCategorySelect() {
        const ref = this.$refs.deviceCategory as any;
        ref.refresh({ deviceTypeId: this.entity.deviceTypeId });
      },
      handleClose() {
        (this.$refs.formRef as any).resetFields();
      },
      handleSubmit(closeFlag = true) {
        (this.$refs.formRef as any).validate().then(() => {
          if (this.deviceTypeSetting.isSettingDeviceGroup) {
            (this.$refs.commandSetting as any).save().then((res) => {
              this.saveForm(closeFlag);
            });
          } else {
            this.saveForm(closeFlag);
          }
        });
      },
      saveForm(closeFlag) {
        const input = {} as CreateOrUpdateDeviceInput;
        input.device = this.entity;
        this.saving = true;
        DeviceService.postApiAppDeviceOrUpdate({
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
              if (this.id) this.saveNotClose();
              else this.success(this.entity);
            }
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
        // 去掉deviceVendorSystemId唯一检测，deviceVendorSystemId+channl才是唯一
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
