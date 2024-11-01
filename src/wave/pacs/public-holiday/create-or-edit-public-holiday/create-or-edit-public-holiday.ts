import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsPublicHolidayService,
  FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_PacsPublicHolidayEditDto,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import GraphicPanelSelectCombox from '@/wave/component/select/graphic-panel-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    GraphicPanelSelectCombox,
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsPublicHolidays_Dtos_PacsPublicHolidayEditDto =
      {};

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
        holidayName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 255,
            message: this.l('Unified.texts.OverMaxLength'),
            trigger: 'blur',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
        startDate: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.timeVerify, trigger: 'blur' },
        ],
        endDate: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.timeVerify, trigger: 'blur' },
        ],
        // isEveOfHoliday: [
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
      PacsPublicHolidayService.getApiAppPacsPublicHolidayForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.publicHoliday;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    timeVerify(rule, value, callback) {
      if (!this.form.startDate || !this.form.endDate) return Promise.resolve();
      if (this.form.startDate > this.form.endDate) return callback(this.l('Unified.texts.StartEndVerify'));
      return Promise.resolve();
    },
    nameVerify(rule, value, callback) {
      if (!this.form.holidayName) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.holidayName;
      verifyInput.id = this.id;
      PacsPublicHolidayService.postApiAppPacsPublicHolidayNameRepeatVerify({
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
        PacsPublicHolidayService.postApiAppPacsPublicHolidaySave({
          requestBody: { publicHoliday: this.form },
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
