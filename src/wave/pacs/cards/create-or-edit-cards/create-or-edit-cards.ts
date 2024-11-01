import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsCardService,
  FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardEditDto,
} from '@/apis';
import { Select, DatePicker } from 'ant-design-vue';
import { useTimezone } from '@/timezones/useTimezone';

const { fromUTCDateToLocalDateHorizontalSymbol } = useTimezone();
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsCards_Dtos_PacsCardEditDto = {};

    return {
      id: '',
      form: databases,
      rules: {},
      cardFormatDataSource: {
        service: 'PacsCardFormatService.getApiAppPacsCardFormatCardFormats', //接口名，
        labelField: 'key', //下拉框标题
        valueField: 'value', //下拉框值
      },
      cardStatusDataSource: {
        service: 'PacsCardService.getApiAppPacsCardCardsStatus', //接口名，
        labelField: 'key', //下拉框标题
        valueField: 'key', //下拉框值
      },
      cardHolderDataSource: {
        service: 'PacsCardHolderService.getApiAppPacsCardHolderComboxNdo', //接口名，
        labelField: 'id', //下拉框标题
        valueField: 'name', //下拉框值
      },
      badgeTemplateDataSource: {
        service: 'CardLabelService.getApiAppCardLabelNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
      },
      // badgeTemplateDataSource: {
      //   service: 'UserService.getApiIdentityUsersLookupOrganizationUnits', //接口名，
      //   labelField: 'displayName', //下拉框标题
      //   valueField: 'id', //下拉框值
      //   params: {
      //     name: 'wangwu',
      //   },
      // },
    };
  },
  mounted() {
    this.getPageData(this.pageDataList[0]);
  },
  methods: {
    fromUTCDateToLocalDateHorizontalSymbol,
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
        cardFormatId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
        cardNumber: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
        facilityCode: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
        startDateTime: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.timeVerify, trigger: 'blur' },
        ],
        endDateTime: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.timeVerify, trigger: 'blur' },
        ],
        // badgeTemplateId: [
        //   {
        //     required: true,
        //     message: this.l('Unified.texts.ThisFieldIsRequired'),
        //     trigger: 'change',
        //   },
        // ],
        // validTillDate: [
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
      PacsCardService.getApiAppPacsCardForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.pacsCard;
          if (this._types == 'copy') {
            this.id = '';
            this.form.id = null;
          }
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    timeVerify(rule, value, callback) {
      if (!this.form.startDateTime || !this.form.endDateTime) return Promise.resolve();
      if (this.form.startDateTime > this.form.endDateTime)
        return callback(this.l('Unified.texts.StartEndVerify'));
      return Promise.resolve();
    },
    nameVerify(rule, value, callback) {
      if (!this.form.cardNumber) return Promise.resolve();
      const verifyInput: any = {};
      verifyInput.name = this.form.cardNumber;
      verifyInput.id = this.id;
      PacsCardService.postApiAppPacsCardNameRepeatVerify({ requestBody: verifyInput }).then(
        (res) => {
          if (!res) {
            callback(this.l('Unified.texts.NameRepetition'));
            return;
          }
          callback();
        },
      );
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsCardService.postApiAppPacsCardSave({ requestBody: { pacsCard: this.form } })
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
