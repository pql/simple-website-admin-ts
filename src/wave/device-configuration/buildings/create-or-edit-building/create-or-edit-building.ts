import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  BuildingService,
  FireBytes_Unified_Wave_Buildings_Dtos_BuildingEditDto,
  FireBytes_Unified_Shared_NameVerifyInput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import GraphicPanelSelectCombox from '@/wave/component/select/graphic-panel-select-combox.vue';
import SiteSelectCombox from '@/wave/component/select/site-select-combox.vue';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    GraphicPanelSelectCombox,
    SiteSelectCombox,
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
    const databases: FireBytes_Unified_Wave_Buildings_Dtos_BuildingEditDto = {};

    return {
      id: '',
      form: databases,
      rules: {},
      siteDataSource: {
        service: 'SiteService.getApiAppSiteNdoList', //接口名，
        labelField: 'name', //下拉框标题
        valueField: 'id', //下拉框值
        params: { },
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
        this.form.siteId = this.parameters.parentId;
    },
    initData() {
      this.init();
      this.rules = this.rulesInit();
    },
    /**
     * 初始化
     */
    init() {
      this.getEditdata();
    },
    rulesInit() {
      return {
        buildingName: [
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
        buildingAddress: [
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
        siteId: [
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
        graphicPanelId: [
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
      BuildingService.getApiAppBuildingForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.building;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    selectGraphicPaneChange(selectKey, item) {
      this.form.graphicType = item.graphicType;
    },
    nameVerify(rule, value, callback) {
      if (!this.form.buildingName) return Promise.resolve();
      var verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {};
      verifyInput.name = this.form.buildingName;
      verifyInput.id = this.id;
      BuildingService.postApiAppBuildingNameRepeatVerify({ requestBody: verifyInput }).then(
        (res) => {
          if (!res) {
            callback(this.l('Unified.texts.BuildingReuse'));
            return;
          }
          callback();
        },
      );
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        BuildingService.postApiAppBuildingSave({ requestBody: { building: this.form } })
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
