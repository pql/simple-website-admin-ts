<template>
  <f-dynamic-table
    ref="table"
    type="sites"
    class="table"
    :fetch="fetchDataList"
    :showActionBtn="showActionBtn"
    @action-click="handleActionClick"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'roleNames'">
        <template v-if="record[column.field].length > 0"> </template>
        <span v-else></span>
      </template>
    </template>
  </f-dynamic-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import SiteList from './siteList';

  export default defineComponent({
    name: 'SiteConfigurationPropertySite',
    mixins: [SiteList],
  });
</script>

<style lang="less" scoped></style>
