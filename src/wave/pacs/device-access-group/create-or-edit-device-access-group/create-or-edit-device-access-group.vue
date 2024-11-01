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
      <a-form ref="formRef" labelAlign="right" layout="vertical" :autocomplete="'off'" :rules="rules"
        :label-col="{ style: { width: '200px' } }" :model="form" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <!-- DeviceAccessGroupName -->
            <a-form-item :label="l('Unified.texts.DeviceAccessGroupName')"
              :name="['deviceAccessGroup', 'accessGroupName']" :rules="[
                {
                  required: true,
                  message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                  trigger: 'blur',
                },
                { validator: nameVerify, trigger: 'blur' },
              ]">
              <a-input 
                v-model:value="form.deviceAccessGroup.accessGroupName" :autocomplete="'off'" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <!-- Description -->
            <a-form-item :label="l('Unified.texts.Description')" name="description">
              <a-input v-model:value="form.deviceAccessGroup.description"
                :autocomplete="'off'" />
            </a-form-item>
          </a-col>

          <!-- Items -->
          <a-col :span="24">
            <draggable style="max-height: 355px; overflow: hidden auto" tag="ul" :list="form.items" class="list-group"
              handle=".handle" item-key="rowId">
              <template #item="{ element, index }">
                <li class="list-group-item">
                  <a-row :gutter="8">
                    <a-col :span="1">
                      <div style="margin-top: 7px" class="handle">
                        <UnorderedListOutlined />
                      </div>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item :name="['items', index, 'pacsDeviceAccessScheduleGroupId']" :rules="[
                        {
                          required: true,
                          message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                          trigger: 'blur',
                        },
                        { validator: accessScheduleGroupVerify, trigger: 'blur' },
                      ]">
                        <PacsDeviceAccessGroupSelect :defaultValue="element.pacsDeviceAccessScheduleGroupId"
                          @change="element.pacsDeviceAccessScheduleGroupId = $event">
                        </PacsDeviceAccessGroupSelect>
                      </a-form-item>
                    </a-col>
                    <a-col :span="6">
                      <a-form-item :name="['items', index, 'deviceId']" :rules="{
                        required: true,
                        message: l('Unified.texts.CustomFieldsPlaceholderPrompt'),
                        trigger: 'blur',
                      }">
                        <DeviceSelect :defaultValue="element.deviceId" @change="element.deviceId = $event">
                        </DeviceSelect>
                      </a-form-item>
                    </a-col>
                    <a-col :span="3">
                      <a-form-item :name="['items', index, 'endTime']">
                        <a-input name="description" 
                          v-model:value="element.description" :autocomplete="'off'" />
                      </a-form-item>
                    </a-col>
                    <a-col :span="1">
                      <CloseOutlined style="margin-top: 10px; margin-left: 10px" @click="removeItem(index)" />
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
        <a-button :loading="saving" v-show="showNextStepButton" :type="'primary'" @click="handleSubmit(false)">
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
import CreateoOrEditDeviceAccessGroup from './create-or-edit-device-access-group';

export default defineComponent({
  name: 'CreateoOrEditDeviceAccessGroup',
  mixins: [CreateoOrEditDeviceAccessGroup],
});
</script>

<style lang="less" scoped></style>
