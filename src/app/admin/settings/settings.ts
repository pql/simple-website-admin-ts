import { defineComponent } from 'vue';
import { settingProps } from './props';
import AppComponentBase from '@/shared/component-base/app-component-base';
import {
  AccountSettingsService,
  EmailSettingsService,
  FeaturesService,
  SettingsService,
  Volo_Abp_Account_AccountExternalProviderSettingsDto,
  Volo_Abp_Account_AccountRecaptchaSettingsDto,
  Volo_Abp_Account_AccountSettingsDto,
  Volo_Abp_Account_AccountTwoFactorSettingsDto,
  Volo_Abp_Account_UpdateExternalProviderDto,
  Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto,
  Volo_Abp_AuditLogging_AuditLogSettingsDto,
  Volo_Abp_Identity_IdentityLdapSettingsDto,
  Volo_Abp_Identity_IdentityOAuthSettingsDto,
  Volo_Abp_Identity_IdentitySessionSettingsDto,
  Volo_Abp_Identity_IdentitySettingsDto,
  Volo_Abp_SettingManagement_EmailSettingsDto,
} from '@/apis';
import ManageHostFeatureComponent from '@/app/admin/manage-host-feature/manage-host-feature.vue';
import SendTestEmailComponent from '@/app/admin/settings/send-test-email/send-test-email.vue';
import { Select } from 'ant-design-vue';
import { initAbpConfigStore } from '@/logics/initAppConfig';
import { usePermission } from '@/hooks/web/usePermission';

const { refreshMenuMax } = usePermission();
const tabsIdentityActionKey: string | 'general' | 'session' | 'ldap' | 'oauth' = 'general';
const tabsAuditLogActionKey: string | 'global' | 'general' = 'global';
const tabsAccountActionKey:
  | string
  | 'general'
  | 'twoFactor'
  | 'verificationCode'
  | 'externalSupplier' = 'general';

export default defineComponent({
  components: {
    Select,
  },
  mixins: [AppComponentBase],
  props: {
    ...settingProps,
  },
  data() {
    const isTwoFactor: any = false;
    const isLdap: any = false;
    const isOAuth: any = false;
    const isAuditLog: any = false;
    const isFeatureManagement: any = false;
    // const tabsAccountActionKey:
    //   | string
    //   | 'general'
    //   | 'twoFactor'
    //   | 'verificationCode'
    //   | 'externalSupplier' = 'general';
    const accountSetting: Volo_Abp_Account_AccountSettingsDto = {};
    const accountTwoFactorSetting: Volo_Abp_Account_AccountTwoFactorSettingsDto = {};
    const accountRecaptchaSetting: Volo_Abp_Account_AccountRecaptchaSettingsDto = {};
    const accountExternalProviderSetting: Volo_Abp_Account_AccountExternalProviderSettingsDto = {};

    // const tabsIdentityActionKey: string | 'general' | 'session' | 'ldap' | 'oauth' = 'general';
    const identityLdapSetting: Volo_Abp_Identity_IdentityLdapSettingsDto = {};
    const identityOAuthSetting: Volo_Abp_Identity_IdentityOAuthSettingsDto = {
      clientId: '',
      authority: '',
    };
    const sessionSetting: Volo_Abp_Identity_IdentitySessionSettingsDto = {};

    // const tabsAuditLogActionKey: string | 'global' | 'general' = 'global';
    const auditLogSetting: Volo_Abp_AuditLogging_AuditLogGlobalSettingsDto = {};
    const auditLogGeneralSetting: Volo_Abp_AuditLogging_AuditLogSettingsDto = {};

    const accountExternalProviderSettingDto: {
      google: {
        name: string | null;
        enabled?: boolean;
        clientId?: string | null;
        clientSecret?: string | null;
      };
      microsoft: {
        name: string | null;
        enabled?: boolean;
        clientId?: string | null;
        clientSecret?: string | null;
      };
      twitter: {
        name: string | null;
        enabled?: boolean;
        consumerKey?: string | null;
        consumerSecret?: string | null;
      };
    } = {
      google: {
        name: null,
        enabled: false,
        clientId: null,
        clientSecret: null,
      },
      microsoft: {
        name: null,
        enabled: false,
        clientId: null,
        clientSecret: null,
      },
      twitter: {
        name: null,
        enabled: false,
        consumerKey: null,
        consumerSecret: null,
      },
    };
    const identitySetting: Volo_Abp_Identity_IdentitySettingsDto = {
      password: {
        requiredLength: 0,
        requiredUniqueChars: 0,
        requireNonAlphanumeric: false,
        requireLowercase: false,
        requireUppercase: false,
        requireDigit: false,
        forceUsersToPeriodicallyChangePassword: false,
        passwordChangePeriodDays: 0,
      },
      lockout: {
        allowedForNewUsers: false,
        lockoutDuration: 300,
        maxFailedAccessAttempts: 0,
      },
      signIn: {
        requireConfirmedEmail: false,
        enablePhoneNumberConfirmation: false,
        requireConfirmedPhoneNumber: false,
      },
      user: {
        isUserNameUpdateEnabled: false,
        isEmailUpdateEnabled: false,
      },
    };
    const emailSetting: Volo_Abp_SettingManagement_EmailSettingsDto = {};

    const portOperationType: string | 'get' | 'put' = 'get';

    const selectedKeys: Array<string> = ['functionManagement'];
    const itemKey: string = selectedKeys[0];

    return {
      isTwoFactor,
      isFeatureManagement,
      itemKey,
      selectedKeys,
      tabsAccountActionKey,
      accountSetting,
      accountTwoFactorSetting,
      accountRecaptchaSetting,
      accountExternalProviderSetting,
      accountExternalProviderSettingDto,
      identitySetting,
      emailSetting,
      portOperationType,
      tabsIdentityActionKey,
      identityLdapSetting,
      identityOAuthSetting,
      isLdap,
      isOAuth,
      isAuditLog,
      auditLogSetting,
      tabsAuditLogActionKey,
      auditLogGeneralSetting,
      sessionSetting,
    };
  },
  mounted() {
    this.init();
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.disposePort();
    },
    init() {
      this.disposeVerify();
    },
    async disposePort(type: string | 'get' | 'put' = 'get') {
      this.portOperationType = type;
      if (this.itemKey == 'auditLog') {
        this.disposeAuditLogManagement();
      } else if (this.itemKey == 'account') {
        this.disposeAccountData();
      } else if (this.itemKey == 'identityManagement') {
        this.disposeIdentityManagement();
      } else if (this.itemKey == 'eMail') {
        this.disposeIdentityEmail();
      }
    },

    async disposeVerify() {
      this.isFeatureManagement = true;

      this.isLdap = this.feature!.values!['Account.EnableLdapLogin'] == 'true';
      this.isOAuth = this.feature!.values!['Identity.EnableOAuthLogin'] == 'true';
      this.isTwoFactor = this.feature!.values!['Identity.TwoFactor'] == 'Optional';
      this.isAuditLog = this.feature!.values!['AuditLogging.SettingManagement'] == 'true';

      if (this.setting!.values!['Abp.Account.ProfilePictureSource'] == 'False') {
        this.itemKey = 'account';
        this.selectedKeys = ['account'];
      }

      // this.isTwoFactor = true;
      // const roleResult = await FeaturesService.getApiFeatureManagementFeatures({
      //   providerName: 'T',
      //   providerKey: '',
      // });
      // const identity = roleResult.groups?.find((f) => {
      //   return f.name == 'Identity';
      // });
      // this.isLdap =
      //   identity?.features?.find((f) => {
      //     return f.name == 'Account.EnableLdapLogin';
      //   })?.value == 'true';
      // this.isOAuth =
      //   identity?.features?.find((f) => {
      //     return f.name == 'Identity.EnableOAuthLogin';
      //   })?.value == 'true';
      // this.isTwoFactor =
      //   identity?.features?.find((f) => {
      //     return f.name == 'Identity.TwoFactor';
      //   })?.value == 'Optional';

      // const auditLog = roleResult.groups?.find((f) => {
      //   return f.name == 'AuditLogging';
      // });
      // this.isAuditLog =
      //   auditLog?.features?.find((f) => {
      //     return f.name == 'AuditLogging.SettingManagement';
      //   })?.value == 'true';
    },

    async disposeAuditLogManagement() {
      this.loading = true;

      if (this.tabsAuditLogActionKey == 'global') {
        if (this.portOperationType == 'get') {
          const roleResult = await SettingsService.getApiAuditLoggingSettingsGlobal().finally(
            () => {
              this.loading = false;
            },
          );
          this.auditLogSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          if (!this.auditLogSetting.isExpiredDeleterEnabled)
            this.auditLogSetting.expiredDeleterPeriod = 0;
          await SettingsService.putApiAuditLoggingSettingsGlobal({
            requestBody: this.auditLogSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsAuditLogActionKey == 'general') {
        if (this.portOperationType == 'get') {
          const roleResult = await SettingsService.getApiAuditLoggingSettings().finally(() => {
            this.loading = false;
          });
          this.auditLogGeneralSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          if (!this.auditLogGeneralSetting.isExpiredDeleterEnabled)
            this.auditLogGeneralSetting.expiredDeleterPeriod = 0;
          await SettingsService.putApiAuditLoggingSettings({
            requestBody: this.auditLogGeneralSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }

      this.loading = false;
    },

    async disposeAccountData() {
      this.loading = true;

      if (this.tabsAccountActionKey == 'general') {
        if (this.portOperationType == 'get') {
          const roleResult = await AccountSettingsService.getApiAccountAdminSettings().finally(
            () => {
              this.loading = false;
            },
          );
          this.accountSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          await AccountSettingsService.putApiAccountAdminSettings({
            requestBody: this.accountSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsAccountActionKey == 'twoFactor') {
        if (this.portOperationType == 'get') {
          const roleResult =
            await AccountSettingsService.getApiAccountAdminSettingsTwoFactor().finally(() => {
              this.loading = false;
            });
          this.accountTwoFactorSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          await AccountSettingsService.putApiAccountAdminSettingsTwoFactor({
            requestBody: this.accountTwoFactorSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsAccountActionKey == 'verificationCode') {
        if (this.portOperationType == 'get') {
          const roleResult =
            await AccountSettingsService.getApiAccountAdminSettingsRecaptcha().finally(() => {
              this.loading = false;
            });
          this.accountRecaptchaSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          await AccountSettingsService.putApiAccountAdminSettingsRecaptcha({
            requestBody: this.accountRecaptchaSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsAccountActionKey == 'externalSupplier') {
        if (this.portOperationType == 'get') {
          const roleResult =
            await AccountSettingsService.getApiAccountAdminSettingsExternalProvider().finally(
              () => {
                this.loading = false;
              },
            );
          this.accountExternalProviderSetting = roleResult;

          const google = roleResult.settings?.filter((f) => {
            return f.name == 'Google';
          })[0];
          const microsoft = roleResult.settings?.filter((f) => {
            return f.name == 'Microsoft';
          })[0];
          const twitter = roleResult.settings?.filter((f) => {
            return f.name == 'Twitter';
          })[0];

          this.accountExternalProviderSettingDto = {
            google: {
              name: 'Google',
              enabled: google?.enabled,
              clientId: google?.properties?.filter((f) => {
                return f.name == 'ClientId';
              })[0]?.value,
              clientSecret: google?.secretProperties?.filter((f) => {
                return f.name == 'ClientSecret';
              })[0]?.value,
            },
            microsoft: {
              name: 'Microsoft',
              enabled: microsoft?.enabled,
              clientId: microsoft?.properties?.filter((f) => {
                return f.name == 'ClientId';
              })[0]?.value,
              clientSecret: microsoft?.secretProperties?.filter((f) => {
                return f.name == 'ClientSecret';
              })[0]?.value,
            },
            twitter: {
              name: 'Twitter',
              enabled: twitter?.enabled,
              consumerKey: twitter?.properties?.filter((f) => {
                return f.name == 'ConsumerKey';
              })[0]?.value,
              consumerSecret: twitter?.secretProperties?.filter((f) => {
                return f.name == 'ConsumerSecret';
              })[0]?.value,
            },
          };
        } else if (this.portOperationType == 'put') {
          const requestBody: Array<Volo_Abp_Account_UpdateExternalProviderDto> = [];

          const dto = this.accountExternalProviderSettingDto;
          requestBody.push({
            name: dto.google.name,
            enabled: dto.google.enabled,
            properties: [{ name: 'ClientId', value: dto.google.clientId }],
            secretProperties: [{ name: 'ClientSecret', value: dto.google.clientSecret }],
          });
          requestBody.push({
            name: dto.microsoft.name,
            enabled: dto.microsoft.enabled,
            properties: [{ name: 'ClientId', value: dto.microsoft.clientId }],
            secretProperties: [{ name: 'ClientSecret', value: dto.microsoft.clientSecret }],
          });
          requestBody.push({
            name: dto.twitter.name,
            enabled: dto.twitter.enabled,
            properties: [{ name: 'ConsumerKey', value: dto.twitter.consumerKey }],
            secretProperties: [{ name: 'ConsumerSecret', value: dto.twitter.consumerSecret }],
          });

          await AccountSettingsService.putApiAccountAdminSettingsExternalProvider({ requestBody })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }

      this.loading = false;
    },

    async disposeIdentityManagement() {
      this.loading = true;

      if (this.tabsIdentityActionKey == 'general') {
        if (this.portOperationType == 'get') {
          const roleResult = await SettingsService.getApiIdentitySettings().finally(() => {
            this.loading = false;
          });
          this.identitySetting = roleResult;
        } else if (this.portOperationType == 'put') {
          await SettingsService.putApiIdentitySettings({ requestBody: this.identitySetting })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsIdentityActionKey == 'session') {
        if (this.portOperationType == 'get') {
          const roleResult = await SettingsService.getApiIdentitySettingsSession().finally(() => {
            this.loading = false;
          });
          this.sessionSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          await SettingsService.putApiIdentitySettingsSession({ requestBody: this.sessionSetting })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsIdentityActionKey == 'ldap') {
        if (this.portOperationType == 'get') {
          const roleResult = await SettingsService.getApiIdentitySettingsLdap().finally(() => {
            this.loading = false;
          });
          this.identityLdapSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          await SettingsService.putApiIdentitySettingsLdap({
            requestBody: this.identityLdapSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      } else if (this.tabsIdentityActionKey == 'oauth') {
        if (this.portOperationType == 'get') {
          const roleResult = await SettingsService.getApiIdentitySettingsOauth().finally(() => {
            this.loading = false;
          });
          this.identityOAuthSetting = roleResult;
        } else if (this.portOperationType == 'put') {
          if (!this.identityOAuthSetting.clientId) {
            this.notify.warning({ message: this.l('Unified.texts.Setting:VerifyClientId') });
            this.loading = false;
            return;
          } else if (!this.identityOAuthSetting.authority) {
            this.notify.warning({
              message: this.l('Unified.texts.Setting:VerifyAuthorizationServerAddress'),
            });
            this.loading = false;
            return;
          }
          await SettingsService.putApiIdentitySettingsOauth({
            requestBody: this.identityOAuthSetting,
          })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.refreshConfiguration();
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }

      this.loading = false;
    },

    async disposeIdentityEmail() {
      this.loading = true;

      if (this.portOperationType == 'get') {
        const roleResult = await EmailSettingsService.getApiSettingManagementEmailing();
        this.emailSetting = roleResult;
      } else if (this.portOperationType == 'put') {
        const data: any = { ...this.emailSetting };
        await EmailSettingsService.postApiSettingManagementEmailing({ requestBody: data })
          .then(() => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            this.refreshConfiguration();
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      }

      this.loading = false;
    },
    selectChange(keys) {
      this.itemKey = keys.key;
      this.disposePort();
    },

    managementHostFunction() {
      this.modalHelper.create(ManageHostFeatureComponent, {}, { size: 'medium' }).subscribe((res) => {
        if (!res) return;
        this.tabsIdentityActionKey = tabsIdentityActionKey;
        this.tabsAuditLogActionKey = tabsAuditLogActionKey;
        this.tabsAccountActionKey = tabsAccountActionKey;
        this.disposeVerify();
        this.refreshConfiguration();
      });
    },

    sendTestEmail() {
      this.modalHelper
        .create(SendTestEmailComponent, {
          senderEmailAddress: this.emailSetting.defaultFromAddress,
        })
        .subscribe(() => { });
    },

    refreshConfiguration() {
      initAbpConfigStore().then(() => {
        refreshMenuMax();
      });

    },

    async handleSubmit() {
      this.disposePort('put');
    },
  },
});
