import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { UserService, Volo_Abp_Identity_ClaimTypeDto } from '@/apis';

export default defineComponent({
  components: {},
  mixins: [ModalComponentBase],
  props: {
    _userId: {
      type: String,
      required: true,
    },
    _userName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isTwoFactor: false,
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.initData();
    },
    initData() {
      this.init();
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      UserService.getApiIdentityUsersTwoFactorEnabled({
        id: this._userId as string,
      })
        .then((res) => {
          this.isTwoFactor = res;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
      this.loading = false;
    },
    handleSubmit(closeFlag = true) {
      this.loading = true;
      if (this._userId != null) {
        UserService.putApiIdentityUsersTwoFactor({
          id: this._userId as string,
          enabled: this.isTwoFactor,
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
