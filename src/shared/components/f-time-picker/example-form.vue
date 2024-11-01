<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.timePickerLabel')" name="timePickerFieldValue">
      <f-time-picker
        v-model:value="form.timePickerFieldValue"
        :placeholder="l('Unified.texts.timePickerLabel')"
        @change="handleTimePickerChange"
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

<script lang="ts">
  import { l } from '@/shared/i18n';
  import { defineComponent } from 'vue';

  export default defineComponent({
    data() {
      return {
        form: {
          timePickerFieldValue: null,
        },
        rules: {
          timePickerFieldValue: [
            {
              required: true,
              message: '请选择',
              trigger: 'change',
            },
          ],
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 range-number 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-time-picker @change="handleTimePickerChange" />
       */
      handleTimePickerChange(value) {
        console.log('value', value);
        console.log('form.value.timePickerFieldValue', this.form.timePickerFieldValue);
      },
      async handleSubmit() {
        try {
          const formRef: any = this.$refs.formRef;
          const values = await formRef.validate();
          console.log('form：', values);
        } catch (error) {
          console.log('form validate failed: ', error);
        }
      },
    },
  });
</script>
