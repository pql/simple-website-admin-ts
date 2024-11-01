<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.selectLabel')" name="selectFieldValue">
      <f-enum-select
        allow-clear
        style="width: 200px"
        :placeholder="l('Unified.texts.Placeholder')"
        type="TestEnum"
        label-field="displayName"
        value-field="value"
        v-model:value="form.selectFieldValue"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="handleSubmit">
        <save-outlined />
        {{ l('Unified.texts.submit') }}
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { l } from '@/shared/i18n';
  import { ref } from 'vue';

  const form = ref({
    selectFieldValue: 'Orange',
  });

  const formRef = ref('formRef');

  const rules = {
    selectFieldValue: [{ required: true, message: '请选择', trigger: 'change' }],
  };

  /**
   * 监听 enum-select 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
   * <f-enum-select @change="handleEnumSelectChange" />
   */
  const handleEnumSelectChange = (value, option) => {
    console.log('value', value);
    console.log('option', option);
    console.log('form.value.selectFieldValue', form.value.selectFieldValue);
  };

  const handleSubmit = () => {
    (formRef.value as any).validate().then((res) => {
      console.log('form：', res);
    });
  };
</script>
