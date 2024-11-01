import { defineComponent } from 'vue';
import CreateOrEditDeviceModeScheduleItem from './create-or-edit-device-mode-schedule-item/create-or-edit-device-mode-schedule-item.vue';
import CreateOrEditDeviceModeScheduleSetting from './create-or-edit-device-mode-schedule-setting/create-or-edit-device-mode-schedule-setting.vue';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import DeviceTypeFunctionSelect from '/@/wave/component/select/device-type-function-select.vue';
import {
  PacsActionPlanItemsService,
  FireBytes_Unified_Wave_Pacs_PacsDeviceModeSchedulesItems_Dtos_CreateOrUpdatePacsDeviceModeSchedulesTypeFunctionInput as CreateOrUpdatePacsDeviceModeSchedulesTypeFunctionInput,
  PacsActionPlanGroupSettingService,
  FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_PacsActionPlanGroupSettingEditDto,
} from '/@/apis';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import deviceAccessScheduleGroupTable from './device-mode-schedule-group-table/device-mode-schedule-group-table.vue';
import draggable from 'vuedraggable';
import {
  UnorderedListOutlined,
  CloseOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    DeviceTypeFunctionSelect,
    deviceAccessScheduleGroupTable,
    UnorderedListOutlined,
    CloseOutlined,
    PlusOutlined,
    draggable,
    MinusCircleOutlined,
  },
  mixins: [DynamicTableComponentBase],
  data() {
    const selectedTree: any = null;
    const settingEdit: Array<FireBytes_Unified_Wave_Pacs_PacsActionPlanGroupSettings_Dtos_PacsActionPlanGroupSettingEditDto> =
      [];
    const activeKeyArr: [{ id: String; isUnfold: boolean }] = [{ id: '', isUnfold: false }];

    return {
      // 请求参数
      filterText: undefined,
      /** 选中 */
      selectItems: [] as any[],
      //列表加载
      tableLoading: false,
      selectedTree: selectedTree, // 选择的树结构
      deviceTypeFunctionSource: {
        service: 'DeviceTypeFunctionService.getApiAppDeviceTypeFunctionComboxNdo',
        labelField: 'name',
        valueField: 'id',
        valueChange: [],
        params: this.customData,
      },
      formSetting: {
        settingEdit,
      },
      settingLoading: false,
      rules: {},
      scrollContainer: null as any,
      activeKey: ['0'],
      activeKeyArr,
    };
  },
  mounted() {
    this.scrollContainer = this.$refs.formDraggable;
  },
  methods: {
    changeDeviceTypeFunction(deviceTypeFunctionId, updateEntity) {
      // this.tableLoading = true;
      const backupsDeviceTypeFunctionId = updateEntity.deviceTypeFunctionId;
      updateEntity.deviceTypeFunctionId = deviceTypeFunctionId;
      const input = {} as CreateOrUpdatePacsDeviceModeSchedulesTypeFunctionInput;
      input.pacsDeviceModeSchedulesItem = updateEntity;
      PacsActionPlanItemsService.postApiAppPacsActionPlanItemsSaveDeviceFunction({
        requestBody: input,
      })
        .then(() => {
          // this.tableLoading = false;
          this.notify.success({
            message: this.l('Unified.texts.SavedSuccessfully'),
          });
        })
        .catch((err) => {
          updateEntity.deviceTypeFunctionId = backupsDeviceTypeFunctionId;
        });
    },
    getSetting() {
      if (!this.selectedTree && !this.selectedTree.id) return;
      this.settingLoading = true;
      PacsActionPlanGroupSettingService.postApiAppPacsActionPlanGroupSettingSettingGetForEdit({
        pacsActionPlanGroupId: this.selectedTree.id,
      })
        .finally(() => {
          this.settingLoading = false;
        })
        .then((res) => {
          this.formSetting.settingEdit = res.pacsActionPlanGroupSettingList;
        });
    },
    addFields() {
      const newDto: any = {};
      newDto.id = null;
      newDto.time = null;
      newDto.dayOfAccessSchedule = null;
      if (!this.formSetting.settingEdit) this.formSetting.settingEdit = [];
      this.formSetting.settingEdit.push(newDto);

      this.$nextTick(() => {
        /* 设置滚动条 */
        if (this.scrollContainer) {
          this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
        }
      });
    },
    removeItem(index: number) {
      this.formSetting.settingEdit?.splice(index, 1);
    },
    dayOfAccessScheduleVerify(rule, value, callback) {
      if (!this.formSetting.settingEdit) return Promise.resolve();
      const filter = this.formSetting.settingEdit?.filter((f) => {
        return f.dayOfAccessSchedule == value;
      });
      if (filter && filter.length > 1) {
        const item = this.formSetting.settingEdit[rule.field.split('.')[1]];
        const newArr = this.formSetting.settingEdit?.filter((f) => {
          return f.dayOfAccessSchedule == item.dayOfAccessSchedule && f.time == item.time;
        });
        if (newArr && newArr.length > 1) {
          callback(this.l('Unified.texts.AayOfAccessScheduleRepetition'));
          return;
        }
      }
      return Promise.resolve();
    },
    submitSetting() {
      if (!this.selectedTree && !this.selectedTree.id) return;
      (this.$refs.formRef as any).validate().then(() => {
        this.settingLoading = true;
        this.formSetting.settingEdit.forEach((f) => {
          f.pacsActionPlanGroupId = this.selectedTree.id as string;
          f.time = this.formatDate(f.time);
        });
        PacsActionPlanGroupSettingService.postApiAppPacsActionPlanGroupSettingSettingPostSave({
          requestBody: {
            pacsActionPlanGroupId: this.selectedTree.id,
            pacsActionPlanGroupSettingForList: this.formSetting.settingEdit,
          },
        })
          .then(() => {
            this.getSetting();
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          })
          .catch((err) => {
            this.notify.error({ message: this.l(err.body.error.code) });
          })
          .finally(() => {
            this.settingLoading = false;
          });
      });
    },
    formatDate(date) {
      if (date && date.split(':').length == 2) return date + ':00';
      return date;
    },
    clickCollapsePanel() {
      if (this.selectedTree == null) return;
      if (this.activeKey[0] == '1') this.activeKey = ['0'];
      else this.activeKey = ['1'];
      this.activeKeyArr.forEach((f) => {
        if (f.id == this.selectedTree.id) f.isUnfold = this.activeKey[0] == '1';
      });
    },
    /**
     * 选择树结构
     */
    selectedNodeFunc(data) {
      this.selectedTree = data;
      (this.$refs.table as any).reloadGoFirstPage();
      this.getSetting();

      let active = this.activeKeyArr.find((f) => {
        return f.id == data.id;
      });
      if (!active) {
        active = { id: data.id, isUnfold: false };
        this.activeKeyArr.push(active);
      }
      if (active.isUnfold) this.activeKey = ['1'];
      else this.activeKey = ['0'];
    },
    /**
     * 获取数据
     */
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      if (this.selectedTree && this.selectedTree.id)
        queryFilter.filterPacsActionPlanGroupId = this.selectedTree.id;
      return PacsActionPlanItemsService.getApiAppPacsActionPlanItemsPacsActionPlanGroupIdPaged(
        queryFilter,
      );
    },
    handleActionClick(event: string, item?: any) {
      console.log(event);
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit();
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.deleteItem(item);
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.batchDelete();
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.BULK_EDIT:
          this.bulkEdit();
          break;
        case EVENT_BTN_ENUM.SCHEDULESET:
          this.bulkScheduleSet(item);
          break;
        default:
          break;
      }
    },
    /**
     * 添加  修改
     */
    createOrEdit(item?) {
      if (this.selectedTree == null)
        this.notify.warn({
          message: this.l('Unified.texts.SelectLeftDataPrompt'),
        });

      this.selectItems = [];
      if (!!item && item.id) {
        this.selectItems = [item.id];
      }
      const param = {
        pacsActionPlanGroupId: this.selectedTree.id,
        pageDataList: [item?.id],
        _types: '',
        _titleName:
          item?.id == null
            ? 'Unified.texts.CreateNewDeviceFunction'
            : 'Unified.texts.EditDeviceFunction',
      };
      this.modalHelper
        .create(CreateOrEditDeviceModeScheduleItem, { ...param }, { width: 500 })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 单个删除
     */
    deleteItem(item) {
      (this.$refs.table as any).setLoading(true);
      PacsActionPlanItemsService.deleteApiAppPacsActionPlanItems({
        input: item.id as string,
      })
        .finally(() => {
          (this.$refs.table as any).setLoading(false);
        })
        .then(() => {
          (this.$refs.table as any).reloadGoFirstPage();
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
        });
    },
    /**
     * 批量编辑
     */
    bulkEdit() {
      this.selectItems = [];
      const arr = (this.$refs.table as any).getSelectRowKeys();
      if (arr.length < 1) {
        return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
      }
      this.selectItems = arr;
      const param = {
        pacsActionPlanGroupId: this.selectedTree.id,
        pageDataList: this.selectItems,
        _types: '',
        _titleName: 'Unified.texts.EditDeviceFunction',
      };
      this.modalHelper
        .create(CreateOrEditDeviceModeScheduleItem, param, { width: 500 })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 批量删除
     */
    batchDelete() {
      const table = this.$refs.table as any;
      if (table.getSelectRowKeys().length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }
      const ids = [...(this.$refs.table as any).getSelectRowKeys()] as Array<string>;
      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
        onOk: () => {
          (this.$refs.table as any).setLoading(true);
          PacsActionPlanItemsService.postApiAppPacsActionPlanItemsBatchDelete({
            requestBody: ids,
          })
            .finally(() => {
              (this.$refs.table as any).setLoading(false);
            })
            .then(() => {
              (this.$refs.table as any).reloadGoFirstPage();
              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });
            });
        },
      });
    },
    bulkScheduleSet(item) {
      this.selectItems = [];
      if (!!item && item.id) {
        this.selectItems = [item.id];
      }
      const param = {
        pageDataList: [item?.id],
        _types: '',
        _titleName: 'Unified.texts.DeviceModeScheduleSetting',
      };
      this.modalHelper
        .create(CreateOrEditDeviceModeScheduleSetting, { ...param })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
  },
});
