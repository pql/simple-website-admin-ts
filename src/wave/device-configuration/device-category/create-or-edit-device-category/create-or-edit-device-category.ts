import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  DeviceCategoryService,
  FireBytes_Unified_Wave_DeviceCategorys_Dtos_DeviceCategoryEditDto,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import DeviceTypeSelectCombox from '@/wave/component/select/device-type-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    DeviceTypeSelectCombox,
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
    const databases: FireBytes_Unified_Wave_DeviceCategorys_Dtos_DeviceCategoryEditDto = {};

    return {
      id: '',
      form: databases,
      rules: {},
      deviceTypeDataSource: {
        service: 'DeviceTypeService.getApiAppDeviceTypeNdoList', //接口名，
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
      this.rules = this.rulesInit();
    },
    init() {
      this.getEditdata();
    },
    rulesInit() {
      return {
        deviceCategoryName: [
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
        deviceTypeId: [
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
      DeviceCategoryService.getApiAppDeviceCategoryForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.deviceCategory;
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
        if (!this.id) {
          this.form.isDefault = false;
          this.form.isUpdateType = true;
        }
        DeviceCategoryService.postApiAppDeviceCategorySave({
          requestBody: { deviceCategory: this.form },
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
