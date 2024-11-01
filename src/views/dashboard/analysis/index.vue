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
  import { l } from '@/shared/i18n';
  import { defineComponent } from 'vue';
  import { dateUtil, getOffset } from '@/utils/dateUtil';
  import AppComponentBase from '@/shared/component-base/app-component-base';

  export default defineComponent({
    mixins: [AppComponentBase],
    data() {
      return {
        form: {
          datePickerFieldValue: null,
        },
        rules: {
          datePickerFieldValue: [{ required: true, message: '请选择' }],
        },
      };
    },
    mounted() {
      // 生成当天的起始时间(00:00:00)和结束时间(23:59:59) 在用户时区
      const date = new Date();
      const localDate = dateUtil(date);
      const localStartOfDay = localDate.startOf('day');
      const localEndOfDay = localDate.endOf('day');
      const utcStartOfDay = localStartOfDay.utc().utcOffset(getOffset.value).toISOString();
      const utcEndOfDay = localEndOfDay.utc().utcOffset(getOffset.value).toISOString();
      console.log('localStartOfDay', localStartOfDay);
      console.log('localEndOfDay', localEndOfDay);
      console.log('utcStartOfDay', utcStartOfDay);
      console.log('utcEndOfDay', utcEndOfDay);
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
        console.log(
          '根据用户配置自定义显示规则，格式化日期',
          this.dateUtil.fromUse12HoursToLocalDateTime(v),
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
