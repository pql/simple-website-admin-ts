<template>
  <a-button v-bind="$attrs" :class="classes" @click="clickCallback">
    <template #icon>
      <slot name="icon"></slot>
      <span v-if="isIconFont" :class="['iconfont f-Icon', icon]" :style="{ 'margin-right': text ? '8px' : 0 }"
        aria-hidden="true"></span>
      <svg v-else class="icon" aria-hidden="true" :style="{ 'margin-right': text ? '8px' : 0 }">
        <use :xlink:href="`#${icon}`" />
      </svg>
    </template>
    <span> {{ text }}</span>
  </a-button>
</template>

<script lang="ts" setup>
import { btnProps } from './props';
import { computed } from 'vue';

const FONT_STARTS_WITH_FLAG = 'icon-f-';

defineOptions({
  name: 'FBtn',
  inheritAttrs: false,
});
const props = defineProps({
  ...btnProps,
});
const emit = defineEmits(['callback']);
const isIconFont = computed(() => props.icon?.startsWith(FONT_STARTS_WITH_FLAG));

const clickCallback = (e) => {
  emit('callback', props.eventName);
  // 阻止form提交
  e.preventDefault();
  e.stopPropagation();
  return false;
};
</script>

<style lang="less" scoped>
@import './btn.less';
</style>
