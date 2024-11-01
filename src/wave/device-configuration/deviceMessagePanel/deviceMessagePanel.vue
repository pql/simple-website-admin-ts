<template>
  <div>
    <!-- <a-card class="m-2" :bodyStyle="{ padding: '10px 16px' }">
      <a-row>
        <a-col :span="4">
          <a-card hoverable style="background-color: #808080; " :bodyStyle="{ padding: '10px' }"
            class="w-[220px] text-center">
            <div>{{ l('Real Time Message') }}</div>
            <div>324324</div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card hoverable style="background-color:  #FF8C00;" :bodyStyle="{ padding: '10px', }"
            class="w-[220px] text-center">
            <div>{{ l('Real Time Message') }}</div>
            <div>324324</div>
          </a-card>
        </a-col>
        <a-col :span="4">
          <a-card hoverable style="background-color:  #FF6E00;" :bodyStyle="{ padding: '10px', }"
            class="w-[220px] text-center">
            <div>{{ l('Real Time Message') }}</div>
            <div>324324</div>
          </a-card>
        </a-col>
      </a-row>
    </a-card> -->
    <f-dynamic-table
      type="device-message-panel"
      ref="table"
      :fetch="fetchDataList"
      :showActionBtn="showActionBtn"
      :show-toolbar="false"
      @action-click="handleActionClick"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'statusName'">
          <div class="flex items-center">
            <a-tag
              :color="record.messageBackgroundColorCode"
              style="width: 25px; height: 15px"
              tle="record.statusName"
            />
            {{ record.statusName }}
          </div>
        </template>
      </template>
    </f-dynamic-table>
  </div>
</template>
<script lang="ts">
  import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
  import { DeviceMessagePanelService } from '/@/apis';
  import { defineComponent } from 'vue';
  import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';
  import DeviceMassagePanelView from './device-massage-panel-view/device-massage-panel-view.vue';
  import CreateOrEditDeviceMessagePanel from './add-or-edit-device-message-panel/add-or-edit-device-message-panel.vue';

  export default defineComponent({
    name: 'MessagePanel',
    components: {},
    mixins: [DynamicTableComponentBase],
    data() {
      return {
        // 请求参数
        filterText: undefined,
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
       * 添加  修改
       */
      createOrEdit(item) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(
            CreateOrEditDeviceMessagePanel,
            { pageDataList: this.selectItems },
            { width: 800 },
          )
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      viewDatail(item) {
        this.selectItems = [];
        if (!!item && item.id) {
          this.selectItems = [item.id];
        }
        this.modalHelper
          .create(DeviceMassagePanelView, { pageDataList: this.selectItems }, { width: 1300 })
          .subscribe((res) => {
            if (res) {
              (this.$refs.table as any).reloadGoFirstPage();
            }
          });
      },
      /**
       * 获取数据
       */
      fetchDataList(otherQuery) {
        const {
          maxResultCount,
          skipCount,
          sorting,
          functionId,
          deviceName,
          site,
          brand,
          submissionDate,
          vendorEventId,
          responseResult,
        } = this.getSearchProps();
        const requestBody = {
          filter: {
            functionId: functionId,
            deviceName: deviceName,
            site: site,
            brand: brand,
            submissionDate: submissionDate,
            vendorEventId: vendorEventId,
            responseResult: responseResult,
          },
          sorting: sorting,
          skipCount: otherQuery ? otherQuery.skipCount : skipCount,
          maxResultCount: otherQuery ? otherQuery.maxResultCount : maxResultCount,
        };

        return new Promise((resolve, reject) => {
          DeviceMessagePanelService.postApiAppDeviceMessagePanelPaged({
            requestBody: requestBody,
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
       * 按钮回调事件
       */
      handleActionClick(event: string, item?: any) {
        switch (event) {
          case EVENT_BTN_ENUM.VIEW_DETAILS:
            this.viewDatail(item);
            break;
          case EVENT_BTN_ENUM.EDIT:
            this.createOrEdit(item);
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
