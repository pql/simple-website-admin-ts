<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.Personalized:ListConfiguration') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-table
        :columns="columns"
        :data-source="listConfigColumnsSort"
        bordered
        size="small"
        :rowKey="(record) => record.field"
        :pagination="false"
        :scroll="{ x: 800, y: `calc(100vh - 305px)` }"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'title'">
            {{ l(record.field) }}
          </template>
          <template v-if="column.dataIndex === 'sortNum'">
            <ArrowUpOutlined
              v-if="record.sortNum > 0"
              style="padding: 0 4px; cursor: pointer"
              @click="handleSortNum('up', record)"
            />
            <a-divider
              type="vertical"
              v-if="record.sortNum > 0 && record.sortNum < listConfigColumns.length - 1"
            />
            <ArrowDownOutlined
              v-if="record.sortNum < listConfigColumns.length - 1"
              style="padding: 0 4px; cursor: pointer"
              @click="handleSortNum('down', record)"
            />
          </template>
          <template
            v-if="
              ['width', 'position', 'ifShow', 'type', 'fixed', 'resizable'].includes(
                column.dataIndex,
              )
            "
          >
            <div>
              <a-input-number
                v-if="column.dataIndex === 'width' && editableData[record?.field ?? record?.type]"
                v-model:value="editableData[record?.field ?? record?.type][column.dataIndex]"
                :min="0"
                :max="999"
              />
              <a-select
                v-else-if="
                  column.dataIndex === 'fixed' && editableData[record?.field ?? record?.type]
                "
                v-model:value="editableData[record?.field ?? record?.type][column.dataIndex]"
                style="width: 100%"
                allowClear
              >
                <a-select-option value="left">{{
                  l('Unified.texts.Personalized:LeftFixed')
                }}</a-select-option>
                <a-select-option value="right">{{
                  l('Unified.texts.Personalized:RightFixed')
                }}</a-select-option>
              </a-select>
              <a-select
                v-else-if="
                  column.dataIndex === 'position' && editableData[record?.field ?? record?.type]
                "
                v-model:value="editableData[record?.field ?? record?.type][column.dataIndex]"
                style="width: 100%"
                allowClear
              >
                <a-select-option value="left">{{
                  l('Unified.texts.Personalized:LeftAlign')
                }}</a-select-option>
                <a-select-option value="center">{{
                  l('Unified.texts.Personalized:CenterAlign')
                }}</a-select-option>
                <a-select-option value="right">{{
                  l('Unified.texts.Personalized:RightAlign')
                }}</a-select-option>
              </a-select>
              <a-switch
                v-else-if="
                  (column.dataIndex === 'ifShow' || column.dataIndex === 'resizable') &&
                  editableData[record?.field ?? record.type]
                "
                v-model:checked="editableData[record?.field ?? record?.type][column.dataIndex]"
                :min="0"
              />
              <a-input
                v-else-if="editableData[record?.field ?? record?.type]"
                v-model:value="editableData[record?.field ?? record?.type][column.dataIndex]"
                style="width: 100%"
                allowClear
              />
              <template v-else>
                <template v-if="column.dataIndex === 'ifShow' || column.dataIndex === 'resizable'">
                  <!-- <CheckCircleTwoTone v-if="record[column.dataIndex]" twoToneColor="#52c41a" />
                  <CloseCircleTwoTone v-else twoToneColor="#ff0000" /> -->
                  <Icon
                    v-if="record[column.dataIndex]"
                    icon="icon-f-Success"
                    :size="19"
                    class="text-[#3DCF36]"
                  />
                  <Icon v-else icon="icon-f-Wrong" :size="19" class="text-[#EE3131]" />
                </template>
                <template v-else-if="column.dataIndex === 'fixed'">
                  <span v-if="record.fixed === 'left'">
                    {{ l('Unified.texts.Personalized:LeftFixed') }}
                  </span>
                  <span v-else-if="record.fixed === 'right'">
                    {{ l('Unified.texts.Personalized:RightFixed') }}
                  </span>
                </template>
                <template v-else-if="column.dataIndex === 'position'">
                  <AlignLeftOutlined v-if="record.position === 'left'" />
                  <AlignCenterOutlined v-else-if="record.position === 'center'" />
                  <AlignRightOutlined v-else-if="record.position === 'right'" />
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
      <a-button :disabled="saving" v-show="showCancelButton" @click="close()" type="button">
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
  import PageConfigColumn from './page-config-column';

  export default defineComponent({
    name: 'PageConfigColumn',
    mixins: [PageConfigColumn],
  });
</script>

<style lang="less" scoped>
  @import './page-config-column.less';
</style>
