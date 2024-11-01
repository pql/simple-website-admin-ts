<template>
  <div>
    <f-dynamic-table
      ref="table"
      type="device-credential-profile"
      class="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DeviceCredentialProfile from './device-credential-profile';

  export default defineComponent({
    name: 'SiteConfigurationDeviceCredentialProfile',
    mixins: [DeviceCredentialProfile],
  });
</script>

<style lang="less" scoped></style>
