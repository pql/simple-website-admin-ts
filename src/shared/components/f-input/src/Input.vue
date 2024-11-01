<template>
  <a-input v-bind="getAttrs" :value="cvalue" @change="handleChange">
    <template v-for="(_, name) in $slots" #[name]="data">
      <slot v-if="name === 'default'" v-bind="data"></slot>
      <slot v-else :name="name" v-bind="data"></slot>
    </template>
  </a-input>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Input from './input';

  export default defineComponent({
    name: 'FInput',
    mixins: [Input],
  });
</script>

<style lang="less" scoped>
  @import './input.less';
</style>
