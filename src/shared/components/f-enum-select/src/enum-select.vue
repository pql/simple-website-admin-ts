<template>
  <a-select
    v-bind="getAttrs"
    v-model:value="cvalue"
    :mode="dataSource?.multiple ? 'multiple' : '-'"
    :field-names="{
      label: labelField ?? 'label',
      value: valueField ?? 'value',
    }"
    :options="selectOptions"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import EnumSelect from './enum-select';

  export default defineComponent({
    name: 'FEnumSelect',
    mixins: [EnumSelect],
  });
</script>

<style lang="less" scoped>
  @import './enum-select.less';
</style>
