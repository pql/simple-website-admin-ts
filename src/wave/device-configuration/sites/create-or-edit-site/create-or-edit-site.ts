import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  SiteService,
  FireBytes_Unified_Wave_Sites_Dtos_SiteEditDto,
  FireBytes_Unified_Wave_Sites_Dtos_CreateOrUpdateSiteInput,
  FireBytes_Unified_Shared_NameVerifyInput,
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
    const databases: FireBytes_Unified_Wave_Sites_Dtos_SiteEditDto = {};

    return {
      id: '',
      form: databases,
      rules: {},
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
        siteName: [
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
        country: [
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
        siteAddress: [
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
    selectGraphicPaneChange(selectKey, item) {
      this.form.graphicType = item.graphicType;
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      SiteService.getApiAppSiteForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.site;
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
    nameVerify(rule, value, callback) {
      if (!this.form.siteName) return Promise.resolve();
      var verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {};
      verifyInput.name = this.form.siteName;
      verifyInput.id = this.id;
      SiteService.postApiAppSiteNameRepeatVerify({ requestBody: verifyInput }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.SiteReuse'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        SiteService.postApiAppSiteSave({ requestBody: { site: this.form } })
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
