import { PacsActionPlanGroupService } from '@/apis';
import DynamicTableComponentBase from '@/shared/components/f-dynamic-table/dynamic-table-component-base';
import { EVENT_BTN_ENUM } from '/@/shared/components/f-dynamic-table';
import { defineComponent } from 'vue';
import CreateoOrEditDeviceModeScheduleGroup from './create-or-edit-device-mode-schedule-group/create-or-edit-device-mode-schedule-group.vue';
import { Modal } from 'ant-design-vue';

export default defineComponent({
  components: { Modal },
  mixins: [DynamicTableComponentBase],
  data() {
    const list: any = [];
    const selectedNode: any = {};

    return {
      list,
      search: '',
      selectedRowKeys: [],
      selectedRows: [] as any[],
      selectedNode,
      columns: [
        {
          title: this.l('Unified.texts.ActionPlanGroup'),
          dataIndex: 'name',
          key: 'name',
        },
      ],
    };
  },
  computed: {
    showActionBtn() {
      /**
       * item 按钮json配置项
       * column table 当前列配置
       * record 当前行数据
       */
      return (item) => {
        switch (item.name) {
          default:
            return true;
        }
      };
    },
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.selectedRowKeys = selectedRowKeys;
          this.selectedRows = selectedRows;
        },
      };
    },
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    fetchDataList() {
      const queryFilter = (this.$refs.table as any).getSearchProps();
      return PacsActionPlanGroupService.getApiAppPacsActionPlanGroupPaged(
        queryFilter,
      );
    },
    getPageData() {
      let param: any = { filterName: this.search };
      if (!this.search) param = {};
      PacsActionPlanGroupService.getApiAppPacsActionPlanGroupPaged(param)
        .finally(() => { })
        .then((res) => {
          this.list = res.items;
        });
    },
    select() {
      const param = {
        _titleName: 'Unified.texts.CreateNewActionPlanGroup',
         _types: ''
      };
      this.modalHelper
        .create(CreateoOrEditDeviceModeScheduleGroup, { ...param }, { width: 500 })
        .subscribe((res) => {
          if (res) {
            this.getPageData();
          }
        });
    },
    copy() {
      const param = {
        _titleName: 'Unified.texts.Copy',
        _types: 'copy'
      };
      this.modalHelper
        .create(CreateoOrEditDeviceModeScheduleGroup, { ...param }, { width: 500 })
        .subscribe((res) => {
          if (res) {
            this.getPageData();
          }
        });
    },
    customRow(record, index) {
      return {
        onClick: (event) => {
          this.selectedNode = record;
          this.$emit('selected-node', record);
        },
      };
    },
    /**
     * 批量删除
     */
    batchDelete() {
      if (this.selectedRowKeys.length <= 0) {
        this.notify.warn({ message: this.l('Unified.texts.PleaseSelectAtLeastOneItem') });
        return;
      }

      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
        onOk: () => {
          this.loading = true;
          PacsActionPlanGroupService.postApiAppPacsActionPlanGroupBatchDelete({
            requestBody: this.selectedRowKeys,
          })
            .finally(() => {
              this.getPageData();

              this.loading = false;

              this.notify.success({
                message: this.l('Unified.texts.SavedSuccessfully'),
              });

              if (this.selectedNode) {
                let find = this.selectedRowKeys.find((f) => {
                  return f == this.selectedNode.id;
                });
                if (find) this.$emit('selected-node', null);
              }
            })
            .then(() => { });
        },
      });
    },
  },
});
