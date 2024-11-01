<template>
  <div>
    <f-dynamic-table
      type="deviceStatus"
      ref="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      :showExport="true"
      @action-click="handleActionClick"
    >
      <template #headerCell="{ column }">
        <template v-if="column.field == 'No'">
          {{ column.title }}
        </template>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'messageBackgroundColorCode'">
          <a class="messageBackgroundColorCode">
            <input
              type="color"
              v-model="record.messageBackgroundColorCode"
              disabled
              style="height: 32px"
            />
          </a>
        </template>
        <template v-if="column.key === 'statusName'">
          <span>{{ record.statusName }}</span>
          <!-- 默认标签 -->
          <a-tag class="sys_tag" v-if="record.isDefault" color="#2db7f5"> {{ l('Default') }}</a-tag>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>
<script lang="ts">
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  import {
    FireBytes_Unified_Wave_DeviceStatuss_Dtos_GetDeviceStatusForEditOutput as GetDeviceStatussInput,
    FireBytes_Unified_Wave_DeviceStatuss_Dtos_DeviceStatusListDto as DeviceStatusListDto,
    DeviceStatusService,
  } from '/@/apis';
  import CreateOrEditDeviceStatus from './create-or-edit-deviceStatus/create-or-edit-deviceStatus.vue';
  import { defineComponent } from 'vue';
  // import _ from 'lodash';
  import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';

  export default defineComponent({
    name: 'SiteConfigurationDeviceStatus',
    components: {},
    mixins: [DynamicTableComponentBase],
    data() {
      return {
        // 请求参数
        filterText: undefined,
        dataList: [] as DeviceStatusListDto[],
        /** 选中 */
        selectItems: [] as any[],
      };
    },
    mounted() {
      this.rowSelectionDisable((record) => {
        return {
          disabled: record.isDefault,
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
            return !record.isDefault;
          default:
            return true;
        }
      },
      /**
       * 获取数据
       */
      fetchDataList(otherQuery) {
        const { maxResultCount, skipCount, sorting, deviceStatusName, deviceTypeId, filter } =
          this.getSearchProps();

        // const input ={} as GetDeviceStatussInput;
        // input.maxResultCount = !!otherQuery ? otherQuery.maxResultCount : maxResultCount;
        // input.skipCount = !!otherQuery ? otherQuery.skipCount : skipCount;
        // input.sorting = sorting;
        // input.filterText = statusName;
        // input.deviceTypeId = deviceTypeId;

        return new Promise((resolve, reject) => {
          DeviceStatusService.getApiAppDeviceStatusPaged({
            deviceTypeId: deviceTypeId,
            filter: filter,
            deviceStatusName: deviceStatusName,
            sorting: sorting,
            skipCount: otherQuery ? otherQuery.skipCount : skipCount,
            maxResultCount: otherQuery ? otherQuery.maxResultCount : maxResultCount,
          })
            .finally(() => {
              // finishedCallback!();
            })
            .then((res) => {
              if (res && Array.isArray(res.items)) {
                for (const item of res.items) {
                  // item.statusIconFont = UrlHelper.getFileUrlById(item.statusIconFont);
                }
              }
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
      createOrEdit(item?: DeviceStatusListDto) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditDeviceStatus, { pageDataList: this.selectItems })
          .subscribe((res) => {
            if (res) {
              this.reloadGoFirstPage();
            }
          });
      },
      /**
       * 批量编辑
       */
      bulkEdit() {
        this.selectItems = [];
        let arr = this.getSelectRowKeys();
        if (arr.length < 1) {
          return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        }
        this.selectItems = arr;
        this.modalHelper
          .create(CreateOrEditDeviceStatus, { pageDataList: this.selectItems })
          .subscribe((res) => {
            if (res) {
              this.reloadGoFirstPage();
            }
          });
      },
      /**
       * 批量删除
       */
      batchDelete() {
        if (this.getSelectRowKeys().length <= 0) {
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
            DeviceStatusService.postApiAppDeviceStatusBatchDelete({
              requestBody: ids,
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
                    message: this.l('Unified.texts.Faildeleted:Somedevicestatushavebeenbound'),
                  });
                }
              });
          },
        });
      },
      /**
       * 单个删除
       */
      deleteItem(item: DeviceStatusListDto) {
        this.setLoading(true);
        DeviceStatusService.deleteApiAppDeviceStatus({
          id: item.id,
        })
          .finally(() => {
            this.setLoading(false);
          })
          .then((res) => {
            this.reloadGoFirstPage();
            if (res) {
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            } else {
              this.notify.error({
                message: this.l('Unified.texts.Faildeleted:Thedevicestatushasbeenbound'),
              });
            }
          });
      },
      copy(item: any) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditDeviceStatus, { pageDataList: this.selectItems, isCopy: true })
          .subscribe((res) => {
            if (res) {
              this.reloadGoFirstPage();
            }
          });
      },
      /**
       * 按钮回调事件
       */
      handleActionClick(event: string, item?: any) {
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
<style scoped>
  .sys_tag {
    margin-left: 10px;
  }
</style>
