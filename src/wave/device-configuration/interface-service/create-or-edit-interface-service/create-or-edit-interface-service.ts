import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  InterfaceServiceService,
  FireBytes_Unified_Wave_InterfaceServices_Dtos_InterfaceServiceEditDto,
  FireBytes_Unified_Shared_NameVerifyInput,
  FireBytes_Unified_Wave_InterfaceServices_Dtos_IpPortRepeatVerifyInput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import InterfaceBrandSelectCombox from '@/wave/component/select/interface-brand-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    InterfaceBrandSelectCombox,
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
    const databases: FireBytes_Unified_Wave_InterfaceServices_Dtos_InterfaceServiceEditDto = {};

    return {
      id: '',
      form: databases,
      rules: {},
      interfaceBrandDataSource: {
        service: 'InterfaceBrandService.getApiAppInterfaceBrandNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: { },
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
        serviceName: [
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
        serviceIp: [
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
          { validator: this.ipPortRepeatVerify, trigger: 'blur' },
        ],
        servicePort: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
          { validator: this.ipPortRepeatVerify, trigger: 'blur' },
        ],
        serviceId: [
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
        servicePassword: [
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
        interfaceBrandId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      InterfaceServiceService.getApiAppInterfaceServiceForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.interfaceService;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.serviceName) return Promise.resolve();
      let verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {
        id: this.id,
        name: this.form.serviceName,
      };
      InterfaceServiceService.postApiAppInterfaceServiceNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.ServiceNameTypeReuse'));
          return;
        }
        callback();
      });
    },
    ipPortRepeatVerify(rule, value, callback) {
      if (!this.form.serviceIp && !this.form.servicePort) return Promise.resolve();
      let verifyInput: FireBytes_Unified_Wave_InterfaceServices_Dtos_IpPortRepeatVerifyInput = {
        id: this.id,
        serviceIp: this.form.serviceIp,
        servicePort: this.form.servicePort,
      };
      if (!this.form.servicePort) {
        callback();
        return;
      }
      InterfaceServiceService.postApiAppInterfaceServiceIpPortRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.ServiceIpAndPortReuse'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        InterfaceServiceService.postApiAppInterfaceServiceSave({
          requestBody: { interfaceService: this.form },
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
