import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '@/shared/components/f-dynamic-table';
import CreateOpenIddictModal from '@/app/admin/openiddict/applications/CreateOpenIddictModal/CreateOpenIddictModal.vue';
import TokenValidityPeriod from '@/app/admin/openiddict/applications/TokenValidityPeriod/TokenValidityPeriod.vue';
import ChangeHistoryModal from '@/app/admin/openiddict/components/ChangeHistoryModal/ChangeHistoryModal.vue';
import RolesPermissionComponent from '@/app/admin/roles/permissions/permissions.vue';
import { ApplicationsService, CustomOpenIddictService } from '@/apis';
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
     * openiddict列表
     */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.filter = queryFilter.displayName;
      queryFilter.displayName = undefined;
      return ApplicationsService.getApiOpeniddictApplications1(queryFilter);
    },
    createOrEdit(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(CreateOpenIddictModal, {
          pageDataList: selectItems,
        })
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
      ApplicationsService.deleteApiOpeniddictApplications({
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
        .create(CreateOpenIddictModal, {
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
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
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

    /**
     * Token 有效期
     */
    tokenPeriod(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(TokenValidityPeriod, {
          pageDataList: selectItems,
        },{ width: '700px' })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 历史变更
     */
    changeHistory(item?) {
      const pageData = {
        entityId: item.id,
        entityTypeFullName: 'OpenIddict.EntityFrameworkCore.Models.OpenIddictScope',
      };
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
     * 角色权限
     */

    permissions(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.clientId];
      }
      this.modalHelper
        .create(RolesPermissionComponent, {
          pageDataList: selectItems,
          providerName: 'C',
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
        case EVENT_BTN_ENUM.TOKEN_VALIDITY_PERIOD:
          this.tokenPeriod(item);
          break;
        case EVENT_BTN_ENUM.CHANGE_HISTORY:
          this.changeHistory(item);
          break;
        case EVENT_BTN_ENUM.PERMISSIONS:
          this.permissions(item);
          break;
        default:
          break;
      }
    },
  },
});
