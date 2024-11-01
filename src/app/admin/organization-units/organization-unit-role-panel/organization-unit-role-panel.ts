import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { organizationUnitRolePanelProps } from './props';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { OrganizationUnitService } from '@/apis';
import AddRoleComponent from '../add-role/add-role.vue';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    ...organizationUnitRolePanelProps,
  },
  data() {
    return {};
  },
  watch: {
    'selectTree.id': {
      handler() {
        this.refresh();
      },
    },
  },
  methods: {
    refresh() {
      (this.$refs.table as any).reload();
    },
    /**
     * 拉取数据
     */
    fetchDataList(otherQuery) {
      const { maxResultCount, skipCount, roleName, sorting } = (
        this.$refs.table as any
      ).getSearchProps();
      if (!this.selectTree?.id) return;
      return new Promise((resolve, reject) => {
        OrganizationUnitService.getApiIdentityOrganizationUnitsRoles({
          id: this.selectTree.id,
          sorting,
          skipCount: otherQuery.skipCount ?? skipCount,
          maxResultCount: otherQuery.maxResultCount ?? maxResultCount,
        })
          .then((res) => {
            let datas = res;
            if (res && res.items && roleName) {
              let itemsQuery = res.items?.filter((f) => {
                return f.name?.includes(roleName);
              });
              datas.items = itemsQuery;
            }
            resolve(datas);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 移除角色
     * @param role 当前角色实体
     */
    removeMember(role) {
      const _ouId = this.selectTree?.id ?? '';
      OrganizationUnitService.deleteApiIdentityOrganizationUnitsRoles({
        id: _ouId,
        roleId: role.id,
      }).then(() => {
        this.notify.success({
          message: this.l('Unified.texts.SavedSuccessfully'),
        });
        if ((this.$refs.table as any).getDataSource().length <= 1) {
          (this.$refs.table as any).reloadGoFirstPage();
        } else {
          this.refresh();
        }
      });
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const table = this.$refs.table as any;
      const selectCount = table.getSelectRowKeys().length;
      if (selectCount <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }
      this.confirm({
        iconType: 'warning',
        title: this.l('ConfirmDeleteXItemsWarningMessage'),
        content: selectCount,
        onOk: () => {
          // const _ouId = this.selectTree?.id ?? '';
          // OrganizationUnitService.deleteApiIdentityOrganizationUnitsRoles(
          //   _ouId,
          //   table.getSelectRowKeys(),
          // ).then(() => {
          //   this.notify.success({
          //     message: this.l('Unified.texts.SavedSuccessfully'),
          //   });
          //   if ((this.$refs.table as any).getDataSource().length <= selectCount) {
          //     (this.$refs.table as any).reloadGoFirstPage();
          //   } else {
          //     this.refresh();
          //   }
          // });
        },
      });
    },
    /**
     * 增加角色
     */
    addRole() {
      this.modalHelper
        .create(AddRoleComponent, {
          organizationUnitId: this.selectTree?.id ?? '',
        },{width:'800px'})
        .subscribe((res) => {
          if (res) {
            this.refresh();
          }
        });
    },
    /**
     * 导出Excel
     * 页面暂无此功能
     */
    //   exportFetch({ id, userName, sorting, maxResultCount, skipCount }) {
    //       (this.$refs.table as any).setLoading(true);
    //       this.organizationUnitServiceProxy
    //           .getPagedOrganizationUnitRoles(id, userName, sorting, maxResultCount, skipCount)
    //           .then((res) => {
    //               if (!!res.items) {
    //                   const data = !!res.items
    //                       ? res.items.map((item) => {
    //                           const obj: any = item;
    //                           obj.addedTime = this._moment(obj.addedTime);
    //                           return obj;
    //                       })
    //                       : [];
    //                   jsonToSheetXlsx({
    //                       data,
    //                       filename: '组织单元-角色.xlsx',
    //                   });
    //                   abp.notify.success(this.l('ExportSuccess'));
    //               }
    //           })
    //           .finally(() => {
    //               (this.$refs.table as any).setLoading(false);
    //           });
    //   },
    /** 按钮点击事件 */
    handleActionClick(event: string, item?: any) {
      const { maxResultCount, skipCount, userName, sorting } = (
        this.$refs.table as any
      ).getSearchProps();
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.addRole();
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.removeMember(item);
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.batchDelete();
          break;
        // 导出和批量导出，暂无此功能
        //   case EVENT_BTN_ENUM.EXPORT:
        //       if (!this.selectTree || !this.selectTree.id) {
        //           return;
        //       }
        //       this.exportFetch({
        //           id: this.selectTree?.id,
        //           userName,
        //           sorting,
        //           maxResultCount,
        //           skipCount,
        //       });

        //       break;
        //   case EVENT_BTN_ENUM.BULK_EXPORT:
        //       if (!this.selectTree || !this.selectTree.id) {
        //           return;
        //       }
        //       this.exportFetch({
        //           id: this.selectTree?.id,
        //           userName: '',
        //           sorting: '',
        //           maxResultCount: AppConsts.export.maxResultCount,
        //           skipCount: AppConsts.export.skipCount,
        //       });
        //       break;
        default:
          break;
      }
    },
  },
});
