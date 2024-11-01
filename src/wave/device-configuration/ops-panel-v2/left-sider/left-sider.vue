<template>
  <div v-show="!isUnfold" class="unfold-btn" @click="unfoldClick()">
    <Icon icon="icon-f-bt22" class="f-unfold" style="color: #ff6e00" />
  </div>
  <div class="left-sider-wrapper" v-show="showWarp">
    <transition name="slide">
      <div v-show="isUnfold" class="mt-2">
        <div class="text-xl font-semibold flex justify-between items-center cursor-pointer">
          <span class="flex align-center" @click="unfoldClick()">
            <Icon
              icon="icon-f-bt22"
              class="mr-1"
              color="#ff6e00"
              style="transform: rotate(180deg)"
            />
            {{ isShow ? l('Unified.texts.OverView') : l('Unified.texts.MessagePanel') }}
          </span>
          <Icon class="mr-1 vectorIcon" icon="icon-f-Vector" @click="componentSwitch" />
        </div>

        <PanelTree v-if="isShow" ref="panelTreeRef" />
        <MessagePanel v-if="!isShow" ref="messagePanelRef" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import LeftSider from './left-sider';

  export default defineComponent({
    name: 'OpsPanelLeftSider',
    mixins: [LeftSider],
  });
</script>

<style lang="less" scoped>
  @import './left-sider.less';
</style>
