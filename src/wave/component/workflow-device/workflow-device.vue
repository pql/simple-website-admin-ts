<template>
  <div class="steps_body">
    <!-- <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps> -->
    <a-form
      :form="entity"
      @submit="submission"
      :model="entity"
      :layout="'vertical'"
      ref="formRef"
      autocomplete="off"
    >
      <div class="steps-content">
        <a-form-item :label="l('Device Type')" name="deviceOrZone">
          <a-radio-group
            v-model:value="entity.deviceOrZone"
            name="radioGroup"
            @change="
              entity.deviceTypeId = null;
              entity.deviceTypeFunctionId = null;
              entity.idList = undefined;
            "
          >
            <a-radio-button value="device">Device</a-radio-button>
            <a-radio-button value="zone">Device Zone</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </div>
      <div class="steps-content">
        <a-row :gutter="6">
          <a-col :span="10">
            <a-form-item
              :label="l('Device Type')"
              name="deviceTypeId"
              :rules="[{ required: true, message: 'Please select device type!' }]"
            >
              <y-combox-page
                name="deviceType"
                v-model:value="entity.deviceTypeId"
                dataSource="Firebytes.AMS.DeviceTypes.DeviceType"
              >
              </y-combox-page>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              :label="l('Devicce Type Function')"
              name="deviceTypeFunctionId"
              :rules="[{ required: true, message: 'Please select device type function!' }]"
            >
              <y-combox-page
                name="deviceTypeFunctionId"
                v-model:value="entity.deviceTypeFunctionId"
                :params="{ customData: entity.deviceTypeId }"
                :disabled="entity.deviceTypeId == '' || entity.deviceTypeId == null"
                dataSource="Firebytes.AMS.DeviceTypeFunctions.DeviceTypeFunction"
              >
              </y-combox-page>
            </a-form-item>
          </a-col>
        </a-row>
        <div v-if="entity.deviceOrZone == 'device'">
          <device-select-table
            ref="deviceSelect"
            :deviceTypeId="entity.deviceTypeId"
            @selectedDeviceChange="entity.idList = $event"
          ></device-select-table
        ></div>
        <div v-if="entity.deviceOrZone == 'zone'">
          <a-form-item :label="l('Device Zone')" name="idList">
            <zone-select
              name="selectZoneList"
              v-model:value="entity.idList"
              :multiple="true"
            ></zone-select>
          </a-form-item>
        </div>
      </div>
    </a-form>
    <!-- 
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button v-if="current == steps.length - 1" type="primary" @click="submission()">
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import WorkflowDevice from './workflow-device';
  import DeviceSelectTable from './device-select-table/device-select-table.vue';
  import ZoneSelect from '/@/wave/component/select/zone-select.vue';

  export default defineComponent({
    components: {
      DeviceSelectTable,
      ZoneSelect,
    },
    name: 'workflow-device',
    mixins: [WorkflowDevice],
  });
</script>
<style scoped>
  html[data-theme='light'] .steps_body,
  .steps-content {
    background: #fff;
  }
  html[data-theme='dark'] .steps_body {
    background: #1f1f1f;
  }
  .steps_body {
    /* padding: 20px; */
  }

  .steps-content {
    /* margin-top: 16px; */
    /* border: 1px dashed #e9e9e9; */
    /* border-radius: 6px; */
    /* min-height: 200px; */
  }

  .steps-action {
    margin-top: 24px;
  }

  [data-theme='dark'] .steps-content {
    background-color: #2f2f2f;
    border: 1px dashed #404040;
  }
</style>
