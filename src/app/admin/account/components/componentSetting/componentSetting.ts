import AppComponentBase from '@/shared/component-base/app-component-base';
import { ComponentModalSettingStore } from '@/store/modules/componentModalSetting';
import { defineComponent } from 'vue';

const componentModalSettingStore = ComponentModalSettingStore.useStoreWithOut();

export default defineComponent({
  mixins: [AppComponentBase],
  data() {
    return {
      form: {
        showCancelButton: componentModalSettingStore.getShowCancelButton,
        showNextStepButton: componentModalSettingStore.showNextStepButton,
      },
      rules: {
        showCancelButton: [],
        showNextStepButton: [],
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const values = await (this.$refs.formRef as any).validate();
        const { showCancelButton, showNextStepButton } = values;
        componentModalSettingStore.setButtonsDisplayState({
          showCancelButton,
          showNextStepButton,
        });
        this.message.success(this.l('Unified.texts.SavedSuccessfully'));
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
