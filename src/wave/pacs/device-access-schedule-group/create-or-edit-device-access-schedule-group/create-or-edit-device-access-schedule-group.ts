import { defineComponent, reactive, toRaw } from 'vue';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import {
  PacsDeviceAccessScheduleGroupService,
  FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput,
  FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_PacsDeviceAccessScheduleGroupEditDto,
  FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleItems_Dtos_PacsDeviceAccessScheduleItemEditDto,
} from '@/apis';
import { Select, DatePicker, Form } from 'ant-design-vue';
import { UserStore } from '@/store/modules/user';
import CreateOrEditPacsAccessScheduleItem from '@/wave/pacs/device-access-schedule-group/create-or-edit-pacs-access-schedule-items/create-or-edit-pacs-access-schedule-items.vue';
import draggable from 'vuedraggable';
import {
  UnorderedListOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons-vue';

const userStore = UserStore.useStore();

export default defineComponent({
  components: {
    Select,
    DatePicker,
    CreateOrEditPacsAccessScheduleItem,
    UnorderedListOutlined,
    CloseOutlined,
    PlusOutlined,
    draggable,
    MinusCircleOutlined,
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
    const databases: FireBytes_Unified_Wave_Pacs_PacsDeviceAccessScheduleGroups_GetPacsDeviceAccessScheduleGroupForEditOutput =
    {
      deviceAccessScheduleGroup: {},
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
      return {};
    },
    getEditdata() {
      if (!this.id) return;
      this.loading = true;
      PacsDeviceAccessScheduleGroupService.getApiAppPacsDeviceAccessScheduleGroupForEdit({
        id: this.id,
      })
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
    updateItems(value, types) {
      if (types == 'general') this.form.items = value;
      // else if (types == 'special') this.form.holidayItems = value;
    },
    addFields() {
      const newDto: any = {};
      newDto.id = null;
      newDto.startTime = '00:00';
      newDto.endTime = '23:59';
      newDto.dayOfAccessSchedule = null;
      if (!this.form?.items) this.form.items = [];
      this.form.items.push(newDto);
    },
    removeItem(index: number) {
      this.form?.items?.splice(index, 1);
    },
    nameVerify(rule, value, callback) {
      if (!this.form.deviceAccessScheduleGroup.accessScheduleName) return Promise.resolve();
      var verifyInput: any = {
        id: this.id,
        name: this.form.deviceAccessScheduleGroup.accessScheduleName,
      };
      PacsDeviceAccessScheduleGroupService.postApiAppPacsDeviceAccessScheduleGroupNameRepeatVerify({
        requestBody: verifyInput,
      }).then((res) => {
        if (!res) {
          callback(this.l('Unified.texts.DeviceAccessScheduleReuse'));
          return;
        }
        callback();
      });
    },
    // dayOfAccessScheduleVerify(rule, value, callback) {
    //   if (!this.form.items) return Promise.resolve();
    //   let filter = this.form.items?.filter((f) => { return f.dayOfAccessSchedule == value });
    //   if (filter && filter.length > 1) {
    //     callback(this.l('Unified.texts.AayOfAccessScheduleRepetition'));
    //     return;
    //   }
    //   return Promise.resolve();
    // },
    dayOfAccessScheduleVerify(rule, value, callback) {
      if (!this.form.items) return Promise.resolve();
      const filter = this.form.items?.filter((f) => {
        return f.dayOfAccessSchedule == value;
      });
      if (filter && filter.length > 1) {
        const item = this.form.items[rule.field.split('.')[1]];
        const newArr = this.form.items?.filter((f) => {
          return f.dayOfAccessSchedule == item.dayOfAccessSchedule && !this.verifyDate(item, f);
        });
        if (newArr && newArr.length > 1) {
          callback(this.l('Unified.texts.AayOfAccessScheduleRepetition'));
          return;
        }
      }
      return Promise.resolve();
    },
    verifyDate(item, f) {
      if (this.isTimeOverlap(this.toVerifyDate(item.startTime), this.toVerifyDate(item.endTime), this.toVerifyDate(f.startTime), this.toVerifyDate(f.endTime)))
        return false;
      else return true;
    },
    toVerifyDate(time) {
      return new Date('2024-10-30 ' + this.formatDate(time));
    },

    handleSubmit(closeFlag = true) {
      (this.$refs.formRef as any).validate().then(() => {
        this.loading = true;
        let datas = this.form;
        datas.items?.forEach((item: any) => {
          item.startTime = this.formatDate(item.startTime);
          item.endTime = this.formatDate(item.endTime);
        });
        // datas.holidayItems?.forEach((item: any) => {
        //   item.startTime = this.formatDate(item.startTime);
        //   item.endTime = this.formatDate(item.endTime);
        // });
        PacsDeviceAccessScheduleGroupService.postApiAppPacsDeviceAccessScheduleGroupOrUpdate({
          requestBody: datas,
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
    formatDate(date) {
      if (date && date.split(':').length == 2) return date + ':00';
      return date;
    },
    // 辅助函数：将时间字符串转换为分钟数
    timeToMinutes(timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    },
    // 辅助函数：检查两个时间段是否交叉
    isTimeOverlap(start1, end1, start2, end2) {
      return !(end1 <= start2 || end2 <= start1);
    }
  }
});
