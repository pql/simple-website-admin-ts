import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  CardLabelService,
  FireBytes_Unified_Wave_Visitor_CardLabels_Dtos_CardLabelEditDto,
} from '@/apis';
import { Select, DatePicker } from 'ant-design-vue';

export default defineComponent({
  components: {
    Select,
    DatePicker,
  },
  mixins: [ModalComponentBase],
  props: {
    pageDataList: {
      type: Array,
      required: true,
      default: () => [],
    },
    _titleName: {
      type: String,
      required: true,
    },
  },
  data() {
    const databases: FireBytes_Unified_Wave_Visitor_CardLabels_Dtos_CardLabelEditDto = {};

    return {
      id: '',
      form: databases,
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
      this.rules = this.rulesInit();
    },
    init() {
      this.getEditdata();
    },
    rulesInit() {
      return {
        name: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      CardLabelService.getApiAppCardLabelForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.cardLabel;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        CardLabelService.postApiAppCardLabelSave({ requestBody: { cardLabel: this.form } })
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
