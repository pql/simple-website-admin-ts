<template>
  <a-form
    :form="entity"
    :layout="'vertical'"
    :model="entity"
    ref="formCommandRef"
    autocomplete="off"
  >
    <a-row :gutter="16" :key="index" v-for="(settingItem, index) in entity.commandSettings">
      <a-col :span="12">
        <a-form-item
          :label="l('Unified.texts.DeviceStatus')"
          :name="['commandSettings', index, 'deviceStatusId']"
          :rules="[
            {
              required: false,
              message: l('Unified.texts.PleaseselectdeviceStatus'),
            },
            { validator: statusVerify },
          ]"
        >
          <f-select
            style="width: 100%"
            :disabled="false"
            name="deviceStatusId"
            v-model:value="settingItem.deviceStatusId"
            allow-clear
            show-search
            optionFilterProp="name"
            :show-arrow="true"
            :dataSource="deviceStatusDataSource"
          />

          <!-- <device-status-select
            :disabled="false"
            name="deviceStatusId"
            v-model:value="settingItem.deviceStatusId"
            :customQuery="{ deviceTypeId: entity.deviceTypeId }"
          >
          </device-status-select> -->
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item
          :label="l('Unified.texts.DeviceCommandGroup')"
          :name="['commandSettings', index, 'commandGroupId']"
          :rules="{
            required: false,
            message: l('Unified.texts.PleaseSelectCommandGroup'),
          }"
        >
          <f-select
            style="width: 100%"
            :disabled="false"
            name="commandGroupId"
            v-model:value="settingItem.commandGroupId"
            allow-clear
            show-search
            optionFilterProp="name"
            :show-arrow="true"
            :dataSource="commandGroupDataSource"
          />

          <!-- <device-group-select
            :disabled="false"
            name="commandGroupId"
            v-model:value="settingItem.commandGroupId"
          >
          </device-group-select> -->
        </a-form-item>
      </a-col>
      <a-col :span="1">
        <MinusCircleOutlined
          style="margin-top: 35px;"
          class="removeOut"
          @click="removeCommandSetting(settingItem)"
        />
      </a-col>
    </a-row>
    <a-form-item>
      <a-button type="dashed" block @click="addCommandSetting">
        <PlusOutlined />
        Add Command Group
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  //  import DeviceGroupSelect from '/@/ams/component/select/device-group-select.vue';
  //  import DeviceStatusSelect from '/@/ams/component/select/device-status-select.vue';
  import DeviceGroupSelect from '/@/wave/component/select/device-group-select.vue';
  import DeviceStatusSelect from '/@/wave/component/select/device-status-select.vue';
  import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
  import {
    // DeviceEditDto,
    // CommandSettingDto
    FireBytes_Unified_Wave_Devices_Dtos_DeviceEditDto as DeviceEditDto,
    FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto as CommandSettingDto,
  } from '/@/apis';
  export default defineComponent({
    name: 'command-settings',
    components: {
      DeviceGroupSelect,
      DeviceStatusSelect,
      MinusCircleOutlined,
      PlusOutlined,
    },
    mixins: [DynamicTableComponentBase],
    props: {
      entity: {
        type: Object as PropType<DeviceEditDto>,
        required: true,
        default: {
          commandSettings: [] as CommandSettingDto,
        },
      },
    },
    data() {
      return {
        id: '',
        deviceStatusDataSource: {
          service: 'DeviceStatusService.getApiAppDeviceStatusNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
        commandGroupDataSource: {
          service: 'DeviceGroupService.getApiAppDeviceGroupNdoList', //接口名，
          labelField: 'name', //下拉框标题
          valueField: 'id', //下拉框值
          params: {},
        },
      };
    },
    computed: {},
    mounted() {},
    methods: {
      save() {
        return new Promise((resolve, reject) => {
          (this.$refs.formCommandRef as any)
            .validate()
            .then(() => {
              resolve(true);
            })
            .catch(() => {
              reject(false);
            });
        });

        // this.$emit('update:entity', this.entity);
      },
      addCommandSetting() {
        var data = {
          id: undefined,
          deviceId: undefined,
          deviceStatusId: undefined,
          commandGroupId: undefined,
        } as CommandSettingDto;

        if (!this.entity?.commandSettings) this.entity.commandSettings = [];

        this.entity.commandSettings.push(data);
      },
      removeCommandSetting(setting) {
        if (this.entity?.commandSettings != null) {
          let index = this.entity.commandSettings.indexOf(setting);
          if (index !== -1) {
            this.entity.commandSettings.splice(index, 1);
          }
        }
      },
      /**状态不能重复 */
      statusVerify(rule, value, callback) {
        if (this.entity?.commandSettings != null) {
          var model = this.entity.commandSettings[rule.field.split('.')[1]];
          for (const item of this.entity.commandSettings) {
            if (item.deviceStatusId == value && item.id != model.id) {
              callback(this.l('Unified.texts.NameRepetition'));
            }
          }
          callback();
        }
      },
    },
  });
</script>
<style lang="less" scoped>
  .removeOut {
    margin-left: 10px;
  }
</style>
