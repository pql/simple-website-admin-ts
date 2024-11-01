<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        {{ l('Unified.texts.Personalized:ColumnColorConfiguration') }}
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-form :model="formModel" ref="formRef" style="padding: 8px">
        <a-table
          :columns="columns"
          :data-source="formModel.dataSourceSort"
          bordered
          size="small"
          :rowKey="(record) => record.id"
          :pagination="false"
        >
          <template #bodyCell="{ column, record, index }">
            <a-form-item
              :name="['dataSourceSort', index, column.dataIndex]"
              :rules="[{ required: true, message: '' }]"
              v-if="column.dataIndex === 'colFieldName'"
            >
              <a-select
                show-search
                optionFilterProp="label"
                v-model:value="record[column.dataIndex]"
                style="width: 100%"
                :options="dataSourceTitleOptions"
                :placeholder="l('Unified.texts.PleaseSelect')"
                allowClear
              />
            </a-form-item>
            <a-form-item
              v-if="column.dataIndex === 'determineType'"
              :name="['dataSourceSort', index, column.dataIndex]"
              :rules="[{ required: true, message: '' }]"
            >
              <a-select
                v-model:value="record[column.dataIndex]"
                style="width: 100%"
                :placeholder="l('Unified.texts.PleaseSelect')"
                allowClear
              >
                <a-select-option value="==">{{ '==' }}</a-select-option>
                <a-select-option value="!=">{{ '!=' }}</a-select-option>
                <a-select-option value="<">{{ '<' }}</a-select-option>
                <a-select-option value=">">{{ '>' }}</a-select-option>
                <a-select-option value=">=">{{ '>=' }}</a-select-option>
                <a-select-option value="<=">{{ '<=' }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              v-if="column.dataIndex === 'value'"
              :name="['dataSourceSort', index, column.dataIndex]"
              :rules="[{ required: true, message: '' }]"
            >
              <a-input
                v-model:value="record[column.dataIndex]"
                v-trim
                style="width: 100%"
                :placeholder="l('Unified.texts.common:inputText')"
                allowClear
              />
            </a-form-item>
            <a-form-item
              v-if="column.dataIndex === 'color'"
              :name="['dataSourceSort', index, column.dataIndex]"
            >
              <input type="color" v-model="record[column.dataIndex]" style="height: 32px" />
            </a-form-item>
            <template v-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations" v-if="!record.colFieldName">
                <a @click="del(index, record)">{{ l('Unified.texts.Delete') }}</a>
              </div>
              <div class="editable-row-operations" v-else>
                <a-popconfirm
                  :title="l('Unified.texts.IsConfirmDelete')"
                  :ok-text="l('Unified.texts.Yes')"
                  :cancel-text="l('Unified.texts.No')"
                  @confirm="del(index, record)"
                >
                  <a>{{ l('Unified.texts.Delete') }}</a>
                </a-popconfirm>
              </div>
            </template>
          </template>
        </a-table>
        <a-row justify="center">
          <a-col :span="24">
            <a-button type="dashed" block @click="handleAddClick()">
              <PlusOutlined /> {{ l('Unified.texts.AddLine') }}
            </a-button>
          </a-col>
        </a-row>
      </a-form>
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
  import PageConfigColumnColor from './page-config-column-color';

  export default defineComponent({
    name: 'PageConfigColumnColor',
    mixins: [PageConfigColumnColor],
  });
</script>

<style lang="less" scoped>
  @import './page-config-column-color.less';
</style>
