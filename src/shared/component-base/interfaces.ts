/**
 * 实体主键dto
 */
export interface IEntityDto<TKey> {
  id: TKey;
}

/**
 * 分页结果dto
 */
export interface IPagedResultDto {
  items: any[] | undefined;
  totalCount: number;
}

/**
 * 分页请求必须参数
 */
export interface IPagedRequestDto {
  skipCount: number;
  maxResultCount: number;
  sorting: string;
}

/** 排序类型 */
export enum SortType {
  None = 'None' as any,
  Asc = 'Asc' as any,
  Desc = 'Desc' as any,
}

/** 排序 */
export interface ISortCondition {
  /** 字段 */
  field: string | undefined;
  /** 顺序 */
  order: number;
  /** 排序类型 */
  type: SortType | any;
}

/** 表格分页器配置信息 */
export interface ITablePagination {
  /** 当前页 */
  current: number;
  /** 页面大小 */
  pageSize: number;
  /** 页面大小可选项 */
  pageSizeOptions: { [key: number]: string };
  /** 显示跳页器 */
  showQuickJumper: boolean;
  /** 显示页面大小修改器 */
  showSizeChanger: boolean;
  /** 总数据量 */
  total: number;
}

/** 表格筛选器配置信息 */
export interface ITableFilter {
  [key: string]: any;
}

/** 表格排序列配置 */
export interface ITableSorterColumn {
  [key: string]: any;
  /** 列标题 */
  titile: string;
  /** 数据索引 */
  dataIndex: string;
  /** 排序配置 */
  sorter: any;
}

/** 表格排序信息 */
export interface ITableSorter {
  /** 列配置 */
  column: ITableSorterColumn;
  /** 排序方式 */
  order: 'ascend' | 'descend';
  /** 字段 */
  field: string;
  /** 列键 */
  columnKey?: string;
}

// column: Object
// title: "Age"
// dataIndex: "age"
// sorter: Object
// __originColumn__: Object
// order: "ascend"
// field: "age"
// columnKey:
export interface IBtnList {
  icon: String | undefined;
  text: String;
  eventName: String;
  display: Boolean | undefined;
  alignRight?: String | undefined;
}
