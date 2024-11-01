<template>
  <a-form ref="formRef" layout="inline" :model="form" :rules="rules" @submit="handleSubmit">
    <a-form-item
      :label="l('Unified.texts.rangeNumberLabel')"
      :auto-link="false"
      name="rangeNumberFieldValue"
    >
      <!-- 使用 f-range-number 时注意关闭 a-form-item 的 auto-link -->
      <f-range-number
        width="300px"
        :min="0"
        :max="100"
        :precision="2"
        :placeholder="['Unified.texts.Start', 'Unified.texts.End']"
        v-model:value="form.rangeNumberFieldValue"
        @change="handleRangeNumberChange"
      >
        <template #prefix>
          <span class="mr-2">prefix</span>
        </template>
        <template #suffix>
          <span class="ml-2">suffix</span>
        </template>
      </f-range-number>
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
  import { isNumber } from 'lodash-es';
  import { ref } from 'vue';

  const form = ref({
    rangeNumberFieldValue: null,
  });

  const formRef = ref('formRef');

  const rules = {
    rangeNumberFieldValue: [
      {
        required: true,
        type: 'array',
        validator: (rule, value) => {
          if (rule.required) {
            // 强校验
            if (value) {
              // 有值条件
              if (!isNumber(value[0])) {
                return Promise.reject(new Error('请输入最小值'));
              } else if (!isNumber(value[1])) {
                return Promise.reject(new Error('请输入最大值'));
              }
              return Promise.resolve();
            }
            // 无值错误提示
            return Promise.reject(new Error('请输入'));
          } else {
            return Promise.resolve();
          }
        },
        trigger: 'blur',
      },
    ],
  };

  /**
   * 监听 range-number 组件 change 事件，有需要时可以使用(例如表单联动条件判断)
   * <f-range-number @change="handleRangeNumberChange" />
   */
  const handleRangeNumberChange = (value) => {
    console.log('value', value);
    console.log('form.value.rangeNumberFieldValue', form.value.rangeNumberFieldValue);
  };

  const handleSubmit = () => {
    (formRef.value as any).validate().then((res) => {
      console.log('form：', res);
    });
  };
</script>
