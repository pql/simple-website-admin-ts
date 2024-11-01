<template>
  <f-dynamic-table
    ref="table"
    type="language-text"
    :show-toolbar="false"
    :fetch="fetchDataList"
    :defaultFilterValue="defaultFilterValue"
    @action-click="handleActionClick"
  />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import LanguageTextsMixin from './languageTexts';

  export default defineComponent({
    name: 'LanguagesTexts',
    mixins: [LanguageTextsMixin],
  });
</script>

<style scoped lang="less"></style>
