import { FireBytes_Unified_ListViews_Dtos_ListViewDto } from '@/apis';

export const pageTableProps = {
  /** 列表配置 */
  tableConfig: {
    type: Object as PropType<FireBytes_Unified_ListViews_Dtos_ListViewDto>,
  },
  /** 页面数据 */
  tableData: {
    type: Object as PropType<any>,
    default: null,
  },
  /** 行主键 */
  rowKey: {
    type: String,
    default: 'id',
  },
  /** 表格Y轴滚动条,默认100% */
  tableScrollY: {
    type: String,
    default: '100%',
  },
  /** 表格当前页码 */
  pageIndex: {
    type: Number,
    default: 1,
  },
  /** 行检查属性 */
  rowCheckboxProps: {
    type: Function,
    default: () => {
      return (record) => {
        return {};
      };
    },
  },
};
