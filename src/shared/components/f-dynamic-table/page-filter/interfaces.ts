export interface IFilterValues {
  [key: string]: any;
}

/** 数据联动-传入数据 */
export interface IFilterValuesLink {
  /** 当前值 */
  currentValue: any;
  /** 当前搜索整个表单 */
  filterValues: IFilterValues;
}

/** 展示的筛选条件发生改变的 */
export interface IShowFiltersChangeEventArgs {
  /** 筛选条件配置 */
  filters: any[];
  /** 筛选条件所占行数 */
  filterRow: number;
}
