<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.Personalized:QueryConditionConfiguration') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-table
        :columns="columns"
        :data-source="filterListSort"
        bordered
        style="padding: 8px"
        size="small"
        :rowKey="(record) => record.field"
        :pagination="false"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'title'">
            {{ l(record.field) }}
          </template>
          <template v-if="column.dataIndex === 'sortNum'">
            <ArrowUpOutlined
              v-if="record.sortNum > 0"
              style="padding: 0 4px; cursor: pointe"
              @click="handleSortNum('up', record)"
            />
            <a-divider
              type="vertical"
              v-if="record.sortNum > 0 && record.sortNum < filterList.length - 1"
            />
            <ArrowDownOutlined
              v-if="record.sortNum < filterList.length - 1"
              style="padding: 0 4px; cursor: pointer"
              @click="handleSortNum('down', record)"
            />
          </template>
          <template v-if="['filterWidth', 'ifShow', 'isAdvanced'].includes(column.dataIndex)">
            <div>
              <a-input-number
                v-if="
                  column.dataIndex === 'filterWidth' && editableData[record?.field ?? record?.type]
                "
                v-model:value="editableData[record?.field ?? record?.type][column.dataIndex]"
                :min="0"
                :max="24"
              />
              <a-switch
                v-else-if="
                  (column.dataIndex === 'ifShow' || column.dataIndex === 'isAdvanced') &&
                  editableData[record?.field ?? record.type]
                "
                v-model:checked="editableData[record?.field ?? record?.type][column.dataIndex]"
                :min="0"
              />
              <template v-else>
                <template v-if="column.dataIndex === 'ifShow' || column.dataIndex === 'isAdvanced'">
                  <Icon
                    v-if="record[column.dataIndex]"
                    icon="icon-f-Success"
                    :size="19"
                    class="text-[#3DCF36]"
                  />
                  <Icon v-else icon="icon-f-Wrong" :size="19" class="text-[#EE3131]" />
                </template>
                <span v-else>{{ text }}</span>
              </template>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <div class="editable-row-operations">
              <span v-if="editableData[record?.field ?? record?.type]">
                <a @click="save(record?.field ?? record?.type)">{{ l('Unified.texts.Save') }}</a>
                <a-divider type="vertical" />
                <a @click="cancel(record?.field ?? record?.type)">{{
                  l('Unified.texts.Cancel')
                }}</a>
              </span>
              <span v-else>
                <a @click="edit(record?.field ?? record?.type)">{{ l('Unified.texts.Edit') }}</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <div class="modal-footer">
      <a-button :disabled="saving" @click="close()" type="button">
        <CloseCircleOutlined />
        {{ l('Unified.texts.Cancel') }}
      </a-button>
      <a-button :disabled="saving" @click="handleResetClick()" type="button">
        <CloseCircleOutlined />
        {{ l('Unified.texts.Reset') }}
      </a-button>
      <a-button :disabled="saving" @click="handleSave()" type="primary">
        <SaveOutlined />
        {{ l('Unified.texts.Save') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PageConfigFilter from './page-config-filter';

  export default defineComponent({
    name: 'PageConfigFilter',
    mixins: [PageConfigFilter],
  });
</script>

<style lang="less" scoped>
  @import './page-config-filter.less';
</style>
