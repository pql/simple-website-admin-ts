<template>
  <div class="alert">
    <a-row class="mx-3.5 my-4 font-bold">
      <!-- <Icon style="margin-right: 5px;" icon="ant-design:comment-outlined" /> -->
      {{ l('Unified.texts.OpsPanel:Alert') }}
    </a-row>
    <a-divider class="my-0" />
    <div class="overflow-y-auto alert-list">
      <template v-for="(item, index) in alertData" :key="index">
        <a-card hoverable class="mx-4 my-5 alert-card">
          <a-row>
            <a-col :span="8" class="flex items-center">
              <div class="w-full h-full flex relative cursor-pointer" style="width: 120px; height: 70px">
                <img alt="example" class="rounded-md" src="../../../../../public/images/test.jpg" />
                <Icon style="color: #ccc; font-size: 30px; left: 48px" class="absolute inset-y-2/4 playVidio"
                  icon="ant-design:play-circle-outlined" />
              </div>
            </a-col>
            <a-col :span="16" class="flex flex-col justify-around">
              <div>
                <Icon style="margin-right: 5px; color: #888" icon="ant-design:profile-outlined" />
                <a-tag class="cursor-pointer tags" color="#FF6E00" :bordered="false" @click="alertDetails(item)">{{
                  item.deviceName }}</a-tag>
              </div>
              <div>
                <Icon style="margin-right: 5px; color: #888" icon="ant-design:container-outlined" />
                <span>{{ item.deviceFunction }}</span>
              </div>
              <div>
                <Icon style="margin-right: 5px; color: #888" icon="ant-design:insert-row-below-outlined" />
                <span>{{ dateUtil.fromUse12HoursToLocalDateTime(item.submissionDateTime) }}</span>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ComponentMixin from './alert-list';
export default defineComponent({
  name: 'alert-list',
  mixins: [ComponentMixin],
});
</script>
<style scoped lang="less">
@import './alert-list.less';
</style>
