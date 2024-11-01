import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import DynamicTable from './src/dynamic-table.vue';

const DynamicTableComponentBase = defineComponent({
  components: {
    DynamicTable,
  },
  mixins: [AppComponentBase],
  data() {
    return {
      /** 动态表格的ref名称，默认为table */
      dynamicTableRefName: 'table',
    };
  },
  computed: {
    /** 动态表格的ref 实例 */
    dynamicTableRef(): InstanceType<typeof DynamicTable> | null {
      return this.$refs[this.dynamicTableRefName] as any;
    },
  },
  methods: {
    /** 刷新 */
    reload() {
      this.dynamicTableRef!.reload();
    },
    /** 重置表单 */
    reloadGoFirstPage() {
      this.dynamicTableRef!.reloadGoFirstPage();
    },
    /** 设置加载 */
    setLoading(loading: boolean) {
      this.dynamicTableRef!.setLoading(loading);
    },
    setRowSelection(val: (record: any) => any) {
      this.dynamicTableRef!.setRowSelection('getCheckboxProps', val);
    },
    /** 获取搜索属性 */
    getSearchProps() {
      return this.dynamicTableRef!.getSearchProps();
    },
    /** 获取单个搜索的值 */
    getPageFilter(fieldName: string) {
      return this.dynamicTableRef!.getPageFilter(fieldName);
    },
    /** 获取顶部按钮-兼容 */
    getTableBarRef(name: string) {
      return this.dynamicTableRef!.getTableBarRef(name);
    },
    /** 获取顶部按钮 */
    getButtonInstance(name: string) {
      return this.dynamicTableRef!.getButtonInstance(name);
    },
    /** 设置列表项配置 */
    rowSelectionDisable(val: (record: any) => any) {
      this.dynamicTableRef!.rowSelectionDisable(val);
    },
    /** 数据 */
    getDataSource() {
      return this.dynamicTableRef!.getDataSource();
    },
    /** 设置筛选条件表单值 */
    setFormField(key: string, val: any) {
      this.dynamicTableRef!.setFormField(key, val);
    },
    /** 获取当前选中的数据key */
    getSelectRowKeys() {
      return this.dynamicTableRef!.getSelectRowKeys();
    },
    /** 获取当前选中的数据 */
    getSelectRows() {
      return this.dynamicTableRef!.getSelectRows();
    },
  },
});

export default DynamicTableComponentBase;
