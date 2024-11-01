import { filter } from '@/utils/helper/treeHelper';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
import SelectCompanyTable from './select-company-table/select-company-table.vue';
import { PacsCompanyService } from '@/apis';

const { fromUTCDateToLocalDateHorizontalSymbol } = useTimezone();
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
    const pacsCompanyIdList: any = [];
    return {
      id: this.pacsCardHolderId,
      selectedIdList: this.idList,
      pacsCompanyIdList,
      list,
      columns: [
        {
          title: this.l('Unified.texts.CompanyName'),
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: this.l('Unified.texts.Address1'),
          dataIndex: 'address1',
          key: 'address1',
        },
        {
          title: this.l('Unified.texts.Address2'),
          dataIndex: 'address2',
          key: 'address2',
        },
        {
          title: this.l('Unified.texts.City'),
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: this.l('Unified.texts.State'),
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: this.l('Unified.texts.Zip'),
          dataIndex: 'zip',
          key: 'zip',
        },
        {
          title: this.l('Unified.texts.Description'),
          dataIndex: 'description',
          key: 'description',
        },
      ],
      selectedRowKeys: [],
      selectedRows: [] as any[],
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
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        //   },
        // }),
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
    this.getPageData(this.id);
  },
  methods: {
    fromUTCDateToLocalDateHorizontalSymbol,
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
    getPageData(pacsCardHolderId?) {
      this.id = pacsCardHolderId;
      if (this.selectedIdList == null || this.selectedIdList.length == 0) return;
      this.loading = true;
      PacsCompanyService.postApiAppPacsCompanyIdList({
        requestBody: { pacsCardHolderId, idList: this.selectedIdList },
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
    listChange() {
      let idList = this.list.map((m) => {
        return m.id;
      });
      this.selectedIdList = idList;
      this.$emit('update:idLists', idList);
    },
    selectCards() {
      this.selectedRowKeys = [];
      const param = {
        pacsCardHolderId: this.id,
        selectedIdList: this.selectedIdList,
        _types: '',
        _titleName: 'Unified.texts.SelectCompany',
      };
      this.modalHelper.create(SelectCompanyTable, { ...param }, { size: 'medium' }).subscribe((res) => {
        if (res) {
          // this.selectedIdList = res;
          // this.getPageData();
          this.setSelectedList(res);
        }
      });
    },
    setSelectedList(itemList?) {
      if (itemList) {
        // 没有的删除
        // this.list.forEach((item: any) => {
        //   const index = itemList.findIndex((u) => u.pacsCompanyId == item.pacsCompanyId);
        //   if (index == -1) {
        //     this.list.splice(index, 1);
        //   }
        // });

        // 有的不变，新增的添加
        itemList.forEach((item: any) => {
          const index = this.list.findIndex((u) => u.id == item.id);
          if (index == -1) {
            this.list.push(item);
          }
        });
      } else {
        this.list = [];
      }

      this.listChange();
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
        const index = this.list.findIndex((u) => u.id == item);
        if (index >= 0) {
          this.list.splice(index, 1);
        }
      });
      this.listChange();
    },
  },
});
