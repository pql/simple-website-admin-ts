<template>
  <a-button
    v-bind="buttonAttributes"
    :style="buttonStyle"
    :class="['flex-center', formatClass(config?.className)]"
  >
    <template #icon>
      <span
        v-if="isIconFont"
        :class="['iconfont f-Icon', config?.icon]"
        :style="{ 'margin-right': config?.title ? '8px' : 0, 'font-size': '16px' }"
        aria-hidden="true"
      ></span>
      <svg
        v-else-if="!!config?.icon"
        class="icon"
        aria-hidden="true"
        :style="{ 'margin-right': config?.title ? '8px' : 0 }"
      >
        <use :xlink:href="`#${config?.icon}`" />
      </svg>
    </template>
    <span>{{ l(config?.title ?? '') }}</span>
  </a-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageToolbarButton from './page-toolbar-button';

  export default defineComponent({
    name: 'PageToolbarButton',
    mixins: [PageToolbarButton],
  });
</script>

<style lang="less" scoped>
  @import './page-toolbar-button.less';
</style>
