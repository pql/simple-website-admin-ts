<template>
  <div>
    <f-dynamic-table
      type="redundant-server"
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
  import ModalComponentBase from '@/shared/component-base/modal-component-base';
  import {
    // RedundantServerListDto,
    // RedundantServerServiceProxy
    FireBytes_Unified_Wave_RedundantServers_Dtos_RedundantServerListDto as RedundantServerListDto,
    RedundantServerService,
  } from '/@/apis';
  import CreateOrEditRedundantServer from './create-or-edit-redundant-server/create-or-edit-redundant-server.vue';
  import { defineComponent } from 'vue';
  // import _ from 'lodash';
  // import { GDynamicTable } from '/@/shared/components/g-dynamic-table';
  import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';
  export default defineComponent({
    name: 'redundant-server',
    components: {
      // GDynamicTable,
    },
    mixins: [ModalComponentBase],
    props: {
      deviceId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        // 请求参数
        filterText: undefined,
        dataList: [] as RedundantServerListDto[],
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
        const { maxResultCount, skipCount, sorting, filterText } = (
          this.$refs.table as any
        ).getSearchProps();
        return new Promise((resolve, reject) => {
          // this.deviceId,
          // 		filterText,
          // 		sorting,
          // 		!!otherQuery ? otherQuery.maxResultCount : maxResultCount,
          // 		!!otherQuery ? otherQuery.skipCount : skipCount,

          let maxCount = !!otherQuery ? otherQuery.maxResultCount : maxResultCount;
          RedundantServerService.getApiAppRedundantServerPaged({
            deviceId: this.deviceId,
            filter: filterText,
            sorting: sorting,
            skipCount: !!otherQuery ? otherQuery.skipCount : skipCount,
            maxResultCount: maxCount == 0 ? 0 : maxCount,
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
      createOrEdit(item?: RedundantServerListDto) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditRedundantServer, {
            pageDataList: this.selectItems,
            deviceId: this.deviceId,
          },{width:600})
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
          return tthis.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        }
        this.selectItems = arr;
        this.modalHelper
          .create(CreateOrEditRedundantServer, { pageDataList: this.selectItems })
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
            RedundantServerService.postApiAppRedundantServerBatchDelete({
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
      deleteItem(item: RedundantServerListDto) {
        (this.$refs.table as any).setLoading(true);
        RedundantServerService.deleteApiAppRedundantServer({
          id: item.id,
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
