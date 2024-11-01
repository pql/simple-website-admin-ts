import { defineComponent } from 'vue';
import DeviceGroupTable from './device-group-table/device-group-table.vue';
import CreateOrEditDeviceGroupDeviceFunctions from './create-or-edit-device-group-device-functions/create-or-edit-device-group-device-functions.vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import DeviceTypeFunctionSelect from '/@/wave/component/select/device-type-function-select.vue';
import {
  // DeviceGroupListDto,
  // DeviceGroupServiceProxy,
  // DeviceGroupDeviceFunctionsServiceProxy,
  // DeviceGroupDeviceFunctionsEditDto,
  // CreateOrUpdateDeviceGroupDeviceFunctionsInput
  FireBytes_Unified_Wave_DeviceGroups_Dtos_DeviceGroupListDto as DeviceGroupListDto,
  DeviceGroupService,
  DeviceGroupDeviceFunctionsService,
  FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_DeviceGroupDeviceFunctionsEditDto as DeviceGroupDeviceFunctionsEditDto,
  FireBytes_Unified_Wave_DeviceGroupDeviceFunctionss_Dtos_CreateOrUpdateDeviceGroupDeviceFunctionsInput as CreateOrUpdateDeviceGroupDeviceFunctionsInput,
} from '/@/apis';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';

export default defineComponent({
  components: {
    DeviceGroupTable,
    DeviceTypeFunctionSelect,
  },
  mixins: [DynamicTableComponentBase],
  data() {
    return {
      // 请求参数
      filterText: undefined,
      /** 选中 */
      selectItems: [] as any[],
      //列表加载
      tableLoading: false,
      selectedTree: null, // 选择的树结构
    };
  },
  methods: {
    changeDeviceFunction(deviceTypeFunctionId, updateEntity) {
      this.tableLoading = true;
      updateEntity.deviceTypeFunctionId = deviceTypeFunctionId;
      const input = {} as CreateOrUpdateDeviceGroupDeviceFunctionsInput;
      input.deviceGroupDeviceFunctions = updateEntity;
      DeviceGroupDeviceFunctionsService.postApiAppDeviceGroupDeviceFunctionsOrUpdate({
        requestBody: input,
      }).then((res) => {
        this.tableLoading = false;
        this.notify.success({
          message: this.l('Unified.texts.SavedSuccessfully'),
        });
      });
    },
    /**
     * 选择树结构
     */
    selectedNodeFunc(data) {
      this.selectedTree = data;
      (this.$refs.table as any).reloadGoFirstPage();
    },
    /**
     * 获取数据
     */
    fetchDataList(otherQuery) {
      if (this.selectedTree == null) return;
      const { maxResultCount, skipCount, sorting, filterText } = (
        this.$refs.table as any
      ).getSearchProps();
      return new Promise((resolve, reject) => {
        DeviceGroupDeviceFunctionsService.getApiAppDeviceGroupDeviceFunctionsPaged({
          deviceGroupId: this.selectedTree?.id,
          filter: filterText,
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
    /**
     * 添加  修改
     */
    createOrEdit(item?: DeviceGroupListDto) {
      this.selectItems = [];
      if (!!item && item.id) {
        this.selectItems = [item.id];
      }
      this.modalHelper
        .create(
          CreateOrEditDeviceGroupDeviceFunctions,
          {
            pageDataList: this.selectItems,
            deviceGroupId: this.selectedTree?.id,
          },
          { width: 600 },
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
      const arr = (this.$refs.table as any).getSelectRowKeys();
      if (arr.length < 1) {
        return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
      }
      this.selectItems = arr;
      this.modalHelper
        .create(
          CreateOrEditDeviceGroupDeviceFunctions,
          { pageDataList: this.selectItems },
          { width: 600 },
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
      // this.message.confirm(
      //   this.l('ConfirmDeleteXItemsWarningMessage', [table.getSelectRowKeys().length]),
      //   '',
      //   (res) => {
      //     if (res) {
      //       const ids = [...table.getSelectRowKeys()];
      //       (this.$refs.table as any).setLoading(true);
      //       this._deviceGroupDeviceFunctionsServiceProxy
      //         .batchDelete(ids)
      //         .finally(() => {
      //           (this.$refs.table as any).setLoading(false);
      //         })
      //         .then((res) => {
      //           (this.$refs.table as any).reloadGoFirstPage();
      //           this.notify.success(this.l('Unified.texts.SavedSuccessfully'));
      //         });
      //     }
      //   }
      // );

      const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
        onOk: () => {
          (this.$refs.table as any).setLoading(true);
          DeviceGroupDeviceFunctionsService.postApiAppDeviceGroupDeviceFunctionsBatchDelete({
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
    deleteItem(item: DeviceGroupListDto) {
      (this.$refs.table as any).setLoading(true);
      DeviceGroupDeviceFunctionsService.deleteApiAppDeviceGroupDeviceFunctions({
        id: item.id as string,
      })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        })
        .then((res) => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({
            message: this.l('Unified.texts.SavedSuccessfully'),
          });
        });
    },
  },
});
