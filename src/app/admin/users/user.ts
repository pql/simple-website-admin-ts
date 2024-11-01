import { UserService, CustomUserService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent, createVNode } from 'vue';
import CreateOrEditUserComponent from '@/app/admin/users/create-or-edit-user/create-or-edit-user.vue';
import UserDetails from '@/app/admin/users/user-details/user-details.vue';
import UserStatement from '@/app/admin/users/user-statement/user-statement.vue';
import UserSetPassWord from '@/app/admin/users/user-set-password/user-set-password.vue';
import { UserStore } from '@/store/modules/user';
import UserSession from '@/app/admin/users/user-session/user-session.vue';
import RolesPermissionComponent from '@/app/admin/roles/permissions/permissions.vue';
import UserTwoFactor from '@/app/admin/users/user-two-factor/user-two-factor.vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { exportAsExcel, exportAsCsv } from '@/utils/file/exportFile';

const userStore = UserStore.useStore();

export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase, AppComponentBase],
  data() {
    return {};
  },
  computed: {
    /**
     * 角色格式化
     */
    rolesEllipsis() {
      return (roleNames) => {
        return roleNames.join(' , ').toString();
      };
    },
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item, column, record) => {
        switch (item.name) {
          case EVENT_BTN_ENUM.LOGIN_AS_THIS_USER:
            if (record.id == userStore.getUserInfo.id || userStore.getBeforeToken) return false;
            break;
          case EVENT_BTN_ENUM.TWOFACTOR:
            return this.setting!.values!['Abp.Identity.TwoFactor.Behaviour'] == 'Optional';
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
      queryFilter.minCreationTime = !queryFilter.creationTime
        ? undefined
        : queryFilter.creationTime[0];
      queryFilter.maxCreationTime = !queryFilter.creationTime
        ? undefined
        : queryFilter.creationTime[1];

      queryFilter.minModifitionTime = !queryFilter.modifitionTime
        ? undefined
        : queryFilter.modifitionTime[0];
      queryFilter.maxModifitionTime = !queryFilter.modifitionTime
        ? undefined
        : queryFilter.modifitionTime[1];

      queryFilter.roleId = queryFilter?.roleNames
        ? Array.isArray(queryFilter.roleNames)
          ? queryFilter.roleNames?.join(',')?.toString()
          : queryFilter.roleNames
        : undefined;

      return UserService.getApiIdentityUsers1(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any, config?: any) {
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
        case EVENT_BTN_ENUM.PERMISSIONS:
          this.permissions(item);
          break;
        case EVENT_BTN_ENUM.DETAIL:
          this.detail(item);
          break;
        case EVENT_BTN_ENUM.CLAIMS:
          this.statement(item);
          break;
        case EVENT_BTN_ENUM.SET_PASSWORD:
          this.setPassWord(item);
          break;
        case EVENT_BTN_ENUM.LOGIN_AS_THIS_USER:
          this.LoginAsThisUser(item);
          break;
        case EVENT_BTN_ENUM.DOWNLOAD:
          this.downExcel();
          break;
        case EVENT_BTN_ENUM.SESSION:
          this.session(item);
          break;
        case EVENT_BTN_ENUM.TWOFACTOR:
          this.twoFactor(item);
          break;
        case EVENT_BTN_ENUM.IMPORT:
          this.importFile(item);
          break;
        case EVENT_BTN_ENUM.EXPORT_EXCEL:
          this.exportExcel(config);
          break;
        case EVENT_BTN_ENUM.EXPORT_CSV:
          this.exportCsv();
          break;
        default:
          break;
      }
    },
    /*
     *导入
     */
    async importFile(item) {
      /* 导入成功刷新列表 */
      if (item) {
        (this.$refs.table as any).reloadGoFirstPage();
      }
      // const pam = {
      //   fileType: 1,
      //   formData: { File: e.file as Blob },
      // };
      // console.log('点位');
      // const res = await UserService.postApiIdentityUsersImportUsersFromFile(pam);
      // if (res?.isAllSucceeded) {
      //   return this.notify.success({ message: this.l('Unified.texts.ImportSuccessMessage') });
      // }
      // if (res?.failedCount) {
      //   const that = this;
      //   Modal.confirm({
      //     title: () => `Warning`,
      //     icon: () => createVNode(ExclamationCircleOutlined),
      //     content: () =>
      //       `${this.l('Unified.texts.ImportFailedMessage', [res?.succeededCount, res?.failedCount])}`,
      //     onOk() {
      //       that.downFailedExcel(res.invalidUsersDownloadToken);
      //     },
      //     onCancel() {},
      //   });
      // }
    },
    // async downFailedExcel(token) {
    //   const res = await UserService.getApiIdentityUsersDownloadImportInvalidUsersFile({
    //     token: token,
    //   });
    //   const blob = new Blob([res]);
    //   // 创建一个指向 Blob 的 URL
    //   const url = window.URL.createObjectURL(blob);
    //   const link = document.createElement('a');
    //   link.style.display = 'none'; // 隐藏元素
    //   link.href = url;
    //   link.download = 'ImportUsersSampleFile.xlsx'; // 替换为你希望的文件名和扩展名
    //   document.body.appendChild(link); // 将链接添加到页面
    //   link.click(); // 触发点击事件，开始下载
    //   setTimeout(() => {
    //     window.URL.revokeObjectURL(url); // 释放 URL 对象
    //     document.body.removeChild(link); // 移除 <a> 元素
    //   }, 100);
    // },
    /**
     * 添加用户  修改用户
     */
    createOrEdit(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(
          CreateOrEditUserComponent,
          {
            pageDataList: selectItems,
          },
          { size: 'large' },
        )
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
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
        .create(
          UserDetails,
          {
            pageDataList: selectItems,
          },
          { size: 'medium' },
        )
        .subscribe((res) => {});
    },
    /**
     * 声明
     */
    statement(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(
          UserStatement,
          {
            pageDataList: selectItems,
          },
          { size: 'medium' },
        )
        .subscribe((res) => {});
    },
    /**
     * 声明
     */
    setPassWord(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(
          UserSetPassWord,
          {
            pageDataList: selectItems,
          },
          { width: '600px' },
        )
        .subscribe((res) => {});
    },
    /**
     * 下载
     */
    async downExcel() {},
    /**
     * 导出为excel
     */
    exportExcel(config) {
      exportAsExcel('UserList.xlsx', config);
    },
    /**
     * 导出为csv
     */
    exportCsv() {
      exportAsCsv('UserList.csv');
    },
    /**
     * 会话
     */
    session(item) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(
          UserSession,
          {
            _id: selectItems,
          },
          { size: 'medium' },
        )
        .subscribe((res) => {});
    },
    /**
     * 双因素
     */
    twoFactor(item) {
      this.modalHelper
        .create(
          UserTwoFactor,
          {
            _userId: item.id,
            _userName: item.userName,
          },
          { width: '500px' },
        )
        .subscribe((res) => {});
    },
    /**
     * 使用此账号登录
     */
    LoginAsThisUser(item?) {
      const userStore = UserStore.useStore();
      userStore.connectToken({ userId: item.id });
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
      UserService.deleteApiIdentityUsers({
        id: item.id,
      })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        })
        .then(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
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
        .create(CreateOrEditUserComponent, {
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
      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteMultipleItemWarningMessage'),
        onOk: () => {
          (this.$refs.table as any).setLoading(true);
          CustomUserService.deleteApiAppCustomUserByIds({
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
     * 角色权限
     */
    permissions(item?) {
      let selectItems = [] as string[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      console.log(selectItems);
      this.modalHelper
        .create(RolesPermissionComponent, {
          pageDataList: selectItems,
          providerName: 'U',
          titleUserName: item.userName,
        })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
  },
});
