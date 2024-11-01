import {
  CustomLinkUsersService,
  FireBytes_Unified_LinkUsers_Dtos_SaveLinkUsersDto,
  CustomUserService,
} from '@/apis';
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
import { OidcClient } from '@/utils/auth/oidc';
import CreateLinkUser from './create-link-user/create-link-user.vue';

const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();
const userStore = UserStore.useStore();

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
    const tabsActionKey: 'delegatedUser' | 'mydelegatedUser' = 'delegatedUser';
    return {
      tabsActionKey,
    };
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
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return OidcClient.getAssociationAccount();
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.linkUser();
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.deletePopup(item);
          break;
        case EVENT_BTN_ENUM.LOGIN:
          this.login(item);
          break;
      }
    },
    linkUser() {
      this.modalHelper.create(CreateLinkUser, {}, { size: 'small' }).subscribe((res) => {
        (this.$refs.table as any).reload();
      });
    },
    login(item) {
      this.loading = true;
      const userStore = UserStore.useStore();
      userStore.connectToken({ linkUserId: item.targetUserId });
      this.loading = false;
    },
    deletePopup(item?) {
      const th = this;
      Modal.confirm({
        title: () => `${this.l('Unified.texts.ConfirmOperation')}`,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => `${this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage', item.targetUserName)}`,
        onOk() {
          th.delete(item);
        },
        onCancel() {},
      });
    },
    delete(item?) {
      this.loading = true;
      OidcClient.deleteAssociationAccount({
        userId: item.targetUserId,
      })
        .then(() => {
          (this.$refs.table as any).reload();
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
