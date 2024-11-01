<template>
  <a-input-number v-bind="getAttrs" :value="innerValue" @change="handleChange">
    <template v-for="(_, name) in $slots" #[name]="data">
      <slot v-if="name === 'default'" v-bind="data"></slot>
      <slot v-else :name="name" v-bind="data"></slot>
    </template>
  </a-input-number>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import NumberMixin from './number';

  export default defineComponent({
    name: 'FNumber',
    mixins: [NumberMixin],
  });
</script>

<style lang="less" scoped>
  @import './number.less';
</style>
