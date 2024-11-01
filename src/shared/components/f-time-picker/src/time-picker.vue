<template>
  <a-time-picker
    v-bind="getAttrs"
    v-model:value="cvalue"
    :value-format="valueFormat"
    @change="handleChange"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import TimePicker from './time-picker';

  export default defineComponent({
    name: 'FTimePicker',
    mixins: [TimePicker],
  });
</script>

<style lang="less" scoped>
  @import './time-picker.less';
</style>
