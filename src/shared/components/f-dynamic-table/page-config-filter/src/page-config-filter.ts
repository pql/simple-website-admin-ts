import { defineComponent } from 'vue';
import { pageConfigFilterProps } from './props';
import ModalComponentBase from '@/shared/component-base/modal-component-base';
import { cloneDeep } from 'lodash-es';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  CloseCircleOutlined,
  SaveOutlined,
} from '@ant-design/icons-vue';
import {
  FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
  FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto,
  FireBytes_Unified_PageFilters_Dtos_SavePageFilterAsPersonalInput,
  PageFiltersService,
} from '@/apis';

export default defineComponent({
  components: {
    ArrowUpOutlined,
    ArrowDownOutlined,
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    CloseCircleOutlined,
    SaveOutlined,
  },
  mixins: [ModalComponentBase],
  props: {
    ...pageConfigFilterProps,
  },
  data() {
    return {
      /** 后端服务 */
      pageFiltersService: PageFiltersService,
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
          title: this.l('Unified.texts.Personalized:Proportion'),
          dataIndex: 'filterWidth',
          width: 120,
        },
        {
          title: this.l('Unified.texts.IsShow'),
          dataIndex: 'ifShow',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Personalized:IsAdvancedSearch'),
          dataIndex: 'isAdvanced',
          width: 120,
          align: 'center',
        },
        {
          title: this.l('Unified.texts.Action'),
          dataIndex: 'operation',
          width: 120,
        },
      ],
      filterConfig: {} as FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
      filterList: [] as FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[],
      editableData: {} as any,
    };
  },
  computed: {
    filterListSort() {
      const list = this.filterList;
      return list.sort(
        (
          a: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto,
          b: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto,
        ) => {
          return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
        },
      );
    },
  },
  mounted() {
    this.loading = true;
    this.pageFiltersService
      .getApiAppPageFiltersPageFilter({
        pageFilterName: this.type,
        userId: this.abp.currentUser?.id as string,
      })
      .then((res) => {
        this.filterConfig = res;
        this.filterList = res.pageFilterElements ?? [];
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
          this.pageFiltersService
            .deleteApiAppPageFiltersPersonalPageFilter({
              pageFilterName: this.filterConfig.pageFilterName as string,
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
        pageFilterDto: cloneDeep(this.filterConfig),
      } as FireBytes_Unified_PageFilters_Dtos_SavePageFilterAsPersonalInput;
      params.pageFilterDto!.pageFilterElements = this.filterListSort;
      this.loading = true;
      this.pageFiltersService
        .postApiAppPageFiltersSavePageFilterAsPersonal({
          requestBody: params,
        })
        .then(() => {
          this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          this.handleClose();
          this.success(true);
        })
        .finally(() => {
          this.loading = true;
        });
    },
    handleClose() {
      this.editableData = {};
    },

    /** 编辑 */
    edit(key: string) {
      this.editableData[key] = cloneDeep(
        this.filterListSort.filter(
          (item: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) => key === item.field,
        )[0],
      );
    },
    /** 保存 */
    save(key: string) {
      Object.assign(
        this.filterListSort.filter(
          (item: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) => key === item.field,
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
        this.filterList = this.filterList.map(
          (item: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) => {
            if (sortNum - 1 === item.sortNum) {
              item.sortNum = (item?.sortNum ?? 0) + 1;
            } else if (sortNum === item.sortNum) {
              item.sortNum = (item?.sortNum ?? 0) - 1;
            }
            return item;
          },
        );
      } else if (type === 'down') {
        this.filterList = this.filterList.map(
          (item: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) => {
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
