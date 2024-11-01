import { defineComponent } from 'vue';
import AppComponentBase from '/@/shared/component-base/app-component-base';
import AddMemberComponent from '../add-member/add-member.vue';
import { OrganizationUnitService } from '@/apis';

import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
//   import { jsonToSheetXlsx } from '/@/components/Excel';
//   import { AppConsts } from '/@/abpPro/AppConsts';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    selectTree: {
      type: Object,
      default: () => {},
    },
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
    /** 刷新 */
    refresh() {
      (this.$refs.table as any).reload();
    },
    /** 获取数据 */
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      const { maxResultCount, skipCount, userName, sorting } = queryFilter;
      return new Promise((resolve, reject) => {
        if (!this.selectTree || !this.selectTree?.id) {
          reject();
          return;
        }

        OrganizationUnitService.getApiIdentityOrganizationUnitsMembers({
          id: this.selectTree.id,
          userName: userName,
          sorting: sorting,
          maxResultCount: otherQuery.maxResultCount ?? maxResultCount,
          skipCount: otherQuery.skipCount ?? skipCount,
        })
          .then((res) => {
            let datas = res;
            if (res && res.items && userName) {
              let itemsQuery = res.items?.filter((f) => {
                return f.userName?.includes(userName);
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
     * 导出Excel
     * 页面暂无此功能
     */
    //   exportFetch({ id, userName, sorting, maxResultCount, skipCount }) {
    //       (this.$refs.table as any).setLoading(true);
    //       this.organizationUnitService
    //           .getPagedOrganizationUnitUsers(id, userName, sorting, maxResultCount, skipCount)
    //           .then((res: IPagedResultDtoOfOrganizationUnitUserListDto) => {
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
    //                       filename: '组织单元-用户.xlsx',
    //                   });
    //                   abp.notify.success(this.l('ExportSuccess'));
    //               }
    //           })
    //           .finally(() => {
    //               (this.$refs.table as any).setLoading(false);
    //           });
    //   },
    /**
     * 按钮点击事件
     * @param event 事件类型
     * @param item 操作数据
     */
    handleActionClick(event: string, item?: any) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      const { maxResultCount, skipCount, UserName, sorting } = queryFilter;
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.addUser();
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
    /**
     * 移除用户
     * @param user 当前用户实体
     */
    removeMember(user) {
      const _ouId = this.selectTree?.id ?? '';
      OrganizationUnitService.deleteApiIdentityOrganizationUnitsMembers({
        id: _ouId,
        memberId: user.id,
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
        title: this.l('ConfirmDeleteXItemsWarningMessage', selectCount),
        onOk: () => {
          // const _ouId = this.selectTree?.id ?? '';
          // OrganizationUnitService.batchRemoveUserFromOrganizationUnit(
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
     * 增加用户
     */
    addUser() {
      this.modalHelper
        .create(AddMemberComponent, {
          organizationUnitId: this.selectTree?.id ?? '',
        })
        .subscribe((res) => {
          if (res) {
            this.refresh();
          }
        });
    },
  },
});
