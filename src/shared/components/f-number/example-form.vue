<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.numberLabel')" name="numberFieldValue">
      <f-number
        allow-clear
        v-model:value="form.numberFieldValue"
        :placeholder="l('Unified.texts.Number')"
        @change="handleNumberChange"
      >
        <template #prefix>
          <user-outlined />
        </template>
      </f-number>
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
          numberFieldValue: null,
        },
        rules: {
          numberFieldValue: [{ required: true, message: '请输入', trigger: 'blur' }],
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 input 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-number @change="handleNumberChange" />
       */
      handleNumberChange(value) {
        console.log('value', value);
        console.log('form.value.numberFieldValue', this.form.numberFieldValue);
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
