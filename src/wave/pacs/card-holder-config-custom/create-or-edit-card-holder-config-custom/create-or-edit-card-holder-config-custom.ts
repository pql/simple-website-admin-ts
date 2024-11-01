import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsCardHolderConfigCustomService, FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto
} from '@/apis';
import { Select, DatePicker } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';
import {
  UnorderedListOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons-vue';
import draggable from 'vuedraggable';


const { fromUTCDateToLocalDateHorizontalSymbol } = useTimezone();
export default defineComponent({
  components: {
    Select,
    DatePicker,
    UnorderedListOutlined,
    CloseOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    draggable
  },
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
      default: () => [],
    },
    _types: {
      type: String,
      required: true,
    },
    _titleName: {
      type: String,
      required: true,
    },
  },
  data() {
    const databases: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolderConfigCustoms_Dtos_PacsCardHolderConfigCustomListDto> =
      [];

    return {
      id: '',
      form: {
        data: databases
      },
      rules: {},
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    fromUTCDateToLocalDateHorizontalSymbol,
    getPageData() {
      this.initData();
    },
    initData() {
      this.init();
    },
    init() {
      this.getEditdata();
    },
    addCustomFields() {
      const field: any = {};
      field.fieldName = '';
      field.fieldPlaceholder = '';
      field.fieldType = '';
      if (!this.form?.data) this.form.data = [];
      this.form?.data?.push(field);
    },
    removeFieldsItem(index: number) {
      this.form?.data?.splice(index, 1);
    },
    getEditdata() {
      // if (!this.id) return;
      this.loading = true;
      PacsCardHolderConfigCustomService.getApiAppPacsCardHolderConfigCustomForEdit({})
        .then((res) => {
          this.form.data = res;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    fieldNameVerify(rule, value, callback) {
      if (!this.form.data) return Promise.resolve();
      let filter = this.form.data?.filter((f) => { return f.fieldName == value });
      if (filter && filter.length > 1) {
        callback(this.l('Unified.texts.NameRepetition'));
        return;
      }
      return Promise.resolve();
    },
    handleSubmit(closeFlag = true) {
      console.log(this.form);
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsCardHolderConfigCustomService.postApiAppPacsCardHolderConfigCustomSave({
          requestBody: { pacsCardHolderConfigCustom: this.form.data },
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
