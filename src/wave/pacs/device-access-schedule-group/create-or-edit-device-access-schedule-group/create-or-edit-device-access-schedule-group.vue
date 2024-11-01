<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l(_titleName) }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body modal-body-extra">
      <!-- 表单 -->
      <a-form
        ref="formRef"
        labelAlign="right"
        layout="vertical"
        :autocomplete="'off'"
        :rules="rules"
        :label-col="{ style: { width: '200px' } }"
        :model="form"
        @submit="handleSubmit"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <!-- AccessScheduleName -->
            <a-form-item
              :label="l('Unified.texts.AccessScheduleGroup')"
              :name="['deviceAccessScheduleGroup', 'accessScheduleName']"
              :rules="[
                {
                  required: true,
                  message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                  trigger: 'blur',
                },
                { validator: nameVerify, trigger: 'blur' },
              ]"
            >
              <a-input
                v-model:value="form.deviceAccessScheduleGroup.accessScheduleName"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- IsDefault -->
            <a-form-item :label="l('Unified.texts.IsDefault')" name="isDefault">
              <a-switch
                v-model:checked="form.deviceAccessScheduleGroup.isDefault"
                :checkedChildren="l('Unified.texts.Yes')"
                :unCheckedChildren="l('Unified.texts.No')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <!-- Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input
                name="description"
                v-model:value="form.deviceAccessScheduleGroup.description"
                :autocomplete="'off'"
              />
            </a-form-item>
          </a-col>
          <!-- Items -->
          <a-col :span="24">
            <draggable
              style="max-height: 265px; overflow: hidden auto"
              tag="ul"
              :list="form.items"
              class="list-group"
              handle=".handle"
              item-key="rowId"
            >
              <template #item="{ element, index }">
                <li class="list-group-item">
                  <a-row :gutter="8">
                    <a-col :span="1">
                      <div style="margin-top: 7px" class="handle">
                        <UnorderedListOutlined />
                      </div>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item
                        :name="['items', index, 'dayOfAccessSchedule']"
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
                    <a-col :span="3">
                      <a-form-item
                        :name="['items', index, 'startTime']"
                        :rules="{
                          required: true,
                          message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                          trigger: 'blur',
                        }"
                      >
                        <f-time-picker
                          v-model:value="element.startTime"
                          format="HH:mm"
                          valueFormat="HH:mm"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="3">
                      <a-form-item
                        :name="['items', index, 'endTime']"
                        :rules="{
                          required: true,
                          message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                          trigger: 'blur',
                        }"
                      >
                        <f-time-picker
                          v-model:value="element.endTime"
                          format="HH:mm"
                          valueFormat="HH:mm"
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :span="1">
                      <CloseOutlined
                        style="margin-top: 10px; margin-left: 10px"
                        @click="removeItem(index)"
                      />
                    </a-col>
                  </a-row>
                </li>
              </template>
            </draggable>
          </a-col>
          <!-- Add -->
          <a-col :span="24">
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
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" v-show="showCancelButton" @click="close()">
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
  import { defineComponent } from 'vue';
  import CreateoOrEditDeviceAccessScheduleGroup from './create-or-edit-device-access-schedule-group';

  export default defineComponent({
    name: 'CreateoOrEditDeviceAccessScheduleGroup',
    mixins: [CreateoOrEditDeviceAccessScheduleGroup],
  });
</script>

<style lang="less" scoped></style>
