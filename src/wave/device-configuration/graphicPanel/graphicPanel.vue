<template>
  <div>
    <f-dynamic-table
      type="graphic-panel"
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
        <template v-if="column.key === 'graphicUrl'">
          <img class="graphicImage" :src="record.graphicUrl" alt="" />
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>
<script lang="ts">
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  import { getFileUrlById } from '@/shared/components/f-upload/src/helper';

  import {
    // GraphicPanelListDto,
    // BuildingFloorModelServiceProxy,
    // GraphicPanelServiceProxy,
    FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto as GraphicPanelListDto,
    BuildingFloorModelService,
    GraphicPanelService,
    CustomFileDescriptorService,
  } from '/@/apis';
  import CreateOrEditGraphicPanel from './create-or-edit-graphicPanel/create-or-edit-graphicPanel.vue';
  import { defineComponent } from 'vue';
  // import _ from 'lodash';
  // import { GDynamicTable } from '/@/shared/components/g-dynamic-table';
  import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';
  // import { FloorPlan} from '/@/ams/component';
  import SettingGraphicPanel from './setting-graphic-panel/setting-graphic-panel.vue';

  export default defineComponent({
    name: 'SiteConfigurationDesignGraphicPanel',
    components: {
      // GDynamicTable,
      CreateOrEditGraphicPanel,
      // FloorPlan
    },
    mixins: [DynamicTableComponentBase],
    data() {
      return {
        // 请求参数
        filterText: undefined,
        dataList: [] as GraphicPanelListDto[],
        /** 选中 */
        selectItems: [] as any[],
      };
    },
    mounted() {},
    methods: {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      showActionBtn(item, column, record) {
        switch (item.name) {
          case 'Setting':
            return record.graphicPanelTypeName == 'Floor';
          default:
            return true;
        }
      },
      /**
       * 获取数据
       */
      fetchDataList(otherQuery) {
        const { maxResultCount, skipCount, sorting, graphicName, graphicTypeId, search } = (
          this.$refs.table as any
        ).getSearchProps();
        return new Promise((resolve, reject) => {
          GraphicPanelService.getApiAppGraphicPanelPaged({
            filterSearch: search,
            filterGraphicName: !graphicName ? '' : graphicName,
            filterGraphicTypeId: !graphicTypeId ? '' : graphicTypeId,
            sorting: sorting,
            skipCount: otherQuery ? otherQuery.skipCount : skipCount,
            maxResultCount: otherQuery ? otherQuery.maxResultCount : maxResultCount,
          })
            .finally(() => {
              // finishedCallback!();
            })
            .then(async (res) => {
              // if (res && Array.isArray(res.items)) {
              //   for (const item of res.items) {
              //     if(item['graphicUrl']){
              //      item['graphicUrl'] = await getFileUrlById(item?.graphicUrl);
              //     }
              //   }
              // }
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
      createOrEdit(item?: GraphicPanelListDto) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(CreateOrEditGraphicPanel, { pageDataList: this.selectItems }, { size: 600 })
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
          return;
        }
        const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
        this.confirm({
          iconType: 'warning',
          title: () => this.l('Unified.texts.ConfirmOperation'),
          content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
          onOk: () => {
            (this.$refs.table as any).setLoading(true);
            GraphicPanelService.postApiAppGraphicPanelBatchDelete({
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
                    message: this.l('Unified.texts.Faildeleted:SomegraphicPanelhavebeenbound'),
                  });
                }
              });
          },
        });
      },
      /**
       * 单个删除
       */
      deleteItem(item: GraphicPanelListDto) {
        (this.$refs.table as any).setLoading(true);
        GraphicPanelService.deleteApiAppGraphicPanel({
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
                message: this.l('Unified.texts.Faildeleted:ThegraphicPanelhasbeenbound'),
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
          .create(CreateOrEditGraphicPanel, { pageDataList: this.selectItems }, { width: 600 })
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      /**
       * 设置FloorPlan
       */
      settingFloorPlan(item: GraphicPanelListDto) {
        this.modalHelper
          .create(
            SettingGraphicPanel,
            {
              graphicStoragePath: `${item.decompressingFileId}/${item.graphicStoragePath}`,
              graphicPanelId: item.id,
            },
            {
              size: 'large',
            },
          )
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
        // BuildingFloorModelService.getApiAppBuildingFloorModelById({
        //   id: item.modelId as string
        // }).then((res) => {
        //   console.log(item.id, 'res.fileName', res)
        //   this.modalHelper
        //     .create(SettingGraphicPanel, {
        //       graphicStoragePath: `${item.decompressingFileId}/${item.graphicStoragePath}`,
        //       graphicPanelId: item.id,
        //     }, {
        //       size: 'large'
        //     })
        //     .subscribe((res) => {
        //       if (res) {
        //         (this.$refs.table as any).reloadGoFirstPage();
        //       }
        //     });
        // });
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
          case 'Setting':
            this.settingFloorPlan(item);
            break;
          default:
            break;
        }
      },
    },
  });
</script>
<style lang="less" scoped>
  .graphicImage {
    width: 40px;
  }
</style>
