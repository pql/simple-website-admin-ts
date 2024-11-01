<template>
  <a-spin :spinning="loading">
    <!-- 标题 -->
    <div class="modal-header">
      <div class="modal-title">
        <h3 v-if="pageDataList">{{ item.entityTypeFullName }}</h3>
        <span v-if="pageDataList">({{ item.entityId }})</span>
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-row v-for="(item, index) in form" :key="index" class="a_row fold-typeface">
        <a-space direction="vertical">
          <a-collapse v-model:activeKey="activeKey" collapsible="header">
            <a-collapse-panel :key="index + 1" :header="changeType(item.entityChange?.changeType) +
              ' ' +
              formateDatetime(item.entityChange?.changeTime)
              ">
              <a-table :dataSource="item.entityChange?.propertyChanges" :columns="columns" :pagination="false">
                <!-- 自定义列渲染 -->
                <template #bodyCell="props">
                  <!-- 处理时间字段 -->
                  <template v-if="props.column.key === 'newValue' || props.column.key === 'originalValue'">
                    <template v-if="
                      props.record[props.column.dataIndex] &&
                      props.record[props.column.dataIndex].includes('T')
                    ">
                      {{ formateDatetime(props.record[props.column.dataIndex]) }}
                      <!-- 格式化日期 -->
                    </template>
                    <template v-else>
                      {{ props.record[props.column.dataIndex] }}
                    </template>
                  </template>
                  <!-- 其他列的自定义渲染 -->
                  <template v-else>
                    {{ props.record[props.column.dataIndex] }}
                  </template>
                </template>
              </a-table>
            </a-collapse-panel>
          </a-collapse>
        </a-space>
      </a-row>
    </div>
    <div class="modal-footer">
      <a-button :disabled="saving" @click="close()">
        <close-circle-outlined />
        {{ l('Unified.texts.Close') }}
      </a-button>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EntityDetail from './eneity-detail';

export default defineComponent({
  name: 'EntityDetail',
  mixins: [EntityDetail],
});
</script>

<style lang="less">
@import './entity-detail.less';
</style>
