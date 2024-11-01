<template>
  <f-enum-checkbox
    name="checkboxgroup"
    type="TestEnum"
    label-field="displayName"
    value-field="value"
    v-model:value="checkboxValue"
    @change="handleCheckboxChange"
  />
</template>

<script lang="ts" setup>
  /**
   * FEnumRadio 是基于 AntDesignVue CheckboxGroup 扩展而来
   * 因为基于AntDesignVue的 CheckboxGroup 组件，所以AntDesignVue CheckboxGroup组件的所有属性和方法都支持，使用方法参照AntDesignVue CheckboxGroup组件的用法
   * https://www.antdv.com/components/checkbox#api
   */
  import { ref } from 'vue';
  import { FEnumCheckbox } from './index';

  const checkboxValue = ref(['Orange']);

  const handleCheckboxChange = (checkeds) => {
    console.log('checkboxValue.value', checkboxValue.value);
    console.log('checked checkboxs', checkeds);
  };
</script>
