import { defineComponent } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import {
  // PanelPermissionControlServiceProxy
  PanelPermissionControlService,
} from '/@/apis';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';
export default defineComponent({
  components: {
    ReloadOutlined,
  },
  props: {
    defaultSelectDeviceList: {
      type: Array,
    },
    deviceType: {
      type: String,
    },
    deviceTypeId: {
      type: String,
    },
    deviceName: {
      type: String,
    },
    //数量限制
    numLimit: {
      type: Number,
    },
    hideSelectAll: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [DynamicTableComponentBase],
  emits: ['selectedDeviceChange'],
  watch: {
    deviceType(n, l) {
      if ((n == undefined || n == null) && (l == undefined || l == null)) {
        this.data = [];
        this.setPagination.current = 1;
        this.setPagination.total = 0;
        return;
      }

      this.setPagination.current = 1;
      this.fetchDataList(this.setPagination);
    },
    deviceTypeId(n, l) {
      if ((n == undefined || n == null) && (l == undefined || l == null)) {
        this.data = [];
        this.setPagination.current = 1;
        this.setPagination.total = 0;
        return;
      }

      this.setPagination.current = 1;
      this.fetchDataList(this.setPagination);
    },
    deviceName() {
      this.setPagination.current = 1;
      this.fetchDataList(this.setPagination);
    },
  },
  data() {
    return {
      // _serviceProxy: new PanelPermissionControlServiceProxy(),
      selectedRowKeys: [],
      selectedRows: [],
      columns: [
        {
          title: 'Device Name',
          dataIndex: 'deviceName',
        },
        {
          title: 'Device Type',
          dataIndex: 'deviceType',
        },
      ],
      data: [],
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

      // this.deviceName ? this.deviceName : '',
      // this.deviceTypeId,
      // this.deviceType,
      // '',
      // otherQuery.pageSize,
      // (otherQuery.current - 1) * otherQuery.pageSize
      let maxCount = (otherQuery.current - 1) * otherQuery.pageSize;
      PanelPermissionControlService.getApiAppPanelPermissionControlDevicePermissionPaged({
        filterDeviceTypeId: this.deviceTypeId,
        filterDeviceType: this.deviceType,
        filter: this.deviceName,
        sorting: '',
        skipCount: maxCount == 0 ? 0 : maxCount,
        maxResultCount: otherQuery.pageSize,
      })
        .finally(() => {
          this.loading = false;
        })
        .then((res) => {
          this.data = res.items as [];
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
        //选择数量不能超出限定数量
        if (!this.selectedRowKeys) this.selectedRowKeys = [];
        if (this.selectedRowKeys.length + 1 > this.numLimit) {
          message.warning('You can select up to 4 cameras');
          return;
        }
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
        //选择数量不能超出限定数量
        if (!this.selectedRowKeys) this.selectedRowKeys = [];
        if (this.selectedRowKeys.length + changeRows.length > this.numLimit) {
          message.warning('You can select up to 4 cameras');
          return;
        }
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
