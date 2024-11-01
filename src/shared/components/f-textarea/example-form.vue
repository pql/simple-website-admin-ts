<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item :label="l('Unified.texts.textareaLabel')" name="textareaFieldValue">
      <!-- sanitize: preventing XSS attacks -->
      <f-textarea
        :sanitize="true"
        allow-clear
        v-model:value="form.textareaFieldValue"
        :placeholder="l('Unified.texts.Textarea')"
        @change="handleTextareaChange"
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
          textareaFieldValue:
            '‘;alert(String.fromCharCode(88,83,83))//’;alert(String.fromCharCode(88,83,83))//”;alert(String.fromCharCode(88,83,83))//”;alert(String.fromCharCode(88,83,83))//–></>”>’><>alert(String.fromCharCode(88,83,83))</>',
        },
        rules: {
          textareaFieldValue: [{ required: true, message: '请输入', trigger: 'blur' }],
        },
      };
    },
    methods: {
      l,
      /**
       * 监听 textarea 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
       * <f-textarea @change="handleTextareaChange" />
       */
      handleTextareaChange(value) {
        console.log('value', value);
        console.log('form.value.textareaFieldValue', this.form.textareaFieldValue);
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
