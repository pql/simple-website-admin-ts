import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { defineComponent } from 'vue';
import { pageConfigColumnProps } from './props';
import { cloneDeep } from 'lodash-es';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CloseCircleOutlined,
  SaveOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
} from '@ant-design/icons-vue';
import {
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
  FireBytes_Unified_ListViews_Dtos_ListViewDto,
  FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput,
  ListViewsService,
} from '@/apis';

export default defineComponent({
  components: {
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    CloseCircleOutlined,
    SaveOutlined,
    AlignLeftOutlined,
    AlignCenterOutlined,
    AlignRightOutlined,
  },
  mixins: [ModalComponentBase],
  props: {
    ...pageConfigColumnProps,
  },
  data() {
    return {
      listViewsService: ListViewsService,
      columns: [
        {
          title: this.l('Unified.texts.Sort'),
          dataIndex: 'sortNum',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Personalized:Attribute'),
          dataIndex: 'title',
          width: 200,
        },
        {
          title: this.l('Unified.texts.Width'),
          dataIndex: 'width',
          width: 120,
        },
        {
          title: this.l('Unified.texts.Personalized:Freeze'),
          dataIndex: 'fixed',
          width: 120,
        },
        {
          title: this.l('Unified.texts.Personalized:Alignment'),
          dataIndex: 'position',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.IsShow'),
          dataIndex: 'ifShow',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Personalized:Resizable'),
          dataIndex: 'resizable',
          width: 160,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Action'),
          dataIndex: 'operation',
          fixed: 'right',
          width: 120,
        },
      ],
      listConfig: {} as FireBytes_Unified_ListViews_Dtos_ListViewDto,
      listConfigColumns: [] as FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto[],
      editableData: {} as any,
    };
  },
  computed: {
    listConfigColumnsSort() {
      const list = this.listConfigColumns;
      return list.sort(
        (
          a: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
          b: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
        ) => {
          return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
        },
      );
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
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {
    /** 重置 */
    handleResetClick() {
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
      const params = {
        userId: this.abp.currentUser?.id ?? '-1',
        listViewDto: cloneDeep(this.listConfig),
      } as FireBytes_Unified_ListViews_Dtos_SaveListViewAsPersonalInput;
      params.listViewDto!.listViewColumns = this.listConfigColumnsSort;
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
    },
    handleClose() {
      this.editableData = {};
    },

    /** 编辑 */
    edit(key: string) {
      this.editableData[key] = cloneDeep(
        this.listConfigColumnsSort.filter(
          (item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) =>
            key === (item?.field ?? item?.type),
        )[0],
      );
    },
    /** 保存 */
    save(key: string) {
      console.log('wqdqdqd', key);
      Object.assign(
        this.listConfigColumnsSort.filter(
          (item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) =>
            key === (item?.field ?? item?.type),
        )[0],
        this.editableData[key],
      );
      delete this.editableData[key];
    },
    /** 取消 */
    cancel(key: string) {
      delete this.editableData[key];
    },
    /** 改变顺序 */
    handleSortNum(type: string, record: any) {
      const { sortNum } = record;
      if (type === 'up') {
        this.listConfigColumns = this.listConfigColumns.map(
          (item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
            if (sortNum - 1 === item.sortNum) {
              item.sortNum = (item?.sortNum ?? 0) + 1;
            } else if (sortNum === item.sortNum) {
              item.sortNum = (item?.sortNum ?? 0) - 1;
            }
            return item;
          },
        );
      } else if (type === 'down') {
        this.listConfigColumns = this.listConfigColumns.map(
          (item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto) => {
            if (sortNum + 1 === item.sortNum) {
              item.sortNum = (item?.sortNum ?? 0) - 1;
            } else if (sortNum === item.sortNum) {
              item.sortNum = (item?.sortNum ?? 0) + 1;
            }
            return item;
          },
        );
      }
    },
  },
});
