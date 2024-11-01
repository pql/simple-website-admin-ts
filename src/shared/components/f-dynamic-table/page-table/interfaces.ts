import { ISortCondition } from '@/shared/component-base/interfaces';

/** 分页信息 */
export interface IPageInfo {
  [key: string]: any;
  /** 每页最大数据量 */
  maxResultCount: number;
  /** 跳过的数量 */
  skipCount: number;
  /** 当前页 */
  currentPage: number;
  /** 排序信息-字符串 */
  sorting: string;
  /** 排序信息-表达式 */
  sortingCondition: ISortCondition[];
  /** 是否导出 */
  __isExport: boolean;
}

/** 表格导出数据配置 */
export interface IPageTableExportConfig {
  /** 文件名 */
  filename: string;
  /** 格式化列 */
  formatColumn: Function;
}

/** 分页数据结果 */
export interface IPageResult {
  /** 总数 */
  totalCount: number;
  /** 数据量 */
  items: any[];
}

/** 选中的数据发生改变 */
export interface ISelectDataEventArgs {
  /** 选中的键 */
  keys: any[];
  /** 选中的数据 */
  data: any[];
}
