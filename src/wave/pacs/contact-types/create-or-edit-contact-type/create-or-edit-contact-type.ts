import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsContactTypeService,
  FireBytes_Unified_Wave_Pacs_PacsContactTypes_Dtos_PacsContactTypeEditDto,
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsContactTypes_Dtos_PacsContactTypeEditDto = {};

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
        contactTypeName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
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
      PacsContactTypeService.getApiAppPacsContactTypeForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.pacsContactType;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.contactTypeName) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.contactTypeName;
      verifyInput.id = this.id;
      PacsContactTypeService.postApiAppPacsContactTypeNameRepeatVerify({
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
        PacsContactTypeService.postApiAppPacsContactTypeSave({
          requestBody: { pacsContactType: this.form },
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
