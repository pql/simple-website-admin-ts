import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import { addRoleProps } from './props';
import { OrganizationUnitService, RoleService, UserService } from '@/apis';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...addRoleProps,
  },
  data() {
    return {};
  },
  methods: {
    /**
     * 获取数据
     */
    fetchDataList() {
      const { maxResultCount, skipCount, sorting, name } = (
        this.$refs.table as any
      ).getSearchProps();

      return new Promise((resolve, reject) => {
        RoleService.getApiIdentityRoles1({
          filter: name,
        })
          .then((res) => {
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
      OrganizationUnitService.putApiIdentityOrganizationUnitsRoles({
        id: this.organizationUnitId as string,
        requestBody: {
          roleIds: table.getSelectRowKeys(),
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
      const roles = await OrganizationUnitService.getApiIdentityOrganizationUnitsRoles({
        id: this.organizationUnitId as string,
        maxResultCount: 1000,
        skipCount: 0,
      });
      const tableData = (this.$refs.table as any).tableData;
      tableData.items?.forEach((item) => {
        roles.items!.forEach((member) => {
          if (item.id === member.id) {
            (this.$refs.table as any).tableRef.selectRow(item);
          }
        });
      });

      let disabledList = roles.items?.map((m) => m.id) ?? [];
      (this.$refs.table as any).setRowSelection('getCheckboxProps', (record) => {
        return {
          disabled: disabledList.find((f) => f == record.id),
        };
      });
    },
  },
});
