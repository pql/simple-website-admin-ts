<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.selectLabel')" name="selectFieldValue">
      <f-enum-select
        allow-clear
        style="width: 200px"
        :placeholder="l('Unified.texts.Placeholder')"
        type="MessageLevel"
        :data-source="dataSource"
        label-field="displayName"
        value-field="value"
        v-model:value="form.selectFieldValue"
        @change="handleEnumSelectChange"
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
          selectFieldValue: undefined,
        },
        rules: {
          selectFieldValue: [{ required: true, message: '请选择', trigger: 'change' }],
        },
        dataSource: {
          service: 'EnumService.getApiEnumGetEnumMaps',
          params: {},
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 enum-select 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-enum-select @change="handleEnumSelectChange" />
       */
      handleEnumSelectChange(value, option) {
        console.log('value', value);
        console.log('option', option);
        console.log('form.selectFieldValue', this.form.selectFieldValue);
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
