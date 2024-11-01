<template>
  <div>
    <f-dynamic-table
      type="deviceTypeFunction"
      ref="table"
      :fetch="fetchDataList"
      :showExport="true"
      @action-click="handleActionClick"
    >
      <template #headerCell="{ column }">
        <template v-if="column.field == 'No'">
          {{ column.title }}
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>
<script lang="ts">
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  import {
    // DeviceTypeFunctionListDto,
    // DeviceTypeFunctionServiceProxy
    DeviceTypeFunctionService,
    FireBytes_Unified_Wave_DeviceTypeFunctions_Dtos_DeviceTypeFunctionListDto as DeviceTypeFunctionListDto,
  } from '/@/apis';
  import CreateOrEditDeviceTypeFunction from './create-or-edit-deviceTypeFunction/create-or-edit-deviceTypeFunction.vue';
  import { defineComponent } from 'vue';
  // import _ from 'lodash';
  // import { GDynamicTable } from '/@/shared/components/g-dynamic-table';
  import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';

  export default defineComponent({
    name: 'SiteConfigurationDeviceTypeFunction',
    components: {
      // GDynamicTable,
      CreateOrEditDeviceTypeFunction,
    },
    mixins: [DynamicTableComponentBase],
    data() {
      return {
        // 请求参数
        filterText: undefined,
        dataList: [] as DeviceTypeFunctionListDto[],
        /** 选中 */
        selectItems: [] as any[],
      };
    },
    mounted() {},
    methods: {
      /**
       * 获取数据
       */
      fetchDataList(otherQuery) {
        const {
          maxResultCount,
          skipCount,
          sorting,
          deviceTypeFunction,
          deviceTypeId,
          deviceStatusId,
          search,
        } = (this.$refs.table as any).getSearchProps();
        return new Promise((resolve, reject) => {
          DeviceTypeFunctionService.getApiAppDeviceTypeFunctionPaged({
            filterSearch: search,
            filterDeviceFuntionName: !deviceTypeFunction ? '' : deviceTypeFunction,
            filterDeviceTypeId: !deviceTypeId ? '' : deviceTypeId,
            filterDeviceStatusId: !deviceStatusId ? '' : deviceStatusId,
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
      createOrEdit(item?: DeviceTypeFunctionListDto) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(
            CreateOrEditDeviceTypeFunction,
            { pageDataList: this.selectItems },
            { width: 800 },
          )
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      /**
       * 批量编辑
       */
      bulkEdit() {
        this.selectItems = [];
        let arr = (this.$refs.table as any).getSelectRowKeys();
        if (arr.length < 1) {
          return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        }
        this.selectItems = arr;
        this.modalHelper
          .create(
            CreateOrEditDeviceTypeFunction,
            { pageDataList: this.selectItems },
            { width: 800 },
          )
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
          this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
          return;
        }

        const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
        this.confirm({
          iconType: 'warning',
          title: () => this.l('Unified.texts.ConfirmOperation'),
          content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
          onOk: () => {
            (this.$refs.table as any).setLoading(true);
            DeviceTypeFunctionService.postApiAppDeviceTypeFunctionBatchDelete({
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
      deleteItem(item: DeviceTypeFunctionListDto) {
        (this.$refs.table as any).setLoading(true);
        DeviceTypeFunctionService.deleteApiAppDeviceTypeFunction({
          id: item.id as string,
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
      copy(item: any) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(
            CreateOrEditDeviceTypeFunction,
            { pageDataList: this.selectItems, isCopy: true },
            { width: 800 },
          )
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
          case EVENT_BTN_ENUM.COPY:
            this.copy(item);
            break;
          default:
            break;
        }
      },
    },
  });
</script>
