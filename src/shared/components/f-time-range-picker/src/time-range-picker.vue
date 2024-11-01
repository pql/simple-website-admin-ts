<template>
  <a-time-range-picker
    v-bind="getAttrs"
    v-model:value="cvalue"
    :value-format="valueFormat"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TimeRangePicker from './time-range-picker';

  export default defineComponent({
    name: 'FTimeRangePicker',
    mixins: [TimeRangePicker],
  });
</script>

<style lang="less" scoped>
  @import './time-range-picker.less';
</style>
