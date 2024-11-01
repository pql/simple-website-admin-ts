import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  BuildingFloorModelService,
  FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelEditDto,
  FireBytes_Unified_Shared_NameVerifyInput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import GraphicPanelSelectCombox from '@/wave/component/select/graphic-panel-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';
import { fileDescriptorUpload } from '@/utils/file/fileDescriptor';

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
    const databases: FireBytes_Unified_Wave_BuildingFloorModels_Dtos_BuildingFloorModelEditDto = {
      type: 0,
    };
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
        fileId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'change',
          },
        ],
        modelName: [
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
        description: [
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
      BuildingFloorModelService.getApiAppBuildingFloorModelForEdit({ id: this.id })
        .then((res) => {
          this.form = res?.buildingFloorModel;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      var verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {};
      verifyInput.name = this.form.modelName;
      verifyInput.id = this.form.id;
      BuildingFloorModelService.postApiAppBuildingFloorModelModelNameVerify({
        type: 1,
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.MapTileNameRepetition'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        this.form.type = 1;
        this.form.fileId = this.form.fileId?.toString();
        BuildingFloorModelService.postApiAppBuildingFloorModelSave({
          requestBody: { buildingFloorModel: this.form },
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
