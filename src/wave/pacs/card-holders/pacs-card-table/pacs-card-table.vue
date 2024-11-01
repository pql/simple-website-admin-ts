<template>
  <a-spin :spinning="loading" wrapperClassName="dynamic-table-wrapper">
    <a-row :gutter="24">
      <a-col :span="12">
        <div class="dynamic-table-layout">
          <!-- 工具条 -->
          <a-button class="mb-4" type="primary" @click="selectCards">
            <plus-outlined />
            <span>{{ l('Unified.texts.Create') }}</span>
          </a-button>
          <a-button class="mb-4 ml-4" type="error" @click="cardBatchDelete">
            <i class="iconfont icon-f-delete mr-2" style="font-size: 14px" />
            <span>{{ l('AbpOpenIddict.texts.Permission:Delete') }}</span>
          </a-button>

          <div class="dynamic-table-content">
            <!-- 表格 -->
            <a-table
              ref="tables"
              size="small"
              rowKey="id"
              class="customTable"
              :bordered="true"
              :dataSource="cardList"
              :columns="cardColumns"
              :row-selection="rowSelection"
              :customRow="customRow"
              :pagination="false"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'startDateTime'">
                  {{ dateUtil.fromUTCDateToLocalDateTime(record.startDateTime) }}
                </template>
                <template v-if="column.key === 'endDateTime'">
                  {{ dateUtil.fromUTCDateToLocalDateTime(record.endDateTime) }}
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="dynamic-table-layout">
          <!-- 工具条 -->
          <a-button class="mb-4" type="primary" @click="selectGroup" :disabled="!card.clickItem?.id">
            <plus-outlined />
            <span>{{ l('Unified.texts.Create') }}</span>
          </a-button>
          <a-button class="mb-4 ml-4" type="error" @click="groupBatchDelete">
            <i class="iconfont icon-f-delete mr-2" style="font-size: 14px" />
            <span>{{ l('AbpOpenIddict.texts.Permission:Delete') }}</span>
          </a-button>
          <span v-if="card.clickItem?.id" style="margin: 20px; font-weight: 900"
            >{{ l('Unified.texts.Cards') }}：{{ card.clickItem?.cardNumber }}</span
          >

          <div class="dynamic-table-content">
            <!-- 表格 -->
            <a-table
              ref="tables2"
              size="small"
              class="customTable"
              :bordered="true"
              rowKey="pacsDeviceAccessGroupId"
              :dataSource="groupList"
              :columns="groupColumns"
              :row-selection="rowSelectionGroup"
              :pagination="false"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'startDateTime'">
                  <f-date-picker
                    show-time
                    class="w-full"
                    name="startDateTime"
                    v-model:value="record.startDateTime"
                  />
                </template>
                <template v-if="column.key === 'endDateTime'">
                  <f-date-picker
                    show-time
                    class="w-full"
                    name="endDateTime"
                    v-model:value="record.endDateTime"
                  />
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </a-col>
    </a-row>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import PacsCardTable from './pacs-card-table';

  export default defineComponent({
    name: 'PacsCardTable',
    mixins: [PacsCardTable],
  });
</script>

<style lang="less" scoped></style>
