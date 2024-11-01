import { SessionsService, Volo_Abp_Application_Dtos_PagedResultDto_1 } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { createVNode, defineComponent } from 'vue';
import CreateOrEditUserComponent from '@/app/admin/users/create-or-edit-user/create-or-edit-user.vue';
import SessionDetails from '@/app/admin/users/user-session/session-details/session-details.vue';
import UserStatement from '@/app/admin/users/user-statement/user-statement.vue';
import UserSetPassWord from '@/app/admin/users/user-set-password/user-set-password.vue';
import { UserStore } from '@/store/modules/user';
import { Modal } from 'ant-design-vue';
import RolesPermissionComponent from '@/app/admin/roles/permissions/permissions.vue';
import { useTimezone } from '@/timezones/useTimezone';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    _id: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item, column, record) => {
        switch (item.name) {
          // case EVENT_BTN_ENUM.DELETE:
          //   return !this.isAdmin(record) && !this.isCurrentUser(record);
          // case EVENT_BTN_ENUM.EDIT:
          //   return !this.isSuperAdmin(record);
          // case EVENT_BTN_ENUM.LOGIN_AS_THIS_USER:
          //   return !this.isAdmin(record) && !this.isCurrentUser(record);
          // case EVENT_BTN_ENUM.UNLOCK:
          //   return !this.isAdmin(record) && this.enabledUnlock();
          default:
            return true;
        }
      };
    },
  },
  methods: {
    /**
     * 用户列表
     */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.userId = this._id.toString();
      return SessionsService.getApiIdentitySessions(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.DETAIL:
          this.detail(item);
          break;
        case EVENT_BTN_ENUM.REVOCATION:
          this.revocationPopup(item);
        default:
          break;
      }
    },
    /**
     * 用户详情
     */
    detail(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(SessionDetails, {
          _id: selectItems,
        })
        .subscribe((res) => {});
    },
    /**
     * 撤销
     */
    revocationPopup(item?) {
      const th = this;
      Modal.confirm({
        title: () => `${this.l('AbpAccount.texts.AreYouSure')}`,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => `${this.l('AbpIdentity.texts.SessionRevokeConfirmationMessage')}`,
        onOk() {
          th.revocation(item);
        },
        onCancel() {},
      });
    },
    revocation(item?) {
      SessionsService.deleteApiIdentitySessions({
        id: item.id,
      })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        })
        .then(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          const userStore = UserStore.useStoreWithOut();
          userStore.logout(true);
        });
    },
  },
});
