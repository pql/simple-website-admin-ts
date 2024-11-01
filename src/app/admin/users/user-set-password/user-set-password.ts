import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { userSetPassWordProps } from './props';
import { UserService, Volo_Abp_Identity_ClaimTypeDto } from '@/apis';

export default defineComponent({
  components: {},
  mixins: [ModalComponentBase],
  props: {
    ...userSetPassWordProps,
  },
  data() {
    return {
      id: null,
      form: {
        newPassword: '',
      },
      rules: {
        newPassword: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
          },
        ],
      },
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
      this.init();
    },
    /**
     * 初始化
     */
    async init() {
      this.loading = true;

      this.loading = false;
    },
    randomPassword() {
      this.form.newPassword = this.generateRandomPassword();
    },
    generateRandomPassword(): string {
      const length = Math.floor(Math.random() * 7) + 6; // 生成6到12位的随机长度
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

      const allCharacters = uppercase + lowercase + numbers + specialCharacters;

      let password = '';
      password += uppercase[Math.floor(Math.random() * uppercase.length)]; // 保证至少包含一个大写字母
      password += lowercase[Math.floor(Math.random() * lowercase.length)]; // 保证至少包含一个小写字母
      password += numbers[Math.floor(Math.random() * numbers.length)]; // 保证至少包含一个数字
      password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)]; // 保证至少包含一个特殊字符

      for (let i = 4; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
      }

      return password
        .split('')
        .sort(() => 0.5 - Math.random())
        .join(''); // 随机打乱密码顺序
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        if (this.id != null) {
          // 更该密码
          UserService.putApiIdentityUsersChangePassword({
            id: this.id as string,
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
  },
});
