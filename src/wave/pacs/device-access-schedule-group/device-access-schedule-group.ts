import { PacsDeviceAccessScheduleGroupService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent, createVNode } from 'vue';
import CreateoOrEditDeviceAccessScheduleGroup from './create-or-edit-device-access-schedule-group/create-or-edit-device-access-schedule-group.vue';
import { UserStore } from '@/store/modules/user';
import { useTimezone } from '@/timezones/useTimezone';
import { Modal } from 'ant-design-vue';
const { fromLocalDateToUTCDateFormat: fromLocalDateToUTCDateFormat } = useTimezone();
const userStore = UserStore.useStore();

export default defineComponent({
  mixins: [DynamicTableComponentBase],
  components: { Modal },
  data() {
    return {};
  },
  computed: {
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
  },
  methods: {
    fetchDataList(otherQuery) {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return PacsDeviceAccessScheduleGroupService.getApiAppPacsDeviceAccessScheduleGroupPaged(
        queryFilter,
      );
    },
    /**
     * 按钮回调事件
     */
    handleActionClick(event: string, item?: any) {
      switch (event) {
        case EVENT_BTN_ENUM.CREATE:
          this.createOrEdit();
          break;
        case EVENT_BTN_ENUM.EDIT:
          this.createOrEdit(item);
          break;
        case EVENT_BTN_ENUM.DELETE:
          this.deleteItem(item);
          break;
        case EVENT_BTN_ENUM.BULK_EDIT:
          this.bulkEdit();
          break;
        case EVENT_BTN_ENUM.BULK_DELETE:
          this.batchDelete();
          break;
        default:
          break;
      }
    },
    /**
     * 添加 修改
     */
    createOrEdit(item?) {
      let param = {
        pageDataList: [item?.id],
        _types: '',
        _titleName:
          item?.id == null
            ? 'Unified.texts.CreateNewDeviceAccessSchedule'
            : 'Unified.texts.EditDeviceAccessSchedule',
      };
      this.modalHelper
        .create(CreateoOrEditDeviceAccessScheduleGroup, { ...param }, { size: 'medium' })
        .subscribe((res) => {
          if (res) {
            (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /**
     * 单个删除
     */
    deleteItem(item?) {
      if ((item as any).userName == 'admin') {
        this.notify.warn({
          message: this.l('Unified.texts.SuperAadminCannotBeDeleted'),
        });
        return;
      }
      (this.$refs.table as any).setLoading(true);
      PacsDeviceAccessScheduleGroupService.deleteApiAppPacsDeviceAccessScheduleGroup({
        id: item.id,
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
      const selectItems = (this.$refs.table as any).getSelectRowKeys();
      if (selectItems.length < 1) {
        return this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
      }
      let param = {
        pageDataList: selectItems,
        _types: '',
        _titleName: 'Unified.texts.EditDeviceAccessSchedule',
      };
      this.modalHelper
        .create(CreateoOrEditDeviceAccessScheduleGroup, { ...param }, { size: 'medium' })
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
      if ((this.$refs.table as any).getSelectRowKeys().length <= 0) {
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
          PacsDeviceAccessScheduleGroupService.postApiAppPacsDeviceAccessScheduleGroupBatchDelete({
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
  },
});
