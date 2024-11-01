import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import CreateClaimTypesModal from '@/app/admin/claimTypes/CreateClaimTypesModal/CreateClaimTypesModal.vue';
import { defineComponent } from 'vue';
import { ClaimTypeService } from '@/apis';
import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';

export default defineComponent({
  mixins: [DynamicTableComponentBase],

  data() {
    return {
      loading: true,
    };
  },
  computed: {},
  methods: {
    /**
     * 列表
     */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.filter = queryFilter.name;
      queryFilter.name = undefined;
      return ClaimTypeService.getApiIdentityClaimTypes(queryFilter);
    },
    createOrEdit(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(CreateClaimTypesModal, {
          pageDataList: selectItems,
        },{width:'800px'})
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 单个删除
     */
    deleteItem(item?) {
      (this.$refs.table as any).setLoading(true);
      ClaimTypeService.deleteApiIdentityClaimTypes({
        id: item.id,
      })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        })
        .finally(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          (this.$refs.table as any).setLoading(false);
        });
    },
    /**
     * 批量编辑
     */
    bulkEdit() {
      const selectItems = (this.$refs.table as any).getSelectRowKeys();
      if (selectItems.length < 1) {
        return this.notify.warn({
          message: this.l('Unified.texts.PleaseSelectAtLeastOneItem'), 
        });
      }
      this.modalHelper
        .create(CreateClaimTypesModal, {
          pageDataList: selectItems,
        },{width:'800px'})
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit();
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.deleteItem(item);
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
