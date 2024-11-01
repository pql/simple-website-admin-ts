<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.rangePickerLabel')" name="rangePickerFieldValue">
      <!-- startOfDay: 是否格式化为一天的开始时间，true 表示会将日期的格式变为'2024-08-31T16:00:00.000Z' -->
      <!-- endOfDay: 是否格式化为一天的结束时间，true 表示会将日期的格式变为'2024-09-02T15:59:59.999Z' -->
      <!-- [startOfDay, endOfDay]属性都不加则不格式化 -->
      <f-range-picker
        startOfDay
        endOfDay
        v-model:value="form.rangePickerFieldValue"
        allow-clear
        @change="handleRangePickerChange"
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
          rangePickerFieldValue: null,
        },
        rules: {
          rangePickerFieldValue: [{ required: true, type: 'array', message: '请选择' }],
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 range-number 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-range-picker @change="handleRangePickerChange" />
       */
      handleRangePickerChange(value) {
        console.log('value', value);
        console.log('this.form.rangePickerFieldValue', this.form.rangePickerFieldValue);
      },
      async handleSubmit() {
        const formRef: any = this.$refs.formRef;
        const values = await formRef.validate();
        console.log('values', values.rangePickerFieldValue);
      },
    },
  });
</script>
