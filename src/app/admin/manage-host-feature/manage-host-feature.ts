import { defineComponent } from 'vue';
import { manageHostFeatureProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { Select } from 'ant-design-vue';
import {
  FeaturesService,
  Volo_Abp_FeatureManagement_UpdateFeatureDto,
  Volo_Abp_FeatureManagement_UpdateFeaturesDto,
} from '@/apis';

export default defineComponent({
  components: {
    Select,
  },
  mixins: [ModalComponentBase],
  props: {
    ...manageHostFeatureProps,
  },
  data() {
    const vId: String = '';
    const pName: String = '';
    const selectedKeys: Array<string> = ['identifyLabel'];
    const itemKey: string = selectedKeys[0];
    const twoFactorBehaviourOptions: any = JSON.parse(
      this.l('Unified.texts.Setting:TwoFactorVerificationSelect2'),
    );

    const features: any = {
      identity: {
        twoFactor: '',
        maxUserCount: 0,
        enableLdapLogin: false,
        enableOAuthLogin: false,
      },
      languageManagement: {
        enable: false,
      },
      textModuleManagement: {
        enable: false,
      },
      auditLog: {
        enable: false,
        settingManagement: false,
      },
      files: {
        enable: false,
        storageSize: 0,
      },
    };
    return {
      selectedKeys,
      itemKey,
      features,
      twoFactorBehaviourOptions,
      vId,
      pName,
    };
  },
  mounted() {
    this.getPageData(this.versionsId, this.providerName);
  },
  methods: {
    getPageData(versionsId, providerName) {
      this.vId = versionsId;
      this.pName = providerName;

      if (!this.pName) this.pName = 'T';
      this.disposePort();
    },

    async disposePort() {
      this.loading = true;
      const param: any = {
        providerKey: this.vId,
        providerName: this.pName,
      };
      const roleResult = await FeaturesService.getApiFeatureManagementFeatures(param);

      const identity = roleResult.groups?.find((f) => {
        return f.name == 'Identity';
      });
      const languageManagement = roleResult.groups?.find((f) => {
        return f.name == 'LanguageManagement';
      });
      const textModuleManagement = roleResult.groups?.find((f) => {
        return f.name == 'TextManagement';
      });
      const auditLog = roleResult.groups?.find((f) => {
        return f.name == 'AuditLogging';
      });
      const files = roleResult.groups?.find((f) => {
        return f.name == 'FileManagement';
      });

      this.features = {
        identity: {
          twoFactor: identity?.features?.find((f) => {
            return f.name == 'Identity.TwoFactor';
          })?.value,
          maxUserCount: identity?.features?.find((f) => {
            return f.name == 'Identity.MaxUserCount';
          })?.value,
          enableLdapLogin:
            identity?.features?.find((f) => {
              return f.name == 'Account.EnableLdapLogin';
            })?.value == 'true',
          enableOAuthLogin:
            identity?.features?.find((f) => {
              return f.name == 'Identity.EnableOAuthLogin';
            })?.value == 'true',
        },
        languageManagement: {
          enable:
            languageManagement?.features?.find((f) => {
              return f.name == 'LanguageManagement.Enable';
            })?.value == 'true',
        },
        textModuleManagement: {
          enable:
            textModuleManagement?.features?.find((f) => {
              return f.name == 'TextManagement.Enable';
            })?.value == 'true',
        },
        auditLog: {
          enable:
            auditLog?.features?.find((f) => {
              return f.name == 'AuditLogging.Enable';
            })?.value == 'true',
          settingManagement:
            auditLog?.features?.find((f) => {
              return f.name == 'AuditLogging.SettingManagement';
            })?.value == 'true',
        },
        files: {
          enable:
            files?.features?.find((f) => {
              return f.name == 'FileManagement.Enable';
            })?.value == 'true',
          storageSize: files?.features?.find((f) => {
            return f.name == 'FileManagement.StorageSize';
          })?.value,
        },
      };

      this.loading = false;
    },

    async handleSubmit(closeFlag = true) {
      this.loading = true;

      const features: Array<Volo_Abp_FeatureManagement_UpdateFeatureDto> = [];
      features.push({ name: 'Identity.TwoFactor', value: this.features.identity.twoFactor });
      features.push({ name: 'Identity.MaxUserCount', value: this.features.identity.maxUserCount + '' });
      features.push({
        name: 'Account.EnableLdapLogin',
        value: this.features.identity.enableLdapLogin + '',
      });
      features.push({
        name: 'Identity.EnableOAuthLogin',
        value: this.features.identity.enableOAuthLogin + '',
      });
      features.push({
        name: 'LanguageManagement.Enable',
        value: this.features.languageManagement.enable + '',
      });
      features.push({
        name: 'TextManagement.Enable',
        value: this.features.textModuleManagement.enable + '',
      });
      features.push({ name: 'AuditLogging.Enable', value: this.features.auditLog.enable + '' });
      features.push({
        name: 'AuditLogging.SettingManagement',
        value: this.features.auditLog.settingManagement + '',
      });
      features.push({ name: 'FileManagement.Enable', value: this.features.files.enable + '' });
      features.push({
        name: 'FileManagement.StorageSize',
        value: this.features.files.storageSize + '',
      });
      const data: Volo_Abp_FeatureManagement_UpdateFeaturesDto = { features };

      const param: any = {
        providerKey: this.vId,
        providerName: this.pName,
        requestBody: data,
      };
      await FeaturesService.putApiFeatureManagementFeatures(param).finally(() => {
        this.loading = false;
        this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        this.handleSubmitAfter(closeFlag);
      });
    },
    selectChange(keys) {
      this.itemKey = keys.key;
    },
    twoFactorSelectChange(selectKey) {
      this.features.identity.twoFactor = selectKey;
    },
    handleSubmitAfter(closeFlag = true) {
      if (closeFlag) {
        this.success();
      } else {
        this.saveNotClose();
      }
    },
  },
});
