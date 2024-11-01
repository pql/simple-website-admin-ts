import { defineComponent } from 'vue';
import { versionsProps } from './props';
import { EditionService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import CreateOrEditVersionComponent from './create-or-edit-version/create-or-edit-version.vue';
import DeleteVersionComponent from './delete-version/delete-version.vue';
import MoveAllTenantsComponent from './move-all-tenants/move-all-tenants.vue';
import ManageHostFeatureComponent from '@/app/admin/manage-host-feature/manage-host-feature.vue';

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    ...versionsProps,
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
     * 获取版本列表
     * @returns
     */
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.filter = queryFilter.displayName;

      return EditionService.getApiSaasEditions1(queryFilter);
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.DELETE_EDIT:
          this.delete(item);
          break;
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.FUNCTION:
          this.functional(item);
          break;
        case EVENT_BTN_ENUM.MOVEALLTENANTS:
          this.moveAllTenants(item);
          break;
        default:
          break;
      }
    },
    /**
     * 创建或编辑
     * @param item
     */
    createOrEdit(item?) {
      let versionsId = '';
      if (!!item && item.id) {
        versionsId = item.id;
      }
      this.modalHelper
        .create(
          CreateOrEditVersionComponent,
          {
            versionsId: versionsId,
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
     * 删除
     * @param item
     */
    delete(item?) {
      // const dataSource = (this.$refs.table as any).getDataSource();
      this.modalHelper
        .create(DeleteVersionComponent, {
          versionsId: item.id,
        })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 功能
     * @param item
     */
    functional(item?) {
      let versionsId = '';
      if (!!item && item.id) {
        versionsId = item.id;
      }
      this.modalHelper
        .create(ManageHostFeatureComponent, {
          versionsId: versionsId,
          providerName: 'E',
        },)
        .subscribe(() => {});
    },

    /**
     * 移动所有租户
     * @param item
     */
    moveAllTenants(item?) {
      if (item.tenantCount == 0) {
        this.notify.warning({ message: this.l('Unified.texts.Versions:NotTenant') });
        return;
      }
      this.modalHelper
        .create(MoveAllTenantsComponent, {
          versionsId: item.id,
        },{ width: '500px' })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
  },
});
