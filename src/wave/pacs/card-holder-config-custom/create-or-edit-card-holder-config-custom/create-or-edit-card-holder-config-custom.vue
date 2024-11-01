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
        <draggable tag="ul" :list="form.data" class="list-group" handle=".handle" item-key="rowId">
          <template #item="{ element, index }">
            <li class="list-group-item">
              <a-row :gutter="8">
                <a-col :span="1">
                  <div style="margin-top: 33px" class="handle">
                    <UnorderedListOutlined />
                  </div>
                </a-col>
                <a-col :span="8">
                  <a-form-item
                    :label="l('Unified.texts.FieldName')"
                    :name="['data', index, 'fieldName']"
                    :rules="[
                      {
                        required: true,
                        message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                      },
                      { validator: fieldNameVerify, trigger: 'blur' },
                    ]"
                  >
                    <a-input v-model:value="element.fieldName" />
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item
                    :label="l('Unified.texts.FieldPlaceholder')"
                    :name="['data', index, 'fieldPlaceholder']"
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                    }"
                  >
                    <a-input v-model:value="element.fieldPlaceholder" />
                  </a-form-item>
                </a-col>
                <a-col :span="7">
                  <a-form-item
                    :label="l('Unified.texts.FieldType')"
                    :name="['data', index, 'fieldType']"
                    :rules="{
                      required: true,
                      message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
                    }"
                  >
                    <f-enum-select
                      allow-clear
                      show-search
                      optionFilterProp="displayName"
                      type="PacsCardHolderCustomFieldTypeEnum"
                      label-field="displayName"
                      value-field="value"
                      v-model:value="element.fieldType"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="1">
                  <CloseOutlined style="margin-top: 38px" @click="removeFieldsItem(index)" />
                </a-col>
              </a-row>
            </li>
          </template>
        </draggable>

        <!-- <a-row :gutter="24" :key="index" v-for="(field, index) in form.data">
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.FieldName')"
              :name="['data', index, 'fieldName']"
              :rules="{
                required: true,
                message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
              }"
            >
              <a-input v-model:value="field.fieldName" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              :label="l('Unified.texts.FieldPlaceholder')"
              :name="['data', index, 'fieldPlaceholder']"
              :rules="{
                required: true,
                message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
              }"
            >
              <a-input v-model:value="field.fieldPlaceholder" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item
              :label="l('Unified.texts.FieldType')"
              :name="['data', index, 'fieldType']"
              :rules="{
                required: true,
                message: l('Unified.texts.CustomFieldsTypeNamePrompt'),
              }"
            >
              <f-enum-select
                allow-clear
                type="PacsCardHolderCustomFieldTypeEnum"
                label-field="displayName"
                value-field="value"
                v-model:value="field.fieldType"
              />
            </a-form-item>
          </a-col>
          <a-col :span="1">
            <CloseOutlined style="margin-top: 38px" @click="removeFieldsItem(index)" />
          </a-col>
        </a-row> -->
        <a-form-item class="mb-0">
          <a-button type="dashed" block @click="addCustomFields">
            <PlusOutlined />
            {{ l('Unified.texts.AddAnotherCustomField') }}
          </a-button>
        </a-form-item>
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
  import CreateoOrEditPacsCardHolderConfigCustom from './create-or-edit-card-holder-config-custom';

  export default defineComponent({
    name: 'CreateoOrEditPacsCardHolderConfigCustom',
    mixins: [CreateoOrEditPacsCardHolderConfigCustom],
  });
</script>

<style lang="less" scoped></style>
