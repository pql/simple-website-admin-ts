import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import {
  UserService,
  CustomLinkUsersService,
  FireBytes_Unified_LinkUsers_Dtos_SaveLinkUsersDto,
  CustomUserService,
} from '@/apis';
import { Select, type SelectProps, DatePicker, TimePicker } from 'ant-design-vue';
import { OidcClient } from '@/utils/auth/oidc';
import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';
import { UserStore } from '@/store/modules/user';

const userStore = UserStore.useStore();

export default defineComponent({
  components: { Select, DatePicker, TimePicker },
  mixins: [ModalComponentBase],
  props: {},
  data() {
    return {
      id: null,
      users: { id: '', name: '' },
      userPassword: '',
      userDataSource: {
        service: 'CustomUserService.getApiAppCustomUserNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: { notId: userStore.getUserInfo.id },
      }
    };
  },
  mounted() {
  },
  methods: {
    userChange(selectKey,item) {
      this.users = item;
    },
    handleSubmit(closeFlag = true) {
      if (!this.userPassword) {
        this.notify.warning({ message: this.l('Unified.texts.LinkUser:PleaseFillInPassword') });
        return;
      }
      if (!this.users.id) {
        this.notify.warning({ message: this.l('Unified.texts.LinkUser:PleaseFillInSelectUser') });
        return;
      }

      this.loading = true;

      CustomUserService.postApiAppCustomUserVerifyPassword({
        name: this.users.name,
        password: this.userPassword,
      })
        .then((res) => {
          if (!res) {
            this.notify.error({ message: this.l('Unified.texts.WrongPassword') });
            return;
          }
          this.submit(closeFlag);
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    submit(closeFlag = true) {
      CustomLinkUsersService.postApiAppCustomLinkUsers({
        requestBody: {
          sourceUserId: this.users.id,
          targetUserId: userStore.getUserInfo.id as string,
        },
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
