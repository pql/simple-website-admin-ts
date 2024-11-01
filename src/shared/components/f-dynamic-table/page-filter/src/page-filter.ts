import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { pageFilterProps } from './props';
import { IFilterValues, IFilterValuesLink, IShowFiltersChangeEventArgs } from '../interfaces';
import { FormInstance } from 'ant-design-vue/lib';
import { DownOutlined } from '@ant-design/icons-vue';
import {
  FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
  FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto,
} from '@/apis';
import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';

const components = {
  DownOutlined,
  FRangeNumber: createAsyncComponent(
    () => import('@/shared/components/f-range-number/src/range-number.vue'),
  ),
  FSelect: createAsyncComponent(() => import('@/shared/components/f-select/src/select.vue')),
  FAddressPicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-address-picker/address-picker.vue'),
  ),
  FHttpMethodPicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-http-method-picker/http-method-picker.vue'),
  ),
  FHttpStatusCodePicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-http-status-code-picker/http-status-code-picker.vue'),
  ),
  FLanguagePicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-language-picker/language-picker.vue'),
  ),
  FSelectPicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-select-picker/select-picker.vue'),
  ),
  FOptionsMapPicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-options-map-picker/options-map-picker.vue'),
  ),
  FPermissionTreePicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-permission-tree-picker/permission-tree-picker.vue'),
  ),
  FResourceNamePicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-resource-name-picker/resource-name-picker.vue'),
  ),
  FLookupRolePicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-lookup-role-picker/lookup-role-picker.vue'),
  ),
  FVersionNamePicker: createAsyncComponent(
    () => import('@/app/admin-shared/f-version-name-picker/version-name-picker.vue'),
  ),
};

export default defineComponent({
  components: components,
  mixins: [AppComponentBase],
  props: {
    ...pageFilterProps,
  },
  emits: ['ready', 'update:value', 'change', 'search', 'showFiltersChange'],
  data() {
    return {
      /** 筛选值 */
      filterValues: {
        ...(this.defaultValue ?? {}),
      } as IFilterValues,
      /** 是否开启高级过滤搜索 */
      showAdvancedFilter: false,
      /** 搜索组件加载完成字典 */
      readyDictionary: {} as { [key: string]: boolean },
      /** 是否初始化完成 */
      isReady: false,
      /** 所有筛选条件 */
      allFilterList: [] as FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[],
      /** 显示的筛选条件 */
      showFilters: [] as FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[],
      /** 基本搜索 */
      basicFilters: [] as FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[],
      /** 基本搜索-前置 */
      prefixBasicFilters: [] as FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[],
      /** 高级搜索 */
      advancedFilters: [] as FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[],
      /** 布局 horizontal/vertical */
      layout: 'vertical',
      /** 表单布局 */
      formLayout: {} as any,
      /** 默认网格数 */
      defaultGridCount: 24,
      /** 搜索按钮占位网格数 */
      filterButtonsGridCount: 6,
    };
  },
  computed: {
    getBasicFiltersTotalFilterWidth() {
      return this.basicFilters.map((i) => i.filterWidth ?? 0).reduce((a, b) => a + b);
    },
    getPrefixBasicFiltersTotalFilterWidth() {
      return this.getPrefixBasicFilters.map((i) => i.filterWidth ?? 0).reduce((a, b) => a + b);
    },
    getPrefixBasicFilters() {
      let filterWidth = 0;
      const filters = this.basicFilters.filter((i) => {
        filterWidth += i?.filterWidth ?? 0;
        if (filterWidth <= this.defaultGridCount - this.filterButtonsGridCount) {
          return i;
        }
      });
      return filters;
    },
  },
  watch: {
    filterConfig(
      val: FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
      oldVal: FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
    ) {
      if (val !== oldVal) {
        this.setFilterConfig(val);
      }
    },
  },
  methods: {
    /** 点击搜索按钮 */
    handleSearch(isReset = false) {
      const formRef = this.getFilterFormRef();
      if (!formRef) {
        return;
      }
      this.$emit('search', isReset);
    },
    /** 点击重置表单 */
    handleResetForm() {
      // 重置表单数据
      this.filterValues = Object.assign({}, this.defaultValue);
      this.$emit('update:value', this.filterValues);
      this.$emit('change', this.filterValues);

      // 触发搜索
      this.$nextTick(() => {
        this.handleSearch(true);
      });
    },
    /** 值发生变化 */
    handleChange(val: any, filterItem: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) {
      if (!filterItem.field) {
        return;
      }

      // 处理字段
      if (filterItem.skipValueIsNull && !val) {
        this.filterValues[filterItem.field] = null;
      } else if (!filterItem.skipValueIsNull && !val) {
        this.filterValues[filterItem.field] = null;
      } else {
        this.filterValues[filterItem.field] = val;
      }

      // 触发修改
      const filterValues = this.filterValues;

      this.$nextTick(() => {
        // 联动
        const data: IFilterValuesLink = {
          filterValues: filterValues,
          currentValue: val,
        };

        this.handleExternalTrigger(filterItem.valueChange ?? [], data);

        // 更新value
        this.$emit('update:value', filterValues);
        this.$emit('change', filterValues);
      });
    },
    /** 处理 */
    handleReady(filterItem: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) {
      this.readyDictionary[filterItem.field!] = true;
      const readyCount = Object.keys(this.readyDictionary).length;
      if (readyCount > 0 && this.showFilters.length > 0 && readyCount === this.showFilters.length) {
        this.imReady();
      }
    },
    /** 点击高级搜索 */
    handleAdvanceFilter() {
      this.showAdvancedFilter = !this.showAdvancedFilter;
      this.triggerShowFiltersChange();
    },
    /** 设置筛选条件 */
    setFilterConfig(filterConfig: FireBytes_Unified_PageFilters_Dtos_PageFilterDto) {
      if (!filterConfig) {
        return;
      }

      // 预处理筛选条件
      filterConfig = this.processPageFilters(filterConfig);

      // 设置筛选条件
      this.layout = filterConfig.layout ?? 'vertical';
      this.formLayout = this.processFormLayout(filterConfig);
      this.showFilters = this.processFilterList(filterConfig, 'show') ?? [];
      this.basicFilters = this.processFilterList(filterConfig, 'basic') ?? [];
      this.advancedFilters = this.processFilterList(filterConfig, 'advanced') ?? [];
      this.allFilterList = filterConfig.pageFilterElements ?? [];

      // 没有筛选条件
      if (this.showFilters.length === 0) {
        this.imReady();
      } else if (Array.isArray(this.showFilters)) {
        // 处理默认onReady
        for (const item of this.showFilters) {
          if (item.componentName?.startsWith('a-') && item.ifShow) {
            this.handleReady(item);
          }
        }
      }
    },
    /** 处理所有的筛选配置以及衍生项 */
    processPageFilters(filterConfig: FireBytes_Unified_PageFilters_Dtos_PageFilterDto) {
      if (!filterConfig) {
        filterConfig = {
          pageFilterElements: [],
          id: undefined,
          layout: 'vertical',
          pageFilterName: undefined,
          labelAlign: undefined,
        };
      }
      if (!Array.isArray(filterConfig.pageFilterElements)) {
        filterConfig.pageFilterElements = [];
      }

      if (filterConfig.layout !== 'vertical' && filterConfig.layout !== 'horizontal') {
        filterConfig.layout = 'vertical';

      }
      // if (filterConfig.pageFilterElements && filterConfig.pageFilterElements.length) {
      //   if (!filterConfig.pageFilterElements[0].filterTitle)
      //     filterConfig.layout = 'horizontal';
      // }
      for (const item of filterConfig.pageFilterElements) {
        this.processPlaceholder(item);
      }

      return filterConfig;
    },
    /** 处理搜索列表 */
    processFilterList(
      filterConfig: FireBytes_Unified_PageFilters_Dtos_PageFilterDto,
      type: 'basic' | 'advanced' | 'show',
    ) {
      const filterList = filterConfig.pageFilterElements;

      // 基本搜索
      if (type === 'basic') {
        const basicArr = filterList?.filter((item) => {
          return !item.isAdvanced && item.ifShow;
        });
        return basicArr?.sort((a, b) => {
          return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
        });
      }

      // 高级搜索
      if (type === 'advanced') {
        const advancedArr = filterList?.filter((item) => {
          return item.isAdvanced && item.ifShow;
        });
        return advancedArr?.sort((a, b) => {
          return (a?.sortNum ?? 0) - (b?.sortNum ?? 0);
        });
      }

      // 所有需要展示的搜索
      if (type === 'show') {
        return filterList?.filter((o) => o.ifShow);
      }

      return [];
    },
    /** 处理 placeholder */
    processPlaceholder(item: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto) {
      if (!item.args) {
        item.args = { placeholder: '' };
      }
      if (!item.args.placeholder) {
        item.args.placeholder = '';
      }

      const placeholder = item.args.placeholder;
      if (Array.isArray(placeholder)) {
        item.args.placeholder = placeholder.map((item: string) => {
          return this.l(item ?? '');
        });
      } else {
        item.args.placeholder = this.l(placeholder);
      }
    },
    /** 处理布局 */
    processFormLayout(filterConfig: FireBytes_Unified_PageFilters_Dtos_PageFilterDto) {
      const { layout } = filterConfig;
      return layout === 'horizontal'
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 20 },
          labelAlign: filterConfig?.labelAlign ? filterConfig.labelAlign : 'right',
        }
        : {
          labelAlign: filterConfig?.labelAlign ? filterConfig.labelAlign : 'right',
        };
    },
    /** 触发初始化完成 */
    imReady() {
      if (!this.isReady) {
        this.$nextTick(() => {
          this.$emit('ready', this);
          this.triggerShowFiltersChange();
        });
      }
    },
    /** 触发展示的filter发生改变 */
    triggerShowFiltersChange() {
      const eventArgs: IShowFiltersChangeEventArgs = {
        filters: this.basicFilters,
        filterRow: this.calculateFilterRow(this.basicFilters),
      };

      // 高级筛选条件
      if (this.showAdvancedFilter) {
        eventArgs.filters = this.showFilters;
        eventArgs.filterRow += this.calculateFilterRow(this.advancedFilters);
      }
      this.$emit('showFiltersChange', eventArgs);
    },
    /** 计算筛选占用的行数量 */
    calculateFilterRow(filters: FireBytes_Unified_PageFilters_Dtos_PageFilterElementDto[]) {
      if (!Array.isArray(filters)) {
        filters = [];
      }

      let countFilterWidth = 0;
      for (const item of filters) {
        countFilterWidth += item?.filterWidth ?? 0;
      }
      return Math.ceil(countFilterWidth / 24);
    },
    /** 获取筛选表单 */
    getFilterFormRef(): FormInstance {
      return this.$refs.searchFormRef as FormInstance;
    },
    /** 通知 */
    handleExternalTrigger(subList: string[], data?: any) {
      const subs = subList.filter((s) => s);
      for (let i = 0, l = subs.length; i < l; i++) {
        const sub = subs[i];
        let instance: any = null;
        if (Array.isArray(this.$refs[sub])) {
          instance = this.$refs[sub][0];
        } else {
          instance = this.$refs[sub] as any;
        }
        if (instance?.handleExternalTriggerChangeEvent) {
          instance.handleExternalTriggerChangeEvent(data);
        }
      }
    },
  },
});
