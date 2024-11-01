<template>
  <a-date-picker
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
  import DatePicker from './date-picker';

  export default defineComponent({
    name: 'FDatePicker',
    mixins: [DatePicker],
  });
</script>

<style lang="less" scoped>
  @import './date-picker.less';
</style>
