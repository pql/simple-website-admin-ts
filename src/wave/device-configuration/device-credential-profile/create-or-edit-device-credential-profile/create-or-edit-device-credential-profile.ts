import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  DeviceCredentialProfileService,
  FireBytes_Unified_Wave_DeviceCredentialProfiles_Dtos_DeviceCredentialProfileEditDto,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import GraphicPanelSelectCombox from '@/wave/component/select/graphic-panel-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';

const [registerForm, { validateFields, setFieldsValue }] = useForm({});
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
    const databases: FireBytes_Unified_Wave_DeviceCredentialProfiles_Dtos_DeviceCredentialProfileEditDto =
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
        credentialProfileName: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 200,
            message: this.l('Unified.texts.OverMaxLength'),
            trigger: 'blur',
          },
          { validator: this.nameVerify, trigger: 'blur' },
        ],
        deviceLoginId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 200,
            message: this.l('Unified.texts.OverMaxLength'),
            trigger: 'blur',
          },
        ],
        deviceLoginPassword: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          {
            max: 200,
            message: this.l('Unified.texts.OverMaxLength'),
            trigger: 'blur',
          },
        ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      DeviceCredentialProfileService.getApiAppDeviceCredentialProfileForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.deviceCredentialProfile;
          validateFields();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.credentialProfileName) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = this.form.credentialProfileName;
      verifyInput.id = this.id;
      DeviceCredentialProfileService.postApiAppDeviceCredentialProfileNameRepeatVerify({ requestBody: verifyInput }).then((res) => {
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
        DeviceCredentialProfileService.postApiAppDeviceCredentialProfileSave({
          requestBody: { deviceCredentialProfile: this.form },
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
