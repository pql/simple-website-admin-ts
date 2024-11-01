<template>
  <a-select
    v-model:value="innerValue"
    :dropdownStyle="{}"
    :placeholder="l('Unified.texts.HttpMethod')"
    @change="innerValueChange"
    allowClear
    style="width: 100%"
    :maxTagCount="3"
  >
    <a-select-option value="">{{ l('All') }}</a-select-option>
    <a-select-option value="GET">{{ l('GET') }}</a-select-option>
    <a-select-option value="POST">{{ l('POST') }}</a-select-option>
    <a-select-option value="DELETE">{{ l('DELETE') }}</a-select-option>
    <a-select-option value="PUT">{{ l('PUT') }}</a-select-option>
    <a-select-option value="HEAD">{{ l('HEAD') }}</a-select-option>
    <a-select-option value="CONNECT">{{ l('CONNECT') }}</a-select-option>
    <a-select-option value="OPTIONS">{{ l('OPTIONS') }}</a-select-option>
    <a-select-option value="TRACE">{{ l('TRACE') }}</a-select-option>
  </a-select>
</template>

<script lang="ts">
  import PageFilterComponentBase from '@/shared/component-base/page-filter-component-base';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'FHttpMethodPicker',
    mixins: [PageFilterComponentBase],
    props: {
      multiple: {
        type: Boolean,
      },
    },
  });
</script>
