<template>
  <a-range-picker
    v-bind="getAttrs"
    v-model:value="cvalue"
    :format="getDateFormat"
    :show-time="getShowTime"
    :value-format="getDateValueFormat"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import RangePicker from './range-picker';

  export default defineComponent({
    name: 'FRangePicker',
    mixins: [RangePicker],
  });
</script>

<style lang="less" scoped>
  @import './range-picker.less';
</style>
