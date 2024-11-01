import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsActionPlanItemsService,
  FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemEditDto,
} from '@/apis';

export default defineComponent({
  components: {},
  mixins: [ModalComponentBase],
  props: {
    pacsActionPlanGroupId: {
      type: String,
      required: true,
    },
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_PacsDeviceModeSchedulesItemEditDto =
      {};

    return {
      id: '',
      form: databases,
      rules: {},
      deviceDataSource: {
        service: 'DeviceService.getApiAppDeviceComboxNdo', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
      },
      deviceTypeDataSource: {
        service: 'DeviceTypeService.getApiAppDeviceTypeComboxNdo', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
      },
      deviceTypeFunctionSource: {
        service: 'DeviceTypeFunctionService.getApiAppDeviceTypeFunctionComboxNdo', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: { customData: '00000000-0000-0000-0000-000000000000' }
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
    selecthandle(v, item) {
      this.form.deviceTypeId = item.customData;
      this.form.deviceTypeFunctionId = '';
      this.refreshDeviceTypeFunctionSelect();
    },
    refreshDeviceTypeFunctionSelect() {
      const ref = this.$refs.deviceTypeFunction as any
      ref.refresh({ customData: this.form.deviceTypeId });
    },
    rulesInit() {
      return {
        deviceId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        deviceTypeId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        deviceTypeFunctionId: [
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
      PacsActionPlanItemsService.getApiAppPacsActionPlanItemsForEdit({
        input: this.id,
      })
        .then((res) => {
          this.form = res?.pacsDeviceModeSchedulesItem;
          this.refreshDeviceTypeFunctionSelect();
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      if (!this.form.deviceTypeFunctionId) return Promise.resolve();
      var verifyInput: any = {};
      verifyInput.name = '1';
      verifyInput.deviceId = this.form.deviceId;
      verifyInput.deviceTypeId = this.form.deviceTypeId;
      verifyInput.deviceTypeFunctionId = this.form.deviceTypeFunctionId;
      verifyInput.code = this.pacsActionPlanGroupId;
      verifyInput.id = this.id;
      PacsActionPlanItemsService.postApiAppPacsActionPlanItemsNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.DeviceInstructRepeated'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        this.form.pacsActionPlanGroupId = this.pacsActionPlanGroupId;
        PacsActionPlanItemsService.postApiAppPacsActionPlanItemsSave({
          requestBody: { pacsDeviceModeSchedulesItem: this.form },
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
