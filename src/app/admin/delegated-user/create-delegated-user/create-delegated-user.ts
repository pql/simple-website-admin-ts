import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { userSetPassWordProps } from './props';
import { UserService, Volo_Abp_Identity_ClaimTypeDto } from '@/apis';
import { Select, type SelectProps, DatePicker, TimePicker } from 'ant-design-vue';
import { OidcClient } from '@/utils/auth/oidc';
import arrayToObjectsOptions from '@/shared/utils/array/arrayToObjectsOptions';

export default defineComponent({
  components: { Select, DatePicker, TimePicker },
  mixins: [ModalComponentBase],
  props: {},
  data() {
    const userOptions: any = [];
    return {
      id: null,
      userOptions,
      activationDate: null,
      users: { id: '', name: '' },
      userDataSource: {
        service: 'CustomUserService.getApiAppCustomUserNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: {},
      }
    };
  },
  mounted() {

  },
  methods: {
    userChange(selectKey, item) {
      this.users = item;
    },
    handleSubmit(closeFlag = true) {
      if (!this.activationDate) {
        this.notify.warning({ message: this.l('Unified.texts.DelegatedUser:PleaseFillInDate') });
        return;
      }
      if (!this.users.id) {
        this.notify.warning({
          message: this.l('Unified.texts.DelegatedUser:PleaseFillInSelectUser'),
        });
        return;
      }

      const startTime = this.activationDate[0];
      const endTime = this.activationDate[1];

      this.loading = true;

      OidcClient.postDelegatedUsers({
        targetUserId: this.users.id,
        startTime,
        endTime,
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
    FormatAllDate(sDate, type = 'yyyy-MM-dd HH:mm:ss', dates = '') {
      const date = new Date(sDate);
      const seperator1 = '-';
      const seperator2 = ':';
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      //月
      if (month >= 1 && month <= 9) {
        month = '0' + month;
      }
      //日
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
      }
      //时
      if (hours >= 0 && hours <= 9) {
        hours = '0' + hours;
      }
      //分
      if (minutes >= 0 && minutes <= 9) {
        minutes = '0' + minutes;
      }
      //秒
      if (seconds >= 0 && seconds <= 9) {
        seconds = '0' + seconds;
      }
      //格式化后日期为：yyyy-MM-dd HH:mm:ss
      let currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        ' ' +
        hours +
        seperator2 +
        minutes +
        seperator2 +
        seconds;

      if (type == 'yyyy-MM-dd') {
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;

        if (dates == 'start') {
          currentdate += `T00:00:00Z`;
        } else if (dates == 'end') {
          currentdate += `T23:59:59Z`;
        }
      }
      return currentdate;
    },
  },
});
