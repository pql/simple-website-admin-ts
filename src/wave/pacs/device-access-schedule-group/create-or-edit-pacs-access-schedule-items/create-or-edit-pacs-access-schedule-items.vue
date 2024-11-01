<template>
  <div>
    <div style="margin-bottom: 8px">
      <span style="display: inline-block">{{ l('Unified.texts.PacsAccessSchedule') }}</span>
      <span style="display: inline-block; margin-left: 10px">
        <PlusOutlined class="addItem" @click="addItem()" :title="l('Add')" />
      </span>
    </div>
    <div style="max-height: 300px; overflow: hidden auto">
      <draggable tag="ul" :list="innerVal" class="list-group" handle=".handle" item-key="rowId">
        <template #item="{ element, index }">
          <li class="list-group-item">
            <a-row :gutter="8">
              <a-col :span="1">
                <div class="handle">
                  <UnorderedListOutlined />
                </div>
              </a-col>
              <a-col :span="getSpan('')">
                <a-form-item :name="['items', index, 'dayOfAccessSchedule']">
                  <f-enum-select
                    :name="['items', index, 'dayOfAccessSchedule']"
                    allow-clear
                    :type="getEnum()"
                    label-field="displayName"
                    value-field="key"
                    v-model:value="element.dayOfAccessSchedule"
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                    }"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="getSpan('date')" v-if="types == 'special'" :title="l('StartDate')">
                <a-form-item :name="['items', index, 'startDate']">
                  <f-date-picker
                    v-model:value="element.startDate"
                    allow-clear
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                    }"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="getSpan('time')" :title="l('StartTime')">
                <a-form-item :name="['items', index, 'startTime']">
                  <f-time-picker
                    v-model:value="element.startTime"
                    format="HH:mm"
                    valueFormat="HH:mm"
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                    }"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="getSpan('date')" v-if="types == 'special'" :title="l('EndDate')">
                <a-form-item :name="['items', index, 'endDate']">
                  <f-date-picker
                    v-model:value="element.endDate"
                    allow-clear
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                    }"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="getSpan('time')" :title="l('EndTime')">
                <a-form-item :name="['items', index, 'endTime']">
                  <f-time-picker
                    v-model:value="element.endTime"
                    format="HH:mm"
                    valueFormat="HH:mm"
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                    }"
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
  import CreateoOrEditDeviceAccessScheduleItems from './create-or-edit-pacs-access-schedule-items';

  export default defineComponent({
    name: 'CreateoOrEditDeviceAccessScheduleItems',
    mixins: [CreateoOrEditDeviceAccessScheduleItems],
  });
</script>

<style lang="less" scoped>
  .handle {
    padding-top: 6px;
    padding-bottom: 6px;
    float: left;
    cursor: pointer;
  }

  .addItem {
    &:hover {
      color: @primary-color;
    }
  }

  html[data-theme='dark'] {
    .addItem {
      &:hover {
        color: #d71e1a;
      }
    }
  }
</style>
