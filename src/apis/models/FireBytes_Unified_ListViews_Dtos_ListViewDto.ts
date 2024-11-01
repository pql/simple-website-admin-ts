/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto } from './FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto';
export type FireBytes_Unified_ListViews_Dtos_ListViewDto = {
    id?: string | null;
    readonly extraProperties?: Record<string, any> | null;
    concurrencyStamp?: string | null;
    creationTime?: string;
    creatorId?: string | null;
    lastModificationTime?: string | null;
    lastModifierId?: string | null;
    listViewName?: string | null;
    ifShowPersonalization?: boolean | null;
    rowSelection?: string | null;
    showPagination?: boolean | null;
    showExport?: boolean | null;
    showExportAll?: boolean | null;
    listViewColumns?: Array<FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto> | null;
    tenantId?: string | null;
};

