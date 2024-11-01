import { filter } from '@/utils/helper/treeHelper';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
import SelectDeviceTable from './select-device-table/select-device-table.vue';
import { PacsCardHolderService, PacsDeviceAccessScheduleGroupService } from '@/apis';
import moment from 'moment';
import idHelper from '@/utils/helper/id-helper';

const { fromUTCDateToLocalDateHorizontalSymbol, fromLocalDateToUTCDateFormat: formateUtc } = useTimezone();

export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase],
  props: {
    pacsCardHolderId: {
      type: String,
      required: true,
    },
    idList: {
      type: Array<string>,
      default: () => [],
    },
  },
  data() {
    const list: any = [];
    return {
      id: this.pacsCardHolderId,
      selectedIdList: this.idList,
      list,
      defaultId: '',
      columns: [
        {
          title: this.l('Unified.texts.DeviceName'),
          dataIndex: 'deviceName',
          key: 'deviceName',
        },
        {
          title: this.l('Unified.texts.AccessScheduleGroup'),
          dataIndex: 'pacsDeviceAccessScheduleGroupId',
          key: 'pacsDeviceAccessScheduleGroupId',
        },
        {
          title: this.l('Unified.texts.StartDateTime'),
          dataIndex: 'startDateTime',
          key: 'startDateTime',
        },
        {
          title: this.l('Unified.texts.EndDateTime'),
          dataIndex: 'endDateTime',
          key: 'endDateTime',
        },
      ],
      selectedRowKeys: [],
      selectedRows: [] as any[],
      deviceAccessGroupDataSource: {
        service:
          'PacsDeviceAccessScheduleGroupService.getApiAppPacsDeviceAccessScheduleGroupComboxNdo', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
      },
    };
  },
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
        },
      };
    },
  },
  watch: {
    pacsCardHolderId(val: string) {
      this.id = val;
      this.fetchDataList();
    },
  },
  mounted() {
    this.getPageData();
    this.getDefaultGroup();
  },
  methods: {
    fromUTCDateToLocalDateHorizontalSymbol,
    guids() {
      return idHelper.genGuid();
    },
    fetchDataList() {
      // const queryFilter = (this.$refs.table as any).getSearchProps();
      // return PacsCardService.getApiAppPacsCardPaged(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.SELECT:
          this.selectCards();
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.batchDelete();
          break;
        default:
          break;
      }
    },
    getDefaultGroup() {
      PacsDeviceAccessScheduleGroupService.getApiAppPacsDeviceAccessScheduleGroupDefault()
        .then((res) => {
          if (res && res.id != '00000000-0000-0000-0000-000000000000' && res.id)
            this.defaultId = res.id as string;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPageData() {
   
      if (this.selectedIdList == null || this.selectedIdList.length == 0) return;
      this.loading = true;
      PacsCardHolderService.getApiAppPacsCardHolderPacsDevicePaged({
        selectedDeviceIdList: this.selectedIdList,
      })
        .then((res) => {
          this.list = res.items;
          this.listChange();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSelectedRowsId() {
      return this.selectedRows.map((m) => { return m.id; });
    },
    listChange() {
      let idList = this.list.map((m) => {
        return m.id;
      });
      this.selectedIdList = idList;
      this.$emit('update:deviceList', this.list);
    },
    selectCards() {
      let deviceIdList = this.list.map((m) => {
        return m.deviceId;
      });

      this.selectedRowKeys = [];
      const param = {
        pacsCardHolderId: this.id,
        deviceIdList: deviceIdList,
        _types: '',
        _titleName: 'Unified.texts.SelectDevice',
      };
      this.modalHelper.create(SelectDeviceTable, { ...param }, { size: 'large' }).subscribe((res) => {
        if (res) {
          // 相同的不变，没有的新增
          res.forEach((item: any) => {
            const index = this.list.findIndex((u) => u.deviceId == item.id);
            if (index == -1) {
              if (!this.list) this.list = [];
              this.list.push({
                id: '',
                pacsCardHolderId: this.pacsCardHolderId,
                deviceId: item.id,
                deviceName: item.name,
                startDateTime: null,
                endDateTime: null,
                pacsDeviceAccessScheduleGroupId: this.defaultId,
              });
            }
          });

          this.listChange();
        }
      });
    },
    /**
     * 批量删除
     */
    batchDelete() {
      if (this.selectedRowKeys.length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }

      const ids = this.selectedRowKeys;
      ids.forEach((item: any) => {
        let index = this.list.findIndex((u) => u.deviceId == item);
        if (index >= 0) {
          this.list.splice(index, 1);
          // this.selectedRowKeys.splice(item);
        }
      });
      this.listChange();
    },
  },
});
