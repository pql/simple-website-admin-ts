import { IFilterValues } from '../interfaces';
import { FireBytes_Unified_PageFilters_Dtos_PageFilterDto } from '@/apis';

export const pageFilterProps = {
  /** 筛选配置 */
  filterConfig: {
    type: Object as PropType<FireBytes_Unified_PageFilters_Dtos_PageFilterDto>,
  },
  /** 筛选默认值 */
  defaultValue: {
    type: Object as PropType<IFilterValues>,
    default: {} as IFilterValues,
  },
  /** 筛选值 */
  value: {
    type: Object as PropType<IFilterValues>,
    default: {} as IFilterValues,
  },
};
