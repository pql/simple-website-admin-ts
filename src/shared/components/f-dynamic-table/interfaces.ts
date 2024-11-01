import { IFilterValues } from './page-filter/interfaces';
import { IPageInfo } from './page-table/interfaces';

/** 请求数据的输入 */
export interface IFetchDataInput extends IPageInfo {
  /** 筛选条件 */
  fitlerValues: IFilterValues;
}
