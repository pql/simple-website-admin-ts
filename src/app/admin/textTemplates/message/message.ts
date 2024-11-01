import { defineComponent } from 'vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { unref } from 'vue';
import {
  TextTemplateContentsService,
  Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput,
  Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput,
} from '@/apis';
import { router } from '@/router';
import { useRouter } from 'vue-router';
import custom from '..//custom/custom.vue';

export default defineComponent({
  name: 'message',
  mixins: [DynamicTableComponentBase],
  components: { custom },
  props: {
    _content: {
      type: String,
      default: '',
    },
  },
  data() {
    let param: Volo_Abp_TextTemplateManagement_TextTemplates_UpdateTemplateContentInput = {
      templateName: '',
      content: '',
    };

    return {
      currentComponentsKey: 'message',
      currentComponentsValue: '',
      loading: false,
      param,
    };
  },
  mounted() {
    this.initi();
  },
  methods: {
    async initi() {
      this.loading = true;
      const res = await TextTemplateContentsService.getApiTextTemplateManagementTemplateContents({
        templateName: this._content,
      });
      this.param = { content: res.content, templateName: res.name?.toString() ?? '' };
      this.loading = false;
    },
    custom() {
      this.currentComponentsKey = 'custom';
      this.currentComponentsValue = this.param.templateName ?? '';
    },
    receiveDataFromChild(data) {
      this.currentComponentsKey = data;
      this.goToTextTemplates();
    },
    goToTextTemplates() {
      this.$emit('childData', 'textTemplates');
    },
    restoreDefault() {
      this.loading = true;
      let datas: Volo_Abp_TextTemplateManagement_TextTemplates_RestoreTemplateContentInput = {
        templateName: this.param.templateName,
      };
      TextTemplateContentsService.putApiTextTemplateManagementTemplateContentsRestoreToDefault({
        requestBody: datas,
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
    handleSubmit() {
      this.loading = true;
      TextTemplateContentsService.putApiTextTemplateManagementTemplateContents({
        requestBody: this.param,
      })
        .then((res) => {
          this.goToTextTemplates();
          this.message.success(this.l('Unified.texts.SavedSuccessfully'));
        })
        .catch((error) => {
          this.message.error(this.l(error.body.error.code));
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
});
