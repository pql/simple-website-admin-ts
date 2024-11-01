import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { OidcClient } from '@/utils/auth/oidc';
import { defineComponent, unref } from 'vue';
import { AppConsts } from '@/abpPro/AppConsts';
import { Modal } from 'ant-design-vue';
import number from '@/shared/components/f-number/src/number';

const { appBaseUrl } = AppConsts;

export default defineComponent({
  components: {
    Modal,
  },
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
        ],
        confirmNewPassword: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
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
      copyForm: {} as any,
      form: {
        email: '' as string | null,
        extraProperties: {} as object | null,
        name: '' as string | null,
        phoneNumber: '' as string | number | null,
        surname: '' as string | null,
        timezone: '' as string | null,
        userName: '' as string | null,
      },
      phoneTokenForm: { token: undefined },
      timeZoneList: [] as any[],
      sendEmail: true,
      confirmationPhone: false,
      phoneLoading: false,
    };
  },
  computed: {
    getEmailStyle() {
      return {
        width: this.copyForm.email === this.form.email && this.sendEmail ? '90%' : '100%',
      };
    },
    getPhoneNumberStyle() {
      return {
        width: this.copyForm.phoneNumber === this.form.phoneNumber ? '90%' : '100%',
      };
    },
  },
  mounted() {
    this.getTimezonesData();
    this.getUserInfo();
  },
  methods: {
    isUserNameUpdateEnabled() {
      return this.setting?.values['Abp.Identity.User.IsUserNameUpdateEnabled'] == 'False';
    },
    isEmailUpdateEnabled() {
      return this.setting?.values['Abp.Identity.User.IsEmailUpdateEnabled'] == 'False';
    },
    async getUserInfo() {
      this.loading = true;
      const res = await OidcClient.pgetApiAccountMyProfile();
      this.copyForm = { ...res };
      this.form = res;

      this.loading = false;
    },
    /* 获取时区列表 */
    async getTimezonesData() {
      const res = await OidcClient.getApiAccountTimezones();
      this.timeZoneList = res;
    },
    /* 保存更改 */
    handleSubmit() {
      (this.$refs.formRef as any).validate().then((res) => {
        this.loading = true;
        const pam = unref(this.form);
        // 修改个人信息
        OidcClient.putApiAccountMyProfile(pam)
          .then((res) => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            this.getUserInfo();
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    /* 发送邮箱验证码 */
    async postSendEmail() {
      this.sendEmail = false;
      const pam = {
        appName: 'MVC',
        email: this.form.email,
        userId: this.abp.currentUser?.id as string,
        returnUrl: `${appBaseUrl}/login`,
      };
      const res = await OidcClient.postSendEmailConfirmationToken(pam);
      this.notify.success({
        message: this.l('Unified.texts.ValidationAssociationEmail', [this.form.email]),
      });
    },

    /* 发送手机验证码 */
    async postSendPhoneNumber() {
      const pam = {
        phoneNumber: this.form.phoneNumber,
        userId: this.abp.currentUser?.id as string,
      };
      const res = await OidcClient.postSendPhoneNumberConfirmationToken(pam);
      this.confirmationPhone = true;
    },
    confirmationPhoneCancel() {
      this.confirmationPhone = false;
      this.phoneTokenForm = { token: null };
    },

    async submitPostSendPhoneNumber() {
      console.log('dwqdd');
      (this.$refs.phoneForm as any).validate().then((res) => {
        this.phoneLoading = true;
        const pam = {
          token: (this.phoneTokenForm?.token as any).toString(),
          userId: this.abp.currentUser?.id as string,
        };
        OidcClient.postConfirmPhoneNumber(pam)
          .then(() => {})
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.phoneLoading = false;
          });
      });
    },
    //
  },
});
