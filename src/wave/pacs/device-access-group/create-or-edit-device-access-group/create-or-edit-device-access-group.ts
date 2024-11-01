import { defineComponent } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsDeviceAccessGroupService,
  FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput,
} from '@/apis';
import moment from 'moment';
import { Select, DatePicker } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import CreateOrEditDeviceAccessGroupItem from '@/wave/pacs/device-access-group/create-or-edit-device-access-groupItem/create-or-edit-device-access-groupItem.vue';
import { BasicForm, useForm } from '@/components/Form';
import PacsDeviceAccessGroupSelect from '@/wave/component/select/pacs-device-access-group-select.vue';
import DeviceSelect from '@/wave/component/select/device-new-select.vue';
import {
  UnorderedListOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons-vue';
import draggable from 'vuedraggable';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    CreateOrEditDeviceAccessGroupItem,
    PacsDeviceAccessGroupSelect,
    DeviceSelect,
    UnorderedListOutlined,
    CloseOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    draggable,
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsDeviceAccessGroups_Dtos_GetPacsDeviceAccessGroupForEditOutput =
    {
      deviceAccessGroup: {},
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
        // accessScheduleName: [
        //   {
        //     required: true,
        //     message: this.l('Unified.texts.ThisFieldIsRequired'),
        //     trigger: 'blur',
        //   },
        //   {
        //     max: 255,
        //     message: this.l('Unified.texts.OverMaxLength'),
        //     trigger: 'blur',
        //   },
        // ],
      };
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      PacsDeviceAccessGroupService.getApiAppPacsDeviceAccessGroupForEdit({ id: this.id })
        .then((res) => {
          this.form = res;
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateItems(value) {
      this.form.items = value;
    },
    addFields() {
      const newDto: any = {};
      newDto.id = null;
      newDto.pacsDeviceAccessScheduleGroupId = null;
      newDto.deviceId = null;
      newDto.description = null;
      if (!this.form?.items) this.form.items = [];
      this.form.items.push(newDto);
    },
    removeItem(index: number) {
      this.form?.items?.splice(index, 1);
    },
    nameVerify(rule, value, callback) {
      if (!this.form.deviceAccessGroup.accessGroupName) return Promise.resolve();
      var verifyInput: any = {
        id: this.id,
        name: this.form.deviceAccessGroup.accessGroupName,
      };
      PacsDeviceAccessGroupService.postApiAppPacsDeviceAccessGroupNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.DeviceAccessScheduleReuse'));
          return;
        }
        callback();
      });
    },
    accessScheduleGroupVerify(rule, value, callback) {
      if (!this.form.items) return Promise.resolve();
      let filter = this.form.items?.filter((f) => { return f.pacsDeviceAccessScheduleGroupId == value });
      if (filter && filter.length > 1) {
        const newArr = filter.map(item => item.deviceId);
        const arrSet = new Set(newArr)
        if (arrSet.size != newArr.length){
          callback(this.l('Unified.texts.AccessScheduleGroupRepetition'));
          return;
        }
      }
      return Promise.resolve();
    },
    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        PacsDeviceAccessGroupService.postApiAppPacsDeviceAccessGroupOrUpdate({
          requestBody: this.form,
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
