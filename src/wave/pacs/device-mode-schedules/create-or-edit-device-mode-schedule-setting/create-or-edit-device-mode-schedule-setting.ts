import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsActionPlanGroupSettingService,
  FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_GetPacsActionPlanGroupSettingForEditOutput,
  FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto,
} from '@/apis';

export default defineComponent({
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_GetPacsActionPlanGroupSettingForEditOutput =
    {
      pacsActionPlanGroupSettingList: [],
    };

    return {
      id: '',
      form: databases,
      pacsActionPlanGroupSettingList: databases.pacsActionPlanGroupSettingList,
      rules: {},
      phoneList:
        [] as FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto[],
      userTypeDataSource: {
        service: 'PacsCardHolderService.getApiAppPacsCardHolderPacsCardHolderTypeList', //接口名，
        labelField: 'key', //下拉框标题
        valueField: 'value', //下拉框值
      },
      departmentDataSource: {
        service: 'PacsCardHolderService.getApiAppPacsCardHolderPacsDepartmentList', //接口名，
        labelField: 'key', //下拉框标题
        valueField: 'value', //下拉框值
      },
      positionDataSource: {
        service: 'PacsCardHolderService.getApiAppPacsCardHolderPacsPositionList', //接口名，
        labelField: 'key', //下拉框标题
        valueField: 'value', //下拉框值
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
        ],
        photo: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
        userType: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
      };
    },
    addGenerals() {
      const field: any = {};
      field.phoneType = '';
      field.phoneNumber = '';
      if (!this.form?.pacsActionPlanGroupSettingList)
        this.form.pacsActionPlanGroupSettingList = [];
      this.form?.pacsActionPlanGroupSettingList?.push(field);
    },
    addSpecials() {
      const field: any = {};
      field.emailType = '';
      field.emailAddress = '';
      if (!this.form?.pacsActionPlanGroupSettingList)
        this.form.pacsActionPlanGroupSettingList = [];
      this.form?.pacsActionPlanGroupSettingList?.push(field);
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      PacsActionPlanGroupSettingService.postApiAppPacsActionPlanGroupSettingSettingGetForEdit({
        pacsActionPlanGroupId: this.id,
      })
        .then((res) => {
          this.form = res;
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
        PacsActionPlanGroupSettingService.postApiAppPacsActionPlanGroupSettingSettingPostSave({
          requestBody: {
            pacsActionPlanGroupId: this.id,
            pacsActionPlanGroupSettingForList: this.form.pacsActionPlanGroupSettingList,
          },
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
