<template>
  <a-select
    ref="select"
    v-bind="getAttrs"
    v-model:value="innerValue"
    :mode="dataSource?.multiple ? 'multiple' : '-'"
    :field-names="{
      label: dataSource?.labelField ?? 'label',
      value: dataSource?.valueField ?? 'value',
    }"
    :options="selectList"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Select from './select';

  export default defineComponent({
    name: 'FSelect',
    mixins: [Select],
  });
</script>

<style lang="less" scoped>
  @import './select.less';
</style>
