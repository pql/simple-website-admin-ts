import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw, unref } from 'vue';
import {
  Volo_Abp_Identity_CreateClaimTypeDto,
  Volo_Abp_Identity_IdentityClaimValueType,
  ClaimTypeService,
} from '@/apis';

export default defineComponent({
  name: 'CreateScopesModal',

  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
    },
  },
  data() {
    const oppenIddictCreateClaimTypeDto: Volo_Abp_Identity_CreateClaimTypeDto = {
      name: '',
      required: false,
      regex: null,
      regexDescription: null,
      description: null,
      valueType: undefined as Volo_Abp_Identity_IdentityClaimValueType | undefined,
    };

    return {
      id: null,
      form: oppenIddictCreateClaimTypeDto,
      editForm: {},
      rules: {
        name: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
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
      this.init();
    },

    getLines(textArea) {
      if (typeof textArea === 'string') {
        return textArea
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line !== '');
      }
      return toRaw(textArea);
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        let createForm = unref(this.form);
        if (this.id == null) {
          // 创建
          ClaimTypeService.postApiIdentityClaimTypes({
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
          ClaimTypeService.putApiIdentityClaimTypes({
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
    /**
     * 初始化
     */
    async init() {
      this.loading = true;
      if (this.id != null) {
        const openiddictResult = await ClaimTypeService.getApiIdentityClaimTypes1({
          id: this.id,
        });
        const { name, required, regex, regexDescription, description, valueType } =
          openiddictResult;
        this.form = {
          name: name as string,
          required,
          regex,
          regexDescription,
          description,
          valueType,
        };
      }
      this.loading = false;
    },
  },
});
