import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsCardHolderService,
  FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput,
  FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto,
} from '@/apis';
import pacsCardTable from '../pacs-card-table/pacs-card-table.vue';
import pacsCompanyTable from '../pacs-company-table/pacs-company-table.vue';
import pacsFaceProfileTable from '../pacs-face-profile-table/pacs-face-profile-table.vue';
import pacsDeviceTable from '../pacs-device-table/pacs-device-table.vue';

export default defineComponent({
  components: { pacsCardTable, pacsCompanyTable, pacsFaceProfileTable, pacsDeviceTable },
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_GetPacsCardHolderForEditOutput =
    {
      pacsCardHolder: {
        id: undefined,
        name: undefined,
        firstName: undefined,
        lastName: undefined,
        photo: undefined,
        userType: undefined,
        emailAddress: undefined,
        dateOfBirth: undefined,
        cardHolderNumber: undefined,
        joinedDate: undefined,
        department: undefined,
        position: undefined,
        mobileNo: undefined,
        mobileld: undefined,
        blacklisted: undefined,
        phoneList: undefined,
        emailList: undefined,
        customList: undefined,
        cardList: undefined,
        companyList: undefined,
        deviceAccessScheduleGroupList: undefined,
        deviceList: undefined,
      },
    };

    return {
      id: '',
      copyId: '',
      form: databases.pacsCardHolder,
      pacsCardHolderCards: databases.pacsCardHolderCards,
      pacsCardHolderCompanys: databases.pacsCardHolderCompanys,
      pacsCardHolderDevices: databases.pacsCardHolderDevices,
      rules: {},
      tabsActiveKey: 'BasicInfomation',
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
      statusDataSource: {
        service: 'PacsCardHolderStatusService.getApiAppPacsCardHolderStatusNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
      },
      phoneDataSource: {
        service: 'PacsContactTypeService.getApiAppPacsContactTypeNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
      },
      activeKey: ['1'],
      activeKeyPhone: ['1'],
      activeKeyEmail: ['1'],
      activeKeyCompany: ['1'],
      activeKeyCustom: ['1'],
      forceRender: false,
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
          // {
          //   pattern: '^[u4e00-u9fa5]+$',
          //   message: this.l('Unified.texts.CannotEnterChinese'),
          //   trigger: 'blur',
          // },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
        gender: [
          {
            required: true,
            message: this.l('Unified.texts.Gender'),
            trigger: 'blur',
          },
        ],
        photo: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        userType: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        emailAddress: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
            message: this.l('Unified.texts.IncorrectEmail'),
            trigger: 'blur',
          },
          { validator: this.emailVerify, trigger: 'blur' },
        ],
      };
    },
    addPhones() {
      const field: any = {};
      field.phoneType = '';
      field.phoneNumber = '';
      if (!this.form?.phoneList) this.form.phoneList = [];
      this.form?.phoneList?.push(field);
    },
    removePhoneItem(index: number) {
      this.form?.phoneList?.splice(index, 1);
    },
    addEmails() {
      const field: any = {};
      field.emailType = '';
      field.emailAddress = '';
      if (!this.form?.emailList) this.form.emailList = [];
      this.form?.emailList?.push(field);
    },
    removeEmailsItem(index: number) {
      this.form?.emailList?.splice(index, 1);
    },
    addCustomFields() {
      const field: any = {};
      field.fieldName = '';
      field.fieldPlaceholder = '';
      field.fieldType = '';
      if (!this.form?.customList) this.form.customList = [];
      this.form?.customList?.push(field);
    },
    removeFieldsItem(index: number) {
      this.form?.customList?.splice(index, 1);
    },
    getEditdata() {
      // if (!this.id) return;
      this.loading = true;
      PacsCardHolderService.getApiAppPacsCardHolderForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.pacsCardHolder;
          this.pacsCardHolderCards = res?.pacsCardHolderCards;
          this.pacsCardHolderCompanys = res?.pacsCardHolderCompanys;

          if (this._types == 'copy') {
            this.copyId = this.id;
            this.id = '';
            this.form.id = null;
            this.pacsCardHolderCards = [];
            this.form.cardList = [];
            this.forceRender = true;
          }
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
      PacsCardHolderService.postApiAppPacsCardHolderNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.NameRepetition'));
          return;
        }
        callback();
      });
    },
    emailVerify(rule, value, callback) {
      if (!this.form.emailAddress) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.emailAddress;
      verifyInput.id = this.id;
      PacsCardHolderService.postApiAppPacsCardHolderEmailRepeatVerify({
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
        if (!this.verifySaveData()) return;


        if (this._types == 'copy') {
          this.form.deviceList?.forEach((f) => {
            f.id = null,
              f.pacsCardHolderId = null
          });

          this.form.phoneList?.forEach((f) => {
            f.id = null,
              f.pacsCardHolderId = ''
          });

          this.form.emailList?.forEach((f) => {
            f.id = null,
              f.pacsCardHolderId = ''
          });

          this.form.customList?.forEach((f) => {
            f.id = null,
              f.pacsCardHolderId = ''
          });

          if (this.form.faceProfile) {
            this.form.faceProfile.id = null;
            this.form.faceProfile.pacsCardHolderId = null;
          }
        }

        this.loading = true;
        PacsCardHolderService.postApiAppPacsCardHolderSave({
          requestBody: { pacsCardHolder: this.form },
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
    verifySaveData() {
      let isDeviceVerify = true;
      this.form?.deviceList?.forEach((x) => {
        if (!isDeviceVerify) return;

        if (!x.pacsDeviceAccessScheduleGroupId) {
          isDeviceVerify = false;
          this.notify.warn({ message: this.l('Unified.texts.ChoiceBoxRequiredVerify', ['Temp Access']) });
        }
        else if (!x.startDateTime || !x.endDateTime) {
          isDeviceVerify = false;
          this.notify.warn({ message: this.l('Unified.texts.StartTimeAndEndTimeRequiredVerify', ['Temp Access']) });
        }
        else if (x.startDateTime && x.endDateTime && x.startDateTime > x.endDateTime) {
          isDeviceVerify = false;
          this.notify.warn({ message: this.l('Unified.texts.StartTimeAndEndTimeVerify', ['Temp Access']) });
        }
      })

      let isCardListVerify = true;
      this.form?.cardList?.forEach((x) => {
        x.deviceAccessGroup?.forEach((y) => {
          if (!isCardListVerify) return;
          // if (!y.startDateTime || !y.endDateTime) {
          //   isCardListVerify = false;
          //   this.notify.warn({ message: this.l('Unified.texts.StartTimeAndEndTimeRequiredVerify', ['Cards']) });
          // }
          else if (y.startDateTime && y.endDateTime && y.startDateTime > y.endDateTime) {
            isCardListVerify = false;
            this.notify.warn({ message: this.l('Unified.texts.StartTimeAndEndTimeVerify', ['Cards']) });
          }
        })
      })

      let isVerify = true;
      if (!isDeviceVerify || !isCardListVerify) isVerify = false;

      return isVerify;
    },
  },
});
