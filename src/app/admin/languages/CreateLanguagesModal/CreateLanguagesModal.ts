import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw, unref } from 'vue';
import {
  LanguagesService,
  Volo_Abp_LanguageManagement_Dto_CultureInfoDto,
  Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
} from '@/apis';

export default defineComponent({
  name: 'CreateLanguagesModal',
  mixins: [ModalComponentBase],

  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        cultureName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        uiCultureName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        displayName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
      },
      id: null,
      /** 文件详情 */
      language: {
        cultureName: undefined,
        uiCultureName: undefined,
        displayName: null,
        isEnabled: false,
      } as Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
      /** 文件代理类 */
      cultureDataSource: {
        service: 'LanguagesService.getApiLanguageManagementLanguagesCultureList',
        labelField: 'displayName',
        valueField: 'name',
      },
    };
  },

  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    /** 获取数据 */
    getPageData(id): void {
      this.loading = true;
      this.id = id;
      this.init();
    },
    async init() {
      this.loading = true;
      if (this.id != null) {
        const openiddictResult = await LanguagesService.getApiLanguageManagementLanguages1({
          id: this.id,
        });
        this.language = openiddictResult;
      }
      this.loading = false;
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        const createForm = unref(this.language);
        if (this.id == null) {
          // 创建
          LanguagesService.postApiLanguageManagementLanguages({
            requestBody: createForm,
          })
            .then((res) => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.handleSubmitAfter(closeFlag);
            })
            .catch((err) => {
              this.notify.error({ message: this.l(err.body.error.code) });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          // 修改
          LanguagesService.putApiLanguageManagementLanguages({
            id: this.id,
            requestBody: createForm,
          })
            .then((res) => {
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
