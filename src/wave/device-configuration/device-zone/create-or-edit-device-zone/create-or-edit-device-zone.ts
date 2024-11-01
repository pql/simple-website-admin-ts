import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  ZoneService,
  FireBytes_Unified_Wave_Zones_Dtos_ZoneEditDto,
  PanelPermissionControlService,
  FireBytes_Unified_Shared_NameVerifyInput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import GraphicPanelSelectCombox from '@/wave/component/select/graphic-panel-select-combox.vue';
import { BasicForm, useForm } from '@/components/Form';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { Modal } from 'ant-design-vue';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    GraphicPanelSelectCombox,
    Modal,
  },
  mixins: [ModalComponentBase, DynamicTableComponentBase],
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
    const databases: FireBytes_Unified_Wave_Zones_Dtos_ZoneEditDto = {
      arm: false,
      description: null,
      deviceList: [],
      tenantId: null,
      zoneName: null,
      id: null,
    };

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
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return PanelPermissionControlService.getApiAppPanelPermissionControlDevicePermissionPaged(
        queryFilter,
      );
    },
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item, column, record) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
      }
    },
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
        zoneName: [
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
      };
    },
    /** 获取数据成功后的回调 */
    async handleFetchSuccess() {
      const tableData = (this.$refs.table as any).tableData;
      tableData.items?.forEach((item) => {
        let exist = this.form.deviceList?.find((f) => f == item.key);
        if (exist) {
          setTimeout(() => {
            (this.$refs.table as any).tableRef.selectRow(item);
          }, 0);
        }
      });
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      ZoneService.getApiAppZoneForEdit({ input: this.id })
        .then((res) => {
          this.form = res?.zone;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    nameVerify(rule, value, callback) {
      var verifyInput: FireBytes_Unified_Shared_NameVerifyInput = {
        id: this.id,
        name: this.form.zoneName,
      };
      ZoneService.postApiAppZoneZoneVerify({ requestBody: verifyInput }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.ZoneNameReuse'));
          return;
        }
        callback();
      });
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        const table = this.$refs.table as any;
        this.form.deviceList = table?.getSelectRowKeys() ?? [];
        ZoneService.postApiAppZoneSave({ requestBody: { zone: this.form } })
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
