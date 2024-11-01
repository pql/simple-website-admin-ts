import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  DeviceTypeService,
  FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeEditDto,
  FireBytes_Unified_Shared_NameVerifyInput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import DeviceBrandSelectCombox from '@/wave/component/select/device-brand-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';
import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    DeviceBrandSelectCombox,
    MinusCircleOutlined,
    PlusOutlined,
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
    const databases: FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeEditDto = {};
    const uploadParams = {} as {
      name?: string;
      directoryId?: string;
      overrideExisting?: boolean;
      extraProperties?: Record<string, any>;
    };

    return {
      id: '',
      form: databases,
      rules: {},
      uploadParams,
      fieldTypeOption: [{ value: 'input' }, { value: 'textarea' }],
      commandModeOptions: [{ value: 'None' }, { value: 'Camera' }, { value: 'Button' }],
      deviceTypeRoleOptions: [{ value: 'Default' }, { value: 'Slave' }],
      deviceBrandDataSource: {
        service: 'BrandService.getApiAppBrandNdoList', //接口名，
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
    fileDescriptorUpload,
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
        deviceTypeName: [
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
        brandId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        releaseNote: [
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
        deviceTypeRole: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        deviceTypeIcon: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
      };
    },
    getEditdata() {
      if (!this.id) {
        this.form.isShowMapViewer = true;
        return;
      }
      this.loading = true;
      DeviceTypeService.getApiAppDeviceTypeForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.deviceType;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addFields() {
      var field: any = {};
      field.fieldName = '';
      field.fieldType = 'input';
      field.fieldValue = null;
      if (!this.form?.customFields) this.form.customFields = [];
      this.form?.customFields?.push(field);
    },
    removeField(field) {
      let index = this.form?.customFields?.indexOf(field) as number;
      if (index !== -1) {
        this.form?.customFields?.splice(index, 1);
      }
    },
    nameVerify(rule, value, callback) {
      //如果没选择品牌则先不验证
      if (this.form.brandId === null || this.form.brandId === undefined) {
        callback();
        return;
      }
      var verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {
        id: this.id,
        name: this.form.deviceTypeName,
      };
      DeviceTypeService.postApiAppDeviceTypeNameRepeatVerify({
        brandId: this.form.brandId,
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.DeviceTypeReuse'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        this.form.isSysteam = false;
        if (!this.form.displayOrder) this.form.displayOrder = 0;
        if (!this.form.customFields) this.form.customFields = [];
        DeviceTypeService.postApiAppDeviceTypeSave({ requestBody: { deviceType: this.form } })
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
