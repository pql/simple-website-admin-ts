<template>
  <f-textarea allow-clear v-model:value="inputValue" placeholder="Basic usage" />
</template>

<script lang="ts" setup>
  /**
   * f-textarea 是基于 AntDesignVue 的Textarea组件扩展了 sanitize属性而来的新组件，该组件用于防控XSS输入攻击，当开启了sanitize属性时，会对绑定的值监听过滤，过滤掉xss攻击字符，从而确保输入内容的安全性
   * 因为基于AntDesignVue的Textarea组件，所以AntDesignVue Textarea组件的所有属性和方法及插槽都支持，使用方法参照AntDesignVue Textarea组件的用法
   */
  import { ref } from 'vue';
  import { FTextarea } from './index';

  const inputValue = ref<string>('console.log(123)');
</script>
