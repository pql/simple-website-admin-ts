<template>
  <a-spin :spinning="loading">
    <!-- 标题 -->
    <div class="modal-header">
      <div class="modal-title">
        {{ l('AbpIdentity.texts.Details') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <!-- 请求信息 -->

      <!-- Device -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:Device') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">
            {{ form?.device }}
          </div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />

      <!-- DeviceInfo -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:DeviceInfo') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">
            {{ form?.deviceInfo }}
          </div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />

      <!-- UserInformations -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:UserInfo') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">{{ form?.userName }}</div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />

      <!-- ClientID -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:ClientId') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">{{ form?.clientId }}</div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />

      <!-- IPLocation -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:IpAddresses') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">{{ form?.ipAddresses?.toString() }}</div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />

      <!-- LogInTime -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:SignedIn') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">{{ form?.signedIn }}</div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />

      <!-- LastAccessTime -->
      <a-row :gutter="8">
        <a-col class="gutter-row" :span="4">
          <div class="gutter-box div-left">{{ l('AbpIdentity.texts.Session:LastAccessed') }}:</div>
        </a-col>
        <a-col class="gutter-row" :span="10">
          <div class="gutter-box div-rlght">{{ form?.lastAccessed }}</div>
        </a-col>
      </a-row>

      <a-divider class="new_ant-divider-horizonta" />
    </div>
    <div class="modal-footer text-right">
      <a-button :disabled="saving" @click="close()">
        <close-circle-outlined />
        {{ l('Unified.texts.Close') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SessionDetails from './session-details';

  export default defineComponent({
    name: 'SessionDetails',
    mixins: [SessionDetails],
  });
</script>

<style scoped lang="less">
  ::v-deep .ant-modal .ant-modal-body {
    /* overflow: hidden; */
    max-height: auto !important;
  }

  ::v-deep .ant-tabs .ant-tabs-content .ant-tabs-tabpane {
    /* max-width: 98% !important; */
    max-height: 80vh !important;
    overflow: auto;
  }

  .ant-space {
    width: 100%;
  }

  .modal-footer {
    margin-top: 10px;
  }

  .a_row {
    margin-top: 10px;
  }

  .tmepCode {
    width: 80px;
    margin-left: 10px;
    padding: 6px;
    border-radius: 50px;
    background: rgb(83 228 83);
    color: white;
    line-height: 100%;
  }

  .new_ant-divider-horizonta {
    display: flex;
    width: 100%;
    min-width: 100%;
    margin: 10px 0 !important;
    clear: both;
  }

  .div-left {
    font:
      13px lnter,
      sans-serif;
    font-weight: 500;
  }

  .div-rlght {
    margin-left: 50px;
    font:
      13px lnter,
      sans-serif;
    font-weight: 500;
  }
</style>
