import { defineComponent } from 'vue';
import { pageConfigColumnColorProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { PlusOutlined, CloseCircleOutlined, SaveOutlined } from '@ant-design/icons-vue';
import {
  FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto,
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
  FireBytes_Unified_ListViews_Dtos_ListViewDto,
  FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput,
  ListViewsService,
} from '@/apis';
import { cloneDeep } from 'lodash-es';

export default defineComponent({
  components: {
    PlusOutlined,
    CloseCircleOutlined,
    SaveOutlined,
  },
  mixins: [ModalComponentBase],
  props: {
    ...pageConfigColumnColorProps,
  },
  data() {
    return {
      listViewsService: ListViewsService,
      columns: [
        {
          title: this.l('Unified.texts.Personalized:Attribute'),
          dataIndex: 'colFieldName',
        },
        {
          title: this.l('Unified.texts.Personalized:Operator'),
          dataIndex: 'determineType',
          width: 120,
        },
        {
          title: this.l('Unified.texts.TargetValue'),
          dataIndex: 'value',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Personalized:Color'),
          dataIndex: 'color',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Action'),
          dataIndex: 'operation',
          width: 200,
        },
      ],
      listConfig: {} as FireBytes_Unified_ListViews_Dtos_ListViewDto,
      listConfigColumns: [] as FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto[],
      formModel: {
        dataSourceSort: [] as FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto[],
      },
      editableData: {} as any,
    };
  },
  computed: {
    dataSourceTitleOptions() {
      const arr = this.formModel.dataSourceSort.map((item) => {
        return item.colFieldName;
      });
      return this.listConfigColumns
        .filter((item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
          // 过滤没有字段
          return !!item.field;
        })
        .sort(
          (
            a: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
            b: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
          ) => {
            // 根据sortNum排序
            return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
          },
        )
        .map((item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
          return {
            label: this.l(item?.title ?? ''),
            value: item.field,
            disabled: arr.includes(item.field),
          };
        });
    },
  },
  mounted() {
    this.loading = true;
    this.listViewsService
      .getApiAppListViewsColumnsOfListView({
        listViewName: this.type,
        userId: this.abp.currentUser?.id as string,
      })
      .then((res) => {
        this.listConfig = res;
        this.listConfigColumns = res.listViewColumns ?? [];
        this.formModel.dataSourceSort = this.listConfigColumns
          .filter((item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
            return !!item.listViewColumnColor;
          })
          .map((item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
            return item.listViewColumnColor;
          }) as FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto[];
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    /** 重置 */
    handleResetClick() {
      // this.loading = true;
      this.confirm({
        iconType: 'info',
        title: this.l('Unified.texts.ConfirmOperation'),
        content: null,
        onOk: () => {
          this.loading = true;
          this.listViewsService
            .deleteApiAppListViewsPersonalListView({
              listViewName: this.listConfig.listViewName as string,
            })
            .then(() => {
              this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
              this.handleClose();
              this.success(true);
            })
            .finally(() => {
              this.loading = false;
            });
        },
      });
    },
    /** 保存 */
    handleSave() {
      (this.$refs.formRef as any).validate().then(() => {
        const table = this.$refs.table as any;
        const params = {
          userId: this.abp.currentUser?.id ?? '-1',
          listViewDto: cloneDeep(this.listConfig),
        } as FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput;
        this.formModel.dataSourceSort.map(
          (item: FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto) => {
            if (!params.listViewDto?.listViewColumns) return;
            const idx = params.listViewDto.listViewColumns.findIndex((i) => {
              return i.field === item.colFieldName;
            });
            if (idx !== -1) {
              params.listViewDto.listViewColumns[idx].listViewColumnColor = item;
            }
          },
        );
        this.loading = true;
        this.listViewsService
          .postApiAppListViewsSaveListViewAsPersonal({
            requestBody: params,
          })
          .then(() => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            this.handleClose();
            this.success(true);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    handleClose() {
      this.editableData = {};
      this.formModel.dataSourceSort = [];
    },

    /** 删除 */
    del(key: number, record: any) {
      debugger
      if (!record.id) {
        this.formModel.dataSourceSort.splice(key, 1);
      } else {
        this.loading = true;
        this.listViewsService
          .deleteApiAppListViewsListViewColumnColor({
            id: record.id,
          })
          .then(() => {
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            this.formModel.dataSourceSort.splice(key, 1);
            let itemView = this.listConfig.listViewColumns?.find((f) => f.id == record.listViewColumnsId);
            if (itemView) {
              itemView.listViewColumnColor = {};
              itemView.listViewColumnColorId = null;
            }

            // this.success(true);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    /** 新增规则 */
    handleAddClick() {
      this.formModel.dataSourceSort.push({
        id: '',
        colFieldName: undefined,
        determineType: undefined,
        value: undefined,
        color: '#ffffff',
        listViewColumnsId: undefined,
      });
    },
  },
});
