import { defineComponent } from 'vue';
import { sendTestEmailProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { EmailSettingsService, Volo_Abp_SettingManagement_SendTestEmailInput } from '@/apis';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...sendTestEmailProps,
  },
  data() {
    const sendTestEmailDto: Volo_Abp_SettingManagement_SendTestEmailInput = {
      body: '测试邮件内容',
      targetEmailAddress: 'admin@hk.com',
      subject: `测试邮件${Math.floor(1000 + Math.random() * 9000)}`,
      senderEmailAddress: this.senderEmailAddress!,
    };

    return {
      sendTestEmailDto,
    };
  },
  methods: {
    async handleSubmit(closeFlag = true) {
      this.loading = true;

      await EmailSettingsService.postApiSettingManagementEmailingSendTestEmail({
        requestBody: this.sendTestEmailDto,
      })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          this.handleSubmitAfter(closeFlag);
        })
        .catch((err) => {
          if (err?.body?.error?.code) {
            this.notify.error({ message: this.l(err.body.error.code) });
          } else {
            this.handleSubmitAfter(closeFlag);
          }
        })
        .finally(() => {
          this.loading = false;
        });
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
