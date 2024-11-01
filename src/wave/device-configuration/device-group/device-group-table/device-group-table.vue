<template>
  <a-spin :spinning="isTableLoading" wrapperClassName="spinning-container">
    <div class="header-container" ref="headerContainer">
      <a-card :bordered="false">
        <a-space class="mb-5">
          <!-- 添加菜单 -->
          <a-button type="primary" @click="createOrEdit" v-if="isGrantedAny('Unified.CommandGroup.Edit')">
            <plus-outlined />
            <span>{{ l('Unified.texts.Create') }}</span>
          </a-button>

          <!-- 批量删除 -->
          <a-button type="error" @click="batchDelete()" v-if="isGrantedAny('Unified.CommandGroup.Delete')">
            <i class="iconfont icon-f-delete mr-2" style="font-size: 14px"></i>
            <span>{{ l('Unified.texts.Delete') }}</span>
          </a-button>
        </a-space>

        <a-form :layout="'vertical'" @submit.prevent="getSearchData">
          <a-form-item class="mb-3.5">
            <a-input-search
              name="filterText"
              @search="getSearchData"
              enterButton
              v-model:value="filterText"
            />
          </a-form-item>
        </a-form>
      </a-card>
    </div>
    <!-- 表格 -->
    <div class="table-container">
      <a-table
        class="customTable"
        :bordered="true"
        :scroll="{ x: '100%', y: `calc(100vh - 325x)` }"
        :rowKey="(record) => record.id"
        :columns="columns"
        :data-source="dataList"
        :pagination="{
          total: totalItems,
          showTotal: (total) => `Total: ${total}`, // 显示总条数,
          current: pageNumber,
          pageSize: pageSize,
          showQuickJumper: true,
          showSizeChanger: true,
          change: pageNumberChange,
          showSizeChange: pageNumberChange,
          pageSizeOptions: pageSizeOptions,
          size: 'small',
        }"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          checkAll: checkAll,
        }"
        :customRow="customRow"
        @change="tableChange"
      >
        <!-- tbody插槽 -->
        <template #bodyCell="{ column, record }">
          <!-- 菜单名称 -->
          <template v-if="column.key === 'groupName'">
            <a-dropdown :trigger="['contextmenu']" v-if="isGrantedAny('Pages.DeviceGroup.Edit')">
              <span>
                {{ record.groupName }}
              </span>
              <template #overlay>
                <a-menu>
                  <!-- v-if="isGranted('Pages.DeviceGroup.Edit')" -->
                  <a-menu-item @click="createOrEdit(record)">
                    <a href="javascript:;">
                      <span>{{ l('Unified.texts.Edit') }}</span>
                    </a>
                  </a-menu-item>
                  <a-menu-item v-if="!record.isSystem && !record.isDefault">
                    <a-popconfirm
                      placement="top"
                      :ok-text="l('Unified.texts.common:okText')"
                      :cancel-text="l('	Unified.texts.Cancel')"
                      @confirm="deleteItem(record)"
                    >
                      <template #title>{{
                        l('Unified.texts.ConfirmDeleteWarningMessage')
                      }}</template>
                      <a>
                        {{ l('Unified.texts.Delete') }}
                      </a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </template>
      </a-table>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IPagedRequestDto } from '/@/shared/component-base/interfaces';
  import PagedListingComponentBase from '/@/shared/component-base/paged-listing-component-base';
  import {
    FireBytes_Unified_Wave_DeviceGroups_Dtos_DeviceGroupListDto as DeviceGroupListDto,
    DeviceGroupService,
  } from '/@/apis';
  import CreateOrEditDeviceGroup from '../create-or-edit-device-group/create-or-edit-device-group.vue';
  import { ColumnType } from 'ant-design-vue/lib/table';

  export default defineComponent({
    name: 'DynamicMenuTable',
    components: {
      CreateOrEditDeviceGroup,
    },
    mixins: [PagedListingComponentBase],
    data() {
      return {
        /** 数据 */
        dataList: [] as DeviceGroupListDto[],
      };
    },
    methods: {
      customRow(record, index) {
        return {
          onClick: (event) => {
            this.$emit('selectedNode', record);
          },
        };
      },
      /**
       * 获取数据
       */
      fetchDataList(request: IPagedRequestDto, finishedCallback?: () => void) {
        DeviceGroupService.getApiAppDeviceGroupPaged({
          filter: this.filterText,
          sorting: request.sorting,
          skipCount: request.skipCount,
          maxResultCount: request.maxResultCount,
        })
          .finally(() => {
            finishedCallback!();
          })
          .then((res) => {
            this.showPaging(res);
          });
      },
      /**
       * 单个删除
       */
      deleteItem(item: DeviceGroupListDto) {
        this.isTableLoading = true;
        DeviceGroupService.deleteApiAppDeviceGroup({
          id: item.id,
        })
          .finally(() => {
            this.isTableLoading = false;
          })
          .then((res) => {
            if (res) {
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
              this.refreshGoFirstPage();
            } else {
              this.notify.error({
                message: this.l('Unified.texts.Faildeleted:Thecommandgrouphasbeenbound'),
              });
            }
          });
      },
      /**
       * 批量删除
       */
      batchDelete() {
        if (this.selectedCount <= 0) {
          this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
          return;
        }
        // this.message.confirm(
        //     this.l('ConfirmDeleteXItemsWarningMessage', this.selectedCount),
        //     '',
        //     (res: any) => {
        //         if (res) {
        //             const ids = [...this.selectedRowKeys];
        //             this.isTableLoading = true;
        //             this.deviceGroupServiceProxy
        //                 .batchDelete(ids)
        //                 .finally(() => {
        //                     this.isTableLoading = false;
        //                 })
        //                 .then((res) => {
        //                     if (res) {
        //                         this.notify.success(this.l('Unified.texts.SavedSuccessfully'));
        //                         this.refreshGoFirstPage();
        //                     } else {
        //                         this.notify.error(this.l('Fail deleted. Some command group have been bound '));
        //                     }
        //                 });
        //         }
        //     },
        // );

        const ids = [...this.selectedRowKeys];
        this.confirm({
          iconType: 'warning',
          title: () => this.l('Unified.texts.ConfirmOperation'),
          content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
          onOk: () => {
            this.isTableLoading = true;
            DeviceGroupService.postApiAppDeviceGroupBatchDelete({
              requestBody: ids,
            })
              .finally(() => {
                this.isTableLoading = false;
              })
              .then((res) => {
                if (res) {
                  this.notify.success({
                    message: this.l('Unified.texts.SavedSuccessfully'),
                  });
                  this.refreshGoFirstPage();
                } else {
                  this.notify.error({
                    message: this.l('Unified.texts.Faildeleted:Somecommandgrouphavebeenbound'),
                  });
                }
              });
          },
        });
      },
      /** 获取列配置 */
      getColumns(): ColumnType<DeviceGroupListDto>[] {
        return [
          {
            title: this.l('Unified.texts.DeviceBroadcast'),
            dataIndex: 'groupName',
            key: 'groupName',
            width: 205,
            ellipsis: true,
            sorter: {
              multiple: 0,
            },
          },
        ];
      },
      /**
       * 添加 修改
       */
      createOrEdit(item?: DeviceGroupListDto) {
        var selectItems = [];
        if (!!item && item.id) {
          selectItems = [item.id];
        }
        this.modalHelper
          .create(
            CreateOrEditDeviceGroup,
            {
              pageDataList: selectItems,
            },
            { width: 500 },
          )
          .subscribe((res) => {
            if (res) {
              this.refresh();
            }
          });
      },
    },
  });
</script>
<style lang="less" scoped>
  :deep(.ant-card-body) {
    padding: 6px;
  }

  :deep(.ant-row) {
    width: 100% !important;
  }

  .table-container {
    margin: 6px;
  }

  :deep(.ant-table-body) {
    width: 100%;
    height: calc(100vh - 325px);
  }

  :deep(.ant-table-pagination-right) {
    justify-content: center;
  }

  .edit-icon,
  .delete-icon,
  .copy-icon {
    margin-right: 5px;
  }

  .edit-icon,
  .copy-icon {
    color: #009ef7;
  }

  .delete-icon {
    color: #f2416c;
  }

  .name-text {
    display: inline-block;
    max-width: 126px;
    margin-right: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  :deep(.ant-divider-horizontal) {
    margin: 20px 0;
  }

  .ant-card:not(.ant-card-bordered) {
    box-shadow: none;
  }
</style>
