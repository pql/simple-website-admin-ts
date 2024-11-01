import {
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto,
  FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
} from '@/apis';

export type ShowActionBtnFunctionType = (
  item: FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto,
  column: FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto,
  record: any,
) => boolean;
