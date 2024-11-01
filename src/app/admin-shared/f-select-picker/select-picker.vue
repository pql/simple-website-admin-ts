<template>
  <a-select
    ref="select"
    :name="name"
    v-model:value="innerValue"
    :placeholder="l(placeholder ?? 'Select item')"
    :allow-clear="allowClear"
    :mode="dataSource?.multiple ? 'multiple' : '-'"
    :field-names="{
      label: dataSource?.labelField ?? 'label',
      value: dataSource?.valueField ?? 'value',
    }"
    :options="selectList"
    class="w-full"
    @change="handleChange"
  >
  </a-select>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SelectPicker from './select-picker';

  export default defineComponent({
    name: 'FSelectPicker',
    mixins: [SelectPicker],
  });
</script>

<style lang="less" scoped>
  @import './select-picker.less';
</style>
