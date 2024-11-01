import { defineComponent } from 'vue';
import { pageTableProps } from './props';
import type { TableColumnType } from 'ant-design-vue';
import { ISortCondition, ITableSorter, SortType } from '@/shared/component-base/interfaces';
import { IPageInfo, ISelectDataEventArgs } from '../interfaces';
import { DownOutlined } from '@ant-design/icons-vue';
import PageTableRow from '../../page-table-row/src/page-table-row';
import BasicConfigInstance from '@/shared/config/basic-config';
import {
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
  FireBytes_Unified_ListViews_Dtos_ListViewDto,
} from '@/apis';

export default defineComponent({
  components: {
    DownOutlined,
  },
  mixins: [PageTableRow],
  props: {
    ...pageTableProps,
  },
  emits: [
    'ready',
    'rowClick',
    'selectChange',
    'tableChange',
    'pageInfoChange',
    'actionClick',
    'update:pageIndex',
  ],
  data() {
    return {
      /** 已经准备就绪 */
      isReady: false,
      /** 源数据 */
      dataSource: [] as any[],
      /** 展示分页 */
      showPagination: false,
      /** 分页查询 */
      filterRow: 0,
      /** 行选中类型，checkbox/radio/null */
      rowSelectionType: undefined as string | undefined | null,
      /** 基本列配置集合 */
      columns: [] as FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto[],
      /** 列配置 */
      columnsList: [] as TableColumnType[],
      /** 选中行key */
      selectedRowKeys: [] as any[],
      /** 选中行数据 */
      selectedRow: [] as any[],
      /** 是否展示外边框和列边框 */
      bordered: true,
      /** 是否显示表头 */
      showHeader: true,
      /** 表格大小 */
      size: 'small',
      /** 表格内容滚动条样式 */
      tableScroll: {
        x: '100%',
        y: this.tableScrollY,
      },
      /** 设置行属性 */
      customRow: (record) => {
        return {
          onClick: (event) => {
            this.rowClick(event, record);
          },
        };
      },
      /** 分页器 */
      pagination: {
        /** 当前页 */
        current: this.pageIndex,
        /** 分页大小 */
        pageSize: BasicConfigInstance.grid.defaultPageSize,
        /** 分页选项 */
        pageSizeOptions: BasicConfigInstance.grid.defaultPageSizes,
        /** 总页数 */
        totalPages: 1,
        /** 总记录数 */
        total: 0,
        /** 展示快速跳转 */
        showQuickJumper: true,
        /** 展示分页大小切换器 */
        showSizeChanger: true,
        /** 展示总数 */
        showTotal: (total) => `Total: ${total}`, // 显示总条数,
        // itemRender: (page, type, originalElement) => {
        //   if (type === 'prev') {
        //     return this.$createElement('a', { class: 'custom-prev' }, [this.$createElement('a', { class: 'custom-prev' }, 'Total:'),1, page]);
        //   } else if (type === 'next') { }
        //   else
        //     return originalElement;
        // },
        /** 当只有一页数据时隐藏 */
        hideOnSinglePage: false,
      },
      /** 排序字符串 */
      sorting: '',
      /** 排序表达式 */
      sortingCondition: [] as ISortCondition[],
      /** 获取行唯一标识 */
      getRowKey: (record) => {
        return record[this.rowKey];
      },
      fallback:
        'data:image/png;base64,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',
    };
  },
  watch: {
    tableConfig(val: FireBytes_Unified_ListViews_Dtos_ListViewDto) {
      this.setTableConfig(val);
    },
    tableData(val: any) {
      this.setTableData(val);
    },
    pageIndex(val: number) {
      this.pagination.current = val;
    },
    tableScrollY(val: string) {
      if (!val) {
        val = '100%';
      }
      this.tableScroll = {
        x: '100%',
        y: val,
      };
    },
  },
  methods: {
    /** 表格事件-列被点击 */
    rowClick(event: any, record: any) {
      // 触发行点击
      this.$emit('rowClick', record);

      // 不存在行选择，跳过
      if (!this.rowSelectionType) {
        return;
      }

      // 如果当前选中数据是禁用的，跳过
      if (!!this.rowCheckboxProps && this.rowCheckboxProps(record).disabled) {
        return;
      }

      // 选中行
      this.selectRow(record);
    },
    /** 功能函数-选中行 */
    selectRow(record: any) {
      const index = this.selectedRowKeys.findIndex((item) => {
        return item == this.getRowKey(record);
      });
      if (index !== -1) {
        this.selectedRowKeys.splice(index, 1);
        this.selectedRow.splice(index, 1);
      } else {
        this.selectedRowKeys.push(this.getRowKey(record));
        this.selectedRow.push(record);
      }
      this.selectRowChange(this.selectedRowKeys, this.selectedRow);
    },
    /** 表格事件-选中数据发生改变 */
    selectRowChange(selectedRowKeys: any[], selectedRows: any[]) {
      this.selectedRowKeys = selectedRowKeys;
      this.selectedRow = selectedRows;

      const eventArgs: ISelectDataEventArgs = {
        keys: this.selectedRowKeys,
        data: this.selectedRow,
      };

      this.$emit('selectChange', eventArgs);
    },
    /** 表格事件-表格数据发生变化 */
    handleTableChange(pagination, filters, sorter, { currentDataSource }) {
      if (this.showPagination) {
        this.pagination.current = pagination.current;
        this.pagination.pageSize = pagination.pageSize;
        this.$emit('update:pageIndex', this.pagination.current);
      }
      const sortMap = this.toSortMap(sorter);
      this.sortingCondition = this.toSortConditions(sortMap);
      this.sorting = this.toSortingString(sortMap);
      this.$emit('tableChange', {
        pagination,
        filters,
        sorter,
        currentDataSource,
      });
      this.handlePageInfo();
    },
    /** 表格事件-表格列宽发生改变 */
    handleResizeColumn(w, col) {
      col.width = w;
    },
    /** 处理 action 点击 */
    handleActionClick(action: string, record: any) {
      if (action === 'trigger') return; //冒泡触发特殊处理
      this.$nextTick(() => {
        this.$emit('actionClick', action, record);
      });
    },
    /** 准备完成 */
    imReady() {
      if (!this.isReady) {
        this.isReady = true;
        this.$nextTick(() => {
          this.$emit('ready', this);
          this.handlePageInfo();
        });
      }
    },
    /** 获取当前是否显示分页 */
    getShowPagination() {
      return this.showPagination;
    },
    /** 获取每页数据量 */
    getPageSize() {
      return this.pagination.pageSize;
    },
    /** 获取当前页码 */
    getCurrentPage() {
      return this.pagination.current;
    },
    /** 设置列表 */
    setTableConfig(listConfig: FireBytes_Unified_ListViews_Dtos_ListViewDto) {
      if (!listConfig) {
        return;
      }
      listConfig = this.processListView(listConfig);

      this.showPagination = listConfig.showPagination ?? false;
      this.rowSelectionType = listConfig.rowSelection;

      this.columns = listConfig.listViewColumns ?? [];
      // @ts-ignore
      this.columnsList = this.processColumns(listConfig);
    },
    /** 设置表格数据 */
    setTableData(tableData: any) {
      tableData = this.processTableData(tableData);

      // 列表
      if (Array.isArray(tableData)) {
        this.pagination.total = 0;
        this.pagination.totalPages = 0;
        this.dataSource = tableData;
      } else {
        // 带分页
        if (this.showPagination) {
          // items / totalCount
          this.pagination.total = tableData.totalCount;
          this.pagination.totalPages = Math.ceil(this.pagination.total / this.pagination.pageSize);
        }
        this.dataSource = tableData.items;
      }

      // 重置数据
      this.$nextTick(() => {
        this.selectRowChange([], []);
      });
    },
    /** 处理表格数据 */
    processTableData(tableData: any) {
      if (!tableData) {
        tableData = [];
      }

      // 列表
      if (Array.isArray(tableData)) {
        return tableData;
      } else {
        if (!Array.isArray(tableData.items)) {
          tableData.items = [];
        }
        return tableData;
      }
    },
    /** 处理列配置 */
    processColumns(listConfig: FireBytes_Unified_ListViews_Dtos_ListViewDto): TableColumnType[] {
      const result: TableColumnType[] = [];

      // 筛选排序
      const listViewColumns =
        listConfig.listViewColumns
          ?.filter((item) => {
            return !!item.ifShow;
          })
          .sort((a, b) => {
            return (a.sortNum as number) - (b.sortNum as number);
          }) ?? [];

      // 遍历处理
      for (const column of listViewColumns) {
        const { field, sortable, position, fixed, title } = column;

        // @ts-ignore
        const resizable: boolean | undefined = column?.resizable ?? true;

        const alignTypeValue = position as any;
        const fixedTypeValue = fixed as any;

        result.push({
          ...column,
          title: this.l(title ?? ''),
          dataIndex: field as string,
          key: field as string,
          align: alignTypeValue,
          fixed: fixedTypeValue,
          ellipsis: true,
          sorter: sortable,
          resizable: resizable,
        } as TableColumnType);
      }
      return result;
    },
    /** 处理列表配置 */
    processListView(listConfig: FireBytes_Unified_ListViews_Dtos_ListViewDto) {
      if (!listConfig) {
        listConfig = {
          id: undefined,
          listViewName: undefined,
          ifShowPersonalization: false,
          showPagination: false,
          showExport: false,
          showExportAll: false,
          rowSelection: undefined,
          listViewColumns: [],
        };
      }

      // 列表配置处理
      if (!Array.isArray(listConfig.listViewColumns)) {
        listConfig.listViewColumns = [];
      }

      // 行选择配置处理
      if (listConfig.rowSelection !== 'radio' && listConfig.rowSelection !== 'checkbox') {
        listConfig.rowSelection = undefined;
      }

      this.imReady();
      return listConfig;
    },
    /** 功能函数-sorter转映射 */
    toSortMap(input: ITableSorter | ITableSorter[]): { [name: string]: SortType } {
      if (!input) {
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
          if (!item.order) {
            continue;
          }
          sortMap[item.field] = item.order === 'ascend' ? SortType.Asc : SortType.Desc;
        }
      }
      return sortMap;
    },
    /** 功能函数-排序转排序规则表达式 */
    toSortConditions(sortMap: { [name: string]: SortType }): ISortCondition[] {
      if (!sortMap) {
        return [];
      }

      let index = 0;
      const sortConditions: ISortCondition[] = [];
      for (const key in sortMap) {
        sortConditions.push({
          field: key,
          order: index++,
          type: sortMap[key],
        });
      }
      return sortConditions;
    },
    /** 功能函数-排序转排序规则表达式字符串 */
    toSortingString(sortMap: { [name: string]: SortType }): string {
      if (!sortMap) {
        return '';
      }
      // 处理数据
      let sorting = '';
      for (const key in sortMap) {
        sorting += `${key} ${sortMap[key]},`;
      }

      // 截取最后的字符串
      if (sorting.endsWith(',')) {
        sorting = sorting.substr(0, sorting.length - 1);
      }

      return sorting;
    },
    /** 更新表格页面信息 */
    handlePageInfo() {
      this.$emit('pageInfoChange', this.getPageInfo());
    },
    /** 获取分页信息 */
    getPageInfo(isExport = false, exportCurrentPage = 1) {
      const pageInfo: IPageInfo = {
        skipCount: 0,
        currentPage: 1,
        maxResultCount: this.appConsts.grid.defaultPageSize,
        sorting: this.sorting,
        sortingCondition: this.sortingCondition,
        __isExport: isExport,
      };

      if (this.showPagination) {
        if (!isExport) {
          // 非导出
          pageInfo.currentPage = this.pagination.current;
          pageInfo.maxResultCount = this.pagination.pageSize;
        } else {
          // 导出
          pageInfo.currentPage = exportCurrentPage;
          pageInfo.maxResultCount = this.pagination.pageSize;
        }

        // 计算跳过数量
        pageInfo.skipCount = (pageInfo.currentPage - 1) * pageInfo.maxResultCount;
      }

      return pageInfo;
    },
  },
});
