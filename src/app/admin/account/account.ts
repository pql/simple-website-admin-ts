import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';
import {
  ChangePassword,
  IdentityAuth,
  PersonalInfo,
  ProfilePicture,
  DateAndTime,
  ComponentSetting,
} from './components';
import AppComponentBase from '@/shared/component-base/app-component-base';

export default defineComponent({
  components: {
    ChangePassword,
    IdentityAuth,
    PersonalInfo,
    ProfilePicture,
    Card,
    DateAndTime,
    ComponentSetting,
  },
  mixins: [ModalComponentBase, AppComponentBase],
  data() {
    return {
      loading: false,
      isTwoFactor: true,
      selectedKeys: ['ProfilePicture'] as Array<string>,
      itemKey: 'ProfilePicture' as string,

      LeftMenu: [
        { label: this.l('AbpAccount.texts.ProfileTab:Picture'), key: 'ProfilePicture' },
        { label: this.l('AbpAccount.texts.ProfileTab:Password'), key: 'ChangePassword' },
        { label: this.l('AbpAccount.texts.ProfileTab:PersonalInfo'), key: 'PersonalInfo' },
        { label: this.l('AbpAccount.texts.ProfileTab:AuthenticatorApp'), key: 'IdentityAuth' },
        { label: this.l('Unified.texts.ProfileTab:DateAndTime'), key: 'DateAndTime' },
        { label: this.l('Unified.texts.ProfileTab:ComponentSetting'), key: 'ComponentSetting' },
      ] as any[],
    };
  },
  computed: {},
  mounted() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      this.disposePort();
    },

    async disposePort(type: string | 'get' | 'put' = 'get') {},

    selectChange(keys) {
      this.itemKey = keys.key;
    },
  },
});
