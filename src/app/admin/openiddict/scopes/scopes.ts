import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';
import CreateScopesModal from './CreateScopesModal/CreateScopesModal.vue';
import ChangeHistoryModal from '../components/ChangeHistoryModal/ChangeHistoryModal.vue';
import { ScopesService, CustomOpenIddictService } from '@/apis';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';
import { h, defineComponent } from 'vue';

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
      queryFilter.filter = queryFilter.displayName;
      queryFilter.displayName = undefined;
      return ScopesService.getApiOpeniddictScopes1(queryFilter);
    },
    createOrEdit(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(CreateScopesModal, {
          pageDataList: selectItems,
        },{ width: '600px' })
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
      ScopesService.deleteApiOpeniddictScopes({
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
      console.log('selectItems');
      console.log(selectItems);
      if (selectItems.length < 1) {
        return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
      }
      this.modalHelper
        .create(CreateScopesModal, {
          pageDataList: selectItems,
        })
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
      if ((this.$refs.table as any).getSelectRowKeys().length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem', '1') });
        return;
      }
      const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('Unified.texts.ConfirmOperation')),
        content: () => h('span', t('Unified.texts.ConfirmDeleteXItemsWarningMessage')),
        onOk: async () => {
          (this.$refs.table as any).setLoading(true);
          CustomOpenIddictService.deleteApiAppCustomOpenIddictByIds({
            ids: ids,
          })
            .finally(() => {
              (this.$refs.table as any).setLoading(false);
            })
            .then(() => {
              (this.$refs.table as any).reloadGoFirstPage();
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            });
        },
      });
    },
    /* 历史变更 */
    changeHistory(item?) {
      const pageData = {
        entityId: item.id,
        entityTypeFullName: 'OpenIddict.EntityFrameworkCore.Models.OpenIddictScope',
      };
      // const pageData = {
      //   entityId: '7cd22a85-a30d-8340-33a9-3a14611a177d',
      //   entityTypeFullName: 'Volo.Abp.OpenIddict.Tokens.OpenIddictToken',
      // };
      this.modalHelper
        .create(ChangeHistoryModal, {
          pageData,
        })
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
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.batchDelete();
          break;
        case EVENT_BTN_ENUM.CHANGE_HISTORY:
          // 变更历史
          this.changeHistory(item);
          break;
        default:
          break;
      }
    },
  },
});
