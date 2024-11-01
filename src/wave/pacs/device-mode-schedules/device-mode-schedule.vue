<template>
  <f-resize-layout :draggable="false">
    <template #leftSider>
      <div style="width: 320px">
        <deviceAccessScheduleGroupTable ref="groupTable" @selected-node="selectedNodeFunc" />
      </div>
    </template>
    <template #content>
      <!-- 设置内容 -->
      <div class="my-1.5 mx-1.5" @click="clickCollapsePanel">
        <a-spin :spinning="settingLoading">
          <a-collapse accordion :activeKey="activeKey">
            <a-collapse-panel
              key="1"
              :disabled="selectedTree == null"
              :header="l('Unified.texts.ScheduleSetting')"
            >
              <div @click.stop>
                <template>
                  <spen>{{ l('Unified.texts.ScheduleSetting') }}</spen>
                </template>
                <div>
                  <a-button
                    :type="'primary'"
                    @click="submitSetting()"
                    v-if="isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Edit')"
                  >
                    <save-outlined /> {{ l('Unified.texts.Save') }}
                  </a-button>
                  <!-- Items -->
                  <a-form
                    ref="formRef"
                    labelAlign="right"
                    layout="vertical"
                    :autocomplete="'off'"
                    :rules="rules"
                    :label-col="{ style: { width: '200px' } }"
                    :model="formSetting"
                    @submit="submitSetting"
                  >
                    <a-row>
                      <!-- ref="formDraggable" style="max-height: 200px;margin-top: 20px;
                    overflow: hidden auto;" -->

                      <a-col
                        :span="24"
                        style="max-height: 200px; margin-top: 10px; overflow: hidden auto"
                      >
                        <template v-for="(element, index) in formSetting.settingEdit" :key="index">
                          <a-row :gutter="24">
                            <a-col :span="6">
                              <a-form-item
                                :name="['settingEdit', index, 'dayOfAccessSchedule']"
                                :rules="[
                                  {
                                    required: true,
                                    message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                                    trigger: 'blur',
                                  },
                                  { validator: dayOfAccessScheduleVerify, trigger: 'blur' },
                                ]"
                              >
                                <f-enum-select
                                  :disabled="
                                    !isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Edit')
                                  "
                                  allow-clear
                                  show-search
                                  optionFilterProp="displayName"
                                  :type="'DayOfAccessScheduleEnum'"
                                  label-field="displayName"
                                  value-field="displayName"
                                  v-model:value="element.dayOfAccessSchedule"
                                />
                              </a-form-item>
                            </a-col>
                            <a-col :span="4">
                              <a-form-item
                                :name="['settingEdit', index, 'time']"
                                :rules="{
                                  required: true,
                                  message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                                  trigger: 'blur',
                                }"
                              >
                                <f-time-picker
                                  :disabled="
                                    !isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Edit')
                                  "
                                  v-model:value="element.time"
                                  format="HH:mm"
                                  valueFormat="HH:mm"
                                />
                              </a-form-item>
                            </a-col>
                            <a-col
                              :span="1"
                              v-if="isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Edit')"
                            >
                              <CloseOutlined
                                style="margin-top: 10px; margin-left: 10px"
                                @click="removeItem(index)"
                              />
                            </a-col>
                          </a-row>
                        </template>
                      </a-col>

                      <!-- Add -->
                      <a-col
                        :span="24"
                        v-if="isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Edit')"
                      >
                        <a-form-item>
                          <a-button type="dashed" block @click="addFields">
                            <PlusOutlined />
                            {{ l('Unified.texts.AddFields') }}
                          </a-button>
                        </a-form-item>
                      </a-col>
                    </a-row>
                  </a-form>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </a-spin>
      </div>
      <!-- 选中节点的面包屑 -->
      <div style="padding: 15px; padding-bottom: 4px; font-weight: 900" v-if="selectedTree != null">
        {{ selectedTree.name }}
        {{ l('Unified.texts.GroupSuffix') }}
      </div>

      <!-- 主体内容 -->
      <f-dynamic-table
        type="pacs-action-planItems"
        ref="table"
        :extra-height="130"
        :fetch="fetchDataList"
        :loading="tableLoading"
        :showFilter="false"
        @action-click="handleActionClick"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'deviceTypeFunctionId'">
            <f-select
              :disabled="!isGrantedAny('Unified.PacsDeviceModeSchedulesGroup.Edit')"
              name="deviceTypeFunctionId"
              style="width: 150px"
              show-search
              optionFilterProp="name"
              v-model:value="record.deviceTypeFunctionId"
              :dataSource="{
                service: 'DeviceTypeFunctionService.getApiAppDeviceTypeFunctionComboxNdo',
                labelField: 'name',
                valueField: 'id',
                valueChange: [],
                params: { customData: record.deviceTypeId },
              }"
              @change="changeDeviceTypeFunction($event, record)"
            />
          </template>
        </template>
      </f-dynamic-table>
    </template>
  </f-resize-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceModeSchedule from './device-mode-schedule';

  export default defineComponent({
    name: 'PacActionPlanGroup',
    mixins: [DeviceModeSchedule],
  });
</script>

<style lang="less" scoped>
  .dynamic-table-wrapper {
    height: auto;
  }
</style>
