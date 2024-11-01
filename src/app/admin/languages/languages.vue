<template>
  <div id="languages">
    <f-dynamic-table
      ref="table"
      type="language"
      :fetch="fetchDataList"
      @action-click="handleActionClick"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'displayName'">
          <span class="defaultLanguage" v-if="record.isDefaultLanguage"
            >{{ record.displayName }} ({{ l('Unified.texts.Language:DefaultLanguage') }})</span
          >
          <span v-else>{{ record.displayName }}</span>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import LanguagesMixin from './languages';

  export default defineComponent({
    name: 'Languages',
    mixins: [LanguagesMixin],
  });
</script>

<style lang="less" scoped>
  @import './languages.less';
</style>
