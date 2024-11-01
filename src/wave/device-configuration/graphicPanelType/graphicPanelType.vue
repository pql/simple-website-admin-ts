<template>
  <div>
    <f-dynamic-table
      type="graphic-panel-type"
      ref="table"
      :fetch="fetchDataList"
      :showExport="true"
      :showActionBtn="showActionBtn"
      @action-click="handleActionClick"
    >
      <template #headerCell="{ column }">
        <template v-if="column.field == 'No'">
          {{ column.title }}
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'graphicType'">
          <span>{{ record.graphicType }}</span>
          <!-- 系统标签 -->
          <a-tag class="sys_tag" v-if="record.isSysteam" color="#108ee9"> {{ l('Static') }}</a-tag>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>
<script lang="ts">
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  import {
    // GraphicPanelTypeListDto,
    // GraphicPanelTypeServiceProxy
    FireBytes_Unified_Wave_GraphicPanelTypes_Dtos_GraphicPanelTypeListDto as GraphicPanelTypeListDto,
    GraphicPanelTypeService,
  } from '@/apis';
  import CreateOrEditGraphicPanelType from './create-or-edit-graphicPanelType/create-or-edit-graphicPanelType.vue';
  import { defineComponent } from 'vue';
  // import _ from 'lodash';
  // import { GDynamicTable } from '/@/shared/components/g-dynamic-table';
  import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';

  export default defineComponent({
    name: 'SiteConfigurationDesignGraphicPanelType',
    components: {
      CreateOrEditGraphicPanelType,
    },
    mixins: [DynamicTableComponentBase],
    data() {
      return {
        // graphicPanelTypeServiceProxy: new GraphicPanelTypeServiceProxy(),
        // 请求参数
        filterText: undefined,
        dataList: [] as GraphicPanelTypeListDto[],
        /** 选中 */
        selectItems: [] as any[],
      };
    },
    mounted() {
      (this.$refs.table as any).setRowSelection('getCheckboxProps', (record) => {
        return {
          disabled: record.isSysteam,
        };
      });
    },
    methods: {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      showActionBtn(item, column, record) {
        switch (item.name) {
          case EVENT_BTN_ENUM.DELETE:
            return !record.isSysteam;
          default:
            return true;
        }
      },
      /**
       * 获取数据
       */
      fetchDataList(otherQuery) {
        const { maxResultCount, skipCount, sorting, graphicTypeName,filter } = (
          this.$refs.table as any
        ).getSearchProps();
        return new Promise((resolve, reject) => {
          GraphicPanelTypeService.getApiAppGraphicPanelTypePaged({
            filter: filter,
            graphicTypeName:graphicTypeName,
            sorting: sorting,
            skipCount: otherQuery ? otherQuery.skipCount : skipCount,
            maxResultCount: otherQuery ? otherQuery.maxResultCount : maxResultCount,
          })
            .finally(() => {
              // finishedCallback!();
            })
            .then((res) => {
              resolve(res);
              // this.showPaging(res);
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      /**
       * 添加  修改
       */
      createOrEdit(item?: GraphicPanelTypeListDto) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditGraphicPanelType, { pageDataList: this.selectItems }, { width: 500 })
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      /**
       * 批量删除
       */
      batchDelete() {
        const table = this.$refs.table as any;
        if (table.getSelectRowKeys().length <= 0) {
          return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        }
        const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
        this.confirm({
          iconType: 'warning',
          title: () => this.l('Unified.texts.ConfirmOperation'),
          content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
          onOk: () => {
            (this.$refs.table as any).setLoading(true);
            GraphicPanelTypeService.postApiAppGraphicPanelTypeBatchDelete({
              requestBody: ids,
            })
              .finally(() => {
                (this.$refs.table as any).setLoading(false);
              })
              .then(() => {
                (this.$refs.table as any).reloadGoFirstPage();
                this.notify.success({
                  message: this.l('Unified.texts.SavedSuccessfully'),
                });
              });
          },
        });
      },
      /**
       * 单个删除
       */
      deleteItem(item: GraphicPanelTypeListDto) {
        (this.$refs.table as any).setLoading(true);
        GraphicPanelTypeService.deleteApiAppGraphicPanelType({
          id: item.id,
        })
          .finally(() => {
            (this.$refs.table as any).setLoading(false);
          })
          .then((res) => {
            (this.$refs.table as any).reloadGoFirstPage();
            if (res) {
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            } else {
              this.notify.error({
                message: this.l(
                  'Unified.texts.Faildeleted:Somegraphicspaneltypeshavebeenboundtographicspanels',
                ),
              });
            }
          });
      },
      bulkEdit() {
        this.selectItems = [];
        let arr = (this.$refs.table as any).getSelectRowKeys();
        if (arr.length < 1) {
          return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        }
        this.selectItems = arr;
        this.modalHelper
          .create(CreateOrEditGraphicPanelType, { pageDataList: this.selectItems })
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      /**
       * 按钮回调事件
       */
      handleActionClick(event: string, item?: any) {
        console.log(event);
        switch (event) {
          case EVENT_BTN_ENUM.CREATE:
            this.createOrEdit();
            break;
          case EVENT_BTN_ENUM.DELETE:
            this.deleteItem(item);
            break;
          case EVENT_BTN_ENUM.BULK_DELETE:
            this.batchDelete();
            break;
          case EVENT_BTN_ENUM.EDIT:
            this.createOrEdit(item);
            break;
          case EVENT_BTN_ENUM.BULK_EDIT:
            this.bulkEdit();
            break;
          default:
            break;
        }
      },
    },
  });
</script>
<style scoped>
  .sys_tag {
    margin-left: 10px;
  }
</style>
