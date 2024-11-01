<template>
  <div class="relative">
    <div v-show="!isUnfold" class="unfold-btn" @click="unfoldClick(true)">
      <Icon icon="icon-f-bt22" class="f-unfold unfold-icon" style="color: #ff6e00" />
    </div>
    <transition name="slide">
      <div class="alert relative p-4 content" v-show="isUnfold">
        <div class="text-xl font-semibold flex items-center cursor-pointer">
          <span class="flex align-center" @click="unfoldClick(false)">
            <i class="iconfont icon-f-bt22 mr-1" style="color: #ff6e00"></i>
            {{ l('Unified.texts.OpsPanel:Alert') }}
          </span>
        </div>
        <a-divider class="my-1" style="height: 2px" />
        <div
          :class="[
            'overflow-y-auto overflow-x-hidden alert-list',
            { 'full-alert-list': isFullscreen },
          ]"
        >
          <a-row :gutter="8">
            <template v-for="(item, index) in alertData" :key="index">
              <a-col :span="12">
                <a-card
                  :bordered="false"
                  :body-style="{ padding: 0 }"
                  class="mb-5"
                  style="background-color: transparent"
                >
                  <div class="w-full h-full flex relative cursor-pointer">
                    <img src="../../../../../public/images/test.jpg" class="w-full" />
                    <Icon
                      class="absolute top-2/4 left-2/4"
                      style="transform: translate(-50%, -50%); color: #ffffff73; font-size: 36px"
                      icon="ant-design:play-circle-outlined"
                    />
                  </div>
                  <div class="p-1">
                    <div class="mt-1">
                      <span class="text-sm font-medium leading-6">{{ item.deviceFunction }}</span>
                    </div>
                    <div class="mb-2">
                      <span class="text-xs leading-5">{{
                        dateUtil.fromUse12HoursToLocalDateTime(item.submissionDateTime)
                      }}</span>
                    </div>
                    <div>
                      <a-tag
                        class="cursor-pointer tags"
                        color="#FF6E00"
                        :bordered="false"
                        @click="alertDetails(item)"
                        >{{ item.deviceName }}</a-tag
                      >
                    </div>
                  </div>
                </a-card>
              </a-col>
            </template>
          </a-row>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import AlertList from './alert-list';

  export default defineComponent({
    name: 'AlertList',
    mixins: [AlertList],
  });
</script>
<style scoped lang="less">
  @import './alert-list.less';
</style>
