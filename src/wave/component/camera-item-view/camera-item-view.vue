<template>
  <div ref="fullscreenContainer" class="fullscreen-container" @dblclick="toggleZoom">
    <!-- 标题 -->
    <div class="camera-item-view-title">
      {{ connectionTitle }}
      {{ connectionMessage }}
    </div>

    <!-- 播放器 -->
    <div v-if="showVideo" class="camera-item-view-player">
      <!-- 实时 -->
      <!-- muted用于控制音量 -->
      <video
        v-if="isLive"
        ref="liveVideoRef"
        class="camera-item-view-player"
        muted="true"
        autoplay
        playsinline
        :title="playConfig?.deviceName"
      ></video>
      <!-- 回放 -->
      <video
        v-else
        ref="playbackVideoRef"
        class="video-js camera-item-view-player"
        muted="true"
        autoplay
        playsinline
        :title="playConfig?.deviceName"
      ></video>
    </div>
    <div v-else class="camera-item-view-player">
      <div style="color: #fff"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CompnentMixin from './camera-item-view';

  export default defineComponent({
    name: 'camera-item-view',
    mixins: [CompnentMixin],
  });
</script>

<style lang="less" scoped>
  @import './camera-item-view.less';
</style>
