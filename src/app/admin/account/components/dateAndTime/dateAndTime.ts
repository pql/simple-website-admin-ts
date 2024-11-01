import { defineComponent } from 'vue';
import { DATE_FORMAT_LIST } from '@/consts/DateFormat';
import { DateFormatStore } from '@/store/modules/dateFormat';
import AppComponentBase from '@/shared/component-base/app-component-base';

const dateFormatStore = DateFormatStore.useStoreWithOut();

export default defineComponent({
  mixins: [AppComponentBase],
  data() {
    return {
      form: {
        dateFormat: dateFormatStore.getDateFormat,
        use12Hours: dateFormatStore.getUse12Hours,
      },
      options: DATE_FORMAT_LIST,
      rules: {
        dateFormat: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
        use12Hours: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const values = await (this.$refs.formRef as any).validate();
        console.log('values', values);
        const { dateFormat, use12Hours } = values;
        dateFormatStore.setDateFormat(dateFormat);
        dateFormatStore.setUse12Hours(use12Hours);
        this.message.success(this.l('Unified.texts.SavedSuccessfully'));
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } catch (error) {
        console.log('error', error);
      }
    },
  },
});
