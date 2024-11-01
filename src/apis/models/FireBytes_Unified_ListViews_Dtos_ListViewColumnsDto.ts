/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto } from './FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto';
import type { FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto } from './FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto';
export type FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto = {
    id?: string | null;
    readonly extraProperties?: Record<string, any> | null;
    concurrencyStamp?: string | null;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    listViewId?: string | null;
    listViewColumnColor?: FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto;
    listViewColumnColorId?: string | null;
    actions?: Array<FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto> | null;
    ifShow?: boolean | null;
    sortNum?: number | null;
    type?: string | null;
    field?: string | null;
    title?: string | null;
    width?: number | null;
    fixed?: string | null;
    sortable?: boolean | null;
    sorting?: string | null;
    position?: string | null;
    numberDigits?: string | null;
    dateFormat?: string | null;
    linkType?: string | null;
    linkPath?: string | null;
    linkParam?: string | null;
    resizable?: boolean;
    tenantId?: string | null;
};

