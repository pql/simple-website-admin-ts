<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.radioLabel')" name="radioFieldValue">
      <f-enum-radio
        name="radioFieldValue"
        type="TestEnum"
        label-field="displayName"
        value-field="value"
        v-model:value="form.radioFieldValue"
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
    radioFieldValue: undefined,
  });

  const formRef = ref('formRef');

  const rules = {
    radioFieldValue: [{ required: true, message: '请选择', trigger: 'change' }],
  };

  /**
   * 监听 enum-radio 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
   * <f-enum-radio @change="handleEnumRadioChange" />
   */
  const handleEnumRadioChange = (target) => {
    console.log('target radio', target);
    console.log('form.value.selectFieldValue', form.value.radioFieldValue);
  };

  const handleSubmit = () => {
    (formRef.value as any).validate().then((res) => {
      console.log('form：', res);
    });
  };
</script>
