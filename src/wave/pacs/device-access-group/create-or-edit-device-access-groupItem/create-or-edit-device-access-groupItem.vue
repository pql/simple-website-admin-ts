<template>
  <div>
    <div style="margin-bottom: 8px">
      <span style="display: inline-block">{{ l('Unified.texts.AccessSchedule') }}</span>
      <span style="display: inline-block; margin-left: 10px">
        <PlusOutlined class="addItem" @click="addItem()" :title="l('Add')"></PlusOutlined>
      </span>
    </div>
    <div>
      <draggable tag="ul" :list="innerVal" class="list-group" handle=".handle" item-key="rowId">
        <template #item="{ element, index }">
          <li class="list-group-item">
            <a-row :gutter="8">
              <a-col :span="1">
                <div class="handle">
                  <UnorderedListOutlined />
                </div>
              </a-col>
              <a-col :span="7">
                <a-form-item :name="['items', index, 'pacsDeviceAccessScheduleGroupId']">
                  <PacsDeviceAccessGroupSelect
                    name="pacsDeviceAccessScheduleGroupId"
                    :defaultValue="element.pacsDeviceAccessScheduleGroupId"
                    @change="element.pacsDeviceAccessScheduleGroupId = $event"
                  >
                  </PacsDeviceAccessGroupSelect>
                </a-form-item>
              </a-col>
              <a-col :span="7">
                <a-form-item :name="['items', index, 'deviceTypeId']">
                  <DeviceSelect
                    :defaultValue="element.deviceId"
                    @change="element.deviceId = $event"
                  ></DeviceSelect>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :name="['items', index, 'description']">
                  <a-input
                    name="description"
                    v-model:value="element.description"
                    :autocomplete="'off'"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="1">
                <CloseOutlined @click="removeItem(index)" />
              </a-col>
            </a-row>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CreateOrEditDeviceAccessGroupItem from './create-or-edit-device-access-groupItem';

  export default defineComponent({
    name: 'CreateOrEditDeviceAccessGroupItem',
    mixins: [CreateOrEditDeviceAccessGroupItem],
  });
</script>

<style lang="less" scoped></style>
