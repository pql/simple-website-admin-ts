import { IFilterValues } from '../page-filter/interfaces';

export const dynamicTableProps = {
  /** 配置名称 */
  type: {
    type: String,
  },
  /* 是否展示默认列 */
  isDefaultColumn: {
    type: Boolean,
    default: true,
  },
  /** 是否展示顶部工具条 */
  showToolbar: {
    type: Boolean,
    default: true,
  },
  /** 是否展示表格操作栏某个按钮 */
  showActionBtn: {
    type: Function as PropType<(item, column, record) => boolean>,
  },
  /** 是否展示顶部工具条的某个按钮 */
  showToolbarButton: {
    type: Function as PropType<(button: any) => boolean>,
  },
  /** 展示搜索 */
  showFilter: {
    type: Boolean,
    default: true,
  },
  /** 筛选条件的默认值 */
  defaultFilterValue: {
    type: Object as PropType<IFilterValues>,
  },
  /** 行主键 */
  rowKey: {
    type: String,
    default: 'id',
  },
  /** 扩展高度 */
  extraHeight: {
    type: Number,
    default: 0,
  },
  /** 行点击 */
  rowClick: {
    type: Function as PropType<(record: any) => void>,
    default: () => {
      return (record) => {};
    },
  },
  /** 请求数据 */
  fetch: {
    type: Function,
    // type: Function as PropType<(requestInput: any) => Promise<IPageResult | any[]>>
  },
};
