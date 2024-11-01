<template>
  <div class="relative">
    <div v-show="!isUnfold" class="unfold-btn" @click="unfoldClick(true)">
      <Icon icon="icon-f-bt22" class="f-unfold" style="color: #ff6e00" />
    </div>

    <transition name="slide">
      <div class="device-tabs-wrapper relative p-4 content cursor-pointer" v-show="isUnfold">
        <div class="text-xl font-semibold flex items-center">
          <span @click="unfoldClick(false)" class="flex align-center">
            <i class="iconfont icon-f-bt22 mr-1" style="color: #ff6e00"></i>
            {{ l('Unified.texts.Device') }}
          </span>
        </div>
        <a-divider class="my-1" style="height: 2px" />
        <a-tabs
          v-if="isUnfold"
          v-model:activeKey="activeKey"
          :tabBarStyle="{
            paddingLeft: '16px',
            paddingRight: '16px',
            marginTop: '12px',
          }"
          @change="tabsChange"
        >
          <a-tab-pane key="Information">
            <template #tab>
              <span>
                {{ l('Unified.texts.OpsPanel:Information') }}
              </span>
            </template>
            <div class="flex mb-4 mt-1">
              <div class="grow flex items-center">
                <a-avatar
                  :size="52"
                  style="
                    border: 1px solid rgb(255 110 0 / 23%);
                    background-color: rgb(255 110 0 / 10%);
                    color: #ff6e00;
                  "
                >
                  <template #icon>
                    <i class="iconfont icon-a-f-DeviceName1" style="font-size: 26px"></i>
                  </template>
                </a-avatar>
                <div class="pl-3 flex flex-col">
                  <div class="text-sm font-normal">{{ l('Unified.texts.Table:DeviceName') }}</div>
                  <div class="text-sm font-bold">{{ deviceDetail.deviceName || '- -' }}</div>
                </div>
              </div>
              <div class="flex items-center justify-center px-4">
                <a-divider type="vertical" style="height: 33px" />
              </div>
              <div class="grow flex items-center">
                <a-avatar
                  :size="52"
                  style="
                    border: 1px solid rgb(255 110 0 / 23%);
                    background-color: rgb(255 110 0 / 10%);
                    color: #ff6e00;
                  "
                >
                  <template #icon>
                    <i class="iconfont icon-f-Status" style="font-size: 26px"></i>
                  </template>
                </a-avatar>
                <div class="pl-3 flex flex-col">
                  <div class="text-sm font-normal">{{ l('Unified.texts.Status') }}</div>
                  <div class="text-sm font-bold">{{ deviceDetail.deviceStatusName || '- -' }}</div>
                </div>
              </div>
            </div>
            <ul class="information-ul">
              <li class="pl-3 mb-1 flex items-center leading-8">
                <a-badge status="default" class="mr-3" />
                <span class="inline-block basis-24">{{ l('Unified.texts.Table:DeviceType') }}</span>
                <span class="inline-block grow">{{ deviceDetail.deviceTypeName || '- -' }}</span>
              </li>
              <li class="pl-3 mb-1 flex items-center leading-8">
                <a-badge status="default" class="mr-3" />
                <span class="inline-block basis-24">{{
                  l('Unified.texts.OpsPanel:IPAddress')
                }}</span>
                <span class="inline-block grow">{{
                  deviceDetail.deviceHostNameOrIp || '- -'
                }}</span>
              </li>
              <li class="pl-3 mb-1 flex items-center leading-8">
                <a-badge status="default" class="mr-3" />
                <span class="inline-block basis-24">{{
                  l('Unified.texts.DisplayName:Abp:Timing:Timezone')
                }}</span>
                <span class="inline-block grow">{{ deviceDetail.Timezone || '- -' }}</span>
              </li>
              <li class="pl-3 flex items-center leading-8">
                <a-badge status="default" class="mr-3" />
                <span class="inline-block basis-24">{{ l('Unified.texts.OpsPanel:Network') }}</span>
                <span class="inline-block grow">{{ deviceDetail.network || '- -' }}</span>
              </li>
            </ul>
          </a-tab-pane>
          <a-tab-pane key="Transaction">
            <template #tab>
              <span>
                {{ l('Unified.texts.OpsPanel:Transaction') }}
              </span>
            </template>
            <a-table
              class="device-table"
              :scroll="{ x: '100%', y: '178px' }"
              :bordered="false"
              :dataSource="transactData"
              :columns="transactColumns"
              :pagination="false"
            >
              <template #headerCell="{ column }">
                <template v-if="column.title === 'Name'">
                  <span :title="l('Unified.texts.CardHolderName')">{{ column.title }}</span>
                </template>
                <template v-else>
                  <span :title="column.title">{{ column.title }}</span>
                </template>
              </template>
              <template #bodyCell="props">
                <template v-if="props.column.key === 'submissionDateTime'">
                  <template
                    v-if="
                      props.record[props.column.dataIndex] &&
                      props.record[props.column.dataIndex].includes('T')
                    "
                  >
                    {{ formateDatetime(props.record[props.column.dataIndex]) }}
                    <!-- 格式化日期 -->
                  </template>
                  <template v-else>
                    {{ props.record[props.column.dataIndex] }}
                  </template>
                </template>

                <template v-if="props.column.key === 'action'">
                  <a-button type="link" size="mini" @click="transactionDetails(props.record)">
                    {{ l('Unified.texts.Details') }}
                  </a-button>
                </template>

                <!-- 自定义 'deviceFunction' 列的显示 -->
                <!-- <template v-if="props.column.key === 'deviceFunction'">
              <span :class="props.record.isSuccessful ? 'successful_true' : 'successful_false'">
                {{ props.record.deviceFunction }}
              </span>
            </template> -->
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="Alert">
            <template #tab>
              <span>
                {{ l('Unified.texts.OpsPanel:Alert') }}
              </span>
            </template>
            <a-table
              class="device-table"
              :scroll="{ x: '100%', y: '178px' }"
              :bordered="false"
              :dataSource="alertData"
              :columns="alertColumns"
              :pagination="false"
            >
              <template #headerCell="{ column }">
                <span :title="column.title">{{ column.title }}</span>
              </template>
              <template #bodyCell="props">
                <!-- 处理时间字段 -->
                <template v-if="props.column.key === 'submissionDateTime'">
                  <template
                    v-if="
                      props.record[props.column.dataIndex] &&
                      props.record[props.column.dataIndex].includes('T')
                    "
                  >
                    {{ formateDatetime(props.record[props.column.dataIndex]) }}
                    <!-- 格式化日期 -->
                  </template>
                  <template v-else>
                    {{ props.record[props.column.dataIndex] }}
                  </template>
                </template>

                <template v-if="props.column.key === 'action'">
                  <a-button type="link" size="mini" @click="alertDetails(props.record)">
                    {{ l('Unified.texts.Details') }}
                  </a-button>
                </template>
                <!-- 自定义 'isAlertConfirm' 列的显示 -->
                <!-- <template v-if="props.column.key === 'isAlertConfirm'">
              <span :class="props.record.isAlertConfirm ? 'successful_true' : 'successful_false'">
                {{ props.record.isAlertConfirm ? 'yes' : 'no' }}
              </span>
            </template> -->
              </template>
            </a-table>
          </a-tab-pane>
          <a-tab-pane key="Function">
            <template #tab>
              <span>
                {{ l('Unified.texts.OpsPanel:Function') }}
              </span>
            </template>
            <div>
              <div class="flex flex-wrap justify-between">
                <template v-for="(item, index) in funList" :key="index">
                  <a-button
                    type="primary"
                    class="w-44 mb-3 btBg"
                    @click="funcItemClick(item)"
                    :loading="item.disabled"
                    :disabled="item.disabled"
                  >
                    {{ item.deviceFunction }}
                  </a-button>
                </template>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './device-tabs';

  export default defineComponent({
    name: 'DeviceTabs',
    mixins: [ComponentMixin],
  });
</script>
<style scoped lang="less">
  @import './device-tabs.less';
</style>
