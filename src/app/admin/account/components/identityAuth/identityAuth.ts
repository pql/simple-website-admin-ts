import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { defineComponent } from 'vue';
import { Image } from 'ant-design-vue';
import { OidcClient } from '@/utils/auth/oidc';

import QRCode from 'qrcode';
export default defineComponent({
  components: {
    Image,
  },
  mixins: [DynamicTableComponentBase],
  data() {
    return {
      loading: false,
      saveloading: false,
      nextDisabled: false,
      stepIndex: 1,
      qrImg: '',
      qrCode: '',
      verificationCode: '',
      stepStyle: {
        marginBottom: '60px',
        boxShadow: '0px -1px 0 0 #e8e8e8 inset',
      },
      tabList: [
        {
          id: 1,
          description: 'Authenticator',
          disabled: false,
        },
        {
          id: 2,
          description: 'AbpAccount.texts.VerifyTheAuthenticator',
          disabled: false,
        },
        {
          id: 3,
          description: 'AbpAccount.texts.RecoveryCodes',
          disabled: true,
        },
      ],
    };
  },
  computed: {},
  mounted() {
    this.getPageData();
  },
  methods: {
    async getPageData() {
      const res = await OidcClient.getApiAuthenticatorInfo();
      this.qrCode = res.key;
      // 生成二维码
      const qrRes = await QRCode.toDataURL(res.uri);
      this.qrImg = qrRes;
    },
    verification() {
      if (!this.verificationCode) return;
      this.saveloading = true;
      OidcClient.postApiVerifyAuthenticatorCode({ code: this.verificationCode })
        .then((res) => {
          this.nextDisabled = true;
          this.tabList[2].disabled = false;
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.saveloading = false;
        });
    },
    handleChange(e) {
      this.stepIndex = e.target.value;
      if (this.stepIndex == 2) {
        this.nextDisabled = true;
      }
    },
    nextClick() {
      this.stepIndex += 1;
      if (this.stepIndex == 2) {
        this.nextDisabled = true;
      }
    },
    copy(key) {
      const text = this[key];
      let save = function (e) {
        e.clipboardData.setData('text/plain', text);
        e.preventDefault(); // 阻止默认行为
      };
      const once = { once: true };
      document.addEventListener('copy', save, once); // 添加一个copy事件,当触发时执行一次,执行完删除
      document.execCommand('copy'); // 执行copy方法
    },
  },
});
