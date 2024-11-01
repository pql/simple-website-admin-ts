<template>
  <FInput
    sanitize
    allow-clear
    v-model:value="inputValue"
    placeholder="Basic usage"
    @change="handleChange"
  >
    <template #prefix>
      <user-outlined />
    </template>
    <template #suffix>
      <user-outlined />
    </template>
  </FInput>
</template>

<script lang="ts" setup>
  /**
   * FInput 是基于 AntDesignVue 的Input组件扩展了 sanitize属性而来的新组件，该组件用于防控XSS输入攻击，当开启了sanitize属性时，会对绑定的值监听过滤，过滤掉xss攻击字符，从而确保输入内容的安全性
   * 因为基于AntDesignVue的Input组件，所以AntDesignVue Input组件的所有属性和方法及插槽都支持，使用方法参照AntDesignVue Input组件的用法
   */
  import { ref } from 'vue';
  import { FInput } from './index';

  const inputValue = ref<string>('console.log(123)');

  const handleChange = (value) => {
    console.log('value', value);
    console.log('inputValue', inputValue.value);
  };
</script>
