import { defineComponent, nextTick } from 'vue';
import { ColumnType } from 'ant-design-vue/lib/table';
import { default as AppComponentBase } from './app-component-base';
import { BasicConfigInstance } from '../config';
import {
  ISortCondition,
  IPagedResultDto,
  SortType,
  IPagedRequestDto,
  ITablePagination,
  ITableFilter,
  ITableSorter,
} from './interfaces';

const PagedListingComponentBase = defineComponent({
  mixins: [AppComponentBase],
  data() {
    return {
      /** 分页大小 */
      pageSize: BasicConfigInstance.grid.defaultPageSize,
      /** 分页选项 */
      pageSizeOptions: BasicConfigInstance.grid.defaultPageSizes,
      /** 当前页 */
      pageNumber: 1,
      /** 总页数 */
      totalPages: 1,
      /** 总记录数 */
      totalItems: 0,
      /** 数据是否处于加载状态 */
      isTableLoading: true,
      /** 是否全部选中 */
      allChecked: false,
      /** 全选框是否禁用 */
      allCheckboxDisabled: false,
      /** 选择框非全选状态，控制全选框的样式：☒ */
      checkboxIndeterminate: false,
      /** 已选中数据项列表 */
      selectedDataItems: [] as any[],
      /** 排序条件 - 表达式 */
      sortConditions: [] as ISortCondition[],
      /** 排序条件  */
      sorting: '',
      /** 模糊搜索的文本 */
      filterText: '',
      /** 数据表的数据源 */
      dataList: [] as any,
      /** 布尔类型表格列头过滤列表 */
      booleanFilterList: [
        { text: this.l('All'), value: '' },
        { text: this.l('Yes'), value: true },
        { text: this.l('No'), value: false },
      ],
      /** 表格列配置 */
      columns: [] as ColumnType<any>[],
      /** 选中的数据 */
      selectedRowKeys: [] as any[],
      /** 表格高度, calculatedTableHeight 方法计算 */
      tableHeightScroll: '',
      /** 表格宽度，默认 calc(100% + 1px) */
      tableWidthScroll: '100%',
    };
  },
  computed: {
    /** 当前选中的数据量 */
    selectedCount(): number {
      return this.selectedRowKeys.length;
    },
  },
  mounted() {
    this.columns = this.getColumns();
    this.refresh();
    this.calculatedTableHeight();
  },
  methods: {
    /* 处理列头拖动 */
    handleResizeColumn: (w: any, col: { width: any }) => {
      col.width = w;
    },
    /** 刷新表格数据 */
    refresh() {
      // 刷新表格数据
      this.restCheckStatus(this.dataList);
      this.getDataPage(this.pageNumber);
    },
    /** 刷新表格数据并跳转到第一页（`pageNumber = 1`） */
    refreshGoFirstPage() {
      this.pageNumber = 1;
      this.restCheckStatus(this.dataList);
      this.getDataPage(this.pageNumber);
    },
    /** 搜索数据，调用 refreshGoFirstPage  */
    getSearchData() {
      this.refreshGoFirstPage();
    },
    /**
     * 获取数据页
     * @param page 页码
     */
    getDataPage(page: number) {
      // 请求分页数据
      const req = {
        maxResultCount: 0,
        skipCount: 0,
        sorting: '',
      };

      req.maxResultCount = this.pageSize;
      req.skipCount = (page - 1) * this.pageSize;
      req.sorting = this.sorting;
      this.isTableLoading = true;
      this.fetchDataList(req, () => {
        // 如果存在数据大于一条，但是当前页不存在数据，那么跳转到第一页
        if (this.totalItems && !this.dataList?.length) {
          this.refreshGoFirstPage();
          return;
        }
        this.isTableLoading = false;
        // 更新全选框禁用状态
        this.refreshAllCheckBoxDisabled();
      });
    },
    /** 刷新全选框是否禁用 */
    refreshAllCheckBoxDisabled() {
      this.allCheckboxDisabled = this.dataList.length <= 0;
    },
    /** 当页码发生改变 */
    pageNumberChange() {
      // 页码发生改变
      if (this.pageNumber > 0) {
        this.refresh();
      }
    },
    /** 选中数据发生改变 */
    onSelectChange(val: any[]) {
      if (!val) {
        val = [];
      }
      this.selectedRowKeys = val;
    },
    /**
     * 选中全部
     * @param value 是否选中
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    checkAll(value: boolean) {
      // 选中全部记录
      // this.dataList.forEach((data) => ((data as any).checked = value));
      // this.refreshCheckStatus(this.dataList);

      const dataList = Array.isArray(this.dataList) ? this.dataList : [];
      this.refreshCheckStatus(dataList);
    },
    /**
     * 刷新选中状态
     * @param entityList 数据集合
     */
    refreshCheckStatus(entityList: any[]) {
      // 是否全部选中
      const allChecked = entityList.length === this.selectedRowKeys.length;
      // 是否全部未选中
      const allUnChecked = this.selectedRowKeys.length === 0;
      // 是否全选
      this.allChecked = allChecked;
      // // 全选框样式控制
      // this.checkboxIndeterminate = !allChecked && !allUnChecked;
      // // 已选中数据
      // this.selectedDataItems = entityList.filter((value) => value.checked);
    },
    /**
     * 重置选中状态
     * @param entityList 数据集合
     */
    restCheckStatus(entityList?: any[]) {
      // if (!Array.isArray(entityList)) {
      //   entityList = this.dataList as any[];
      // }
      // this.allChecked = false;
      // this.checkboxIndeterminate = false;
      // // 已选中数据
      // this.selectedDataItems = [];
      // // 设置数据为未选中状态
      // entityList.forEach((value) => (value.checked = false));

      this.selectedRowKeys = [];
    },
    /**
     * 计算分页
     * @param result 分页结果Dto
     * @param pageNumber 当前页码
     */
    showPaging(result: IPagedResultDto) {
      this.dataList = result.items ?? [];
      // 计算分页
      this.totalItems = result.totalCount;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    },
    /** 排序条件发生改变 */
    onSortChange(sortConditions: ISortCondition[], sorting: string) {
      this.sortConditions = sortConditions ?? [];
      this.sorting = sorting;
      this.refresh();
    },
    /** 数据表格排序 */
    gridSort(sort: { key: string; value: string }) {
      this.sorting = '';
      this.sortConditions = [];

      let ascOrDesc = sort.value; // 'ascend' or 'descend' or null
      const filedName = sort.key; // 字段名
      if (ascOrDesc) {
        ascOrDesc = this.abp.utils.replaceAll(ascOrDesc, 'end', '');
        const sortingStr = this.abp.utils.formatString('{0} {1}', filedName, ascOrDesc);
        this.sorting = sortingStr;
        this.sortConditions.push({
          field: filedName,
          order: 0,
          type: ascOrDesc === 'asc' ? SortType.Asc : SortType.Desc,
        });
      }
      this.refresh();
    },

    /** *
     * 表格信息发生改变
     * @param pagination 分页信息
     * @param filters 筛选信息
     * @param sorter 排序信息
     * @param data 当前数据源
     */
    tableChange(
      pagination: ITablePagination,
      filters: ITableFilter,
      sorter: ITableSorter | ITableSorter[],
    ) {
      // 更新分页信息
      this.pageNumber = pagination.pageSize == this.pageSize ? pagination.current : 1;
      this.pageSize = pagination.pageSize;
      // antd-vue table change事件

      // 更新排序

      const sortMap = this.toSortMap(sorter);
      this.sortConditions = this.toSortConditions(sortMap);
      this.sorting = this.toSortingString(sortMap);

      // 更新筛选条件
      const filterMap = this.toFilterValues(filters);
      const filterHasChange = this.updateFilterValues(filterMap);

      // 筛选条件发生改变，需要跳转到第一页
      if (filterHasChange) {
        this.refreshGoFirstPage();
        return;
      }

      // 刷新即可
      this.refresh();
    },
    /**
     * 展示总数信息
     * @param total 请求必需参数 skipCount: number; maxResultCount: number;
     * @param range 请求必需参数 skipCount: number; maxResultCount: number;
     */
    showTotalInfo(total: number, range: any) {
      return this.l('GridFooterDisplayText', [
        this.pageNumber,
        this.totalPages,
        this.totalItems,
        range[0],
        range[1],
      ]);
    },
    /**
     * 计算表格内容所占高度
     * 56px 表格头高度
     * 148px (80px的头部组件高度，68px的上下padding高度)
     */
    calculatedTableHeight() {
      nextTick(() => {
        let height = '300px';
        if (this.$refs.headerContainer && (this.$refs.headerContainer as any).offsetHeight) {
          height = `calc(100vh - ${Math.ceil(
            (this.$refs.headerContainer as any).offsetHeight,
          )}px - 148px - 56px - 32px)`;
        }
        this.tableHeightScroll = height;
      });
    },
    /** sorter转映射 */
    toSortMap(input: ITableSorter | ITableSorter[]): {
      [name: string]: SortType;
    } {
      if (!input) {
        return {};
      }
      if (!Array.isArray(input) && !input.order) {
        return {};
      }
      const sorters: ITableSorter[] = [];
      if (!Array.isArray(input)) {
        sorters.push(input);
      } else {
        sorters.push(...input);
      }
      const sortMap: { [name: string]: SortType } = {};
      for (const item of sorters) {
        if (!item.field) {
          continue;
        }
        if (!sortMap[item.field]) {
          sortMap[item.field] = item.order === 'ascend' ? SortType.Asc : SortType.Desc;
        }
      }

      return sortMap;
    },
    /** 排序转排序规则表达式 */
    toSortConditions(sortMap: { [name: string]: SortType }): ISortCondition[] {
      if (!sortMap) {
        return [];
      }

      let index = 0;
      const sortConditions: ISortCondition[] = [];
      // tslint:disable-next-line:forin
      for (const key in sortMap) {
        sortConditions.push({
          field: key,
          order: index++,
          type: sortMap[key],
        });
      }
      return sortConditions;
    },
    /** 排序转排序规则表达式字符串 */
    toSortingString(sortMap: { [name: string]: SortType }): string {
      if (!sortMap) {
        return '';
      }
      // 处理数据
      let sorting = '';
      // tslint:disable-next-line:forin
      for (const key in sortMap) {
        sorting += `${key} ${sortMap[key]},`;
      }

      // 截取最后的字符串
      if (sorting.endsWith(',')) {
        sorting = sorting.substr(0, sorting.length - 1);
      }

      return sorting;
    },
    /**
     * 映射筛选条件
     * @param filter 筛选条件信息
     */
    toFilterValues(filter: ITableFilter): {
      [name: string]: any;
    } {
      const res = {} as any;
      for (const key in filter) {
        const filterFieldIsArray = Array.isArray((this as any)[key]);
        let val = filter[key];

        // 如果筛选条件字段不是数组
        // 并且当前筛选值是数组
        // 并且值长度为1，那么取第一条数据作为val
        if (!filterFieldIsArray && Array.isArray(val)) {
          val = val[0];
        }
        res[key] = val;
      }
      return res;
    },
    /** 更新filter */
    updateFilterValues(filterMap: { [name: string]: any }) {
      let existChange = false;
      for (const key in filterMap) {
        const currentVal = (this as any)[key];
        const newVal = filterMap[key];
        // 做比较
        if (currentVal !== newVal) {
          existChange = true;
        }
        // 更新值
        (this as any)[key] = newVal;
      }
      return existChange;
    },
    /**
     * 获取数据抽象接口，必须实现
     * @param request 请求必需参数 skipCount: number; maxResultCount: number;
     * @param pageNumber 当前页码
     * @param finishedCallback 完成后回调函数
     */
    // @ts-ignore
    fetchDataList(request: IPagedRequestDto, finishedCallback?: () => void) {
      // 获取数据抽象接口，必须实现
      let file = '';
      try {
        file = this.$!.type!.__file!;
      } catch (error) {}
    },
    /** 获取表格列配置 */
    getColumns(): ColumnType<any>[] {
      // 获取数据抽象接口，必须实现
      let file = '';
      try {
        file = this.$!.type!.__file!;
      } catch (error) {}
      return [];
    },
  },
});

export default PagedListingComponentBase;
