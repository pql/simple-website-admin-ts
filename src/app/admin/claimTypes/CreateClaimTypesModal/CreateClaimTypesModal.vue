<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ !!!id ? l('AbpIdentity.texts.NewClaimType') : l('AbpIdentity.texts.Permission:Edit') }}
      </div>
    </div>

    <div class="modal-body">
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
        <a-row>
          <a-col :span="24">
            <!-- 名称 * -->
            <a-form-item :label="l('AbpIdentity.texts.Name')" name="name" required>
              <a-input name="name" v-model:value="form.name" :autocomplete="'off'" />
            </a-form-item>
            <!-- 校验开关 -->
            <a-form-item name="required">
              <a-checkbox v-model:checked="form.required">{{
                l('AbpIdentity.texts.Required')
              }}</a-checkbox>
            </a-form-item>
            <!-- Regex * -->
            <a-form-item label="Regex" name="regex">
              <a-input name="regex" v-model:value="form.regex" :autocomplete="'off'" />
            </a-form-item>
            <!-- Regex 描述 -->
            <a-form-item
              :label="l('AbpIdentity.texts.RegexDescription')"
              name="regexDescription"
              validate-status="validating"
              :help="l('AbpIdentity.texts.RegexDescriptionFormText')"
            >
              <a-input
                name="regexDescription"
                v-model:value="form.regexDescription"
                :autocomplete="'off'"
              />
            </a-form-item>
            <!-- 说明 -->
            <a-form-item :label="l('AbpIdentity.texts.Description')" name="description">
              <a-input name="description" v-model:value="form.description" :autocomplete="'off'" />
            </a-form-item>

            <!-- 值类型 -->
            <a-form-item :label="l('AbpIdentity.texts.ValueType')" name="valueType">
              <f-enum-select
                show-search
                optionFilterProp="displayName"
                allow-clear
                :type="'FieldTypeEnum'"
                label-field="displayName"
                value-field="key"
                v-model:value="form.valueType"
              />
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
  import CreateScopesModalMixin from './CreateClaimTypesModal';

  export default defineComponent({
    name: 'Scopes',
    mixins: [CreateScopesModalMixin],
  });
</script>

<style scoped lang="less"></style>
