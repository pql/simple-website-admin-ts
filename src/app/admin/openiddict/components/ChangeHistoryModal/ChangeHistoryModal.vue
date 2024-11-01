<template>
  <a-spin :spinning="loading">
    <div class="modal-header">
      <div class="modal-title">
        <h3 v-if="item.entityTypeFullName">{{ item.entityTypeFullName }}</h3>
        <span v-if="item.entityId">({{ item.entityId }})</span>
      </div>
    </div>
    <slot></slot>
    <div class="modal-body">
      <a-row v-if="tabList.length" v-for="(item, index) in tabList" :key="index" class="a_row">
        <a-space direction="vertical">
          <a-collapse v-model:activeKey="activeKey" collapsible="header">
            <a-collapse-panel
              :key="index + 1"
              :header="`${changeType(item.entityChange?.changeType)} ${item.entityChange?.changeTime} ${item.userName || ''}`"
            >
              <a-table
                :dataSource="item.entityChange?.propertyChanges"
                :columns="columns"
                :pagination="false"
              >
              </a-table>
            </a-collapse-panel>
          </a-collapse>
        </a-space>
      </a-row>
      <a-empty v-else :image="simpleImage" :description="l('Unified.texts.NoChangeHistory')" />
    </div>
    <div class="modal-footer">
      <a-space>
        <a-button :disabled="saving" @click="close()">
          <close-circle-outlined />
          {{ l('Unified.texts.Close') }}
        </a-button>
      </a-space>
    </div>
  </a-spin>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Empty } from 'ant-design-vue';
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import { AuditLogsService } from '@/apis';
  const simpleImage = Empty.PRESENTED_IMAGE_DEFAULT;
  export default defineComponent({
    name: 'ChangeHistoryModal',
    mixins: [ModalComponentBase],
    props: {
      pageData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        simpleImage,
        item: { entityId: '', entityTypeFullName: '' },
        loading: false,
        tabList: [] as any[],
        activeKey: ref(['0']),
        customStyle:
          'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
        columns: [
          {
            title: this.l('AbpAuditLogging.texts.PropertyName'),
            dataIndex: 'propertyName',
            key: 'propertyName',
          },
          {
            title: this.l('AbpAuditLogging.texts.OriginalValue'),
            dataIndex: 'originalValue',
            key: 'originalValue',
          },
          {
            title: this.l('AbpAuditLogging.texts.NewValue'),
            dataIndex: 'newValue',
            key: 'newValue',
          },
        ],
      };
    },
    mounted() {
      this.init(this.pageData);
    },
    methods: {
      /**
       * 初始化
       */
      async init(pageData) {
        this.item = pageData;
        console.log('pageData', pageData);
        const { entityId, entityTypeFullName } = this.item;
        this.loading = true;
        if (entityId != null) {
          const res = await AuditLogsService.getApiAuditLoggingAuditLogsEntityChangesWithUsername({
            entityId: entityId as string,
            entityTypeFullName: entityTypeFullName as string,
          });
          this.tabList = res;
        }
        this.loading = false;
      },
      changeType(type) {
        return type == 0
          ? this.l('Unified.texts.Create')
          : type == 1
            ? this.l('Unified.texts.Update')
            : this.l('Unified.texts.Deleted');
      },
    },
  });
</script>
<style lang="less" scoped>
  .ant-space {
    width: 100%;
  }

  .modal-footer {
    margin-top: 10px;
  }

  .a_row {
    margin-top: 10px;
  }
</style>
