import { defineComponent } from 'vue';
import { createOrEditTenantProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { EditionService, TenantService, Volo_Saas_Host_Dtos_SaasTenantDatabasesDto } from '@/apis';
import { Select } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
  },
  mixins: [ModalComponentBase],
  props: {
    ...createOrEditTenantProps,
  },
  data() {
    const rolesCreateDto: any = {
      id: '',
      name: null,
      editionId: '',
      editionEndDateUtc: null,
      editionName: null,
      hasDefaultConnectionString: false,
      activationState: 0,
      activationEndDate: null,
      connectionStrings: {
        id: '',
        default: '',
        databases: [],
      },
      databases: [],
      default: '',
      extraProperties: {},
    };

    const selectVersionsOptions: any = [];
    const databases: Volo_Saas_Host_Dtos_SaasTenantDatabasesDto = {};
    const tabtActionKey: String = 'info';
    const types: String = '';
    const titleName: String = '';
    const isDatabases: boolean = true;

    return {
      id: null,
      selectVersionsOptions,
      tabtActionKey,
      form: rolesCreateDto,
      databases,
      isDatabases,
      types,
      titleName,
      rules: {},
      editionDataSource: {
        service: 'EditionService.getApiSaasEditionsAll', //接口名，
        labelField: 'displayName', //下拉框标题
        valueField: 'id', //下拉框值
      },
    };
  },
  mounted() {
    this.getPageData(this._id, this._types, this._titleName);
  },
  methods: {
    getPageData(id, types, titleName) {
      this.id = id;
      this.types = types;
      this.titleName = titleName;
      this.initData();
    },
    initData() {
      this.init();
    },
    selectEditionChange(selectKey, item) {
      this.form.editionId = selectKey;
      this.form.displayName = item.displayName;
    },
    rulesName() {
      return [
        {
          required: true,
          message: this.l('Unified.texts.ThisFieldIsRequired'),
          trigger: 'blur',
        },
        {
          max: 50,
          message: this.l('Unified.texts.OverMaxLength'),
          trigger: 'blur',
        },
      ];
    },
    rulesEmail() {
      return [
        {
          type: 'email',
          message: this.l('Unified.texts.emailformaterror'),
          trigger: 'blur',
        },
        {
          required: true,
          message: this.l('Unified.texts.ThisFieldIsRequired'),
          trigger: 'blur',
        },
      ];
    },
    rulesPassword() {
      return [
        {
          required: true,
          message: this.l('Unified.texts.ThisFieldIsRequired'),
          trigger: 'blur',
        },
        {
          max: 50,
          message: this.l('Unified.texts.OverMaxLength'),
          trigger: 'blur',
        },
      ];
    },
    rulesUsername() {
      return [
        {
          required: true,
          message: this.l('Unified.texts.ThisFieldIsRequired'),
          trigger: 'blur',
        },
        {
          max: 50,
          message: this.l('Unified.texts.OverMaxLength'),
          trigger: 'blur',
        },
      ];
    },
    onFinishFailed({ values, errorFields, outOfDate }) {
      console.log('errorFields', values, errorFields, outOfDate);

      if (errorFields.length > 0) {
        (this.$refs.formRef as any).current.scrollToField(errorFields[0].name);
      }
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any)
        .validate()
        .then(() => {
          this.loading = true;
          if (this.types == 'Create') {
            // 创建
            const data = {
              ...this.form,
              // ...this.databases
            };
            TenantService.postApiSaasTenants({
              requestBody: data,
            })
              .then(() => {
                this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
                this.handleSubmitAfter(closeFlag);
              })
              .catch((err) => {
                this.notify.error({ message: this.l(err.body.error.code) });
              })
              .finally(() => {
                this.loading = false;
              });
          } else if (this.types == 'Edit') {
            //修改
            TenantService.putApiSaasTenants({
              id: this.id ?? '',
              requestBody: this.form,
            })
              .then(() => {
                this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
                this.handleSubmitAfter(closeFlag);
              })
              .catch((err) => {
                this.notify.error({ message: this.l(err.body.error.code) });
              })
              .finally(() => {
                this.loading = false;
              });
          } else if (this.types == 'ConnectionString') {
            //连接字符串
            TenantService.putApiSaasTenantsConnectionStrings({
              id: this.id ?? '',
              requestBody: this.form,
            })
              .then(() => {
                this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
                this.handleSubmitAfter(closeFlag);
              })
              .catch((err) => {
                this.notify.error({ message: this.l(err.body.error.code) });
              })
              .finally(() => {
                this.loading = false;
              });
          } else if (this.types == 'SetPassword') {
            //设置密码
            TenantService.putApiSaasTenantsSetPassword({
              id: this.id ?? '',
              requestBody: this.form,
            })
              .then(() => {
                this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
                this.handleSubmitAfter(closeFlag);
              })
              .catch((err) => {
                if (err.response.data.error.message.includes('Format of the initialization')) {
                  this.notify.error({
                    message: this.l('Unified.texts.Tenant:DefaultConnectionStringError'),
                  });
                } else {
                  this.notify.error({ message: this.l(err.body.error.code) });
                }
              })
              .finally(() => {
                this.loading = false;
              });
          } else if (this.types == 'UseLogIn') {
            //使用此租户登录
            userStore.connectToken({ tenantId: this.id, userName: this.form.username });
            this.loading = false;
          }
        })
        .catch((error) => {
          if (error.errorFields && error.errorFields.length > 0) {
            const errorList = (document as any).querySelectorAll('.ant-form-item-has-error');
            //由于校验失败ant会自动给失败表单项添加类名，直接获取即可
            errorList[0].scrollIntoView({
              block: 'end',
              behavior: 'smooth',
            });
          }
        });
    },
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
    testConnect(connectionString: string) {
      this.loading = true;
      TenantService.getApiSaasTenantsCheckConnectionString({ connectionString: connectionString })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        })
        .catch(() => {
          this.notify.error({
            message: this.l('Unified.texts.Tenant:DefaultConnectionStringError'),
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async initDatabases() {
      const roleDatabasesResult = await TenantService.getApiSaasTenantsDatabases();
      this.databases = roleDatabasesResult;
    },
    async initSaasTenants() {
      const roleResult = await TenantService.getApiSaasTenants({ id: this.id ?? '' });
      this.form = roleResult;
      this.form.editionId = this.form.editionId == null ? '' : this.form.editionId;
    },
    async initSaasEditionsAll() {
      // const roleEditionsResult = await EditionService.getApiSaasEditionsAll();
      // this.selectVersionsOptions = roleEditionsResult
      //   ?.filter((f) => {
      //     return f.id != this.id;
      //   })
      //   .map((m) => ({ value: m.id, label: m.displayName }));
      // this.selectVersionsOptions.splice(0, 0, {
      //   value: '',
      //   label: this.l('Unified.texts.Tenant:Undistributed'),
      // });
    },
    async initConnectionString() {
      const roleResult = await TenantService.getApiSaasTenantsConnectionStrings({
        id: this.id ?? '',
      });
      this.form = roleResult;
      this.isDatabases = !roleResult.default;
    },

    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      if (this.types == 'Create') {
        await this.initDatabases();
        await this.initSaasEditionsAll();
        this.rules = {
          name: this.rulesName(),
          adminEmailAddress: this.rulesEmail(),
          adminPassword: this.rulesPassword(),
        };
      } else if (this.types == 'Edit') {
        await this.initSaasTenants();
        await this.initSaasEditionsAll();
        this.rules = {
          name: this.rulesName(),
        };
      } else if (this.types == 'ConnectionString') {
        this.tabtActionKey = 'link';
        await this.initConnectionString();
      } else if (this.types == 'SetPassword') {
        this.tabtActionKey = 'setPassword';
        this.form = { username: '', password: '' };
        this.rules = {
          username: this.rulesUsername(),
          password: this.rulesPassword(),
        };
      } else if (this.types == 'UseLogIn') {
        this.tabtActionKey = 'useLogIn';
        this.form = { username: 'admin' };
        this.rules = {
          name: this.rulesName(),
        };
      }
      this.loading = false;
    },
  },
});
