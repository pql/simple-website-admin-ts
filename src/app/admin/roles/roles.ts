import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import { RoleService } from '@/apis';
import RolesPermissionComponent from '@/app/admin/roles/permissions/permissions.vue';
import CreateOrEditRoleComponent from '@/app/admin/roles/create-or-edit-role/create-or-edit-role.vue';
import MoveAllUsersComponent from '@/app/admin/roles/move-all-users/move-all-users.vue';
import SettingControlPermission from '@/app/admin/roles/setting-control-permission/setting-control-permission.vue';

export default defineComponent({
  components: {
    SettingControlPermission,
  },
  mixins: [DynamicTableComponentBase],
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item, column, record) => {
        switch (item.name) {
          case 'Delete':
            return !record.isStatic;
          default:
            return true;
        }
      };
    },
  },
  methods: {
    /**
     * 角色列表
     */
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.filter = queryFilter.rolesName;
      return RoleService.getApiIdentityRoles1(queryFilter);
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
        case EVENT_BTN_ENUM.PERMISSIONS:
          this.permissions(item);
          break;
        case EVENT_BTN_ENUM.MOVEALLUSER:
          this.mobileUser(item);
          break;
        case EVENT_BTN_ENUM.CONTROL_PANEL_PERMISSIONS:
          this.ControlPanelPermissions(item);
          break;

        default:
          break;
      }
    },
    /**
     * 移动所有用户
     */
    mobileUser(item?) {
      if (item.userCount < 1) {
        return this.notify.warn({
          message: this.l('AbpIdentity.texts.ThereIsNoUsersCurrentlyInThisRole'),
        });
      }
      this.modalHelper
        .create(
          MoveAllUsersComponent,
          {
            pageDataList: [item.id],
            name: item.name,
          },
          { width: '500px' },
        )
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 添加角色  修改角色
     */
    createOrEdit(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(
          CreateOrEditRoleComponent,
          {
            pageDataList: selectItems,
          },
          { width: '500px' },
        )
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
      if ((item as any).userName == 'admin') {
        this.notify.warn({
          message: this.l('Unified.texts.SuperAadminCannotBeDeleted'),
        });
        return;
      }
      (this.$refs.table as any).setLoading(true);
      RoleService.deleteApiIdentityRoles({
        id: item.id,
      })
        .then(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        });
    },
    /**
     * 角色权限
     */
    permissions(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.name];
      }
      this.modalHelper
        .create(RolesPermissionComponent, {
          pageDataList: selectItems,
          providerName: 'R',
        })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    ControlPanelPermissions(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(SettingControlPermission, {
          pageDataList: selectItems,
        },{ width: '800px' })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
  },
});
