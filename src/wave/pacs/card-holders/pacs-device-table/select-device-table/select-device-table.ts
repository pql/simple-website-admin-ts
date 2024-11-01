import { DeviceService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import CreateoOrEditCards from '@/wave/pacs/cards/create-or-edit-cards/create-or-edit-cards.vue';

const { fromUTCDateToLocalDateTimeHorizontalSymbol } = useTimezone();
export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase, ModalComponentBase],
  props: {
    pacsCardHolderId: {
      type: String,
      required: true,
    },
    deviceIdList: {
      type: Array,
      required: true,
      default: () => [],
    },
    _types: {
      type: String,
      required: true,
    },
    _titleName: {
      type: String,
      required: true,
    },
  },
  emits: ['selectedCardChange'],
  data() {
    return {
      selectedDatas: [],
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
  },
  methods: {
    fromUTCDateToLocalDateTimeHorizontalSymbol,
    fetchCardsDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.filterNotIdList = this.deviceIdList;
      return DeviceService.getApiAppDevicePaged(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit();
          break;
        default:
          break;
      }
    },
    createOrEdit(item?) {
      const param = {
        pageDataList: [],
        _types: '',
        _titleName: 'Unified.texts.CreateNewCards',
      };
      this.modalHelper.create(CreateoOrEditCards, { ...param }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    handleFetchSuccess() {
      const tableData = (this.$refs.table as any).tableData;
      tableData.items?.forEach((item) => {
        const exist = this.deviceIdList?.find((f) => f == item.id);
        if (exist) {
          setTimeout(() => {
            (this.$refs.table as any).tableRef.selectRow(item);
          }, 0);
        }
      });
    },
    handleSubmit() {
      const table = this.$refs.table as any;
      const checkData = table?.getSelectRowKeys() ?? [];

      const data: any = [];
      const source = table?.getDataSource();
      source.forEach((item: any) => {
        const index = checkData.findIndex((u) => u == item.id);
        if (index >= 0) {
          data.push({ id: item.id, name: item.deviceName });
        }
      });

      this.success(data);
    },
  },
});
