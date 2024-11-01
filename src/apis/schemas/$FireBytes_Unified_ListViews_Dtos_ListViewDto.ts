/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_ListViews_Dtos_ListViewDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        listViewName: {
            type: 'string',
            isNullable: true,
            maxLength: 200,
        },
        ifShowPersonalization: {
            type: 'boolean',
            isNullable: true,
        },
        rowSelection: {
            type: 'string',
            isNullable: true,
        },
        showPagination: {
            type: 'boolean',
            isNullable: true,
        },
        showExport: {
            type: 'boolean',
            isNullable: true,
        },
        showExportAll: {
            type: 'boolean',
            isNullable: true,
        },
        listViewColumns: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto',
            },
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
