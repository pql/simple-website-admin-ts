import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  BuildingFloorService,
  FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorEditDto,
  FireBytes_Unified_Shared_NameVerifyInput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import GraphicPanelSelectCombox from '@/wave/component/select/graphic-panel-select-combox.vue';
import BuildingSelectCombox from '@/wave/component/select/building-select-combox.vue';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    GraphicPanelSelectCombox,
    BuildingSelectCombox,
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
    },
    _titleName: {
      type: String,
      required: true,
    },
    parameters: {
      type: Object,
    },
    //是否是面板设计页面弹窗
    isDesign: {
      type: Boolean,
    },
  },
  data() {
    const databases: FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorEditDto = {};

    return {
      id: '',
      form: databases,
      rules: {},
      buildingDataSource: {
        service: 'BuildingService.getApiAppBuildingNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: {},
      },
      graphicPanelDataSource: {
        service: 'GraphicPanelService.getApiAppGraphicPanelNdoList', //接口名，
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
      if (this.parameters && this.parameters.parentId)
        /*control-panel-design 传进来的  */
        this.form.buildingId = this.parameters.parentId;
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
        floor: [
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
        floorDisplayName: [
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
        siteAddvress: [
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
        buildingId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
        graphicPanelId: [
          {
            required: true,
            message: this.l('Unified.texts.ThisFieldIsRequired'),
            trigger: 'blur',
          },
        ],
      };
    },
    selectGraphicPaneChange(selectKey, item) {
      this.form.graphicType = item.graphicType;
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      BuildingFloorService.getApiAppBuildingFloorForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.buildingFloor;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    graphicPanelSelectChange(value) {
      this.form.graphicPanelId = value;
    },
    changeTypeName(value) {
      this.form.graphicType = value;
    },
    nameVerify(rule, value, callback) {
      if (!this.form.floor) return Promise.resolve();
      var verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {};
      verifyInput.name = this.form.floor;
      verifyInput.id = this.id;
      BuildingFloorService.postApiAppBuildingFloorNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.BuildingFloorReuse'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        BuildingFloorService.postApiAppBuildingFloorSave({
          requestBody: { buildingFloor: this.form },
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
