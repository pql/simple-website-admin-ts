import { defineComponent } from 'vue';
import { tenantsProps } from './props';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { TenantService } from '@/apis';
import { UserStore } from '@/store/modules/user';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import CreateOrEditTenantComponent from './create-or-edit-tenant/create-or-edit-tenant.vue';
import ManagementHosFeatureComponent from '@/app/admin/manage-host-feature/manage-host-feature.vue';

const userStore = UserStore.useStore();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  props: {
    ...tenantsProps,
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
          case 'Migration':
            return record.hasDefaultConnectionString;
          case 'UseLogIn':
            if (
              (record.activationState == 0 || new Date(record.activationEndDate) > new Date()) &&
              !userStore.getBeforeToken
            )
              return true;
            else return false;
          default:
            return true;
        }
      };
    },
  },
  methods: {
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      queryFilter.filter = queryFilter.name;

      queryFilter.expirationDateMin = !queryFilter.expirationDate
        ? undefined
        : queryFilter.expirationDate[0];
      queryFilter.expirationDateMax = !queryFilter.expirationDate
        ? undefined
        : queryFilter.expirationDate[1];

      return TenantService.getApiSaasTenants1(queryFilter);
    },
    /**
     * 按钮回调事件 MIGRATION
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.DELETE:
          this.delete(item);
          break;
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit(item, 'Create', { size: 'medium' });
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item, 'Edit', { width: '600px' });
          break;
        case EVENT_BTN_ENUM.FUNCTION:
          this.functional(item);
          break;
        case EVENT_BTN_ENUM.CONNECTIONSTRING:
          this.createOrEdit(item, 'ConnectionString', { size: 'small' });
          break;
        case EVENT_BTN_ENUM.USELOGIN:
          this.useLogIn(item);
          break;
        case EVENT_BTN_ENUM.SET_PASSWORD:
          this.createOrEdit(item, 'SetPassword', { width: '600px' });
          break;
        case EVENT_BTN_ENUM.MIGRATION:
          this.migration(item);
          break;
        default:
          break;
      }
    },
    delete(item?) {
      this.loading = true;
      TenantService.deleteApiSaasTenants({ id: item.id ?? '' })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          (this.$refs.table as any).reloadGoFirstPage();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    functional(item?) {
      let versionsId = '';
      if (!!item && item.id) {
        versionsId = item.id;
      }
      this.modalHelper
        .create(ManagementHosFeatureComponent, {
          versionsId: versionsId,
          providerName: 'T',
        })
        .subscribe(() => {});
    },
    useLogIn(item?) {
      const param: any = {
        _types: 'UseLogIn',
        _titleName: 'Unified.texts.Tenant:UseLogIn',
        _id: item.id,
      };
      this.modalHelper
        .create(CreateOrEditTenantComponent, param, { size: 'small' })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    createOrEdit(item?, types: string = '', modalSize = {}) {
      const param: any = { _types: types, _titleName: 'Saas.texts.NewTenant' };

      if (!!item && item.id) {
        param._id = item.id;
        param._titleName = 'Saas.texts.Permission:Edit';
      }

      this.modalHelper.create(CreateOrEditTenantComponent, param, modalSize).subscribe((res) => {
        if (res) {
          (this.$refs.table as any).reloadGoFirstPage();
        }
      });
    },
    migration(item?) {
      this.loading = true;
      TenantService.postApiSaasTenantsApplyDatabaseMigrations({ id: item.id ?? '' })
        .then(() => {
          this.notify.success({
            message: this.l('Unified.texts.Tenant:ApplicationDatabaseMigrationPrompt'),
          });
          (this.$refs.table as any).reloadGoFirstPage();
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
