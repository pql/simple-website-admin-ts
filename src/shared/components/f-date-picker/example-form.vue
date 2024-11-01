<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.datePickerLabel')" name="datePickerFieldValue">
      <!-- startOfDay: 是否格式化为一天的开始时间，true 表示会将日期的格式变为'2024-08-31T16:00:00.000Z' -->
      <!-- endOfDay: 是否格式化为一天的结束时间，true 表示会将日期的格式变为'2024-09-02T15:59:59.999Z' -->
      <!-- [startOfDay, endOfDay]属性都不加则不格式化 -->
      <f-date-picker
        v-model:value="form.datePickerFieldValue"
        show-time
        allow-clear
        @change="handleDatePickerChange"
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
  import AppComponentBase from '@/shared/component-base/app-component-base';
  import { l } from '@/shared/i18n';
  import { defineComponent } from 'vue';

  export default defineComponent({
    mixins: [AppComponentBase],
    data() {
      return {
        form: {
          datePickerFieldValue: '2024-09-20T01:12:18.3801392Z',
        },
        rules: {
          datePickerFieldValue: [{ required: true, message: '请选择' }],
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 range-number 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-date-picker @change="handleDatePickerChange" />
       */
      handleDatePickerChange(value) {
        const v = this.form.datePickerFieldValue;
        console.log('value', value);
        console.log('this.form.datePickerFieldValue', this.form.datePickerFieldValue);
        console.log('格式化成零时区 UTC 时间', this.dateUtil.fromLocalDateToUTCDateFormat(v));
        // ${YYYY}[-/]${MM}[-/]${DD} HH:mm:ss
        // ${YYYY}[-/]${DD}[-/]${MM} HH:mm:ss
        // ${MM}[-/]${YYYY}[-/]${DD} HH:mm:ss
        // ${MM}[-/]${DD}[-/]${YYYY} HH:mm:ss
        // ${DD}[-/]${YYYY}[-/]${MM} HH:mm:ss
        // ${DD}[-/]${MM}[-/]${YYYY} HH:mm:ss
        console.log(
          '从零时区UTC时间格式化成当前时区DateTime',
          this.dateUtil.fromUTCDateToLocalDateTime(v),
        );

        // ${YYYY}[-/]${MM}[-/]${DD} hh:mm:ss a
        // ${YYYY}[-/]${DD}[-/]${MM} hh:mm:ss a
        // ${MM}[-/]${YYYY}[-/]${DD} hh:mm:ss a
        // ${MM}[-/]${DD}[-/]${YYYY} hh:mm:ss a
        // ${DD}[-/]${YYYY}[-/]${MM} hh:mm:ss a
        // ${DD}[-/]${MM}[-/]${YYYY} hh:mm:ss a
        console.log(
          '从零时区UTC时间格式化成当前时区DateTime带12小时制',
          this.dateUtil.fromUTCDateToLocalDateTimeWithA(v),
        );

        // ${YYYY}[-/]${MM}[-/]${DD}
        // ${YYYY}[-/]${DD}[-/]${MM}
        // ${MM}[-/]${YYYY}[-/]${DD}
        // ${MM}[-/]${DD}[-/]${YYYY}
        // ${DD}[-/]${YYYY}[-/]${MM}
        // ${DD}[-/]${MM}[-/]${YYYY}
        console.log(
          '从零时区UTC时间格式化成当前时区Date',
          this.dateUtil.fromUTCDateToLocalDate(v),
        );

        console.log(
          '从零时区UTC时间格式化成当前时区Date(YYYY-MM-DD)',
          this.dateUtil.fromUTCDateToLocalDateHorizontalSymbol(v),
        );

        console.log(
          '从零时区UTC时间格式化成当前时区DateTime(YYYY-MM-DD HH:mm:ss)',
          this.dateUtil.fromUTCDateToLocalDateTimeHorizontalSymbol(v),
        );
      },
      async handleSubmit() {
        const formRef: any = this.$refs.formRef;
        const values = await formRef.validate();
        console.log('values', values);
      },
    },
  });
</script>
