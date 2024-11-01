<template>
  <f-enum-radio
    name="radio"
    type="TestEnum"
    label-field="displayName"
    value-field="value"
    v-model:value="radioValue"
    @change="handleRadioChange"
  />
</template>

<script lang="ts" setup>
  /**
   * FEnumRadio 是基于 AntDesignVue RadioGroup 扩展而来
   * 因为基于AntDesignVue的 RadioGroup 组件，所以AntDesignVue RadioGroup组件的所有属性和方法都支持，使用方法参照AntDesignVue RadioGroup组件的用法
   * https://www.antdv.com/components/radio#api
   */
  import { ref } from 'vue';
  import { FEnumRadio } from './index';

  const radioValue = ref('Orange');

  const handleRadioChange = (target) => {
    console.log('radioValue.value', radioValue.value);
    console.log('target radio', target);
  };
</script>
