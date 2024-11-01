import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsCardFormatService,
  FireBytes_Unified_Wave_Pacs_PacsCardFormats_Dtos_PacsCardFormatEditDto,
} from '@/apis';

export default defineComponent({
  components: {},
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsCardFormats_Dtos_PacsCardFormatEditDto = {};

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
        cardFormat: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
        // descriptions: [
        //   {
        //     required: true,
        //     message: this.l('Unified.texts.ThisFieldIsRequired'),
        //     trigger: 'blur',
        //   },
        // ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      PacsCardFormatService.getApiAppPacsCardFormatForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.pacsCardFormat;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.cardFormat) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.cardFormat;
      verifyInput.id = this.id;
      PacsCardFormatService.postApiAppPacsCardFormatNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.NameRepetition'));
          return;
        }
        callback();
      });
    },

    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsCardFormatService.postApiAppPacsCardFormatSave({
          requestBody: { pacsCardFormat: this.form },
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
