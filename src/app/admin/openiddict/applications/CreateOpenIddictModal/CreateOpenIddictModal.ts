import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import {
  ApplicationsService,
  Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
  ScopesService,
} from '@/apis';

export default defineComponent({
  name: 'CreateOpenIddictModal',
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
  },
  data() {
    const oppenIddictCreateDto: Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput = {
      applicationType: '',
      clientId: '',
      displayName: '',
      clientType: '',
      clientSecret: '',
      consentType: '',
      extensionGrantTypes: [],
      postLogoutRedirectUris: [],
      redirectUris: [],
      allowPasswordFlow: false,
      allowClientCredentialsFlow: false,
      allowAuthorizationCodeFlow: false,
      allowRefreshTokenFlow: false,
      allowHybridFlow: false,
      allowImplicitFlow: false,
      allowLogoutEndpoint: false,
      allowDeviceEndpoint: false,
      scopes: [],
      clientUri: '',
      logoUri: '',
    };
    ScopesService.getApiOpeniddictScopesAll
    return {
      id: null,
      form: oppenIddictCreateDto,
      editForm: {
        enabled: false,
      },
      rules: {
        applicationType: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        clientId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        displayName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        clientType: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
      },
      scopesDataSource: {
        service: 'ScopesService.getApiOpeniddictScopesAll', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'name', //下拉框值
        params: {},
      },
    };
  },
  computed: {
    formattedExtensionGrantTypes: {
      get() {
        return this.form.extensionGrantTypes?.join('\n');
      },
      set(newValue: string) {
        this.form.extensionGrantTypes = this.getLines(newValue);
      },
    },
    formattedPostLogoutRedirectUris: {
      get() {
        return this.form.postLogoutRedirectUris?.join('\n');
      },
      set(newValue: string) {
        this.form.postLogoutRedirectUris = this.getLines(newValue);
      },
    },
    formattedRedirectUris: {
      get() {
        return this.form.redirectUris?.join('\n');
      },
      set(newValue: string) {
        this.form.redirectUris = this.getLines(newValue);
      },
    },
  },
  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    isAgree() {
      return (
        this.form.allowAuthorizationCodeFlow ||
        this.form.allowImplicitFlow ||
        this.form.allowHybridFlow
      );
    },
    isRefreshToken() {
      return (
        !this.form.allowAuthorizationCodeFlow &&
        !this.form.allowHybridFlow &&
        !this.form.allowPasswordFlow
      );
    },
    getPageData(id) {
      this.id = id;
      this.initData();
    },
    initData() {
      this.init();
    },
    clientTypeChange(value) {
      console.log('value', value);
      if (value == 'Confidential') {
        this.form.allowRefreshTokenFlow = false;
      }
    },
    getLines(textArea) {
      if (typeof textArea === 'string') {
        return textArea
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line !== '');
      }
      return toRaw(textArea);
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        // let createOpenId = this.form;
        const createOpenId = {
          applicationType: this.form.applicationType,
          clientId: this.form.clientId,
          displayName: this.form.displayName,
          clientType: this.form.clientType,
          clientSecret: this.form.clientSecret,
          consentType: this.form.consentType,
          extensionGrantTypes: this.getLines(this.form.extensionGrantTypes),
          postLogoutRedirectUris: this.getLines(this.form.postLogoutRedirectUris),
          redirectUris: this.getLines(this.form.redirectUris),
          allowPasswordFlow: this.form.allowPasswordFlow,
          allowClientCredentialsFlow: this.form.allowClientCredentialsFlow,
          allowAuthorizationCodeFlow: this.form.allowAuthorizationCodeFlow,
          allowRefreshTokenFlow: this.form.allowRefreshTokenFlow,
          allowHybridFlow: this.form.allowHybridFlow,
          allowImplicitFlow: this.form.allowImplicitFlow,
          allowLogoutEndpoint: this.form.allowLogoutEndpoint,
          allowDeviceEndpoint: this.form.allowDeviceEndpoint,
          scopes: toRaw(this.form.scopes),
          clientUri: this.form.clientUri,
          logoUri: this.form.logoUri,
        };
        if (this.id == null) {
          // 创建
          ApplicationsService.postApiOpeniddictApplications({
            requestBody: createOpenId,
          })
            .then((res) => {
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
          ApplicationsService.putApiOpeniddictApplications({
            id: this.id,
            requestBody: createOpenId,
          })
            .then((res) => {
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
      //const scopesList = await ScopesService.getApiOpeniddictScopesAll();
      // this.scopesOptions = scopesList.map((item) => ({
      //   value: item.name,
      // }));

      if (this.id != null) {
        const openiddictResult = await ApplicationsService.getApiOpeniddictApplications({
          id: this.id,
        });
        this.form = {
          applicationType: openiddictResult.applicationType as string,
          clientId: openiddictResult.clientId as string,
          displayName: openiddictResult.displayName as string,
          clientType: openiddictResult.clientType,
          clientSecret: openiddictResult.clientSecret,
          consentType: openiddictResult.consentType,
          extensionGrantTypes: openiddictResult.extensionGrantTypes,
          postLogoutRedirectUris: openiddictResult.postLogoutRedirectUris,
          redirectUris: openiddictResult.redirectUris,
          allowPasswordFlow: openiddictResult.allowPasswordFlow,
          allowClientCredentialsFlow: openiddictResult.allowClientCredentialsFlow,
          allowAuthorizationCodeFlow: openiddictResult.allowAuthorizationCodeFlow,
          allowRefreshTokenFlow: openiddictResult.allowRefreshTokenFlow,
          allowHybridFlow: openiddictResult.allowHybridFlow,
          allowImplicitFlow: openiddictResult.allowImplicitFlow,
          allowLogoutEndpoint: openiddictResult.allowLogoutEndpoint,
          allowDeviceEndpoint: openiddictResult.allowDeviceEndpoint,
          scopes: openiddictResult.scopes,
          clientUri: openiddictResult.clientUri,
          logoUri: openiddictResult.logoUri,
        };
      }
      this.loading = false;
    },
  },
});
