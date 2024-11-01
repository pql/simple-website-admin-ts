<template>
  <a-textarea v-bind="getAttrs" :value="cvalue" @change="handleChange" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Textarea from './textarea';

  export default defineComponent({
    name: 'FTextarea',
    mixins: [Textarea],
  });
</script>

<style lang="less" scoped>
  @import './textarea.less';
</style>
