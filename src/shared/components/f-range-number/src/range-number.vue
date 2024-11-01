<template>
  <div
    class="flex items-center range-number"
    :style="{ width: isString(width) ? width : `${width}px` }"
  >
    <slot name="prefix">
      {{ prefix }}
    </slot>
    <a-input-number
      v-bind="getAttrs"
      v-model:value="innerValue[0]"
      :placeholder="l(placeholder[0])"
      :min="min"
      :max="innerValue[1]"
      @blur="handleBlur($event)"
      @change="handleChange"
    />
    <span class="mx-1">{{ separator }}</span>
    <a-input-number
      v-bind="getAttrs"
      v-model:value="innerValue[1]"
      :placeholder="l(placeholder[1])"
      :min="innerValue[0]"
      :max="max"
      @blur="handleBlur($event)"
      @change="handleChange"
    />
    <slot name="suffix">
      {{ suffix }}
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import RangeNumber from './range-number';

  export default defineComponent({
    name: 'FRangeNumber',
    mixins: [RangeNumber],
  });
</script>

<style lang="less" scoped>
  @import './range-number.less';
</style>
