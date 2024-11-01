import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import { userStatementProps } from './props';
import { UserService, Volo_Abp_Identity_ClaimTypeDto } from '@/apis';
import { OidcClient } from '@/utils/auth/oidc';

export default defineComponent({
  components: {},
  mixins: [ModalComponentBase],
  props: {
    ...userStatementProps,
  },
  data() {
    return {
      id: null,
      typeOptions: new Array<Volo_Abp_Identity_ClaimTypeDto>(),
      templateData: {
        type: undefined,
        value: '',
        regex: '',
        regexDescription: '',
      },
      typeDataSource: {
        service: 'UserService.getApiIdentityUsersAllClaimTypes',
        labelField: 'name',
        valueField: 'name',
      },
      dataList: [] as any,
      columns: [
        {
          title: 'claimType',
          dataIndex: 'claimType',
          key: 'claimType',
        },
        {
          title: 'claimValue',
          dataIndex: 'claimValue',
          key: 'claimValue',
        },
        {
          title: 'action',
          dataIndex: 'action',
          key: 'action',
        },
      ],
      rules: {},
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
      if (this.id != null) {
        this.dataList = await UserService.getApiIdentityUsersClaims({
          id: this.id,
        });
      }
      this.loading = false;
    },
    handleTypeSelectListChange(items) {
      this.typeOptions = items;
    },
    handleTypeChange(value, option) {
      const datas = option;
      if (datas?.required) {
        this.rules = {
          value: [
            {
              required: true,
              message: this.l('Unified.texts.ThisFieldIsRequired'),
              trigger: 'blur',
            },
            {
              pattern: datas?.regex,
              message: datas?.regexDescription,
              trigger: 'blur',
            },
          ],
        };
      } else {
        this.rules = {
          value: [
            {
              required: true,
              message: this.l('Unified.texts.ThisFieldIsRequired'),
              trigger: 'blur',
            },
          ],
        };
      }
    },
    removeRow(index) {
      this.dataList.splice(index, 1);
    },
    handleInputChange(e, index) {
      const newValue = e.target.value;
      this.dataList[index].claimValue = newValue;
    },
    handleAdd(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        const itype = this.typeOptions.find((item) => item.name == this.templateData.type);
        this.dataList.push({
          claimType: this.templateData.type,
          claimValue: this.templateData.value,
          regex: this.templateData.regex,
          regexDescription: this.templateData.regexDescription,
          inputType: itype?.valueTypeAsString,
          userId: this.id,
        });
      });
    },

    handleSubmit(closeFlag = true) {
      this.loading = true;
      if (this.id != null) {
        // 创建
        let datas = this.dataList;
        if (!datas || datas.length == 0) datas = [];
        const pam = {
          id: this.id as string,
          requestBody: datas,
        };
        OidcClient.putApiIdentityUsersClaims(pam)
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
