<template>
  <f-enum-select
    allow-clear
    style="width: 200px"
    :placeholder="l('Unified.texts.Placeholder')"
    type="TestEnum"
    label-field="displayName"
    value-field="value"
    v-model:value="selectValue"
    @change="handleSelectChange"
  />
</template>

<script lang="ts" setup>
  /**
   * FEnumSelect 是基于 AntDesignVue Select 扩展而来
   * 因为基于AntDesignVue的 Select 组件，所以AntDesignVue Select组件的所有属性和方法都支持，使用方法参照AntDesignVue Select组件的用法
   * https://www.antdv.com/components/select#api
   */
  import { ref } from 'vue';
  import { FEnumSelect } from './index';
  import { l } from '@/shared/i18n';

  const selectValue = ref('Orange');

  const handleSelectChange = (value, option) => {
    console.log('value', value);
    console.log('option', option);
    console.log('selectValue.value', selectValue.value);
  };
</script>
