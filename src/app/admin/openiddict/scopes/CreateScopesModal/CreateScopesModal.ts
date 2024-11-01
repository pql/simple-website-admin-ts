import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent, toRaw } from 'vue';
import { Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput, ScopesService } from '@/apis';
import { string } from 'vue-types';

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
    const oppenIddictCreateDto: Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput = {
      name: '',
      displayName: null,
      description: null,
      resources: null,
    };

    return {
      id: null,
      form: oppenIddictCreateDto,
      editForm: {
        enabled: false,
      },
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
  computed: {
    formattedResources: {
      get() {
        return this.form.resources?.join('\n');
      },
      set(newValue: string) {
        this.form.resources = this.getLines(newValue);
      },
    },
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
        const { name, displayName, description, resources } = this.form;
        let createScopesForm = {
          name,
          displayName,
          description,
          resources,
        };
        if (this.id == null) {
          // 创建
          ScopesService.postApiOpeniddictScopes({
            requestBody: createScopesForm,
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
          ScopesService.putApiOpeniddictScopes({
            id: this.id,
            requestBody: createScopesForm,
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
        const openiddictResult = await ScopesService.getApiOpeniddictScopes({
          id: this.id,
        });
        const { name, displayName, description, resources } = openiddictResult;
        this.form = {
          name: name as string,
          displayName,
          description,
          resources,
        };
      }
      this.loading = false;
    },
  },
});
