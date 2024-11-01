/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_ListViews_Dtos_ListViewColumnsDto = {
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
        listViewId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        listViewColumnColor: {
            type: 'FireBytes_Unified_ListViews_Dtos_ListViewColumnColorDto',
        },
        listViewColumnColorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        actions: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_ListViews_Dtos_ListViewColumnsActionItemDto',
            },
            isNullable: true,
        },
        ifShow: {
            type: 'boolean',
            isNullable: true,
        },
        sortNum: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        type: {
            type: 'string',
            isNullable: true,
            maxLength: 50,
        },
        field: {
            type: 'string',
            isNullable: true,
            maxLength: 100,
        },
        title: {
            type: 'string',
            isNullable: true,
            maxLength: 200,
        },
        width: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        fixed: {
            type: 'string',
            isNullable: true,
        },
        sortable: {
            type: 'boolean',
            isNullable: true,
        },
        sorting: {
            type: 'string',
            isNullable: true,
        },
        position: {
            type: 'string',
            isNullable: true,
            maxLength: 50,
        },
        numberDigits: {
            type: 'string',
            isNullable: true,
        },
        dateFormat: {
            type: 'string',
            isNullable: true,
            maxLength: 128,
        },
        linkType: {
            type: 'string',
            isNullable: true,
        },
        linkPath: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        linkParam: {
            type: 'string',
            isNullable: true,
            maxLength: 200,
        },
        resizable: {
            type: 'boolean',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
