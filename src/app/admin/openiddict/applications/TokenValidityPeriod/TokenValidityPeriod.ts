import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import {
  ApplicationsService,
  Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto,
} from '@/apis';

export default defineComponent({
  name: 'CreateScopesModal',
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
  },
  data() {
    const validityDto: Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto = {
      accessTokenLifetime: null,
      authorizationCodeLifetime: null,
      deviceCodeLifetime: null,
      identityTokenLifetime: null,
      refreshTokenLifetime: null,
      userCodeLifetime: null,
    };
    return {
      id: '',
      form: validityDto,
    };
  },
  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    getPageData(id) {
      this.id = id;
      this.init();
    },

    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        const {
          accessTokenLifetime,
          authorizationCodeLifetime,
          deviceCodeLifetime,
          identityTokenLifetime,
          refreshTokenLifetime,
          userCodeLifetime,
        } = this.form;
        const pam = {
          accessTokenLifetime: accessTokenLifetime || null,
          authorizationCodeLifetime: authorizationCodeLifetime || null,
          deviceCodeLifetime: deviceCodeLifetime || null,
          identityTokenLifetime: identityTokenLifetime || null,
          refreshTokenLifetime: refreshTokenLifetime || null,
          userCodeLifetime: userCodeLifetime || null,
        };
        ApplicationsService.putApiOpeniddictApplicationsTokenLifetime({
          id: this.id,
          requestBody: pam,
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
      if (this.id != null) {
        const openiddictResult =
          await ApplicationsService.getApiOpeniddictApplicationsTokenLifetime({
            id: this.id,
          });
        const {
          accessTokenLifetime,
          authorizationCodeLifetime,
          deviceCodeLifetime,
          identityTokenLifetime,
          refreshTokenLifetime,
          userCodeLifetime,
        } = openiddictResult;
        this.form = {
          accessTokenLifetime,
          authorizationCodeLifetime,
          deviceCodeLifetime,
          identityTokenLifetime,
          refreshTokenLifetime,
          userCodeLifetime,
        };
      }
      this.loading = false;
    },
  },
});
