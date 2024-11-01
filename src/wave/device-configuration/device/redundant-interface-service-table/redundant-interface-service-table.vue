<template>
  <a-spin :spinning="loading">
    <div>
      <a-table class="customTable"  :scroll="{ y: 455 }" :bordered="true" @change="onChange" :pagination="setPagination" :row-selection="{
        selectedRowKeys: selectedRowKeys,
        // //onChange: onSelectChange ,
        onSelect: onSelect,
        onSelectAll: onSelectAll,
        hideSelectAll: true,
      }" :columns="columns" :data-source="data" />
    </div>
  </a-spin>
</template>
<script lang="ts">
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  // InterfaceServiceServiceProxy
  InterfaceServiceService,
} from '/@/apis';
import CreateOrEditRedundantServer from './create-or-edit-redundant-server/create-or-edit-redundant-server.vue';
import { defineComponent } from 'vue';
// import _ from 'lodash';
import { cloneDeep } from 'lodash-es';

// import { GDynamicTable } from '/@/shared/components/g-dynamic-table';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
export default defineComponent({
  name: 'redundant-interface-service-table',
  components: {
    // GDynamicTable,
  },
  mixins: [ModalComponentBase],
  props: {
    defaultSelectDeviceList: {
      type: Array,
    },
  },
  watch: {
    defaultSelectDeviceList() {
      this.selectedRowKeys = this.defaultSelectDeviceList as [];
    },
  },
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],
      columns: [
        {
          title: this.l('Unified.texts.Table:InterfaceService'),
          dataIndex: 'serviceName',
          key: 'id',
        },
      ],
      data: [] as any,
      setPagination: {
        /** 分页大小 */
        pageSize: 10,
        /** 分页选项 */
        pageSizeOptions: ['10','10','50','100'],
        /** 当前页 */
        current: 1,
        /** 总页数 */
        totalPages: 1,
        /** 总记录数 */
        total: 0,
        size: 'small',
        showQuickJumper: true,
        showSizeChanger: true,
        hideOnSinglePage: false,
      },
    };
  },
  mounted() {
    this.selectedRowKeys = this.defaultSelectDeviceList as [];
    this.fetchDataList(this.setPagination);
  },
  methods: {
    /**
     * 获取数据
     */
    fetchDataList(otherQuery) {
      this.loading = true;
      let maxCount = (otherQuery.current - 1) * otherQuery.pageSize;
      InterfaceServiceService.getApiAppInterfaceServicePaged({
        filterInterfaceService: '',
        filterServiceIp: '',
        filterInterfaceBrandId: '',
        sorting: '',
        skipCount: maxCount == 0 ? 0 : maxCount,
        maxResultCount: otherQuery.pageSize,
      })
        .finally(() => {
          this.loading = false;
        })
        .then((res) => {
          this.data = res.items as any;
          for (const item of this.data) {
            item.key = item.id;
          }
          const pagination = this.setPagination;
          pagination.total = res.totalCount as number;
          this.setPagination = pagination;
        })
        .catch((error) => { });
    },
    //选择事件
    onSelect(record, selected, selectedRows) {
      //选中
      if (selected) {
        this.selectedRowKeys.push(record.key);
      }
      //取消选中
      if (!selected) {
        const delIndex = this.selectedRowKeys.findIndex((val) => {
          return val === record.key;
        });
        this.selectedRowKeys.splice(delIndex, 1);
      }
      this.$emit('selectedDeviceChange', this.selectedRowKeys);
    },
    //多选事件
    onSelectAll(selected, selectedRows, changeRows) {
      //全选
      if (selected) {
        for (const row of changeRows) {
          this.selectedRowKeys.push(row.key);
        }
      }
      //全部选
      if (!selected) {
        for (const row of changeRows) {
          const delIndex = this.selectedRowKeys.findIndex((val) => {
            return val === row.key;
          });
          this.selectedRowKeys.splice(delIndex, 1);
        }
      }

      this.$emit('selectedDeviceChange', this.selectedRowKeys);
    },
    onChange(pagination) {
      this.setPagination = pagination;
      this.fetchDataList(pagination);
    },
    //筛选
    filterButton() {
      this.fetchDataList(this.setPagination);
    },
    setSelectedRowKeys(val) {
      this.selectedRowKeys = cloneDeep(val);
    },
    reload() {
      this.fetchDataList(this.setPagination);
    },
  },
});
</script>
