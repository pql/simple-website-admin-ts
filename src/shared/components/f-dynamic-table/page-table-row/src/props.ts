import { ShowActionBtnFunctionType } from '../interfaces';
import {
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto,
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
} from '@/apis';

export const pageTableRowProps = {
  /** 控制表格操作栏按钮隐藏 */
  showActionBtn: {
    type: Function as PropType<ShowActionBtnFunctionType>,
    default: () => {
      return (
        item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto,
        column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
        record: any,
      ) => {
        return true;
      };
    },
  },
};
