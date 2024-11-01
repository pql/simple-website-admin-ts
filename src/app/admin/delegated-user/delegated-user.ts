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
import { OidcClient } from '@/utils/auth/oidc';
import CreateDelegatedUser from './create-delegated-user/create-delegated-user.vue';

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
       *   <!-- 未来 -->
                <a-tag v-if="new Date() < new Date(record.startTime)" :color="'#4fbf67'">{{
                  l('Unified.texts.DelegatedUser:Future') }}</a-tag>
                <!-- 已过期 -->
                <a-tag v-else-if="new Date() > new Date(record.endTime)" :color="'#c00d49'">{{
                  l('Unified.texts.DelegatedUser:PastDue') }}</a-tag>
                <!-- 有效 -->
                <a-tag v-else="new Date() < new Date(record.startTime)" :color="'#4fbf67'">{{
                  l('Unified.texts.DelegatedUser:Valid') }}</a-tag>
       */
      return (item, column, record) => {
        switch (item.name) {
          case EVENT_BTN_ENUM.LOGIN:
            if (new Date() > new Date(record.startTime) && new Date() < new Date(record.endTime))
              return true;
            else return false;
          default:
            return true;
        }
      };
    },
  },
  methods: {
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return OidcClient.getDelegatedUsers();
    },
    myFetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return OidcClient.getMyDelegatedUsers();
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.create();
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.deletePopup(item);
          break;
        case EVENT_BTN_ENUM.LOGIN:
          this.login(item);
          break;
      }
    },
    create() {
      this.modalHelper.create(CreateDelegatedUser,{},{width:'500px'}).subscribe((res) => {
        this.disposePort();
      });
    },
    login(item) {
      this.loading = true;
      const userStore = UserStore.useStore();
      userStore.connectToken({ userDelegationId: item.id });
      this.loading = false;
    },
    disposePort() {
      if (this.tabsActionKey == 'delegatedUser') {
        (this.$refs.table as any).reload();
      } else if (this.tabsActionKey == 'mydelegatedUser') {
        (this.$refs.tableMy as any).reload();
      }
    },
    deletePopup(item?) {
      const th = this;
      Modal.confirm({
        title: () => `${this.l('Unified.texts.ConfirmOperation')}`,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () => `${this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage', item.userName)}`,
        onOk() {
          th.delete(item);
        },
        onCancel() {},
      });
    },
    delete(item?) {
      this.loading = true;
      OidcClient.deleteDelegatedUsers({
        id: item.id,
      })
        .then(() => {
          this.disposePort();
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
