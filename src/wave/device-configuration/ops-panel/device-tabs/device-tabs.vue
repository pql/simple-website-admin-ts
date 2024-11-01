<template>
  <div>
    <a-row class="mx-3.5 my-4 font-bold">
      <!-- <Icon style="margin-right: 5px;" icon="ant-design:comment-outlined" /> -->
      {{ l('Unified.texts.Device') }}
    </a-row>
    <a-divider class="my-0" />
    <a-tabs
      v-model:activeKey="activeKey"
      :tabBarStyle="{ paddingLeft: '12px', marginTop: '10px' }"
      @change="tabsChange"
    >
      <a-tab-pane key="Information">
        <template #tab>
          <span>
            <Icon style="margin-right: 2px" icon="ant-design:comment-outlined" />
            {{ l('Unified.texts.OpsPanel:Information') }}
          </span>
        </template>
        <a-form
          class="mx-4"
          :model="deviceDetail"
          labelAlign="left"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-form-item :label="l('Unified.texts.Table:DeviceName')">
            <a-tag :color="`#4fbf67${theme ? '40' : ''}`" :bordered="false">{{
              deviceDetail.deviceName || '- -'
            }}</a-tag>
          </a-form-item>
          <a-form-item :label="l('Unified.texts.Table:DeviceType')">
            <a-tag :color="`#ff9f38${theme ? '40' : ''}`" :bordered="false">{{
              deviceDetail.deviceTypeName || '- -'
            }}</a-tag>
          </a-form-item>
          <a-form-item :label="l('Unified.texts.OpsPanel:IPAddress')">
            <a-tag :color="`#3b5999${theme ? '40' : ''}`" :bordered="false">{{
              deviceDetail.deviceHostNameOrIp || '- -'
            }}</a-tag>
          </a-form-item>
          <a-form-item :label="l('Unified.texts.DisplayName:Abp:Timing:Timezone')">
            <a-tag :color="`#108ee9${theme ? '40' : ''}`" :bordered="false">{{
              deviceDetail.Timezone || '- -'
            }}</a-tag>
          </a-form-item>
          <a-form-item :label="l('Unified.texts.OpsPanel:Network')">
            <a-tag :color="`#d1bc2e${theme ? '40' : ''}`" :bordered="false">{{
              deviceDetail.network || '- -'
            }}</a-tag>
          </a-form-item>
          <a-form-item :label="l('Unified.texts.Status')">
            <a-tag :color="`#722ED1${theme ? '40' : ''}`" :bordered="false">{{
              deviceDetail.status || '- -'
            }}</a-tag>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="Transaction">
        <template #tab>
          <span>
            <Icon style="margin-right: 2px" icon="ant-design:profile-outlined" />
            {{ l('Unified.texts.OpsPanel:Transaction') }}
          </span>
        </template>
        <a-table class="mx-4 device-table" :scroll="{ x: '100%', y: '178px', }" :bordered="false" :dataSource="transactData"
          :columns="transactColumns" :pagination="false">
          <template #headerCell={column}>
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
            <Icon style="margin-right: 2px" icon="ant-design:alert-outlined" />
            {{ l('Unified.texts.OpsPanel:Alert') }}
          </span>
        </template>
        <a-table class="mx-4  device-table" :scroll="{ x: '100%', y: '178px', }" :bordered="false" :dataSource="alertData"
          :columns="alertColumns" :pagination="false">
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
            <Icon style="margin-right: 2px" icon="ant-design:appstore-add-outlined" />
            {{ l('Unified.texts.OpsPanel:Function') }}
          </span>
        </template>
        <div>
          <div class="mx-5 flex flex-wrap justify-between">
            <template v-for="(item, index) in funList" :key="index">
              <a-button
                type="primary"
                class="w-52 mb-3 btBg"
                @click="funcItemClick(item)"
                :loading="item.disabled"
                :disabled="item.disabled"
              >
                <!-- <Icon style="margin-right: 2px;" icon="ant-design:comment-outlined" /> -->
                {{ item.deviceFunction }}
              </a-button>
            </template>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-divider class="divider my-0" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import ComponentMixin from './device-tabs';
  export default defineComponent({
    name: 'device-tabs',
    mixins: [ComponentMixin],
  });
</script>
<style scoped lang="less">
  @import './device-tabs.less';
</style>
