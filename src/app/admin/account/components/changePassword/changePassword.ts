import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { OidcClient } from '@/utils/auth/oidc';
import { defineComponent, unref } from 'vue';

export default defineComponent({
  mixins: [ModalComponentBase],
  data() {
    return {
      loading: false,
      rules: {
        newPassword: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            validator: (rule, val, callback) => {
              if (val.length < 6) {
                return Promise.reject(
                  this.l(
                    'AbpValidation.texts.ThisFieldMustBeAStringOrArrayTypeWithAMinimumLengthOf{0}',
                    [6],
                  ),
                );
              }
              return Promise.resolve();
            },
            trigger: 'blur',
          },
          {
            validator: this.validateEqual,
            trigger: 'blur',
          },
          {
            validator: this.validateRepeat,
            trigger: 'blur',
          },
        ],
        confirmNewPassword: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            validator: this.validateEqual,
            trigger: 'blur',
          },
        ],
        currentPassword: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
      },
      form: {
        newPassword: '' as string,
        currentPassword: '' as string,
        confirmNewPassword: '' as string,
      },
    };
  },
  computed: {},
  methods: {
    passwordChange() {
      (this.$refs.formRef as any).validateFields(['newPassword', 'confirmNewPassword']);
    },
    /**
     * 验证密码
     */
    validateRepeat(rule, val, callback) {
      if (this.form.currentPassword == this.form.newPassword) {
        return Promise.reject(this.l('Unified.texts.CurrentpasswordAndNewpasswordNo'));
      } else {
        return Promise.resolve();
      }
    },
    /**
     * 验证密码
     */
    validateEqual(rule, val, callback) {
      if (
        this.form.newPassword !== this.form.confirmNewPassword &&
        this.form.newPassword &&
        this.form.confirmNewPassword
      ) {
        return Promise.reject(this.l('Unified.texts.Volo:Abp:Identity:PasswordConfirmationFailed'));
      } else {
        return Promise.resolve();
      }
    },
    handleSubmit() {
      (this.$refs.formRef as any).validate().then((res) => {
        this.loading = true;
        const { newPassword, currentPassword } = unref(this.form);
        const pam = {
          newPassword: newPassword,
          currentPassword: currentPassword,
        };
        // 修改
        OidcClient.postApiAccountChangePassword(pam)
          .then((res) => {
            this.notify.success({ message: this.l('SavedSuccessfully') });
          })
          .catch((err) => {
            // this.notify.error({ message: err.body.error.code });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
});
