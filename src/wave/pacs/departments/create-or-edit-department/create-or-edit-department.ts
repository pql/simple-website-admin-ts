import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsDepartmentService,
  FireBytes_Unified_Wave_Pacs_PacsDepartments_Dtos_PacsDepartmentEditDto,
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsDepartments_Dtos_PacsDepartmentEditDto = {};

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
        department: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
        descriptions: [
          {
            required: false,
            // message: this.l('Unified.texts.ThisFieldIsRequired'),
            // trigger: 'blur',
          },
        ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      PacsDepartmentService.getApiAppPacsDepartmentForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.pacsDepartment;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.department) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.department;
      verifyInput.id = this.id;
      PacsDepartmentService.postApiAppPacsDepartmentNameRepeatVerify({
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
        PacsDepartmentService.postApiAppPacsDepartmentSave({
          requestBody: { pacsDepartment: this.form },
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
