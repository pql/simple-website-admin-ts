<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.textareaLabel')" name="inputFieldValue">
      <!-- sanitize: preventing XSS attacks -->
      <f-input
        :sanitize="true"
        allow-clear
        v-model:value="form.inputFieldValue"
        :placeholder="l('Unified.texts.Input')"
        @change="handleInputChange"
      >
        <template #prefix>
          <user-outlined />
        </template>
        <template #suffix>
          <user-outlined />
        </template>
      </f-input>
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
          inputFieldValue:
            '‘;alert(String.fromCharCode(88,83,83))//’;alert(String.fromCharCode(88,83,83))//”;alert(String.fromCharCode(88,83,83))//”;alert(String.fromCharCode(88,83,83))//–></>”>’><>alert(String.fromCharCode(88,83,83))</>',
        },
        rules: {
          inputFieldValue: [{ required: true, message: '请输入', trigger: 'blur' }],
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 input 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-input @change="handleInputChange" />
       */
      handleInputChange(value) {
        console.log('value', value);
        console.log('form.value.inputFieldValue', this.form.inputFieldValue);
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
