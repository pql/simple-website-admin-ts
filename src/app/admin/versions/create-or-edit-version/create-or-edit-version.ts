import { defineComponent } from 'vue';
import { createOrEditVersionProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  EditionService,
  Volo_Saas_Host_Dtos_EditionCreateDto,
  Volo_Saas_Host_Dtos_EditionUpdateDto,
} from '@/apis';

export default defineComponent({
  mixins: [ModalComponentBase],
  props: {
    ...createOrEditVersionProps,
  },
  data() {
    const rolesCreateDto: any = {
      displayName: '',
      concurrencyStamp: '',
    };
    return {
      id: null,
      form: rolesCreateDto,
      rules: {
        displayName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 50,
            message: this.l('Unified.texts.OverMaxLength'),
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    this.getPageData(this.versionsId);
  },
  methods: {
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        if (!this.id) {
          // 创建
          const data: Volo_Saas_Host_Dtos_EditionCreateDto = {
            displayName: this.form.displayName,
            extraProperties: {},
            planId: '',
          };
          EditionService.postApiSaasEditions({
            requestBody: data,
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
        } else {
          // 修改
          const data: Volo_Saas_Host_Dtos_EditionUpdateDto = {
            displayName: this.form.displayName,
            concurrencyStamp: this.form.concurrencyStamp,
          };
          EditionService.putApiSaasEditions({
            id: this.id,
            requestBody: data,
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
    getPageData(id) {
      this.id = id;
      this.initData();
    },
    initData() {
      this.init();
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
        const roleResult = await EditionService.getApiSaasEditions({
          id: this.id,
        });
        this.form = {
          displayName: roleResult.displayName as string,
          concurrencyStamp: roleResult.concurrencyStamp,
        };
      }
      this.loading = false;
    },
  },
});
