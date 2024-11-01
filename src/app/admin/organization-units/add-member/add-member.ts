import { defineComponent } from 'vue';
import { addMemberProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { OrganizationUnitService, UserService } from '@/apis';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...addMemberProps,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    /** 刷新 */
    refresh() {
      (this.$refs.table as any).reload();
    },
    /**
     * 获取数据
     */
    async fetchDataList() {
      const { maxResultCount, skipCount, UserName } = (this.$refs.table as any).getSearchProps();
      const params = {
        id: this.organizationUnitId as string,
        // organizationUnitId: this.organizationUnitId as string,
        maxResultCount: maxResultCount,
        skipCount: skipCount,
      };

      return new Promise((resolve, reject) => {
        UserService.getApiIdentityUsers1(params)
          .then((res) => {
            let datas = res;
            if (res && res.items && UserName) {
              let itemsQuery = res.items?.filter((f) => {
                return f.userName?.includes(UserName);
              });
              datas.items = itemsQuery;
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    /**
     * 提交表单
     */
    handleSubmit() {
      const table = this.$refs.table as any;
      const selectCount = table.getSelectRowKeys().length;
      if (selectCount <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }
      this.saving = true;
      OrganizationUnitService.putApiIdentityOrganizationUnitsMembers({
        id: this.organizationUnitId as string,
        requestBody: {
          userIds: table.getSelectRowKeys(),
        },
      })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          this.success(table.getSelectRowKeys());
        })
        .finally(() => {
          this.saving = false;
        });
    },
    /** 获取数据成功后的回调 */
    async handleFetchSuccess() {
      const members = await OrganizationUnitService.getApiIdentityOrganizationUnitsMembers({
        id: this.organizationUnitId as string,
        // organizationUnitId: this.organizationUnitId as string,
        maxResultCount: 1000,
        skipCount: 0,
      });
      const tableData = (this.$refs.table as any).tableData;
      tableData.items?.forEach((item) => {
        members.items!.forEach((member) => {
          if (item.id === member.id) {
            (this.$refs.table as any).tableRef.selectRow(item);
          }
        });
      });

      let disabledList = members.items?.map((m) => m.id) ?? [];
      (this.$refs.table as any).setRowSelection('getCheckboxProps', (record) => {
        return {
          disabled: disabledList.find((f) => f == record.id),
        };
      });
    },
  },
});
