<template>
  <div class="message-panel-wrapper" :key="scollKey">
    <a-spin :spinning="loading">
      <a-divider class="my-1" style="height: 2px" />
      <div class="h-screen" style="overflow: hidden">
        <vue3SeamlessScroll
          ref="seamlessScroll"
          v-model="seamlessScroll"
          :list="dataList"
          :hover="true"
          :wheel="true"
          :class-option="classOption"
          @mousewheel="handleScroll"
        >
          <template :key="message.id" v-for="message in dataList">
            <a-card
              hoverable
              :bordered="false"
              :bodyStyle="{ padding: '12px' }"
              class="message-card"
            >
              <div class="flex items-center">
                <div
                  :style="{ 'background-color': message.messageBackgroundColorCode }"
                  class="statusIcon mr-2"
                >
                  <a-image
                    :preview="false"
                    :src="message.statusIconFontBase64String"
                    style="width: 24px; height: 24px; border-radius: 4px"
                  />
                </div>
                <div>
                  {{ dateUtil.fromUse12HoursToLocalDateTime(message.submissionDateTime) }}
                </div>
              </div>
              <div class="info px-[10px] py-[12px] rounded mt-[6px]">
                <div>
                  <a-badge status="default" class="mr-3" />
                  <span>{{ message.deviceTypeName }}</span>
                </div>
                <div>
                  <a-badge status="default" class="mr-3" />
                  <span>{{ message.deviceName }}</span>
                </div>
                <div>
                  <a-badge status="default" class="mr-3" />
                  <span>{{ message.siteName }}</span>
                </div>
                <div>
                  <a-badge status="default" class="mr-3" />
                  <span>{{ message.buildingName }}</span>
                </div>
                <div>
                  <a-badge status="default" class="mr-3" />
                  <span>{{ message.floor }}</span>
                </div>
                <div v-if="message.faceBase64String">
                  <a-badge status="default" class="mr-3" />
                  <a-avatar :src="message.faceBase64String" />
                </div>
              </div>
              <div class="flex flex-row-reverse">
                <a-tooltip>
                  <template #title>{{ l('Unified.texts.ShowDevice') }}</template>
                  <Icon
                    icon="icon-f-eye"
                    color="#ACAFB5"
                    class="ml-3 eyeIcon"
                    @click="alertLookOver(message.deviceId)"
                  />
                </a-tooltip>

                <a-tooltip>
                  <template #title>{{ l('Unified.texts.DetailView') }}</template>
                  <Icon
                    icon="icon-f-stickies"
                    color="#ACAFB5"
                    class="ml-3 stickiesIcon"
                    @click="lookDeviceDateil(message.id)"
                  />
                </a-tooltip>

                <a-tooltip>
                  <template #title>{{ l('Unified.texts.Acknowledged') }}</template>
                  <Icon
                    icon="icon-f-clipboard-check"
                    color="#ACAFB5"
                    class="ml-3 clipboardIcon"
                    @click="alertConfirm(message.id)"
                  />
                </a-tooltip>

                <a-tooltip>
                  <template #title>{{ l('Unified.texts.Remove') }}</template>
                  <Icon
                    icon="icon-f-delete"
                    color="#ACAFB5"
                    class="ml-3 deleteIcon"
                    @click="alertDelete(message.id)"
                  />
                </a-tooltip>
              </div>
            </a-card>
            <a-divider class="my-1" style="height: 2px" />
          </template>
        </vue3SeamlessScroll>
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MessagePanel from './message-panel';

  export default defineComponent({
    name: 'CommandControlMessagePanel',
    mixins: [MessagePanel],
  });
</script>

<style lang="less" scoped>
  @import './message-panel.less';
</style>
