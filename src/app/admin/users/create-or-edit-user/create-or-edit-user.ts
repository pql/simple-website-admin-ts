import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { createOrEditUserProps } from './props';
import { UserService, Volo_Abp_Identity_IdentityUserCreateDto } from '@/apis';
import type { RuleObject } from 'ant-design-vue/lib/form/interface';
import { FOrganizationUnitTree } from '@/app/admin-shared';
import SampleComponentBase from '@/shared/component-base/sample-component-base';

export default defineComponent({
  components: { FOrganizationUnitTree },
  mixins: [ModalComponentBase, SampleComponentBase],
  props: {
    ...createOrEditUserProps,
  },
  data() {
    const passwordRules: any = null;
    const passRepeat: any = null;
    const userCreateDto: Volo_Abp_Identity_IdentityUserCreateDto = {
      userName: '',
      name: null,
      surname: null,
      password: '',
      email: '',
      phoneNumber: null,
      isActive: false,
      lockoutEnabled: false,
      emailConfirmed: false,
      phoneNumberConfirmed: false,
      shouldChangePasswordOnNextLogin: false,
    };
    return {
      id: null,
      form: userCreateDto,
      roleList: new Array<any>(),
      checkedRoles: [],
      rules: {
        email: [
          {
            type: 'email',
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        userName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 50,
            message: this.l('Unified.texts.OverMaxLength', [50]),
            trigger: 'blur',
          },
          {
            pattern: '^[a-zA-Z0-9]+$',
            message: this.l('Unified.texts.OnlyNumbersAndLettersCanBeEntered'),
            trigger: 'blur',
          },
        ],
        // phoneNumber: [
        //   { required: true, message: this.l('ThisFieldIsRequired'), trigger: 'blur' },
        //   { message: this.l('MaxLength', 32), max: 24, trigger: 'blur' },
        // ],
        password: [],
      },
      organizationData: {
        allOrganizationUnits: new Array<any>(),
        memberedOrganizationUnits: new Array<any>(),
      },
      selectedUnit: [] as any,
      passwordRules: passwordRules,
      passRepeat: passRepeat,
    };
  },
  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    getPageData(id) {
      this.id = id;
      this.initData();
    },
    initData() {
      if (this.id) {
        this.passwordRules = [
          { validator: this.isEdit, trigger: 'blur' },
          {
            max: 12,
            message: this.l('Unified.texts.OverMaxLength', [12]),
            trigger: 'blur',
          },
          { validator: this.notEdit, trigger: 'blur' },
        ];
        this.passRepeat = [{ validator: this.compareToFirstPasswordNew, trigger: 'blur' }];
      } else {
        this.passwordRules = [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 12,
            message: this.l('Unified.texts.OverMaxLength', [12]),
            trigger: 'blur',
          },
          { validator: this.notEdit, trigger: 'blur' },
        ];
        this.passRepeat = [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.compareWithoutid, trigger: 'blur' },
        ];
      }
      this.init();
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        const roleName = toRaw(this.checkedRoles);
        const unitOrg = toRaw(this.selectedUnit).checked;
        const createUser = {
          userName: this.form.userName,
          name: this.form.name,
          surname: this.form.surname,
          password: this.form.password,
          email: this.form.email,
          phoneNumber: this.form.phoneNumber,
          isActive: this.form.isActive,
          lockoutEnabled: this.form.lockoutEnabled,
          emailConfirmed: this.form.emailConfirmed,
          phoneNumberConfirmed: this.form.phoneNumberConfirmed,
          shouldChangePasswordOnNextLogin: this.form.shouldChangePasswordOnNextLogin,
          roleNames: roleName,
          organizationUnitIds: unitOrg,
        };
        if (this.id == null) {
          // 创建
          UserService.postApiIdentityUsers({
            requestBody: createUser,
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
        } else {
          // 修改
          UserService.putApiIdentityUsers({
            id: this.id,
            requestBody: createUser,
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
    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      const rolesResult = await UserService.getApiIdentityUsersAssignableRoles();
      this.roleList = rolesResult.items?.map((item) => {
        if (this.id) {
          return {
            label: item.name,
            value: item.name,
            disabled: false,
          };
        }
        return {
          label: item.name,
          value: item.name,
        };
      }) as Array<any>;

      const organizationResult = await UserService.getApiIdentityUsersAvailableOrganizationUnits();
      this.organizationData.allOrganizationUnits = organizationResult.items as Array<any>;

      if (this.id != null) {
        const userResult = await UserService.getApiIdentityUsers({
          id: this.id,
        });
        this.form = {
          userName: userResult.userName as string,
          name: userResult.name,
          surname: userResult.surname,
          password: '',
          email: userResult.email as string,
          phoneNumber: userResult.phoneNumber,
          isActive: userResult.isActive,
          lockoutEnabled: userResult.lockoutEnabled,
          emailConfirmed: userResult.emailConfirmed,
          phoneNumberConfirmed: userResult.phoneNumberConfirmed,
          shouldChangePasswordOnNextLogin: userResult.shouldChangePasswordOnNextLogin,
        };

        const rolesRow = await UserService.getApiIdentityUsersRoles({
          id: this.id,
        });

        if (rolesRow.items != undefined && rolesRow.items.length > 0) {
          this.checkedRoles = rolesRow.items
            ?.filter((item) => item.name)
            .map((item) => {
              return item.name;
            }) as never;
        }
        const organizationRow = await UserService.getApiIdentityUsersOrganizationUnits({
          id: this.id,
        });

        if (organizationRow != undefined && organizationRow.length > 0) {
          const codeList = organizationRow
            ?.filter((item) => item.code)
            .map((item) => {
              return item.code;
            }) as never;

          const idList = organizationRow
            ?.filter((item) => item.id)
            .map((item) => {
              return item.id;
            }) as never;

          this.organizationData.memberedOrganizationUnits = codeList;
          this.selectedUnit.checked = idList;
        }
      } else {
        this.checkedRoles = rolesResult.items
          ?.filter((item) => item['isDefault'])
          .map((item) => {
            return item.name;
          }) as never;
      }

      this.loading = false;
    },

    /**
     * 验证密码输入
     */
    compareToFirstPassword(_rule: any, value: any, callback: (arg0?: string | undefined) => void) {
      if (value && value !== (this.$refs.formRef as any).getFieldValue('password')) {
        callback(this.l('PasswordsDontMatch'));
      } else {
        callback();
      }
    },
    compareToFirstPasswordNew(_rule: RuleObject, value: string) {
      if (this.form.password && value) {
        if (value.includes(' ')) {
          return Promise.reject('Do not enter Spaces');
        }
        if (this.form.password.trim() !== value.trim()) {
          return Promise.reject(this.l('TwoInputsDonotMatch'));
        }
      }
      if (this.form.password && (value === null || value === '')) {
        return Promise.reject(this.l('TwoInputsDonotMatch'));
      }
      if (this.id) {
        return Promise.resolve();
      }
      return Promise.resolve();
    },
    compareWithoutid(_rule: RuleObject, value: string) {
      if (value !== this.form.password) {
        return Promise.reject(this.l('TwoInputsDonotMatch'));
      }
      return Promise.resolve();
    },
    /**
     * 选择完权限过滤
     */
    refreshGoFirstPage(data: never[]) {
      this.selectedUnit = data;
    },

    isEdit(_rule: RuleObject, value: string) {
      if (this.id) {
        return Promise.resolve();
      }
      if (value === null) {
        return Promise.reject(this.l('ThisFieldIsRequired'));
      }
      return Promise.resolve();
    },
    notEdit(_rule: RuleObject, value: string) {
      if (this.id && !value) {
        return Promise.resolve();
      } else {
        if (value === null || value === '') {
          return Promise.reject();
        }
        if (value.includes(' ')) {
          return Promise.reject('Do not enter Spaces');
        }
        const requiredLength = this.setting!.values!['Abp.Identity.Password.RequiredLength'] ?? 32;
        if (value.length < Number(requiredLength)) {
          const requiredLength =
            this.setting!.values!['Abp.Zero.UserManagement.PasswordComplexity.RequiredLength'] ??
            32;
          return Promise.reject(this.l('MinLength', [Number(requiredLength)]));
        }
        if (value.length > 32) {
          return Promise.reject(this.l('MaxLength', [32]));
        }
        return Promise.resolve();
      }
    },
  },
});
