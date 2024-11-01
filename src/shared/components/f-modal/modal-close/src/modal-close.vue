<template>
  <div :class="getClass">
    <template v-if="canFullscreen">
      <fullscreen-exit-outlined role="full" @click="handleFullScreen" v-if="fullScreen" />
      <fullscreen-outlined role="close" @click="handleFullScreen" v-else />
    </template>
    <close-outlined @click="handleCancel" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ModalClose from './modal-close';

  export default defineComponent({
    name: 'ModalClose',
    mixins: [ModalClose],
  });
</script>

<style lang="less">
  @import './modal-close.less';
</style>
