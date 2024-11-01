<template>
  <div v-if="Array.isArray(buttonList)">
    <template v-for="(item, index) in buttonList" :key="index">
      <template v-if="showButton(item)">
        <a-tooltip>
          <template #title>{{ l(item.title) }}</template>
          <a-button type="text" @click="handleClick(item.eventName)">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon" />
            </svg>
          </a-button>
        </a-tooltip>
        <a-divider type="vertical" v-if="index !== buttonList.length - 1" />
      </template>
    </template>
  </div>
  <div v-else></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageConfig from './page-config';

  export default defineComponent({
    name: 'PageConfig',
    mixins: [PageConfig],
  });
</script>

<style lang="less" scoped>
  @import './page-config.less';
</style>
