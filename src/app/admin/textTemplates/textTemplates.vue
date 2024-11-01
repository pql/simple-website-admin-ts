<template>
  <div>
    <div v-if="currentComponentsKey == 'textTemplates'">
      <f-dynamic-table
        ref="table"
        type="textTemplates"
        :show-toolbar="false"
        :fetch="fetchDataList"
        @action-click="handleActionClick"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'isInlineLocalized'">
            <template v-if="record.isInlineLocalized">
              <CheckOutlined class="checkOutlined" />
            </template>
            <span v-else></span>
          </template>
          <template v-if="column.key === 'isLayout'">
            <template v-if="record.isLayout">
              <CheckOutlined class="checkOutlined" />
            </template>
            <span v-else></span>
          </template>
        </template>
      </f-dynamic-table>
    </div>
    <div v-if="currentComponentsKey == 'message'">
      <message :_content="currentComponentsValue" @childData="receiveDataFromChild"></message>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import textTemplatesMixin from './textTemplates';
  export default defineComponent({
    name: 'TextTemplates',
    mixins: [textTemplatesMixin],
  });
</script>

<style scoped lang="less">
  .checkOutlined {
    content: '\f00c';
    color: #4fbf67 !important;
    transform: scale(1.3, 1.3);
  }
</style>
