import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { PacsCompanyService } from '@/apis';
import CreateoOrEditCompany from '@/wave/pacs/companys/create-or-edit-company/create-or-edit-company.vue';

const { fromUTCDateToLocalDateHorizontalSymbol } = useTimezone();
export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase, ModalComponentBase],
  props: {
    pacsCardHolderId: {
      type: String,
      required: true,
    },
    selectedIdList: {
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
    fromUTCDateToLocalDateHorizontalSymbol,
    fetchCardsDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.notIdList = this.selectedIdList;
      return PacsCompanyService.getApiAppPacsCompanyPaged(queryFilter);
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
        _titleName: 'Unified.texts.CreateNewCompany',
      };
      this.modalHelper.create(CreateoOrEditCompany, { ...param }).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    handleFetchSuccess() {
      // const tableData = (this.$refs.table as any).tableData;
      // tableData.items?.forEach((item) => {
      //   let exist = this.selectedIdList?.find((f) => f == item.id);
      //   if (exist) {
      //     setTimeout(() => {
      //       (this.$refs.table as any).tableRef.selectRow(item);
      //     }, 0);
      //   }
      // });
    },
    handleSubmit() {
      const table = this.$refs.table as any;
      let checkData = table?.getSelectRowKeys() ?? [];

      let data: any = [];
      let source = table?.getDataSource();
      source.forEach((item: any) => {
        const index = checkData.findIndex((u) => u == item.id);
        if (index >= 0) {
          data.push({
            id: item.id,
            companyName: item.companyName,
            zip: item.zip,
            city: item.city,
            state: item.state,
            address1: item.address1,
            address2: item.address2,
            description: item.description,
          });
        }
      });

      this.success(data);
    },
  },
});
