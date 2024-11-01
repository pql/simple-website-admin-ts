import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsActionPlanGroupService,
  FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesGroups_Dtos_PacsDeviceModeSchedulesGroupEditDto,
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesGroups_Dtos_PacsDeviceModeSchedulesGroupEditDto =
      {};

    return {
      id: '',
      form: databases,
      rules: {},
      groupDataSource: {
        service: 'PacsActionPlanGroupService.getApiAppPacsActionPlanGroupNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: {},
      },
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
      if (this._types == 'copy')
        this.rules = this.rulesCopy();
      else
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
            trigger: 'blur',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
      };
    },
    rulesCopy() {
      return {
        copyId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        name: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      PacsActionPlanGroupService.getApiAppPacsActionPlanGroupForEdit({
        input: this.id,
      })
        .then((res) => {
          this.form = res?.pacsDeviceModeSchedulesGroup;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.name) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.name;
      verifyInput.id = this.id;
      PacsActionPlanGroupService.postApiAppPacsActionPlanGroupNameRepeatVerify({
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
      if (this._types == 'copy')
        this.copy(closeFlag);
      else
        this.save(closeFlag);
    },
    save(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsActionPlanGroupService.postApiAppPacsActionPlanGroupSave({
          requestBody: { pacsDeviceModeSchedulesGroup: this.form },
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
    copy(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsActionPlanGroupService.postApiAppPacsActionPlanGroupCopy({
          requestBody: this.form,
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
