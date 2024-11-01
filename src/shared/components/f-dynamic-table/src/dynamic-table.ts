import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent, nextTick } from 'vue';
import * as _ from 'lodash-es';
import { PageToolbar } from '../page-toolbar';
import { PageFilter } from '../page-filter';
import { PageTable } from '../page-table';
import { PageConfig } from '../page-config';
import { dynamicTableProps } from './props';
import { IFetchDataInput } from '../interfaces';
import { IFilterValues, IShowFiltersChangeEventArgs } from '../page-filter/interfaces';
import { IPageInfo, ISelectDataEventArgs } from '../page-table/interfaces';
import { IButtonItem } from '../page-config/interfaces';
import { getHeightWithMargin } from '@/utils/domUtils';
import {
  ButtonGroupsService,
  FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto,
  FireBytes_Unified_ListViews_Dtos_ListViewDto,
  FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
  ListViewsService,
  PageFiltersService,
} from '@/apis';

export default defineComponent({
  components: {
    PageToolbar,
    PageFilter,
    PageTable,
    PageConfig,
  },
  mixins: [AppComponentBase],
  props: {
    ...dynamicTableProps,
  },
  emits: ['action-click', 'tableChange', 'selectedData', 'fetch-success', 'fetch-error'],
  data() {
    return {
      showTableBar: true,
      // 引用
      /** 顶部工具条引用 */
      toolbarRef: {} as InstanceType<typeof PageToolbar>,
      /** 筛选器引用 */
      filterRef: {} as InstanceType<typeof PageFilter>,
      /** 表格引用 */
      tableRef: {} as InstanceType<typeof PageTable>,
      /** 后端服务 */
      buttonGroupsService: ButtonGroupsService,
      pageFiltersService: PageFiltersService,
      listViewsService: ListViewsService,

      // 页面配置
      /** 顶部工具条配置 */
      toolbarConfig: { buttonConfigs: [] } as FireBytes_Unified_ButtonGroups_Dtos_ButtonGroupsDto,
      /** 筛选器配置 */
      filterConfig: {} as FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
      /** 表格配置 */
      tableConfig: {} as FireBytes_Unified_ListViews_Dtos_ListViewDto,
      /** 筛选条件 */
      filterValues: {} as IFilterValues,
      /** 表格分页信息 */
      pageInfo: {} as IPageInfo,
      /** 表格数据 */
      tableData: {} as any,
      /** 表格Y轴滚动条 */
      tableScrollY: '100%',
      /** 表格当前页码 */
      tablePageIndex: 1,
      /** 表格选中的数据信息 */
      tableSelect: null as ISelectDataEventArgs | null,
      /** 表格行检查属性 */
      tableRowCheckboxProps: null as Function | null,
      /** 表格配置显示的按钮 */
      showPageConfigButton: (btn: IButtonItem) => {
        const tableConfig: FireBytes_Unified_ListViews_Dtos_ListViewDto = this
          .tableConfig as FireBytes_Unified_ListViews_Dtos_ListViewDto;
        if (!tableConfig) {
          return true;
        }

        switch (btn.eventName) {
          case 'FilterConfig':
          case 'QueryConfig':
          case 'ListConfig':
          case 'TableConfig':
          case 'ColumnColorConfig':
          case 'TableColorConfig':
            return tableConfig.ifShowPersonalization;
          case 'Export':
            return tableConfig.showExport;
          case 'BulkExport':
            return tableConfig.showExportAll;
        }

        return false;
      },
    };
  },
  computed: {
    /** 表格顶部按钮工具条 */
    tableBar(): InstanceType<typeof PageToolbar> {
      return this.$refs.toolbarRef as any;
    },
    /** 表格搜索栏 */
    tableSearch(): InstanceType<typeof PageFilter> | null {
      return this.$refs.filterRef as any;
    },
    /** 表格实例 */
    tableInstance(): InstanceType<typeof PageTable> | null {
      return this.$refs.tableRef as any;
    },
  },
  created() {
    this.loading = true;
  },
  mounted() {
    /** 加载顶部工具条 */
    if (this.showToolbar) {
      this.fetchConfig(this.type ?? '', 'toolbar');
    }

    // 加载筛选条件
    if (this.showFilter) {
      this.fetchConfig(this.type ?? '', 'filter');
    }

    // 不启用筛选条件，那么直接加载表格配置
    if (!this.showFilter) {
      this.fetchConfig(this.type ?? '', 'table');
      this.handleShowFiltersChange({ filters: [], filterRow: 0 });
    }
  },
  methods: {
    /** 顶部工具条准备就绪 */
    handleToolbarReady(toolbarRef: InstanceType<typeof PageToolbar>) {
      this.toolbarRef = toolbarRef;
    },
    /** 搜索组件准备就绪 */
    handleFilterReady(filterRef: InstanceType<typeof PageFilter>) {
      this.filterRef = filterRef;
      // 搜做组件加载完成之后加载 table
      this.fetchConfig(this.type ?? '', 'table');
    },
    /** 表格组件准备就绪 */
    handleTableReady(tableRef: InstanceType<typeof PageTable>) {
      this.tableRef = tableRef;
    },
    /** 搜索按钮点击 */
    handleFilterClick(isReset: boolean) {
      this.refresh(isReset);
    },
    /** 显示的筛选条件发生变化 */
    handleShowFiltersChange(e: IShowFiltersChangeEventArgs) {
      /* 是否显示，批量操作按钮栏 */
      const toolBarContentHeight = 64;
      const toolBarMarginBottom = 7;
      /** 表格按钮区域容器高度 */
      const toolBarTotalHeight = toolBarContentHeight + toolBarMarginBottom;
      const toolBarContainerHeight = this.showTableBar && this.showToolbar ? toolBarTotalHeight : 0;

      /** 面包屑导航条高度 */
      const breadcrumbContainerHeight = 48;
      /** 缓存Tab条高度 */
      const multipleTabsHeight = 32;
      /** 布局头部高度 = 面包屑导航条高度 + 缓存Tab条高度 */
      const layoutHeaderContainerHeight = breadcrumbContainerHeight + multipleTabsHeight;

      /** 表头高度 */
      const tableHeaderContainerHeight = 40;
      /** 表格底部padding */
      const tableBottomContainerHeight = 52;

      /** 表格上边距 */
      const tablePaddingTop = 8;

      /** 1像素用于解决parseFloat 带来的浮点问题 */
      const placeholderHeight = 1;

      nextTick(() => {
        const filterRef = this.$refs.filterRef as any;
        /** 搜索区域高度 */
        const filterContainerHeight = this.showFilter ? getHeightWithMargin(filterRef.$el) : 0;
        const otherheight =
          layoutHeaderContainerHeight +
          toolBarContainerHeight +
          filterContainerHeight +
          tableHeaderContainerHeight +
          tableBottomContainerHeight +
          tablePaddingTop +
          placeholderHeight;
        /* extraHeight：特殊页面工作区内 格外的组件高度合计 */
        this.tableScrollY = `calc(100vh - ${otherheight}px - ${this.extraHeight}px)`;
      });
    },
    /** 处理点击: toolbar/table action */
    handleActionClick(type: string, valueOrRecord: any, config?) {
      this.$emit('action-click', type, valueOrRecord, config);
    },
    /** 表格分页排序信息变更 */
    handleTableChange(e) {
      this.$emit('tableChange', e);
    },
    /** 表格页面信息发生改变 */
    handlePageInfoChange(pageInfo: IPageInfo) {
      this.fetchData(pageInfo);
    },
    /** 当前选中行数据变更 */
    handleSelectChange(e: ISelectDataEventArgs) {
      this.tableSelect = e;
      this.$emit('selectedData', e.data);
    },
    /** 页面配置发生改变，重新拉取配置 */
    handlePageConfigChange(e: string) {
      switch (e) {
        case 'filter':
          this.fetchConfig(this.type ?? '', 'filter');
          break;
        case 'table':
          this.fetchConfig(this.type ?? '', 'table');
          break;
        default:
          console.error(`handlePageConfigChange, not support config: ${e}`);
          break;
      }
    },
    /** 页面配置按钮点击 */
    handlePageConfigClick(type: string) {
      switch (type) {
        case 'Export':
          this.exportTableData(false);
          break;
        case 'BulkExport':
          this.exportTableData(true);
          break;
        default:
          this.handleActionClick(type, null);
          break;
      }
    },
    /** 导出 */
    exportTableData(exportAll = false) {
      this.loading = true;
      const pageInfo = _.cloneDeep(this.pageInfo);
      pageInfo.__isExport = true;

      // 分页请求所有数据
      const fetchExportData = new Promise<any[]>(async (resolve, reject) => {
        try {
          const datas: any[] = [];
          // 导出所有
          if (exportAll) {
            const totalPages = this.tableRef.pagination.totalPages;
            for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
              // 计算分页
              pageInfo.currentPage = pageIndex;
              pageInfo.skipCount = (pageInfo.currentPage - 1) * pageInfo.maxResultCount;

              // 请求数据
              const response = await this.fetchData(pageInfo);
              const tableData = this.tableRef.processTableData(response);
              const exportDataList = Array.isArray(tableData) ? tableData : tableData.items;
              datas.push(...exportDataList);
            }
          }
          // 导出当前页
          else {
            const response = await this.fetchData(pageInfo);
            const tableData = this.tableRef.processTableData(response);
            const exportDataList = Array.isArray(tableData) ? tableData : tableData.items;
            datas.push(...exportDataList);
          }
          resolve(datas);
        } catch (error) {
          reject(error);
        }
      });

      fetchExportData
        .then((res) => {
          const exportType = exportAll ? 'BulkExport' : 'Export';
          const exportHeader = this.tableRef.formatExcelHeader(this.tableRef.columns);
          const exportData = this.tableRef.formatExcelData(exportType, this.tableRef.columns, res);
          this.tableRef.export(exportHeader, exportData);
        })
        .catch((error) => {
          console.error(`exportTableData error!: ${error}`);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /** 加载数据 */
    fetchData(pageInfo: IPageInfo) {
      if (!pageInfo.__isExport) {
        this.pageInfo = pageInfo;
      }
      // 所有请求信息
      const requestInput: IFetchDataInput = {
        fitlerValues: this.filterValues,
        ...pageInfo,
      };
      const fetch = this.fetch
        ? this.fetch
        : () => {
            return new Promise<any>((resolve) => {
              resolve(null);
            });
          };

      // 如果是导出
      const __isExport = pageInfo.__isExport;
      if (!__isExport) {
        this.loading = true;
      }

      return new Promise<any>((resolve, reject) => {
        fetch(requestInput)
          .then((response) => {
            // 非导出
            if (!__isExport) {
              this.tableData = response;
            }
            resolve(response);
            this.$emit('fetch-success');
          })
          .catch((error: any) => {
            reject(error);
            this.$emit('fetch-error');
          })
          .finally(() => {
            if (!__isExport) {
              this.loading = false;
            }
          });
      });
    },
    /** 请求配置数据 */
    fetchConfig(configName: string, type: 'toolbar' | 'filter' | 'table') {
      if (type === 'toolbar') {
        this.buttonGroupsService
          .getApiAppButtonGroupsButtonGroups({
            buttonGroupsName: configName,
            userId: this.abp.currentUser?.id as string,
          })
          .then((res) => {
            console.log('table-fetchConfig', res);
            this.showTableBar = !!res?.buttonConfigs?.length;
            this.toolbarConfig = res;
          });
        return;
      }
      if (type === 'filter') {
        this.pageFiltersService
          .getApiAppPageFiltersPageFilter({
            pageFilterName: configName,
            userId: this.abp.currentUser?.id as string,
          })
          .then((res) => {
            console.log('res', res);
            this.filterConfig = res;
          });
        return;
      }

      if (type === 'table') {
        this.listViewsService
          .getApiAppListViewsColumnsOfListView({
            listViewName: configName,
            userId: this.abp.currentUser?.id as string,
            isDefaultColumn: this.isDefaultColumn as boolean,
          })
          .then((res) => {
            this.tableConfig = res;
          })
          .finally(() => {
            this.loading = false;
          });
        return;
      }
    },
    /** 获取搜索属性 */
    getSearchProps() {
      return {
        ...this.filterValues,
        ...this.pageInfo,
      };
    },
    /** 刷新 */
    refresh(goFirstPage = false) {
      if (!this.pageInfo) {
        return;
      }

      if (goFirstPage) {
        this.tablePageIndex = 1;
        this.pageInfo.currentPage = 1;
        this.pageInfo.skipCount = (this.pageInfo.currentPage - 1) * this.pageInfo.maxResultCount;
      } else {
        this.tablePageIndex = 1;
        this.pageInfo.currentPage = 1;
        this.pageInfo.skipCount = 0;
      }

      this.fetchData(this.pageInfo);
    },
    /** 重载，刷新 */
    reload() {
      this.refresh();
    },
    /** 重置表单 */
    reloadGoFirstPage() {
      this.refresh(true);
    },
    /** 设置加载 */
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    /** 获取当前选中的数据键值-键 */
    getSelectRowKeys() {
      if (!this.tableSelect) {
        return [];
      }
      return this.tableSelect.keys;
    },
    /** 获取当前选中的数据键值-值 */
    getSelectRows() {
      if (!this.tableSelect) {
        return [];
      }
      return this.tableSelect.data;
    },
    /** 获取单个搜索的数值 */
    getPageFilter(fieldName: string) {
      if (Object.prototype.hasOwnProperty.call(this.filterValues, fieldName)) {
        return this.filterValues[fieldName];
      }
      return null;
    },
    /** 获取顶部按钮-兼容 */
    getTableBarRef(name: string) {
      return this.toolbarRef.getButtonRef(name);
    },
    /** 获取顶部按钮 */
    getButtonInstance(name: string) {
      return this.toolbarRef.getButtonRef(name);
    },
    /** 设置列表项配置 */
    rowSelectionDisable(val: (record: any) => any) {
      this.setRowSelection('getCheckboxProps', val);
    },
    /** 设置表格属性 */
    setRowSelection(type: string, val: any) {
      if (type === 'getCheckboxProps') {
        this.tableRowCheckboxProps = val;
      }
    },
    /** 数据 */
    getDataSource() {
      return [...this.tableRef.dataSource];
    },
    /** 设置筛选条件表单值 */
    setFormField(key: string, val: any) {
      this.filterValues[key] = val;
    },
  },
});
