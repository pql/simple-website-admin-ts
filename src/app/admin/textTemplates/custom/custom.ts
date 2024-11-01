import { defineComponent } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { unref } from 'vue';
import {
  TextTemplateContentsService,
  Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput,
  Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput,
} from '@/apis';
import { useRouter } from 'vue-router';
import { Select, type SelectProps } from 'ant-design-vue';

export default defineComponent({
  name: 'custom',
  mixins: [DynamicTableComponentBase],
  components: { Select },
  props: {
    _templateName: {
      type: String,
      default: '',
    },
  },
  data() {
    let param: Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput = {
      templateName: 'Abp.StandardEmailTemplates.Message',
      content: '{{model.message}}',
    };

    return {
      loading: false,
      selectOptions: [],
      referenceKey: 'zh-Hans',
      targetKey: 'ar',
      referenceDto: param,
      targetDto: param,
    };
  },
  mounted() {
    this.selectOptions = JSON.parse(this.l('Unified.texts.TextTemplates:BaseCultureNameSelect'));
    this.init();
  },
  methods: {
    async init() {
      this.initReference();
      this.initTarget();
    },

    async initReference() {
      this.loading = true;
      const resReference =
        await TextTemplateContentsService.getApiTextTemplateManagementTemplateContents({
          templateName: this._templateName,
          cultureName: this.referenceKey,
        });
      this.referenceDto = {
        content: resReference.content,
        templateName: resReference.name?.toString() ?? '',
      };
      this.loading = false;
    },
    async initTarget() {
      this.loading = true;
      const resTarget =
        await TextTemplateContentsService.getApiTextTemplateManagementTemplateContents({
          templateName: this._templateName,
          cultureName: this.targetKey,
        });
      this.targetDto = {
        content: resTarget.content,
        templateName: resTarget.name?.toString() ?? '',
      };
      this.loading = false;
    },

    goToTextTemplates() {
      this.$emit('childData', 'message');
    },

    restoreDefault() {
      this.loading = true;
      let datas: Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput = {
        templateName: this.targetDto.templateName,
        cultureName: this.targetKey,
      };
      TextTemplateContentsService.putApiTextTemplateManagementTemplateContentsRestoreToDefault({
        requestBody: datas,
      })
        .then((res) => {
          this.initTarget();
        })
        .catch((error) => {
          this.message.error(this.l(error.body.error.code));
        })
        .finally(() => {
          this.message.success(this.l('Unified.texts.SavedSuccessfully'));
          this.loading = false;
        });
    },
    handleSubmit() {
      this.loading = true;
      this.targetDto.cultureName = this.targetKey;
      TextTemplateContentsService.putApiTextTemplateManagementTemplateContents({
        requestBody: this.targetDto,
      })
        .then((res) => {})
        .catch((error) => {
          this.message.error(this.l(error.body.error.code));
        })
        .finally(() => {
          this.message.success(this.l('Unified.texts.SavedSuccessfully'));
          this.loading = false;
        });
    },

    selectReferenceChange(keys) {
      this.referenceKey = keys;
      this.initReference();
    },
    selectTargetChange(keys) {
      this.targetKey = keys;
      this.initTarget();
    },
  },
});
