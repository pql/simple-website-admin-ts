<template>
  <f-dynamic-table
    type="device"
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
</template>
<script lang="ts">
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  import {
    // DeviceListDto,
    // DeviceServiceProxy,
    // DeviceTypeServiceProxy
    FireBytes_Unified_Wave_Devices_Dtos_DeviceListDto as DeviceListDto,
    DeviceService,
    DeviceTypeService,
  } from '/@/apis';
  import CreateDevice from './create-device/create-device.vue';
  import CreateOrEditDevice from './create-or-edit-device/create-or-edit-device.vue';
  import { defineComponent } from 'vue';
  // import _ from 'lodash';
  // import { GDynamicTable } from '/@/shared/components/g-dynamic-table';
  import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';

  export default defineComponent({
    name: 'SiteConfigurationDeviceConfiguration',
    components: {
      // GDynamicTable,
      CreateDevice,
    },
    mixins: [DynamicTableComponentBase],
    data() {
      return {
        // deviceServiceProxy: new DeviceServiceProxy(),
        // deviceTypeServiceProxy: new DeviceTypeServiceProxy(),
        // 请求参数
        filterText: undefined,
        dataList: [] as DeviceListDto[],
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
          credentialProfileId,
          deviceStatusId,
          buildingFloorId,
          deviceTypeId,
          interfaceServiceId,
          deviceName,
          search,
        } = (this.$refs.table as any).getSearchProps();
        return new Promise((resolve, reject) => {
          DeviceService.getApiAppDevicePaged({
            filterSearch: search,
            filterDeviceName: !deviceName ? '' : deviceName,
            filterInterfaceServiceId: !interfaceServiceId ? '' : interfaceServiceId,
            filterDeviceTypeId: !deviceTypeId ? '' : deviceTypeId,
            filterBuildingFloorId: !buildingFloorId ? '' : buildingFloorId,
            filterDeviceStatusId: !deviceStatusId ? '' : deviceStatusId,
            filterCredentialProfileId: !credentialProfileId ? '' : credentialProfileId,
            filterDeviceCategoryId: '',
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
       * 添加
       */
      create(item?: DeviceListDto, continuousNewData = null) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(
            CreateDevice,
            { pageDataList: this.selectItems, continuousNewData },
            { width: 500 },
          )
          .subscribe((entity) => {
            if (entity) {
              //将基础信息传递给下一步
              // (this.$refs.table as any).reloadGoFirstPage();
              //获取默认类型状态
              DeviceTypeService.getApiAppDeviceTypeDeviceStatusByTypeId({
                id: entity.deviceTypeId,
              }).then((res) => {
                entity.deviceStatusId = res;
                this.modalHelper
                  .create(CreateOrEditDevice, {
                    entityConfig: entity,
                    pageDataList: this.selectItems,
                  })
                  .subscribe((res) => {
                    if (res) {
                      (this.$refs.table as any).reloadGoFirstPage();
                      if (res.id) this.continuousNew(item, res);
                      else (this.$refs.table as any).reloadGoFirstPage();
                    }
                  });
              });
            }
          });
      },
      continuousNew(item, res) {
        let continuousNewData = res;
        continuousNewData.id = null;
        this.create(item, res);
      },
      /** 修改 */
      edit(item) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditDevice, { pageDataList: this.selectItems })
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      copy(item) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditDevice, { pageDataList: this.selectItems, isCopy: true })
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
            DeviceService.postApiAppDeviceBatchDelete({
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
                    message: this.l(res),
                  });
                }
              });
          },
        });
      },
      /**
       * 单个删除
       */
      deleteItem(item: DeviceListDto) {
        (this.$refs.table as any).setLoading(true);
        DeviceService.deleteApiAppDevice({
          id: item.id,
        })
          .finally(() => {
            (this.$refs.table as any).setLoading(false);
          })
          .then((res) => {
            (this.$refs.table as any).reloadGoFirstPage();
            if (res == 'success') {
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            } else {
              this.notify.error({
                message: res,
              });
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
          this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
          return;
        }
        this.selectItems = arr;
        this.modalHelper
          .create(CreateOrEditDevice, { pageDataList: this.selectItems })
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
            this.create();
            break;
          case EVENT_BTN_ENUM.DELETE:
            this.deleteItem(item);
            break;
          case EVENT_BTN_ENUM.BULK_DELETE:
            this.batchDelete();
            break;
          case EVENT_BTN_ENUM.EDIT:
            this.edit(item);
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
